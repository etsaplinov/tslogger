import { LogKind } from "./ILogger";
import { LogEventArgs } from "./LogEventArgs";

export class LogFilter {
    private _categoriesAll: Array<LogKind> = new Array<LogKind>(LogKind.Debug, LogKind.Fatal, LogKind.Error, LogKind.Info);

    public get CategoriesAll(): Array<LogKind> {
        return this._categoriesAll;
    }

    public IsMatch(message: LogEventArgs): boolean {
        return true;
    }

}