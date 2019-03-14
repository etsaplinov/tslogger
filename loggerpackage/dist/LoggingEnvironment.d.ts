import { ILoggingEnvironment } from "./ILoggingEnvironment";
import { WorkflowState } from "./WorkflowState";
import { IWorkflowState } from "./IWorkflowState";
export declare class LoggingEnvironment implements ILoggingEnvironment {
    static s_AppEnv: LoggingEnvironment | undefined;
    Initialize(): WorkflowState;
    Setup(): IWorkflowState;
}
