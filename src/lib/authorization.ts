import { Error } from "../utils/errors";
import * as UserDal from "../dal/user";

export async function authorizeUser(userId: number) {
    try {

    } catch (error) {
        Error.internal(error);
        
        return {
            success: false,
            message: "Unexpected error"
        }
    }
}