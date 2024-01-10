//config.js
export const CONFIG = {
    user: 'MESUser', // SQL Server user
    password: 'localEnvPassword',// password
    server: 'localhost', // host
    database: 'USIZJIntegartion', // database
    port: 1433, // Default 1433
    options: {
        encrypt: false,
        enableArithAbort: false
    },
    pool: {
        min: 0,
        max: 10,
        idleTimeoutMillis: 3000
    }
}

export const DOWNLOAD_CONFIG: DownloadConfig = {
    controllerName: "USIZJ_Plasma_Controller", // Controller name
    controllerVersion: 5,                      // Controller version 
    outputPath: "D:/IOT/Test/downloadMD/"      // The local path where the workflow is stored
}

export interface DownloadConfig {
    controllerName: string,
    controllerVersion: number,
    outputPath: string,
}