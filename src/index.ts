import { RestServer } from "./lib/rest";
import { Database } from "./lib/database";
import { databaseTables } from "./dal/create";
import dotenv from 'dotenv';
import express from 'express';
import mysql from 'mysql2';
import { setPublicRoutes } from "./routes/public";
import { Error } from "./utils/errors";

dotenv.config();

const port = process.env.REST_PORT ?? '3131';
const server = express();
const databaseConfiguration = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}

export const database = new Database(mysql.createConnection(databaseConfiguration));
export const rest = new RestServer({ port, server });

async function main() {
    try {
        rest.start();
        database.connect();
        databaseTables.init();
        setPublicRoutes(rest);

    } catch (error) {
        Error.internal(error);
    }
}

main();