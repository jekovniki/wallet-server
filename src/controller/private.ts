import { Error } from "../utils/errors";
import * as User from '../service/user';
import * as Wallet from '../service/wallet';
import { ITransactionOperation, ITransactionRequest } from "../interfaces/wallet";

export async function logout(request: any, response: any): Promise<void> {
    try {
        const sessionId: string = request.body.sessionId;
        const result = await User.logout(sessionId);
        
        response.json(result);
    } catch (error) {
        response.json(Error.response(error));
    }
}

export async function getBalance(request: any, response: any): Promise<void> {
    try {
        const userId: number = request.body.userId;
        const result = await User.getUserBalance(userId);

        response.json(result);
    } catch (error) {
        response.json(Error.response(error));
    }
}

export async function getLatestTransactions(request: any, response: any): Promise<void> {
    try {
        const data: ITransactionRequest = request.body;
        const list: number | null = data.list ?? null;
        const result = await Wallet.getLatestTransactions(data.userId, list);

        response.json(result);
    } catch (error) {
        response.json(Error.response(error));
    }
}

export async function depositFunds(request: any, response: any): Promise<void> {
    try {
        const data: ITransactionOperation = request.body;
        const result = await Wallet.depositFunds(data.amount, data.userId);

        response.json(result);
    } catch (error) {
        response.json(Error.response(error));
    }
}

export async function withdrawFunds(request: any, response: any): Promise<void> {
    try {
        const data: ITransactionOperation = request.body;
        const result = await Wallet.withdrawFunds(data.amount, data.userId);

        response.json(result);
    } catch (error) {
        response.json(Error.response(error));
    }
}