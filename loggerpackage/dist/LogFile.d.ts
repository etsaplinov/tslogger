import { LogListener } from "./LogListener";
import { LogEventArgs } from "./LogEventArgs";
export declare class LogFile extends LogListener {
    constructor(configs: any);
    private _filePath;
    AppendMessage(message: LogEventArgs): void;
}
