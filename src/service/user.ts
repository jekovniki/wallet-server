import * as UserDal from "../dal/user";
import { TBaseResponse } from "../interfaces/base";
import { TRequestSignIn, TResponseSignIn, TUserBalance } from "../interfaces/user";
import { Error } from "../utils/errors";
import { generateSessionId } from "../utils/helpers";

export async function login(credentials: TRequestSignIn): Promise<TResponseSignIn | TBaseResponse> {
    try {
        const user = await UserDal.validateUserCredentials(credentials);
        if (!user.length) {
            return {
                success: false,
                message: "Invalid credentials"
            }
        }

        const sessionId = generateSessionId();
        const createSession = await UserDal.createUserSession(sessionId, user[0].id, user[0].role);
        // TODO: Make the session be a valid jwt
        if (createSession === false) {
            return {
                success: false,
                message: 'Could not generate session'
            }
        }

        return {
            success: createSession,
            sessionId
        }
    } catch (error) {
        Error.internal(error);

        return {
            success: false,
            message: "Unexpected error"
        }
    }
}

export async function logout(sessionId: string): Promise<TBaseResponse> {
    try {
        const success = await UserDal.removeUserSession(sessionId);

        if (success === false) {
            return {
                success,
                message: "No active session was found"
            }
        }

        return {
            success
        }
    } catch (error) {
        Error.internal(error);

        return {
            success: false,
            message: "Unexpected error"
        }
    }
}

export async function getUserBalance(userId: number): Promise<TUserBalance | TBaseResponse> {
    try {
        const balance = await UserDal.getUserBalance(userId);
        
        if (!balance.length) {
            return {
                success: false,
                message: `No balance was found for user with id: ${userId}`
            }
        }

        return {
            balance: balance[0].balance
        }
    } catch (error) {
        Error.internal(error);

        return {
            success: false,
            message: "Unexpected error"
        }
    }
}