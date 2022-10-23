import { Error } from "../utils/errors";

export function healthCheck(_request: Record<string, any>, response: Record<string, any>): void {
    try {
        response.send({
            status: 'online'
        });
    } catch(error) {
        response.json(Error.response(error));
    }
}

export async function login(request: any, response: any): Promise<void> {
    try {

    } catch (error) {
        response.json(Error.response(error));
    }
}