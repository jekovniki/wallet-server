import { Error } from "../utils/errors";
import * as User from '../service/user';
import { TRequestSignIn } from "../interfaces/user";

export function healthCheck(_request: any, response: any): void {
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
        const credentials: TRequestSignIn = request.body;
        const result = await User.login(credentials);
        
        response.json(result);
    } catch (error) {
        response.json(Error.response(error));
    }
}