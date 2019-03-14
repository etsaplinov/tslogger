"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WorkflowState_1 = require("./WorkflowState");
var LoggingEnvironment = /** @class */ (function () {
    function LoggingEnvironment() {
    }
    LoggingEnvironment.prototype.Initialize = function () {
        var state = WorkflowState_1.WorkflowState.Ok();
        if (LoggingEnvironment.s_AppEnv == undefined) {
            LoggingEnvironment.s_AppEnv = new LoggingEnvironment();
            state.AppendEx(LoggingEnvironment.s_AppEnv.Setup());
        }
        return state;
    };
    LoggingEnvironment.prototype.Setup = function () {
        var state = WorkflowState_1.WorkflowState.Ok();
        // // Bring up application log
        // ConfigureLogging();
        return state;
    };
    return LoggingEnvironment;
}());
exports.LoggingEnvironment = LoggingEnvironment;
