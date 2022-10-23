import dotenv from 'dotenv';
import { getUserBalance, login, logout } from '../src/service/user';
import { database } from '../src/index';
import { createUserSession } from '../src/dal/user';

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

describe('Login', () => {
    beforeAll(async () => {
        await database.query(`
            INSERT INTO ${dbName}.users (username, email, password, role, balance)
            VALUES (?, ?, ?, ?, ?)
        `, [testUser.username, testUser.email, testUser.password, testUser.role, testUser.balance]);
    });
    test('+ login | should return success true', async () => {
        const result = await login({ username: testUser.username, password: testUser.password });

        expect(result.success).toBe(true);
    });
    test('- login | should return success false', async () => {
        const result = await login({ username: nonExistingUser.username, password: nonExistingUser.password });

        expect(result.success).toBe(false);
    });
    afterAll(async () => {
        await database.query(`
            DELETE FROM ${dbName}.users WHERE username like ?
        `, [testUser.username]);
    });
});

describe('Logout', () => {
    let sessionId: number;
    beforeAll(async () => {
        sessionId = await createUserSession(99);
    });
    test('+ logout | should return success true', async () => {
        const result = await logout(sessionId);

        expect(result.success).toBe(true);
    });
    test('- logout | should return success false', async () => {
        const result = await logout(sessionId);

        expect(result.success).toBe(false);
    });
});

describe('getUserBalance', () => {
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
    test('+ getUserBalance | should return success true', async () => {
        const result = await getUserBalance(userId[0].id);

        expect(result).toHaveProperty('balance');
    });
    test('- getUserBalance | should return success false', async () => {
        const result = await getUserBalance(nonExistingUser.id);

        expect(result).toHaveProperty('success');
    });
    afterAll(async () => {
        await database.query(`
            DELETE FROM ${dbName}.users WHERE username like ?
        `, [testUser.username]);
    });
});