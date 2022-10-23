import { createUserSession, validateUserCredentials } from "../dal/user";
import { TBaseResponse } from "../interfaces/base";
import { TRequestSignIn } from "../interfaces/user";
import { Error } from "../utils/errors";

export async function login(credentials: TRequestSignIn): Promise<TBaseResponse> {
    try {
        const user = await validateUserCredentials(credentials);
        if (!user.length) {
            return {
                success: false,
                message: "Invalid credentials"
            }
        }
        
        const createSession = await createUserSession(user[0].id);
        // TODO: Make the session be a valid jwt
        
        return {
            success: true
        }
    } catch (error) {
        Error.internal(error);

        return {
            success: false,
            message: "Unexpected error"
        }
    }
}