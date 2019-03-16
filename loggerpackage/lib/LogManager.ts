import { Logger } from "./Logger";
import { ILogger } from "./ILogger";

export class LogManager {
    private static logger: ILogger;

    public static LoggerNameSystem: string = "root";

    private static s_Loggers: { [name: string]: Logger } = {};
    private static s_Root: Logger = new Logger(LogManager.LoggerNameSystem);



    public static GetLogger(name?: string) {
        if (name == undefined)
            return this.s_Root;

        if (this.s_Root != undefined && name == this.s_Root.Name) {
            return this.s_Root;
        }

        let log: Logger;
        if (LogManager.s_Loggers[name] != undefined)
            return LogManager.s_Loggers[name];
        else {
            log = new Logger(name);
            this.UpdateParent(log);
            LogManager.s_Loggers[name] = log;
            return log;
        }
    }


    private static UpdateParent(log: Logger) {
        let parent: Logger | undefined = undefined;

        if (parent == undefined && LogManager.s_Root != undefined)
            LogManager.s_Root.AddChild(log);
    }

}