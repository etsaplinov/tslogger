import { IWorkflowState, ErrorEntry } from "./IWorkflowState";

export class WorkflowState implements IWorkflowState {
    get IsOk(): boolean {
        return WorkflowState.CheckErrorList(this.m_errorMessages);
    }
    get IsOkWithHistory(): boolean {
        return WorkflowState.CheckErrorList(this.m_errorMessages) && WorkflowState.CheckErrorList(this.m_discardedErrorMessages);
    }


    private m_errorMessages: ErrorEntry[] = [];
    get ErrorMessages(): ErrorEntry[] {
        return this.m_errorMessages;
    }

    private m_discardedErrorMessages: ErrorEntry[] = [];
    get DiscardedErrorMessages(): ErrorEntry[] {
        return this.m_discardedErrorMessages;
    }

    ListAllMessages(): string {
        return WorkflowState.ListAllMessagesPrivate(this.m_errorMessages);
    }

    ListAllDiscardedMessages(): string {
        return WorkflowState.ListAllMessagesPrivate(this.m_discardedErrorMessages);
    }


    AppendEx(ex: IWorkflowState) {
        if (ex == null)
            return;

        if ((ex.ErrorMessages == null) && (ex.DiscardedErrorMessages == null))
            return;

        if (this.m_errorMessages == null)
            this.m_errorMessages = ex.ErrorMessages;
        else {
            let errors = this.m_errorMessages as Array<ErrorEntry>;
            if (errors != null)
                errors.push(...ex.ErrorMessages);
            else {
                // if we ever end up here then someone misused the code a lot...
                ex.ErrorMessages.forEach((e) => {
                    this.m_errorMessages.push(e);
                })
            }
        }

        if (this.m_discardedErrorMessages == null)
            this.m_discardedErrorMessages = ex.DiscardedErrorMessages;
        else {
            let errors = this.m_discardedErrorMessages as Array<ErrorEntry>;
            if (errors != null) {
                if (ex.DiscardedErrorMessages != null)
                    errors.push(...ex.DiscardedErrorMessages);
            }
            else {
                // if we ever end up here then someone misused the code a lot...
                ex.DiscardedErrorMessages.forEach((e) => {
                    this.m_discardedErrorMessages.push(e);
                })
            }
        }
    }

    Append(errorNumber: number, idNo: number, message: string) {
        if (this.m_errorMessages == null)
            this.m_errorMessages = new Array<ErrorEntry>();

        this.m_errorMessages.push(new ErrorEntry(errorNumber, idNo, message));
    }

    static Ok() {
        return new WorkflowState();
    }


    static ListAllMessagesPrivate(errList: ErrorEntry[]): string {
        if (errList == null)
            return "";
        let messages = "";
        errList.forEach((entry) => {
            messages += entry.Message;
        })
        return messages;
    }

    private static CheckErrorList(errList: Array<ErrorEntry>): boolean {
        if (errList == null)
            return true;
        else
            return (errList.length == 0);
    }
}