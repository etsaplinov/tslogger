import { ILogger, LogKind } from "./ILogger";
import { IWorkflowState } from "./IWorkflowState";
import { LogListener } from "./LogListener";
import { LogEventArgs } from "./LogEventArgs";

export class Logger implements ILogger {
    constructor(name: string) {
        this.Name = name;
        this.Enable = true;
        this.Parent = undefined;
    }

    Name: string;
    Enable: boolean;
    Parent?: Logger;

    public get Children(): Array<Logger> {
        return this.m_Children;
    }

    private m_Listeners: Array<LogListener> = new Array<LogListener>();
    private m_Children: Array<Logger> = new Array<Logger>();


    DebugEx(ex: IWorkflowState) {
        if (ex == undefined)
            return;

        if (ex.IsOk)
            return;

        // keep multiple errors together
        ex.ErrorMessages.forEach((err) => {
            this.LogPrivate(LogKind.Debug,
                undefined,
                "{0} : {1}", [err.UniqueId, err.Message]);
        });
    };

    Debug(format: string, args: string[]) {
        this.LogPrivate(LogKind.Debug, undefined, format, args);
    };

    InfoEx(ex: IWorkflowState) {
        if (ex == undefined)
            return;

        if (ex.IsOk)
            return;

        // keep multiple errors together
        ex.ErrorMessages.forEach((err) => {
            this.LogPrivate(LogKind.Info,
                undefined,
                "{0} : {1}", [err.UniqueId, err.Message]);
        });
    }

    Info(format: string, args: string[]) {
        this.LogPrivate(LogKind.Info, undefined, format, args);
    };

    WarningEx(ex: IWorkflowState) {
        if (ex == undefined)
            return;

        if (ex.IsOk)
            return;

        // keep multiple errors together
        ex.ErrorMessages.forEach((err) => {
            this.LogPrivate(LogKind.Warning,
                undefined,
                "{0} : {1}", [err.UniqueId, err.Message]);
        });
    }

    Warning(format: string, args: string[]) {
        this.LogPrivate(LogKind.Warning, undefined, format, args);
    };

    ErrorEx(ex: IWorkflowState) {
        if (ex == undefined)
            return;

        if (ex.IsOk)
            return;

        // keep multiple errors together
        ex.ErrorMessages.forEach((err) => {
            this.LogPrivate(LogKind.Error,
                undefined,
                "{0} : {1}", [err.UniqueId, err.Message]);
        });
    }

    Error(format: string, args: string[]) {
        this.LogPrivate(LogKind.Error, undefined, format, args);
    };


    ExceptionEx(ex: Error, includeInnerExceptions: boolean) {
        throw new Error("Not implement");
    }
    Exception(failedTask: string, ex: Error, includeInnerExceptions: boolean) {
        throw new Error("Not implement");
    }

    ExceptionDebugEx(ex: Error, includeInnerExceptions: boolean) {
        throw new Error("Not implement");
    }
    ExceptionDebug(failedTask: string, ex: Error, includeInnerExceptions: boolean) {
        throw new Error("Not implement");
    }
    AddListener(listener: LogListener) {


        if (listener == null)
            return;

        if (this.m_Listeners.indexOf(listener) == -1) {
            this.m_Listeners.push(listener);
            // tell the listener it has a new source, so that it
            // can remove itself in case it gets disposed before
            // the logger.
            if (listener.Sources.indexOf(this) == -1)
                listener.Sources.push(this);
        }


    }
    RemoveListener(listener: LogListener) {
        if (listener == null)
            return;

        let listenerIndex = this.m_Listeners.indexOf(listener);
        if (listenerIndex > -1) {
            this.m_Listeners.splice(listenerIndex, 1);
            this.m_Listeners.splice(listenerIndex, 1);

            let sourceIndex = listener.Sources.indexOf(this);
            listener.Sources.splice(sourceIndex, 1);
        }
    }

    AddChild(child: Logger) {
        if (child == null)
            throw new Error(typeof (child));

        if (child.Parent != null)
            throw new Error("Parent logger may not be valid when adding a child logger to an logger instance");

        // tell the new child who it belongs to
        child.Parent = this;
        // scan all existing children if there is a need to fiddle in a new parent
        let tempParentName: string = child.Name + ".";
        let tempChildren: Array<Logger> = new Array<Logger>(...this.Children);
        tempChildren.forEach((c) => {
            if (c.Name.startsWith(tempParentName)) {
                // it's not a sibling... it's a child!
                c.Parent = child;
                child.m_Children.push(c);
                this.m_Children.splice(0, 1);
            }
        })
        //finally adopt the new child
        this.m_Children.push(child);
    }

    Log(msg: string, storeType: string) {
        if (storeType != null && storeType == "portal")
            this.LogPrivate(LogKind.Info, undefined, msg);
        else if (storeType != null && storeType == "store")
            this.LogPrivate(LogKind.Warning, undefined, msg);
    };

    private LogPrivate(kind: LogKind, exception: Error | undefined, format: string, args?: any[]) {
        if (this.Enable == false)
            return;

        let timestamp = new Date();
        let le: LogEventArgs;

        if ((args == null) || (args.length > 0)) {
            le = new LogEventArgs(this.Name, exception, kind, timestamp,
                this.Format(format, args));
        }
        else
            le = new LogEventArgs(this.Name, exception, kind, timestamp, format);

        this.NotifyListeners(le);
    }


    private NotifyListeners(msg: LogEventArgs) {
        if (msg == null)
            return;

        if (msg.Message == null)
            return;

        if (this.Enable == true) {
            this.m_Listeners.forEach((listener) => {
                if (listener != null)
                    listener.AppendToLog(msg);
            })
        }

        if (this.Parent != null)
            this.Parent.NotifyListeners(msg);
    }

    private Format(formatString: string, args?: any[]) {
        args = args || [];
        args.forEach((value, index) => {
            formatString = formatString.replace("{" + index + "}", value)
        });
        return formatString;
    }
}