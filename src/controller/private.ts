import { Error } from "../utils/errors";

export async function logout(request: any, response: any): Promise<void> {
    try {

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