export interface Errors {
    internal(error: any): void,
    response(error: any): TErrorMessageResponse
}

export type TErrorMessageResponse = {
    status: number;
    Message: string;
}