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

export class ErrorEntry {

    constructor(errorNumber: number, idNo: number, message: string) {
        this.ErrorNumber = errorNumber;
        this.UniqueId = idNo;
        this.Message = message;

    }
    public ErrorNumber: number;
    public UniqueId: number;
    public Message: string;


}