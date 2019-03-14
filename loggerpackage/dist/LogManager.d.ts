import { Logger } from "./Logger";
export declare class LogManager {
    private static logger;
    static LoggerNameSystem: string;
    private static s_Loggers;
    private static s_Root;
    static GetLogger(name?: string): Logger;
    private static UpdateParent;
}
