import { RestServer } from "./lib/rest";
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const port = process.env.REST_PORT ?? '3131';
const server = express();

export const rest = new RestServer({ port, server });

async function main() {
    try {
        rest.start();
    } catch (error) {
        console.log('Main loop error');
    }
}

main();