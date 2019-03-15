import { LogKind, Logger, LogManager, LoggingEnvironment } from 'logger';
import { LogSlack } from './dist/SlackLog';

LoggingEnvironment.Initialize({
    LogSlack
});

function testLog(message: string) {
    let logger = LogManager.GetLogger();
    logger.Info("test {0} info", [message]);

    let testLogger = LogManager.GetLogger("root.testlogger");
    testLogger.Info("test info", ["root.testlogger"]);
}


testLog("some");