import { TBaseResponse } from "../interfaces/base";
import { Error } from "../utils/errors";
import * as UserDal from "../dal/user";

export async function authenticateUserSession(header: any): Promise<{success: boolean, userId: number, userRole: number, sessionId: string} | any> {
    try {
        const token: string = header.authorization;
        
        if (!token) {
            return {
                success: false,
                message: "Calling private method, user session is required!"
            }
        }
        const sessionId = token.replace("Bearer ", "");
        const user = await UserDal.getActiveUserSession(sessionId);
        
        if (!user.length) {
            return {
                success: false,
                message: "No active user session"
            }
        }

        await UserDal.updateUserSession(user[0].user_id);

        return { 
            success: true,
            userId: user[0].user_id,
            userRole: user[0].user_role,
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