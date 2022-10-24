import dotenv from 'dotenv';
import { database } from "../index";
import { TTransactions, TTransactionTypes } from '../interfaces/wallet';

dotenv.config();
const dbName = process.env.DB_NAME ?? 'localhost';

export async function depositFunds(amount: number, userId: number): Promise<void>{
    await database.query(`
        UPDATE ${dbName}.users
        SET balance = balance + ${amount}
        WHERE id like ?
    `, [userId]);
}

export async function withdrawFunds(amount: number, userId: number): Promise<void>{
    await database.query(`
        UPDATE ${dbName}.users
        SET balance = balance - ${amount}
        WHERE id like ?
    `, [userId]);
}

export async function addTransaction(amount: number, userId: number, transactionType: number): Promise<void> {
    await database.query(`
        INSERT INTO ${dbName}.transactions (user_id, executed_at, transaction_type, amount)
        VALUES (?, CURRENT_TIMESTAMP, ?, ?)
    `, [userId, transactionType, amount]);
}

export async function getTransactionTypes(id: number): Promise<TTransactionTypes[]> {
    const result = await database.query(`
        SELECT *
        FROM ${dbName}.transaction_types
        WHERE id like ?
    `, id);

    return result;
}

export async function getLatestTransactions(userId: number, list: number): Promise<TTransactions[]> {
    const result = await database.query(`
        SELECT * 
        FROM ${dbName}.transactions 
        WHERE user_id LIKE ?
        ORDER BY executed_at 
        LIMIT ${list}
    `, [userId]);
    
    return result;
}