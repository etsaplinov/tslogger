import { LogListener, LogKind } from 'logger';
import { LogEventArgs } from 'logger/dist/LogEventArgs';

export class LogSlack extends LogListener {
    constructor(configs: any) {
        super();

        let conf = configs as Configs;

    }


    AppendMessage(message: LogEventArgs) {
        // let exText = message.Exception != null ? message.Exception.message.toString() : "";
        // fs.appendFileSync(this._filePath, `${message.Timestamp}; ${message.Origin}; ${LogKind[message.Kind]}; ${message.Message}; ${exText}\r\n`, {
        //     flag: 'a'
        // });

        console.log("SLACK Logged");
    };


}

interface Configs {
}
