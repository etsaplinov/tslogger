import { LogEventArgs } from "./LogEventArgs";
import { LogKind, Logger } from ".";
import { LogFilter } from "./LogFilter";

export abstract class LogListener {



    AppendToLog(message: LogEventArgs) {
        try {
            if ((this.Filter == undefined) || this.Filter.IsMatch(message)) {
                this.AppendMessage(message);
            }
        }
        catch
        {
        }
    }

    abstract AppendMessage(message: LogEventArgs): void;


    get Filter(): LogFilter | undefined {
        return this.m_Filter;
    }

    set Filter(filter: LogFilter | undefined) {
        this.m_Filter = filter;
    }



    get Sources(): Array<Logger> {
        return this.m_Sources;
    }

    private m_Filter?: LogFilter = undefined;
    private m_Sources: Array<Logger> = new Array<Logger>();


}