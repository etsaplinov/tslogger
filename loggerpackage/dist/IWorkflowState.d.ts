export interface IWorkflowState {
    IsOk: boolean;
    IsOkWithHistory: boolean;
    ErrorMessages: ErrorEntry[];
    DiscardedErrorMessages: ErrorEntry[];
    ListAllMessages: () => string;
    ListAllDiscardedMessages: () => string;
    AppendEx: (ex: IWorkflowState) => void;
    Append: (errorNumber: number, idNo: number, message: string) => void;
}
export declare class ErrorEntry {
    constructor(errorNumber: number, idNo: number, message: string);
    ErrorNumber: number;
    UniqueId: number;
    Message: string;
}
