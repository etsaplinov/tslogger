import { LogKind } from ".";
export declare class LogEventArgs {
    constructor(origin: string, ex: Error, kind: LogKind, timestamp: Date, message: String);
    protected LogEventArgs(): void;
    Timestamp: Date;
    Origin: string;
    Kind: LogKind;
    Message: string;
    Exception: Error;
}
