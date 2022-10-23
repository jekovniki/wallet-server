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

export async function createUserSession(userId: number): Promise<number> {
    const session = await database.query(`
        INSERT INTO ${dbName}.session (user_id, jwt, expires_at)
        VALUES (?, 'test', (DATE_ADD(now() , INTERVAL 1 HOUR)))
    `, userId);

    return session.insertId;
}