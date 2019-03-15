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
var logger_1 = require("logger");
var LogSlack = /** @class */ (function (_super) {
    __extends(LogSlack, _super);
    function LogSlack(configs) {
        var _this = _super.call(this) || this;
        var conf = configs;
        return _this;
    }
    LogSlack.prototype.AppendMessage = function (message) {
        // let exText = message.Exception != null ? message.Exception.message.toString() : "";
        // fs.appendFileSync(this._filePath, `${message.Timestamp}; ${message.Origin}; ${LogKind[message.Kind]}; ${message.Message}; ${exText}\r\n`, {
        //     flag: 'a'
        // });
        console.log("SLACK Logged");
    };
    ;
    return LogSlack;
}(logger_1.LogListener));
exports.LogSlack = LogSlack;
//# sourceMappingURL=SlackLog.js.map