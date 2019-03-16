import { ILogger } from "./ILogger";
import { IWorkflowState } from "./IWorkflowState";
import { LogListener } from "./LogListener";
export declare class Logger implements ILogger {
    constructor(name: string);
    Name: string;
    Enable: boolean;
    Parent?: Logger;
    readonly Children: Array<Logger>;
    private m_Listeners;
    private m_Children;
    DebugEx(ex: IWorkflowState): void;
    Debug(format: string, args: string[]): void;
    InfoEx(ex: IWorkflowState): void;
    Info(format: string, args: string[]): void;
    WarningEx(ex: IWorkflowState): void;
    Warning(format: string, args: string[]): void;
    ErrorEx(ex: IWorkflowState): void;
    Error(format: string, args: string[]): void;
    ExceptionEx(ex: Error): void;
    Exception(failedTask: string, ex: Error): void;
    ExceptionDebugEx(ex: Error): void;
    ExceptionDebug(failedTask: string, ex: Error): void;
    AddListener(listener: LogListener): void;
    RemoveListener(listener: LogListener): void;
    AddChild(child: Logger): void;
    Log(msg: string, storeType: string): void;
    private LogPrivate;
    private NotifyListeners;
    private Format;
}
