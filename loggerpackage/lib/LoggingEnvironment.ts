import { ILoggingEnvironment } from "./ILoggingEnvironment";
import { WorkflowState } from "./WorkflowState";
import { IWorkflowState } from "./IWorkflowState";
import { LogManager } from ".";
import * as fs from 'fs';
import * as path from 'path';


export class LoggingEnvironment implements ILoggingEnvironment {

    static s_AppEnv: LoggingEnvironment | undefined;
    static ConfigFilename: string = "logconfig.json";

    public static Initialize() {
        let state = WorkflowState.Ok();
        if (LoggingEnvironment.s_AppEnv == undefined) {
            LoggingEnvironment.s_AppEnv = new LoggingEnvironment();
            state.AppendEx(LoggingEnvironment.s_AppEnv.Setup());
        }

        return state;
    }

    private Setup(): IWorkflowState {
        let state: IWorkflowState = WorkflowState.Ok();

        // // Bring up application log
        this.ConfigureLogging();

        return state;
    }

    private ConfigureLogging() {
        let rootLogger = LogManager.GetLogger();
        let configPath = path.resolve(__dirname, 'logconfigs.json');
        //check config exists

        if (fs.existsSync(configPath)) {
            let configs = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        }

        // rootLogger.AddListener();
    }
}