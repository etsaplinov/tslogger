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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("logger");
// var axios = require('axios');
var axios = __importStar(require("axios"));
var LogSlack = /** @class */ (function (_super) {
    __extends(LogSlack, _super);
    function LogSlack(configs) {
        var _this = _super.call(this) || this;
        _this._hookUrl = "";
        var conf = configs;
        _this._hookUrl = conf.hookUrl;
        return _this;
    }
    LogSlack.prototype.AppendMessage = function (message) {
        var exText = message.Exception != null ? message.Exception.message.toString() : "";
        var payload = { "text": message.Timestamp + "; " + message.Origin + "; " + logger_1.LogKind[message.Kind] + "; " + message.Message + "; " + exText + "\r\n" };
        axios.default.post(this._hookUrl, payload)
            .then(function (response) {
            console.log(response);
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    ;
    return LogSlack;
}(logger_1.LogListener));
exports.LogSlack = LogSlack;
//# sourceMappingURL=LogSlack.js.map