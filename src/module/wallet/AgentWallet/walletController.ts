import { Request, Response } from "express"
import { CustomAsyncFn } from "../../../common/CustomAsyncFn/CustomAsyncFn"
import { sendResponse } from "../../../common/CustomResponse/sendResponse";
import { StatusCodes } from "http-status-codes";
import { WalletService } from "./walletService";


const deposit = CustomAsyncFn(async (req: Request, res: Response) => {
    const { amount } = req.body;
    const username = req.user?.username;
    if (!username) throw new Error("User not authenticated"); // safety check

    const result = await WalletService.deposit({ username }, amount);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Deposit Success",
        data: result
    })

})

const withdraw = CustomAsyncFn(async (req: Request, res: Response) => {
    const { amount } = req.body;
    const username = req.user?.username;
    if (!username) throw new Error("User not authenticated"); // safety check

    const result = await WalletService.withdraw({ username }, amount);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Withdraw Success",
        data: result
    })

})

export const WalletController = {
    deposit,
    withdraw
}