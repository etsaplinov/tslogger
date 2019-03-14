import { ILogger } from "./ILogger";
import { IWorkflowState } from "./IWorkflowState";
export declare class Logger implements ILogger {
    constructor(name: string);
    Name: string;
    Enable: boolean;
    DebugEx(ex: IWorkflowState): void;
    Debug(format: string, args: string[]): void;
    InfoEx(ex: IWorkflowState): void;
    Info(format: string, args: string[]): void;
    WarningEx(ex: IWorkflowState): void;
    Warning(format: string, args: string[]): void;
    ErrorEx(ex: IWorkflowState): void;
    Error(format: string, args: string[]): void;
    ExceptionEx(ex: Error, includeInnerExceptions: boolean): void;
    Exception(failedTask: string, ex: Error, includeInnerExceptions: boolean): void;
    ExceptionDebugEx(ex: Error, includeInnerExceptions: boolean): void;
    ExceptionDebug(failedTask: string, ex: Error, includeInnerExceptions: boolean): void;
    AddListener(listener: import("./LogListener").LogListener): void;
    RemoveListener(listener: import("./LogListener").LogListener): void;
    AddChild(child: Logger): void;
    Log(msg: string, storeType: string): void;
    private LogPrivate;
    private Format;
}
