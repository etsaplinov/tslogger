"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Logger_1 = require("./Logger");
var LogManager = /** @class */ (function () {
    function LogManager() {
    }
    LogManager.GetLogger = function (name) {
        if (name == undefined)
            return this.s_Root;
        if (this.s_Root != undefined && name == this.s_Root.Name) {
            return this.s_Root;
        }
        var log;
        if (LogManager.s_Loggers[name] != undefined)
            return LogManager.s_Loggers[name];
        else {
            log = new Logger_1.Logger(name);
            this.UpdateParent(log);
            LogManager.s_Loggers[name] = log;
            return log;
        }
    };
    LogManager.UpdateParent = function (log) {
        var parent = undefined;
        if (parent == undefined && LogManager.s_Root != undefined)
            LogManager.s_Root.AddChild(log);
    };
    LogManager.LoggerNameSystem = "root";
    LogManager.s_Loggers = {};
    LogManager.s_Root = new Logger_1.Logger(LogManager.LoggerNameSystem);
    return LogManager;
}());
exports.LogManager = LogManager;
//# sourceMappingURL=LogManager.js.map