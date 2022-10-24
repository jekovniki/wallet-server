import { Error } from "../utils/errors";
import * as User from '../service/user';

export async function logout(request: any, response: any): Promise<void> {
    try {
        const sessionId = request.body.sessionId;
        const result = await User.logout(sessionId);
        
        response.json(result);
    } catch (error) {
        response.json(Error.response(error));
    }
}

export async function getBalance(request: any, response: any): Promise<void> {
    try {

    } catch (error) {
        response.json(Error.response(error));
    }
}

export async function getLatestTransactions(request: any, response: any): Promise<void> {
    try {

    } catch (error) {
        response.json(Error.response(error));
    }
}

export async function depositFunds(request: any, response: any): Promise<void> {
    try {

    } catch (error) {
        response.json(Error.response(error));
    }
}

export async function withdrawFunds(request: any, response: any): Promise<void> {
    try {

    } catch (error) {
        response.json(Error.response(error));
    }
}