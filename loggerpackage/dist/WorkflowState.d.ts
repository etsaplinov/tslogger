import { IWorkflowState, ErrorEntry } from "./IWorkflowState";
export declare class WorkflowState implements IWorkflowState {
    readonly IsOk: boolean;
    readonly IsOkWithHistory: boolean;
    private m_errorMessages;
    readonly ErrorMessages: ErrorEntry[];
    private m_discardedErrorMessages;
    readonly DiscardedErrorMessages: ErrorEntry[];
    ListAllMessages(): string;
    ListAllDiscardedMessages(): string;
    AppendEx(ex: IWorkflowState): void;
    Append(errorNumber: number, idNo: number, message: string): void;
    static Ok(): WorkflowState;
    static ListAllMessagesPrivate(errList: ErrorEntry[]): string;
    private static CheckErrorList;
}
