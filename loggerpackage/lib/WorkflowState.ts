import { IWorkflowState } from "./IWorkflowState";

export class WorkflowState implements IWorkflowState {
    IsOk: boolean;
    IsOkWithHistory: boolean;
    ErrorMessages: import("./IWorkflowState").ErrorEntry[];
    DiscardedErrorMessages: import("./IWorkflowState").ErrorEntry[];
    ListAllMessages: () => string;
    ListAllDiscardedMessages: () => string;
    AppendEx: (ex: IWorkflowState) => void;
    Append: (errorNumber: number, idNo: number, message: string) => void;

    static Ok() {
        return new WorkflowState();
    }
}