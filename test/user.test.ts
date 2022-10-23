import dotenv from 'dotenv';
import { login } from '../src/service/user';
import { database } from '../src/index';

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