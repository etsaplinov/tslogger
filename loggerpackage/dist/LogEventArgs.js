"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var LogEventArgs = /** @class */ (function () {
    function LogEventArgs(origin, ex, kind, timestamp, message) {
        this.Origin = origin;
        this.Kind = kind;
        this.Timestamp = timestamp;
        this.Message = message.trim();
        this.Exception = ex;
    }
    LogEventArgs.prototype.LogEventArgs = function () {
        this.Origin = "";
        this.Timestamp = new Date();
        this.Kind = _1.LogKind.Info;
        this.Message = "";
    };
    return LogEventArgs;
}());
exports.LogEventArgs = LogEventArgs;
