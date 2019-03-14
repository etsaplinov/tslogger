import { ILoggingEnvironment } from "./ILoggingEnvironment";
import { WorkflowState } from "./WorkflowState";
import { IWorkflowState } from "./IWorkflowState";

export class LoggingEnvironment implements ILoggingEnvironment {

    static s_AppEnv: LoggingEnvironment | undefined;

    Initialize() {
        let state = WorkflowState.Ok();
        if (LoggingEnvironment.s_AppEnv == undefined) {
            LoggingEnvironment.s_AppEnv = new LoggingEnvironment();
            state.AppendEx(LoggingEnvironment.s_AppEnv.Setup());
        }

        return state;
    }

    Setup(): IWorkflowState {
        let state: IWorkflowState = WorkflowState.Ok();

        // // Bring up application log
        // ConfigureLogging();

        return state;
    }
}