import { LogListener, LogKind } from 'logger';
import { LogEventArgs } from 'logger/dist/LogEventArgs';
// var axios = require('axios');
import * as axios from 'axios';

export class LogSlack extends LogListener {
    constructor(configs: any) {
        super();

        let conf = configs as Configs;

        this._hookUrl = conf.hookUrl;
    }

    private _hookUrl: string = "";

    AppendMessage(message: LogEventArgs) {
        let exText = message.Exception != null ? message.Exception.message.toString() : "";

        var payload = { "text": `${message.Timestamp}; ${message.Origin}; ${LogKind[message.Kind]}; ${message.Message}; ${exText}\r\n` };

        axios.default.post(this._hookUrl, payload)
            .then(function (response: any) {
                console.log(response);
            })
            .catch(function (error: any) {
                console.log(error);
            });
    };


}

interface Configs {
    hookUrl: string;
}
