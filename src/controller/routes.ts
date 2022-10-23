import bodyParser from "body-parser";
import { RestServer } from "../lib/rest";
import * as Public from "./public";
import * as Private from "./private";

export async function setRoutes(rest: RestServer): Promise<void> {
    const server = rest.getServer();

    server.use(bodyParser.json());

    server.get('/health-check',middleware, Public.healthCheck);
    server.post('/auth/login', Public.login);

    server.get('/auth/logout', middleware, Private.logout);
    server.post('/users/balance', middleware, Private.getBalance);
    server.post('/wallet/list', middleware, Private.getLatestTransactions);
    server.post('/wallet/deposit', middleware, Private.depositFunds);
    server.post('/wallet/withdraw', middleware, Private.withdrawFunds);

}

async function middleware(_req: any, _res: any, next: any) {
    console.log('This is private method');

    next();
}