import { LogKind } from ".";

export class LogEventArgs {

    constructor(origin: string, ex: Error | undefined, kind: LogKind, timestamp: Date, message: String) {
        this.Origin = origin;
        this.Kind = kind;
        this.Timestamp = timestamp;
        this.Message = message.trim();
        this.Exception = ex;
    }


    protected LogEventArgs() {
        this.Origin = "";
        this.Timestamp = new Date();
        this.Kind = LogKind.Info;
        this.Message = "";
    }

    Timestamp: Date;
    Origin: string;
    Kind: LogKind;
    Message: string;
    Exception: Error | undefined;
}