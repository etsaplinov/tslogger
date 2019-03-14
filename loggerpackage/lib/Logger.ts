import { ILogger, LogKind } from "./ILogger";
import { IWorkflowState } from "./IWorkflowState";

export class Logger implements ILogger {
    constructor(name: string) {
        this.Name = name;
        this.Enable = true;
    }

    Name: string;
    Enable: boolean;




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
    AddListener(listener: import("./LogListener").LogListener) {
        throw new Error("Not implement");
    }
    RemoveListener(listener: import("./LogListener").LogListener) {
        throw new Error("Not implement");
    }

    AddChild(child: Logger) {
        // if (child == null)
        //     throw new ArgumentNullException(child.ToString());

        // if (child.Parent != null)
        //     throw new ArgumentException("Parent logger may not be valid when adding a child logger to an logger instance");

        // lock(m_Lock)
        // {
        //     // tell the new child who it belongs to
        //     child.Parent = this;
        //     // scan all existing children if there is a need to fiddle in a new parent
        //     string tempParentName = child.Name + ".";
        //     var tempChildren = new List<Logger>(Children);
        //     foreach(var c in tempChildren)
        //     {
        //         if (c.Name.StartsWith(tempParentName, StringComparison.Ordinal)) {
        //             // it's not a sibling... it's a child!
        //             c.Parent = child;
        //             child.m_Children.Add(c);
        //             m_Children.Remove(c);
        //         }
        //     }

        //     //finally adopt the new child
        //     m_Children.Add(child);
        // }
    }

    Log(msg: string, storeType: string) {
        if (storeType != null && storeType == "portal")
            this.LogPrivate(LogKind.Info, undefined, msg);
        else if (storeType != null && storeType == "store")
            this.LogPrivate(LogKind.Warning, undefined, msg);
    };

    private LogPrivate(kind: LogKind, exception: Error | undefined, format: string, args?: any[]) {
        console.log(this.Format(format, args));
    }

    private Format(formatString: string, args?: any[]) {
        args = args || [];
        args.forEach((value, index) => {
            formatString = formatString.replace("{" + index + "}", value)
        });
        return formatString;
    }
}