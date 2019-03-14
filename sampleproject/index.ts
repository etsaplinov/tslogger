import { LogKind, Logger, LogManager } from 'logger';

LoggingEnvironment.Initialize();

function testLog(message: string) {
    let logger = LogManager.GetLogger();

    logger.Info("test {0} info", [message]);
}

testLog("some");