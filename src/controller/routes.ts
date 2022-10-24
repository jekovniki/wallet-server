import bodyParser from "body-parser";
import { RestServer } from "../lib/rest";
import * as Public from "./public";
import * as Private from "./private";
import { authorizeUser, authorizeUserSession } from "../lib/authorization";

export async function setRoutes(rest: RestServer): Promise<void> {
    const server = rest.getServer();

    server.use(bodyParser.json());

    server.get('/health-check', Public.healthCheck);
    server.post('/auth/login', Public.login);

    server.get('/auth/logout', middleware, Private.logout);
    server.post('/users/balance', middleware, Private.getBalance);
    server.post('/wallet/list', middleware, Private.getLatestTransactions);
    server.post('/wallet/deposit', middleware, Private.depositFunds);
    server.post('/wallet/withdraw', middleware, Private.withdrawFunds);

}

async function middleware(request: any, response: any, next: any): Promise<void> {
    const session = await authorizeUserSession(request.headers);
    if (session.success === false) {
        response.send(session);
    }

    request.body = {
        ...request.body,
        userId: session.userId,
        sessionId: session.sessionId
    }
    
    // const authorizedUser = await authorizeUser(session.userId);
    
    next();
}