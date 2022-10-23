import { Errors, TErrorMessageResponse } from "../interfaces/errors";

class ErrorLog implements Errors{
    public internal(error: any): void {
        console.error(`Error: ${error.code}; Message: ${error.message}`);
    }

    public response(error: any): TErrorMessageResponse {
        console.log(`Code: ${error?.response?.status}; Message: ${error.message}: ${error?.response?.statusText}`);

        return {
            status: error?.response?.status,
            Message: `${error?.message}:${error?.response?.statusText}`
        }
    }
}

export const Error = new ErrorLog;