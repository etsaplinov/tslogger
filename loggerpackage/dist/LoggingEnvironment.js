"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var LogFile_1 = require("./LogFile");
var LogConsole_1 = require("./LogConsole");
var LoggingEnvironment = /** @class */ (function () {
    function LoggingEnvironment() {
    }
    LoggingEnvironment.Initialize = function (store) {
        if (store != undefined)
            this._Store = __assign({}, this._Store, store);
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
        var configPath = path.resolve("d:\\", 'logconfigs.json');
        //check config exists
        var configs = undefined;
        if (fs.existsSync(configPath)) {
            configs = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        }
        // let listeners: Array<LogListener> = [];
        var listeners = {};
        if (configs != undefined && configs.Listeners != null) {
            configs.Listeners.forEach(function (listenerInfo) {
                var listener = new LoggingEnvironment._Store[listenerInfo.Type](listenerInfo.ListenerConfig);
                if (listener != null)
                    listeners[listenerInfo.Name] = listener;
            });
        }
        if (configs != undefined && configs.Loggers != null) {
            configs.Loggers.forEach(function (loggerInfo) {
                var logger = _1.LogManager.GetLogger(loggerInfo.Name);
                loggerInfo.Listeners.forEach(function (listenerName) {
                    var listener = listeners[listenerName];
                    if (listener != null)
                        logger.AddListener(listener);
                });
            });
        }
        // rootLogger.AddListener(new LogConsole());
        // rootLogger.AddListener(new LogFile(path.resolve("d:\\", 'logs.txt')));
    };
    LoggingEnvironment.ConfigFilename = "logconfig.json";
    LoggingEnvironment._Store = {
        LogConsole: LogConsole_1.LogConsole,
        LogFile: LogFile_1.LogFile
    };
    return LoggingEnvironment;
}());
exports.LoggingEnvironment = LoggingEnvironment;
//# sourceMappingURL=LoggingEnvironment.js.map