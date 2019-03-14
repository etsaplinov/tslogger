import { IWorkflowState } from "./IWorkflowState";
import { LogListener } from "./LogListener";
export declare enum LogKind {
    Debug = 0,
    Info = 1,
    Warning = 2,
    Error = 3,
    Fatal = 4
}
export interface ILogger {
    Name: string;
    Enable: boolean;
    DebugEx: (ex: IWorkflowState) => void;
    Debug: (format: string, args: Array<string>) => void;
    InfoEx: (ex: IWorkflowState) => void;
    Info: (format: string, args: Array<string>) => void;
    WarningEx: (ex: IWorkflowState) => void;
    Warning: (format: string, args: Array<string>) => void;
    ErrorEx: (ex: IWorkflowState) => void;
    Error: (format: string, args: Array<string>) => void;
    ExceptionEx: (ex: Error, includeInnerExceptions: boolean) => void;
    Exception: (failedTask: string, ex: Error, includeInnerExceptions: boolean) => void;
    ExceptionDebugEx: (ex: Error, includeInnerExceptions: boolean) => void;
    ExceptionDebug: (failedTask: string, ex: Error, includeInnerExceptions: boolean) => void;
    AddListener: (listener: LogListener) => void;
    RemoveListener: (listener: LogListener) => void;
    Log: (msg: string, storeType: string) => void;
}
