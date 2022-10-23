import * as WalletDal from '../dal/wallet';
import { Error } from "../utils/errors";

export async function depositFunds(amount: number, userId: number) {
    try {
        await WalletDal.depositFunds(amount, userId);

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

export async function withdrawFunds(amount: number, userId: number) {
    try {
        await WalletDal.withdrawFunds(amount, userId);

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