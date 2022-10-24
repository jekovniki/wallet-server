import * as WalletDal from '../dal/wallet';
import { TBaseResponse } from '../interfaces/base';
import { TTransactions } from '../interfaces/wallet';
import { Transactions, TransactionType } from '../utils/enums';
import { Error } from "../utils/errors";

export async function depositFunds(amount: number, userId: number): Promise<TBaseResponse> {
    try {
        const transactionType = await WalletDal.getTransactionTypes(TransactionType.DEPOSIT);
        if(!transactionType.length) {
            return {
                success: false,
                message: 'Invalid transaction type'
            }
        }
        await WalletDal.depositFunds(amount, userId);
        await WalletDal.addTransaction(amount, userId, transactionType[0].id);

        return {
            success: true
        }

    } catch (error) {
        Error.internal(error);

        return {
            success: false,
            message: "Unexpected error"
        }
    }
}

export async function withdrawFunds(amount: number, userId: number): Promise<TBaseResponse> {
    try {
        const transactionType = await WalletDal.getTransactionTypes(TransactionType.WITHDRAW);
        if(!transactionType.length) {
            return {
                success: false,
                message: 'Invalid transaction type'
            }
        }

        await WalletDal.withdrawFunds(amount, userId);
        await WalletDal.addTransaction(amount, userId, transactionType[0].id);

        return {
            success: true
        }
    } catch (error) {
        Error.internal(error);

        return {
            success: false,
            message: "Unexpected error"
        }
    }
}

export async function getLatestTransactions(userId: number, list: number | null): Promise<TTransactions[] | TBaseResponse> {
    try {
        const numberOfTransactions = list ?? Transactions.DEFAULT;
        const transactions = WalletDal.getLatestTransactions(userId, numberOfTransactions);

        return transactions;

    } catch (error) {
        Error.internal(error);

        return {
            success: false,
            message: "Unexpected error"
        }
    }
}