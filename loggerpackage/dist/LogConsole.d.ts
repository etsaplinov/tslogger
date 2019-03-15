import { LogListener } from "./LogListener";
import { LogEventArgs } from "./LogEventArgs";
export declare class LogConsole extends LogListener {
    AppendMessage(message: LogEventArgs): void;
}
