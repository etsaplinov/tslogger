import { LogListener } from 'logger';
import { LogEventArgs } from 'logger/dist/LogEventArgs';
export declare class LogSlack extends LogListener {
    constructor(configs: any);
    AppendMessage(message: LogEventArgs): void;
}
