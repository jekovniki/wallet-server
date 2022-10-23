import dotenv from 'dotenv';
import { database } from '../src/index';
import { depositFunds, getLatestTransactions, withdrawFunds } from '../src/service/wallet';

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

describe('getLatestTransactions', () => {
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
        
        await depositFunds(1, userId[0].id);
        await depositFunds(10, userId[0].id);
        await depositFunds(101, userId[0].id);
        await depositFunds(10101, userId[0].id);
        await depositFunds(1010101, userId[0].id);
        await withdrawFunds(1, userId[0].id);
        await withdrawFunds(10, userId[0].id);
        await withdrawFunds(101, userId[0].id);
        await withdrawFunds(10101, userId[0].id);
        await withdrawFunds(1010101, userId[0].id);
    });
    test('+ getLatestTransactions [DEFAULT] | return array length should be 10', async () => {
        const result = await getLatestTransactions(userId[0].id);

        expect(result.length).toBe(10);
    });
    test('+ getLatestTransactions | return array length should be 3', async () => {
        const result = await getLatestTransactions(userId[0].id, 3);

        expect(result.length).toBe(3);
    });
    test('- getLatestTransactions | return array length should be 0', async () => {
        const result = await getLatestTransactions(nonExistingUser.id);

        expect(result.length).toBe(0);
    });
    afterAll(async () => {
        await database.query(`
            DELETE FROM ${dbName}.users WHERE username like ?
        `, [testUser.username]);
    });
})