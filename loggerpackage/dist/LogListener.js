"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LogListener = /** @class */ (function () {
    function LogListener() {
        this.m_Filter = undefined;
        this.m_Sources = new Array();
    }
    LogListener.prototype.AppendToLog = function (message) {
        try {
            if ((this.Filter == undefined) || this.Filter.IsMatch(message)) {
                this.AppendMessage(message);
            }
        }
        catch (_a) {
        }
    };
    Object.defineProperty(LogListener.prototype, "Filter", {
        get: function () {
            return this.m_Filter;
        },
        set: function (filter) {
            this.m_Filter = filter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LogListener.prototype, "Sources", {
        get: function () {
            return this.m_Sources;
        },
        enumerable: true,
        configurable: true
    });
    return LogListener;
}());
exports.LogListener = LogListener;
