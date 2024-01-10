## Download workflow

node version: 20.4.0

1. 执行 `npm install`
2. 修改 config.ts 中数据库配置项 CONFIG 
3. 修改 config.ts 中数据库配置项 DOWNLOAD_CONFIG

Example:
```ts
export const CONFIG = {
    user: 'MESUser', // SQL Server user
    password: 'localEnvPassword',// password
    server: 'localhost', // host
    database: 'USIZJIntegartion', // database
    port: 1433, // Default 1433
    // ...
}

export const DOWNLOAD_CONFIG: DownloadConfig = {
    controllerName: "USIZJ_Plasma_Controller", // Controller name
    controllerVersion: 5,                      // Controller version 
    outputPath: "D:/IOT/Test/downloadMD/"      // The local path where the workflow is stored
}
```