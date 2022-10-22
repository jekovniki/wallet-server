import { database } from "../index";
import dotenv from 'dotenv';

dotenv.config();

class DatabaseTables {
    private dbName = process.env.DB_NAME ?? 'localhost';

    public async init() {
        try {
            await this.createUsersTable();
            await this.createSessionTable();
            await this.createTransactionsTable();
            await this.createRolesTable();
            await this.createTransactionTypeTable();

            console.log('Database tables are set and ready for use!');
        } catch (error) {
            console.log('Issue initializing database');
        }
    }

    private async createUsersTable(): Promise<void> {
        await database.query(`
            CREATE TABLE if not exists ${this.dbName}.users(
                id INT NOT NULL AUTO_INCREMENT,
                username VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                password VARCHAR(100) NOT NULL,
                role INT DEFAULT 1,
                balance DOUBLE NOT NULL,
                primary key(id)
            )
        `);
    }

    private async createSessionTable(): Promise<void> {
        await database.query(`
            CREATE TABLE if not exists ${this.dbName}.session(
                session_id INT NOT NULL AUTO_INCREMENT,
                user_id INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                expires_at TIMESTAMP NULL,
                primary key(session_id)
            )
        `);
    }

    private async createTransactionsTable(): Promise<void> {
        await database.query(`
            CREATE TABLE if not exists ${this.dbName}.transactions(
                transaction_id INT NOT NULL AUTO_INCREMENT,
                user_id INT NOT NULL,
                executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                transaction_type INT NOT NULL,
                amount DOUBLE NOT NULL,
                primary key(transaction_id)
            )
        `);
    }

    private async createRolesTable(): Promise<void> {
        await database.query(`
            CREATE TABLE if not exists ${this.dbName}.roles(
                id INT NOT NULL,
                name VARCHAR(100) NOT NULL,
                permissions VARCHAR(255) NOT NULL,
                primary key(id)
            )
        `);

        await database.query(`
            INSERT IGNORE INTO ${this.dbName}.roles (id, name, permissions)
            VALUES (?, ?, ?)`, [1, 'BASIC', 'balance_read']);
        await database.query(`
            INSERT IGNORE INTO ${this.dbName}.roles (id, name, permissions)
            VALUES (?, ?, ?)`, [2, 'INTERMEDIATE', 'balance_read, deposit']);
        await database.query(`
            INSERT IGNORE INTO ${this.dbName}.roles (id, name, permissions)
            VALUES (?, ?, ?)`, [3, 'ADVANCED', 'balance_read, deposit, transaction_list']);
        await database.query(`
            INSERT IGNORE INTO ${this.dbName}.roles (id, name, permissions)
            VALUES (?, ?, ?)`, [4, 'FULL', 'balance_read, deposit, transaction_list, withdraw']);
    }

    private async createTransactionTypeTable(): Promise<void> {
        await database.query(`
            CREATE TABLE if not exists ${this.dbName}.transaction_types(
                id INT NOT NULL,
                name VARCHAR(100) NOT NULL,
                primary key(id)
        )`);

        await database.query(`
            INSERT IGNORE INTO ${this.dbName}.transaction_types (id, name)
            VALUES (?, ?)`, [0, 'withdraw']);

        await database.query(`
            INSERT IGNORE INTO ${this.dbName}.transaction_types (id, name)
            VALUES (?, ?)`, [1, 'deposit']);
    }
}

export const databaseTables = new DatabaseTables;