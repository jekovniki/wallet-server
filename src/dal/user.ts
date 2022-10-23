import dotenv from 'dotenv';
import { TRequestSignIn, TUserData } from "../interfaces/user";
import { database } from "../index";

dotenv.config();
const dbName = process.env.DB_NAME ?? 'localhost';

export async function validateUserCredentials(credentials: TRequestSignIn): Promise<Array<TUserData>> {
    const user = await database.query(`
        SELECT * 
        FROM ${dbName}.users
        WHERE username = ? AND password = ?
    `,[credentials.username, credentials.password]);
    
    return user;
}

export async function createUserSession(sessionId:string, userId: number): Promise<boolean> {
    const session = await database.query(`
        INSERT INTO ${dbName}.session (session_id, user_id, jwt, expires_at)
        VALUES (?, ?, 'test', (DATE_ADD(now() , INTERVAL 1 HOUR)))
    `, [sessionId, userId]);
    
    return session.affectedRows > 0 ? true : false;
}

export async function updateUserSession(sessionId: string): Promise<void> {
    await database.query(`
        START TRANSACTION;
        SELECT expires_at FROM ${dbName}.session WHERE session_id like ?
        UPDATE ${dbName}.session
        SET expires_at = (DATE_ADD(now() , INTERVAL 1 HOUR))
        WHERE session_id like ?
        COMMIT;
    `, sessionId);
}

export async function removeUserSession(sessionId: string): Promise<boolean> {
    const session = await database.query(`
        DELETE FROM ${dbName}.session
        WHERE session_id like ?
    `, [sessionId]);

    return session.affectedRows > 0 ? true : false;
}

export async function getUserBalance(userId: number): Promise<[{balance: number}]> {
    return await database.query(`
        SELECT balance
        FROM ${dbName}.users
        WHERE id like ?
    `, [userId]);
}