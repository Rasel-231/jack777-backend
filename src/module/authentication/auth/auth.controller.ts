import { Request, Response } from "express"
import { CustomAsyncFn } from "../../../common/CustomAsyncFn/CustomAsyncFn"
import { sendResponse } from "../../../common/CustomResponse/sendResponse";
import { StatusCodes } from "http-status-codes";
import { AuthService } from "./auth.service";
import { IAuth } from "./auth.interface";

const login = CustomAsyncFn(async (req: Request, res: Response) => {
    const { username } = req.body;
    console.log("Login attempt for username:", username);

    const result = await AuthService.login(username)
    console.log("Mongo returned user:", result);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "'User logged in successfully !",
        data: result
    })
})


const register = CustomAsyncFn(async (req: Request, res: Response) => {
    const result = await AuthService.register(req.body)
    sendResponse<IAuth>(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "User register successfully",
        data: result
    })
})


export const AuthController = {
    login,
    register,
    // changePassword,
    // forgetPassword,
    // resetPassword,
    // refresh- TokenExpiredError,
}