"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("logger");
var SlackLog_1 = require("./dist/SlackLog");
logger_1.LoggingEnvironment.Initialize({
    LogSlack: SlackLog_1.LogSlack
});
function testLog(message) {
    var logger = logger_1.LogManager.GetLogger();
    logger.Info("test {0} info", [message]);
    var testLogger = logger_1.LogManager.GetLogger("root.testlogger");
    testLogger.Info("test info", ["root.testlogger"]);
}
testLog("some");
//# sourceMappingURL=index.js.map