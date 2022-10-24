import { IBaseRequestBody } from "./base"

export type TTransactionTypes = {
    id: number,
    name: string
}

export interface ITransactionRequest extends IBaseRequestBody {
    list?: number
}

export interface ITransactionOperation extends IBaseRequestBody {
    amount: number
}

export type TTransactions = {
    transaction_id: number,
    user_id: number,
    executed_at: string,
    transaction_type: number,
    amount: number
}