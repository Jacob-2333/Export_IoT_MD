import * as fs from "fs";
import * as Path from "path"
import { ConnectionPool, Request, IResult } from "mssql";
import { CONFIG, DOWNLOAD_CONFIG, DownloadConfig } from "./config";

interface WorkflowResult {
    DisplayName: string;
    Workflow: string;
}

async function downloadWorkflow(downloadConfig: DownloadConfig) {
    let conn: ConnectionPool = new ConnectionPool(CONFIG);
    let req: Request = new Request(conn);
    conn = await conn.connect();
    // Query controller id
    let result: IResult<any> = await req.query(
        `SELECT * FROM `+
        `[CoreDataModel].[T_AutomationController]` +
        `WHERE Name = \'${downloadConfig.controllerName}\'` +
        `AND Version = ${downloadConfig.controllerVersion}`
    );
    if (!result.recordset || result.recordset.length === 0) {
        console.log(`AutomationController not found`);
        await conn.close();
        return;
    }
    const AutomationControllerId: string = result.recordset[0].AutomationControllerId;
    // Query workflow
    result = await req.query(
        `SELECT * FROM `+
        `[CoreDataModel].[T_AutomationWorkflow]` +
        `WHERE AutomationControllerId = \'${AutomationControllerId}\'`
    )
    const workflows: WorkflowResult[] = result.recordset;
    // make output directory
    let outputDir: string = Path.join(downloadConfig.outputPath, downloadConfig.controllerName);
    if (!fs.existsSync(outputDir)){
        fs.mkdirSync(outputDir);
    }
    for (let workflow of workflows) {
        let outputPath: string = Path.join(outputDir, `${workflow.DisplayName}.json`);
        fs.writeFileSync(outputPath, workflow.Workflow);
    }
    console.log(`Successfully downloaded`);
    await conn.close();
}

downloadWorkflow(DOWNLOAD_CONFIG);

