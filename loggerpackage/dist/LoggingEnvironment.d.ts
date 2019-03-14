import { ILoggingEnvironment } from "./ILoggingEnvironment";
import { WorkflowState } from "./WorkflowState";
export declare class LoggingEnvironment implements ILoggingEnvironment {
    static s_AppEnv: LoggingEnvironment | undefined;
    static ConfigFilename: string;
    static Initialize(): WorkflowState;
    private Setup;
    private ConfigureLogging;
}
