import { StatusCodes } from "http-status-codes";
import ApiError from "../../../common/CustomError/CustomApiError/ApiError";
import { Amount } from "./walletModel";
import { IWalletResponse } from "./walletInterface";

interface IUserInfo {
    username: string;
}

const MIN_DEPOSIT = 500;
const MIN_WITHDRAW = 500;

const deposit = async (userInfo: IUserInfo, amount: number): Promise<IWalletResponse> => {
    const { username } = userInfo;
    if (!username) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Invalid request: user not found");
    }

    if (amount < MIN_DEPOSIT) {
        throw new ApiError(StatusCodes.BAD_REQUEST, `Deposit at least ${MIN_DEPOSIT}$`);
    }

    const wallet = await Amount.findOneAndUpdate(
        { username },
        { $inc: { balance: amount } },
        { new: true, upsert: true }
    );

    return { balance: wallet?.balance || 0 };
};

const withdraw = async (userInfo: IUserInfo, amount: number): Promise<IWalletResponse> => {
    const { username } = userInfo;
    if (!username) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Invalid request: user not found");
    }

    if (amount < MIN_WITHDRAW) {
        throw new ApiError(StatusCodes.BAD_REQUEST, `Minimum withdraw amount is ${MIN_WITHDRAW}$`);
    }

    const wallet = await Amount.findOne({ username });
    if (!wallet) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Wallet not found");
    }

    if (wallet.balance < amount) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Not enough balance");
    }

    wallet.balance -= amount;
    await wallet.save();

    return { balance: wallet.balance };
};


export const WalletService = {
    deposit, withdraw
}