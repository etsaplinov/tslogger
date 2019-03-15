import { ILoggingEnvironment } from "./ILoggingEnvironment";
import { WorkflowState } from "./WorkflowState";
export declare class LoggingEnvironment implements ILoggingEnvironment {
    static s_AppEnv: LoggingEnvironment | undefined;
    static ConfigFilename: string;
    static _Store: any;
    static Initialize(store?: any): WorkflowState;
    private Setup;
    private ConfigureLogging;
}
