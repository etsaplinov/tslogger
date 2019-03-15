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
            // try {
            //     // if (OnAddLogger != null)
            //     //     OnAddLogger(null, new LogManagerEventArgs(name));
            // }
            // catch (Exception ex)
            // {
            //     if (this.s_Root != undefined) {
            //         this.s_Root.Exception(ex, true);
            //     }
            // }
            return log;
        }
    }


    private static UpdateParent(log: Logger) {
        let childName = log.Name;
        let parent: Logger | undefined = undefined;


        // for (int i = childName.LastIndexOf('.', childName.Length - 1);  // first look for the longest possible parent name
        //     i >= 0; // nothing left? then we are done
        // i = childName.LastIndexOf('.', i - 1)) // next search has to use one field less
        // {
        //     string parentName = childName.Substring(0, i);

        //     if (s_Loggers.TryGetValue(parentName, out parent)) {
        //         // there it is...
        //         parent.AddChild(log);
        //         break;
        //     }
        //     else {
        //         // nothing...
        //     }
        //     // need to bail out when the last compare was on the very last character only,
        //     // as this will cause trouble with the next LastIndexOf call (starting at -1 !)
        //     if (i == 0)
        //         break;
        // }

        if (parent == undefined && LogManager.s_Root != undefined)
            LogManager.s_Root.AddChild(log);
    }



    // static InitLogger(): ILogger {
    //     this.logger = new Logger("test");
    //     return this.logger;
    // }
}