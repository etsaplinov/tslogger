"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ILogger_1 = require("./ILogger");
var LogFilter = /** @class */ (function () {
    function LogFilter() {
        this._categoriesAll = new Array(ILogger_1.LogKind.Debug, ILogger_1.LogKind.Fatal, ILogger_1.LogKind.Error, ILogger_1.LogKind.Info);
    }
    Object.defineProperty(LogFilter.prototype, "CategoriesAll", {
        get: function () {
            return this._categoriesAll;
        },
        enumerable: true,
        configurable: true
    });
    LogFilter.prototype.IsMatch = function (message) {
        return true;
    };
    return LogFilter;
}());
exports.LogFilter = LogFilter;
//# sourceMappingURL=LogFilter.js.map