"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ILogger_1 = require("./ILogger");
var LogEventArgs_1 = require("./LogEventArgs");
var Logger = /** @class */ (function () {
    function Logger(name) {
        this.m_Listeners = new Array();
        this.m_Children = new Array();
        this.Name = name;
        this.Enable = true;
        this.Parent = undefined;
    }
    Object.defineProperty(Logger.prototype, "Children", {
        get: function () {
            return this.m_Children;
        },
        enumerable: true,
        configurable: true
    });
    Logger.prototype.DebugEx = function (ex) {
        var _this = this;
        if (ex == undefined)
            return;
        if (ex.IsOk)
            return;
        // keep multiple errors together
        ex.ErrorMessages.forEach(function (err) {
            _this.LogPrivate(ILogger_1.LogKind.Debug, undefined, "{0} : {1}", [err.UniqueId, err.Message]);
        });
    };
    ;
    Logger.prototype.Debug = function (format, args) {
        this.LogPrivate(ILogger_1.LogKind.Debug, undefined, format, args);
    };
    ;
    Logger.prototype.InfoEx = function (ex) {
        var _this = this;
        if (ex == undefined)
            return;
        if (ex.IsOk)
            return;
        // keep multiple errors together
        ex.ErrorMessages.forEach(function (err) {
            _this.LogPrivate(ILogger_1.LogKind.Info, undefined, "{0} : {1}", [err.UniqueId, err.Message]);
        });
    };
    Logger.prototype.Info = function (format, args) {
        this.LogPrivate(ILogger_1.LogKind.Info, undefined, format, args);
    };
    ;
    Logger.prototype.WarningEx = function (ex) {
        var _this = this;
        if (ex == undefined)
            return;
        if (ex.IsOk)
            return;
        // keep multiple errors together
        ex.ErrorMessages.forEach(function (err) {
            _this.LogPrivate(ILogger_1.LogKind.Warning, undefined, "{0} : {1}", [err.UniqueId, err.Message]);
        });
    };
    Logger.prototype.Warning = function (format, args) {
        this.LogPrivate(ILogger_1.LogKind.Warning, undefined, format, args);
    };
    ;
    Logger.prototype.ErrorEx = function (ex) {
        var _this = this;
        if (ex == undefined)
            return;
        if (ex.IsOk)
            return;
        // keep multiple errors together
        ex.ErrorMessages.forEach(function (err) {
            _this.LogPrivate(ILogger_1.LogKind.Error, undefined, "{0} : {1}", [err.UniqueId, err.Message]);
        });
    };
    Logger.prototype.Error = function (format, args) {
        this.LogPrivate(ILogger_1.LogKind.Error, undefined, format, args);
    };
    ;
    Logger.prototype.ExceptionEx = function (ex) {
        this.Exception("", ex);
    };
    Logger.prototype.Exception = function (failedTask, ex) {
        if (ex == null)
            return;
        var message = "";
        if (failedTask != null)
            message += failedTask;
        var originalException = ex;
        message += ex.message;
        message += ex.stack;
        this.LogPrivate(ILogger_1.LogKind.Fatal, originalException, message.trim());
    };
    Logger.prototype.ExceptionDebugEx = function (ex) {
        this.ExceptionDebug("", ex);
    };
    Logger.prototype.ExceptionDebug = function (failedTask, ex) {
        if (ex == null)
            return;
        var message = "";
        if (failedTask != null)
            message += failedTask;
        var originalException = ex;
        message += ex.message;
        message += ex.stack;
        this.LogPrivate(ILogger_1.LogKind.Debug, originalException, message.trim());
    };
    Logger.prototype.AddListener = function (listener) {
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
    };
    Logger.prototype.RemoveListener = function (listener) {
        if (listener == null)
            return;
        var listenerIndex = this.m_Listeners.indexOf(listener);
        if (listenerIndex > -1) {
            this.m_Listeners.splice(listenerIndex, 1);
            this.m_Listeners.splice(listenerIndex, 1);
            var sourceIndex = listener.Sources.indexOf(this);
            listener.Sources.splice(sourceIndex, 1);
        }
    };
    Logger.prototype.AddChild = function (child) {
        var _this = this;
        if (child == null)
            throw new Error(typeof (child));
        if (child.Parent != null)
            throw new Error("Parent logger may not be valid when adding a child logger to an logger instance");
        // tell the new child who it belongs to
        child.Parent = this;
        // scan all existing children if there is a need to fiddle in a new parent
        var tempParentName = child.Name + ".";
        var tempChildren = new (Array.bind.apply(Array, [void 0].concat(this.Children)))();
        tempChildren.forEach(function (c) {
            if (c.Name.startsWith(tempParentName)) {
                // it's not a sibling... it's a child!
                c.Parent = child;
                child.m_Children.push(c);
                _this.m_Children.splice(0, 1);
            }
        });
        //finally adopt the new child
        this.m_Children.push(child);
    };
    Logger.prototype.Log = function (msg, storeType) {
        if (storeType != null && storeType == "portal")
            this.LogPrivate(ILogger_1.LogKind.Info, undefined, msg);
        else if (storeType != null && storeType == "store")
            this.LogPrivate(ILogger_1.LogKind.Warning, undefined, msg);
    };
    ;
    Logger.prototype.LogPrivate = function (kind, exception, format, args) {
        if (this.Enable == false)
            return;
        var timestamp = new Date();
        var le;
        if ((args == null) || (args.length > 0)) {
            le = new LogEventArgs_1.LogEventArgs(this.Name, exception, kind, timestamp, this.Format(format, args));
        }
        else
            le = new LogEventArgs_1.LogEventArgs(this.Name, exception, kind, timestamp, format);
        this.NotifyListeners(le);
    };
    Logger.prototype.NotifyListeners = function (msg) {
        if (msg == null)
            return;
        if (msg.Message == null)
            return;
        if (this.Enable == true) {
            this.m_Listeners.forEach(function (listener) {
                if (listener != null)
                    listener.AppendToLog(msg);
            });
        }
        if (this.Parent != null)
            this.Parent.NotifyListeners(msg);
    };
    Logger.prototype.Format = function (formatString, args) {
        args = args || [];
        args.forEach(function (value, index) {
            formatString = formatString.replace("{" + index + "}", value);
        });
        return formatString;
    };
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map