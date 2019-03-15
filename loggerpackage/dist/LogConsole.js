"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var LogListener_1 = require("./LogListener");
var ILogger_1 = require("./ILogger");
var LogConsole = /** @class */ (function (_super) {
    __extends(LogConsole, _super);
    function LogConsole() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LogConsole.prototype.AppendMessage = function (message) {
        console.log(message.Timestamp + "; " + message.Origin + "; " + ILogger_1.LogKind[message.Kind] + "; " + message.Message + "; " + message.Exception);
    };
    ;
    return LogConsole;
}(LogListener_1.LogListener));
exports.LogConsole = LogConsole;
//# sourceMappingURL=LogConsole.js.map