import { LogEventArgs } from "./LogEventArgs";
import { Logger } from ".";
import { LogFilter } from "./LogFilter";
export declare abstract class LogListener {
    AppendToLog(message: LogEventArgs): void;
    abstract AppendMessage(message: LogEventArgs): void;
    Filter: LogFilter | undefined;
    readonly Sources: Array<Logger>;
    private m_Filter?;
    private m_Sources;
}
