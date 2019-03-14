"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var WorkflowState_1 = require("./WorkflowState");
var _1 = require(".");
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var LoggingEnvironment = /** @class */ (function () {
    function LoggingEnvironment() {
    }
    LoggingEnvironment.Initialize = function () {
        var state = WorkflowState_1.WorkflowState.Ok();
        if (LoggingEnvironment.s_AppEnv == undefined) {
            LoggingEnvironment.s_AppEnv = new LoggingEnvironment();
            state.AppendEx(LoggingEnvironment.s_AppEnv.Setup());
        }
        return state;
    };
    LoggingEnvironment.prototype.Setup = function () {
        var state = WorkflowState_1.WorkflowState.Ok();
        // // Bring up application log
        this.ConfigureLogging();
        return state;
    };
    LoggingEnvironment.prototype.ConfigureLogging = function () {
        var rootLogger = _1.LogManager.GetLogger();
        var configPath = path.resolve(__dirname, 'logconfigs.json');
        //check config exists
        if (fs.existsSync(configPath)) {
            var configs = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        }
        // rootLogger.AddListener();
    };
    LoggingEnvironment.ConfigFilename = "logconfig.json";
    return LoggingEnvironment;
}());
exports.LoggingEnvironment = LoggingEnvironment;
