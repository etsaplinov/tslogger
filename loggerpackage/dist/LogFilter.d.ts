import { LogKind } from "./ILogger";
import { LogEventArgs } from "./LogEventArgs";
export declare class LogFilter {
    private _categoriesAll;
    readonly CategoriesAll: Array<LogKind>;
    IsMatch(message: LogEventArgs): boolean;
}
