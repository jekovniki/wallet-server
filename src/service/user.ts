import * as UserDal from "../dal/user";
import { TBaseResponse } from "../interfaces/base";
import { TRequestSignIn, TUserBalance } from "../interfaces/user";
import { Error } from "../utils/errors";

export async function login(credentials: TRequestSignIn): Promise<TBaseResponse> {
    try {
        const user = await UserDal.validateUserCredentials(credentials);
        if (!user.length) {
            return {
                success: false,
                message: "Invalid credentials"
            }
        }
        
        const createSession = await UserDal.createUserSession(user[0].id);
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

export async function logout(sessionId: number): Promise<TBaseResponse> {
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