import { LogListener } from "./LogListener";
import { LogEventArgs } from "./LogEventArgs";
import { LogKind } from "./ILogger";
import * as fs from 'fs';
import * as path from 'path';

export class LogFile extends LogListener {
    constructor(configs: any) {
        super();

        let conf = configs as Configs;

        this._filePath = conf.fileName;
    }

    private _filePath: string;

    AppendMessage(message: LogEventArgs) {
        let exText = message.Exception != null ? message.Exception.message.toString() : "";
        fs.appendFileSync(this._filePath, `${message.Timestamp}; ${message.Origin}; ${LogKind[message.Kind]}; ${message.Message}; ${exText}\r\n`, {
            flag: 'a'
        });
    };


}

interface Configs {
    fileName: string;
}
