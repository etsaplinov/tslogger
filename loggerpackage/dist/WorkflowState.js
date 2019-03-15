"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IWorkflowState_1 = require("./IWorkflowState");
var WorkflowState = /** @class */ (function () {
    function WorkflowState() {
        this.m_errorMessages = [];
        this.m_discardedErrorMessages = [];
    }
    Object.defineProperty(WorkflowState.prototype, "IsOk", {
        get: function () {
            return WorkflowState.CheckErrorList(this.m_errorMessages);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkflowState.prototype, "IsOkWithHistory", {
        get: function () {
            return WorkflowState.CheckErrorList(this.m_errorMessages) && WorkflowState.CheckErrorList(this.m_discardedErrorMessages);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkflowState.prototype, "ErrorMessages", {
        get: function () {
            return this.m_errorMessages;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkflowState.prototype, "DiscardedErrorMessages", {
        get: function () {
            return this.m_discardedErrorMessages;
        },
        enumerable: true,
        configurable: true
    });
    WorkflowState.prototype.ListAllMessages = function () {
        return WorkflowState.ListAllMessagesPrivate(this.m_errorMessages);
    };
    WorkflowState.prototype.ListAllDiscardedMessages = function () {
        return WorkflowState.ListAllMessagesPrivate(this.m_discardedErrorMessages);
    };
    WorkflowState.prototype.AppendEx = function (ex) {
        var _this = this;
        if (ex == null)
            return;
        if ((ex.ErrorMessages == null) && (ex.DiscardedErrorMessages == null))
            return;
        if (this.m_errorMessages == null)
            this.m_errorMessages = ex.ErrorMessages;
        else {
            var errors = this.m_errorMessages;
            if (errors != null)
                errors.push.apply(errors, ex.ErrorMessages);
            else {
                // if we ever end up here then someone misused the code a lot...
                ex.ErrorMessages.forEach(function (e) {
                    _this.m_errorMessages.push(e);
                });
            }
        }
        if (this.m_discardedErrorMessages == null)
            this.m_discardedErrorMessages = ex.DiscardedErrorMessages;
        else {
            var errors = this.m_discardedErrorMessages;
            if (errors != null) {
                if (ex.DiscardedErrorMessages != null)
                    errors.push.apply(errors, ex.DiscardedErrorMessages);
            }
            else {
                // if we ever end up here then someone misused the code a lot...
                ex.DiscardedErrorMessages.forEach(function (e) {
                    _this.m_discardedErrorMessages.push(e);
                });
            }
        }
    };
    WorkflowState.prototype.Append = function (errorNumber, idNo, message) {
        if (this.m_errorMessages == null)
            this.m_errorMessages = new Array();
        this.m_errorMessages.push(new IWorkflowState_1.ErrorEntry(errorNumber, idNo, message));
    };
    WorkflowState.Ok = function () {
        return new WorkflowState();
    };
    WorkflowState.ListAllMessagesPrivate = function (errList) {
        if (errList == null)
            return "";
        var messages = "";
        errList.forEach(function (entry) {
            messages += entry.Message;
        });
        return messages;
    };
    WorkflowState.CheckErrorList = function (errList) {
        if (errList == null)
            return true;
        else
            return (errList.length == 0);
    };
    return WorkflowState;
}());
exports.WorkflowState = WorkflowState;
//# sourceMappingURL=WorkflowState.js.map