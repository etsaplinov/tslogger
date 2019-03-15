import { ILoggingEnvironment } from "./ILoggingEnvironment";
import { WorkflowState } from "./WorkflowState";
import { IWorkflowState } from "./IWorkflowState";
import { LogManager } from ".";
import * as fs from 'fs';
import * as path from 'path';
import { Logger } from "./Logger";
import { LoggingConfig } from "./LogConfig";
import { LogListener } from "./LogListener";
import { LogFile } from "./LogFile";
import { LogConsole } from "./LogConsole";


export class LoggingEnvironment implements ILoggingEnvironment {

    static s_AppEnv: LoggingEnvironment | undefined;
    static ConfigFilename: string = "logconfig.json";

    static _Store: any = {
        LogConsole,
        LogFile
    }

    public static Initialize(store?: any) {
        if (store != undefined)
            this._Store = { ...this._Store, ...store };

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
        let configPath = path.resolve("d:\\", 'logconfigs.json');
        //check config exists
        let configs: LoggingConfig | undefined = undefined;
        if (fs.existsSync(configPath)) {
            configs = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        }

        // let listeners: Array<LogListener> = [];
        let listeners: { [name: string]: LogListener } = {};
        if (configs != undefined && configs.Listeners != null) {
            configs.Listeners.forEach(listenerInfo => {
                let listener: any = new LoggingEnvironment._Store[listenerInfo.Type](listenerInfo.ListenerConfig);
                if (listener != null)
                    listeners[listenerInfo.Name] = listener;

            });
        }

        if (configs != undefined && configs.Loggers != null) {
            configs.Loggers.forEach(loggerInfo => {
                let logger = LogManager.GetLogger(loggerInfo.Name);
                loggerInfo.Listeners.forEach((listenerName) => {
                    let listener = listeners[listenerName];
                    if (listener != null)
                        logger.AddListener(listener);
                });
            });
        }


        // rootLogger.AddListener(new LogConsole());
        // rootLogger.AddListener(new LogFile(path.resolve("d:\\", 'logs.txt')));
    }
}
