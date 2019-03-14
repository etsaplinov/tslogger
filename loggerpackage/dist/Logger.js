"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ILogger_1 = require("./ILogger");
var Logger = /** @class */ (function () {
    function Logger(name) {
        this.Name = name;
        this.Enable = true;
    }
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
    Logger.prototype.ExceptionEx = function (ex, includeInnerExceptions) {
        throw new Error("Not implement");
    };
    Logger.prototype.Exception = function (failedTask, ex, includeInnerExceptions) {
        throw new Error("Not implement");
    };
    Logger.prototype.ExceptionDebugEx = function (ex, includeInnerExceptions) {
        throw new Error("Not implement");
    };
    Logger.prototype.ExceptionDebug = function (failedTask, ex, includeInnerExceptions) {
        throw new Error("Not implement");
    };
    Logger.prototype.AddListener = function (listener) {
        throw new Error("Not implement");
    };
    Logger.prototype.RemoveListener = function (listener) {
        throw new Error("Not implement");
    };
    Logger.prototype.AddChild = function (child) {
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
    };
    Logger.prototype.Log = function (msg, storeType) {
        if (storeType != null && storeType == "portal")
            this.LogPrivate(ILogger_1.LogKind.Info, undefined, msg);
        else if (storeType != null && storeType == "store")
            this.LogPrivate(ILogger_1.LogKind.Warning, undefined, msg);
    };
    ;
    Logger.prototype.LogPrivate = function (kind, exception, format, args) {
        console.log(this.Format(format, args));
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
