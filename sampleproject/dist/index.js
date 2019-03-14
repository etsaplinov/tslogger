"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("logger");
logger_1.LoggingEnvironment.Initialize();
function testLog(message) {
    var logger = logger_1.LogManager.GetLogger();
    logger.Info("test {0} info", [message]);
}
testLog("some");
