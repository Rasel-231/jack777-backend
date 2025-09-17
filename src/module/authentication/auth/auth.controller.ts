import { Request, Response } from "express"
import { CustomAsyncFn } from "../../../common/CustomAsyncFn/CustomAsyncFn"
import { sendResponse } from "../../../common/CustomResponse/sendResponse";
import { StatusCodes } from "http-status-codes";
import { AuthService } from "./auth.service";
import { IAuth, ILoginUserResponse } from "./auth.interface";
import config from "../../../config";


const login = CustomAsyncFn(async (req: Request, res: Response) => {
    const { username, password, role } = req.body;
    const result = await AuthService.login(username, password, role)
    const { refreshToken } = result;
    const cookieOptions = {
        secure: config.node_env === 'production',
        httpOnly: true,
    }

    res.cookie('refreshToken', refreshToken, cookieOptions)
    sendResponse<ILoginUserResponse>(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "User logged in successfully !",
        data: result
    })
})
const refreshToken = CustomAsyncFn(async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    const result = await AuthService.refreshToken(refreshToken)

    //set Refersh-token
    const cookieOptions = {
        secure: config.node_env === 'production',
        httpOnly: true,
    }

    res.cookie('refreshToken', refreshToken, cookieOptions)
    sendResponse<ILoginUserResponse>(res, {
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
    refreshToken,
    // changePassword,
    // forgetPassword,
    // resetPassword,
    // refresh- TokenExpiredError,
}