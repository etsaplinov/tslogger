import { LogListener } from "./LogListener";
import { LogEventArgs } from "./LogEventArgs";
import { LogKind } from "./ILogger";

export class LogConsole extends LogListener {

    AppendMessage(message: LogEventArgs) {
        console.log(`${message.Timestamp}; ${message.Origin}; ${LogKind[message.Kind]}; ${message.Message}; ${message.Exception}`);
    };


}

