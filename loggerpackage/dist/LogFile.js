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
var LogListener_1 = require("./LogListener");
var ILogger_1 = require("./ILogger");
var fs = __importStar(require("fs"));
var LogFile = /** @class */ (function (_super) {
    __extends(LogFile, _super);
    function LogFile(configs) {
        var _this = _super.call(this) || this;
        var conf = configs;
        _this._filePath = conf.fileName;
        return _this;
    }
    LogFile.prototype.AppendMessage = function (message) {
        var exText = message.Exception != null ? message.Exception.message.toString() : "";
        fs.appendFileSync(this._filePath, message.Timestamp + "; " + message.Origin + "; " + ILogger_1.LogKind[message.Kind] + "; " + message.Message + "; " + exText + "\r\n", {
            flag: 'a'
        });
    };
    ;
    return LogFile;
}(LogListener_1.LogListener));
exports.LogFile = LogFile;
//# sourceMappingURL=LogFile.js.map