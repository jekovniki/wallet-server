import dotenv from 'dotenv';
import { database } from "../index";

dotenv.config();
const dbName = process.env.DB_NAME ?? 'localhost';

export async function depositFunds(amount: number, userId: number): Promise<void>{
    await database.query(`
        UPDATE ${dbName}.users
        SET balance = balance + ${amount}
        WHERE id like ?
    `, [amount, userId]);
}