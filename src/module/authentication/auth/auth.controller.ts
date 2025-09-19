import { Request, Response } from "express";
import { CustomAsyncFn } from "../../../common/CustomAsyncFn/CustomAsyncFn";
import { sendResponse } from "../../../common/CustomResponse/sendResponse";
import { StatusCodes } from "http-status-codes";
import { AuthService } from "./auth.service";
import { IAuth, ILoginUserResponse, IRefreshTokenResponse } from "./auth.interface";
import config from "../../../config";
import ApiError from "../../../common/CustomError/CustomApiError/ApiError";
import jwt from 'jsonwebtoken'
// ---------- Register ----------
const register = CustomAsyncFn(async (req: Request, res: Response) => {
    const result = await AuthService.register(req.body);
    sendResponse<IAuth>(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: "User registered successfully",
        data: result,
    });
});

// ---------- Login ----------
const login = CustomAsyncFn(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const result = await AuthService.login(username, password);

    const cookieOptions = {
        secure: config.node_env === "production",
        httpOnly: true,
        sameSite: "strict" as const
    };

    res.cookie("refreshToken", result.refreshToken, cookieOptions);

    sendResponse<ILoginUserResponse>(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "User logged in successfully !",
        data: result,
    });
});

// ---------- Refresh Token ----------
const refreshToken = CustomAsyncFn(async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    const result = await AuthService.refreshToken(refreshToken);

    const cookieOptions = {
        secure: config.node_env === "production",
        httpOnly: true,
        sameSite: "strict" as const,
    };

    res.cookie("refreshToken", result.refreshToken, cookieOptions);

    sendResponse<IRefreshTokenResponse>(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Access token refreshed successfully!",
        data: result,
    });
});

// ---------- Password Change ----------
const passwordChanged = CustomAsyncFn(async (req: Request, res: Response) => {
    const user = req.user;
    console.log(req);
    console.log("Username:", user);
    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User does not found");
    }
    const result = await AuthService.passwordChanged(user, req.body);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Password changed successfully !",
        data: result,
    });
});

// ---------- Forget Password ----------
const forgetPassword = CustomAsyncFn(async (req: Request, res: Response) => {
    const result = await AuthService.forgetPassword(req.body);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Reset password link sent to your email.",
        data: result,
    });
});

// ---------- Reset Password ----------
const resetPassword = CustomAsyncFn(async (req: Request, res: Response) => {

    const token = req.query.token as string;
    const payload = {

        newPassword: req.body.newPassword
    };
    const result = await AuthService.resetPassword(payload, token);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Password reset successful!",
        data: result,
    });
});

// ---------- Export ----------
export const AuthController = {
    register,
    login,
    refreshToken,
    passwordChanged,
    forgetPassword,
    resetPassword,
};
