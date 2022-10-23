import dotenv from 'dotenv';
import { database } from '../src/index';
import { depositFunds, withdrawFunds } from '../src/service/wallet';

dotenv.config();
const dbName = process.env.DB_NAME ?? 'localhost';

const testUser = {
    username: 'unit-test-user',
    email: 'unit-test@yopmail.com',
    password: 'Test123!',
    role: 1,
    balance: 1000000
}

const nonExistingUser = {
    id: 222,
    username: 'non-existin-unit-test-user',
    password: 'Test123!'
}

describe('Deposit', () => {
    let userId: any;
    beforeAll(async () => {
        await database.query(`
            INSERT INTO ${dbName}.users (username, email, password, role, balance)
            VALUES (?, ?, ?, ?, ?)
        `, [testUser.username, testUser.email, testUser.password, testUser.role, testUser.balance]);

        userId = await database.query(`
            SELECT id
            FROM ${dbName}.users
            WHERE username like ?
        `, [testUser.username]);
    });
    test('+ Deposit | should return success true', async () => {
        const result = await depositFunds(50000, userId[0].id);

        expect(result.success).toBe(true);
    });
    afterAll(async () => {
        await database.query(`
            DELETE FROM ${dbName}.users WHERE username like ?
        `, [testUser.username]);
    });
});

describe('Withdraw', () => {
    let userId: any;
    beforeAll(async () => {
        await database.query(`
            INSERT INTO ${dbName}.users (username, email, password, role, balance)
            VALUES (?, ?, ?, ?, ?)
        `, [testUser.username, testUser.email, testUser.password, testUser.role, testUser.balance]);

        userId = await database.query(`
            SELECT id
            FROM ${dbName}.users
            WHERE username like ?
        `, [testUser.username]);
    });
    test('+ Withdraw | should return success true', async () => {
        const result = await withdrawFunds(50000, userId[0].id);

        expect(result.success).toBe(true);
    });
    afterAll(async () => {
        await database.query(`
            DELETE FROM ${dbName}.users WHERE username like ?
        `, [testUser.username]);
    });
});