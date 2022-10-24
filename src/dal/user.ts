import dotenv from 'dotenv';
import { TRequestSignIn, TUserData } from "../interfaces/user";
import { database } from "../index";
import { TRoles } from '../interfaces/base';

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

export async function createUserSession(sessionId:string, userId: number, userRole: number): Promise<boolean> {
    const session = await database.query(`
        INSERT INTO ${dbName}.session (session_id, user_id, user_role, jwt, expires_at)
        VALUES (?, ?, ?, 'test', (DATE_ADD(now() , INTERVAL 1 HOUR)))
    `, [sessionId, userId, userRole]);
    
    return session.affectedRows > 0 ? true : false;
}

export async function updateUserSession(userId: number): Promise<void> {
    await database.query(`
        UPDATE ${dbName}.session
        SET expires_at = (DATE_ADD(now() , INTERVAL 1 HOUR))
        WHERE user_id like ?
    `, userId);
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

export async function getActiveUserSession(sessionId: string): Promise<[{user_id: number, user_role: number}]> {
    const result = await database.query(`
        SELECT user_id, user_role
        FROM ${dbName}.session
        WHERE CURRENT_TIMESTAMP < expires_at
        AND session_id like ?
    `, sessionId);

    return result;
}

export async function getAllRoles(): Promise<TRoles[]> {
    return await database.query(`
        SELECT *
        FROM ${dbName}.roles
    `);
}