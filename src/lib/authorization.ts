import { TBaseResponse } from "../interfaces/base";
import { Error } from "../utils/errors";

export function authorizeUser(userRole: number, methodLevel: number): TBaseResponse {
    try {
        if (userRole < methodLevel) {
            return {
                success: false,
                message: "You don't have the authorization level to execute this method"
            }
        }

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