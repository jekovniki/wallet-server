import bodyParser from "body-parser";
import { RestServer } from "../lib/rest";
import * as Public from "./public";
import * as Private from "./private";
import { authenticateUserSession } from "../lib/authentication";
import { authorizeUser } from "../lib/authorization";
import { Roles } from "../utils/enums";

export async function setRoutes(rest: RestServer): Promise<void> {
    const server = rest.getServer();

    server.use(bodyParser.json());

    server.get('/health-check', Public.healthCheck);
    server.post('/auth/login', Public.login);

    server.get('/auth/logout',setAuthenticationLevel(Roles.BASIC), middleware, Private.logout);
    server.get('/users/balance',setAuthenticationLevel(Roles.BASIC), middleware, Private.getBalance);
    server.post('/wallet/list',setAuthenticationLevel(Roles.ADVANCED), middleware, Private.getLatestTransactions);
    server.post('/wallet/deposit', setAuthenticationLevel(Roles.INTERMEDIATE), middleware, Private.depositFunds);
    server.post('/wallet/withdraw', setAuthenticationLevel(Roles.FULL), middleware, Private.withdrawFunds);

}

const setAuthenticationLevel = (level: number = Roles.BASIC) => {
    return (request: any, response: any, next: any) => {
        request.methodLevel = level;

        next();
    }
}

async function middleware(request: any, response: any, next: any): Promise<void> {
    const session = await authenticateUserSession(request.headers);
    if (session.success === false) {
        response.send(session);
    }
        
    if (request.methodLevel > Roles.BASIC) {
        const authorize = authorizeUser(session.userRole, request.methodLevel);
        if (authorize.success === false) {
            response.send(authorize);
        }
    }
    
    request.body = {
        ...request.body,
        userId: session.userId,
        sessionId: session.sessionId
    }
        
    next();
}