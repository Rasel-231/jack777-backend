import { StatusCodes } from "http-status-codes";
import ApiError from "../../../common/CustomError/CustomApiError/ApiError";
import config from "../../../config";
import { IAuth, IChangePassword, IRefreshTokenResponse } from "./auth.interface";
import { Auth } from "./auth.model";
import { jwtToken } from "../jsonwebtoken/CustomJwt";
import { JwtPayload, Secret } from "jsonwebtoken";
import bcrypt from 'bcrypt'
import { sendEmail } from "./sendResetEmail";
import { number } from "zod";

// 1️⃣ Register
const register = async (data: IAuth): Promise<IAuth | null> => {
    const existingUser = await Auth.findOne({
        $or: [
            { username: data.username },
            { email: data.email },
            { phone: data.phone },
        ],
    });

    if (existingUser) {
        if (existingUser.username === data.username) throw new ApiError(StatusCodes.CONFLICT, "Username already exists");
        if (existingUser.email === data.email) throw new ApiError(StatusCodes.CONFLICT, "Email already exists");
        if (existingUser.phone === data.phone) throw new ApiError(StatusCodes.CONFLICT, "Phone Number already exists");
    }

    const result = await Auth.create(data);
    return result;
};

// 2️⃣ Login
const login = async (username: string, password: string) => {

    const isUserExist = await Auth.isUserExist(username);
    if (!isUserExist) throw new ApiError(StatusCodes.NOT_FOUND, "User does not exist");

    if (isUserExist.password && !(await Auth.isPasswordMatched(password, isUserExist?.password))) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Password is incorrect");
    }

    const accessToken = jwtToken.createToken(
        { _id: isUserExist._id, username: isUserExist.username, role: isUserExist.role },
        config.jwt_access_secret as Secret,
        Number(config.jwt_access_duration)
    );

    const refreshToken = jwtToken.createToken(
        { _id: isUserExist._id, username: isUserExist.username, role: isUserExist.role },
        config.jwt_refresh_secret as Secret,
        Number(config.jwt_refresh_duration)
    );

    return { accessToken, refreshToken };
};



// 3️⃣ Refresh Token
const refreshToken = async (refreshtoken: string): Promise<IRefreshTokenResponse> => {
    let verifiedToken: JwtPayload | null = null;

    try {
        verifiedToken = jwtToken.verifyToken(refreshtoken, config.jwt_refresh_secret as Secret) as JwtPayload;
    } catch (err) {
        throw new ApiError(StatusCodes.FORBIDDEN, "Invalid Refresh Token");
    }

    const { username } = verifiedToken;
    const isUserExist = await Auth.isUserExist(username);
    if (!isUserExist) throw new ApiError(StatusCodes.NOT_FOUND, "User does not exist");

    const newAccessToken = jwtToken.createToken(
        { _id: isUserExist._id, username: isUserExist.username, role: isUserExist.role },
        config.jwt_access_secret as Secret,
        Number(config.jwt_access_duration)
    );
    const newRefreshToken = jwtToken.createToken(
        { _id: isUserExist._id, username: isUserExist.username, role: isUserExist.role },
        config.jwt_refresh_secret as Secret,
        Number(config.jwt_refresh_duration)
    );

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

// 4️⃣ Change Password
const passwordChanged = async (user: any, payload: IChangePassword) => {
    const { oldPassword, newPassword } = payload;

    const isExist = await Auth.findOne({ username: user?.username }).select('+password');
    if (!isExist) throw new ApiError(StatusCodes.NOT_FOUND, "User does not exist");

    if (isExist.password && !(await Auth.isPasswordMatched(oldPassword, isExist.password))) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'Old Password is incorrect');
    }

    isExist.password = newPassword;
    isExist.passwordChangedAt = new Date();
    await isExist.save()
};

// 5️⃣ Forget Password
const forgetPassword = async (payload: { username: string }) => {
    const user = await Auth.findOne({ username: payload.username }, { _id: 1, role: 1, email: 1, username: 1, fullname: 1 })
    console.log("user", user);
    if (!user) throw new ApiError(StatusCodes.NOT_FOUND, "User does not exist");

    const resetToken = jwtToken.createResetToken({ _id: user._id }, config.jwt_reset_secret as Secret, Number(config.jwt_reset_duration))
    const resetLink: string = config.resetlink + `token=${resetToken}`

    try {
        const result = await sendEmail(user?.email,
            `<div>
                <p>Hi,${user?.fullname}</p>
                <p>Your Password Link: <a href = ${resetLink}>Reset Password</a></p>
                <p>Thank You</p>
            </div>`
        )
        return result
    } catch (err) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to send reset email");
    }
};

// 6️⃣ Reset Password
const resetPassword = async (payload: { newPassword: string }, token: string) => {

    let user = null;
    try {
        user = jwtToken.verifyToken(token, config.jwt_reset_secret as Secret) as any;

    } catch (err) {
        throw new ApiError(StatusCodes.FORBIDDEN, "Invalid Reset Token");
    }

    if (!user) throw new ApiError(StatusCodes.NOT_FOUND, "Credintial not found")
    const userId = user?._id
    const isExistingUser = await Auth.findById(userId);
    if (!isExistingUser) throw new ApiError(StatusCodes.NOT_FOUND, 'User does not exist');


    const password = await bcrypt.hash(payload.newPassword, Number(config.bcrypt_salt_rounds));
    await Auth.updateOne({ _id: userId }, { password, passwordChangedAt: new Date() });

    return { message: "Password reset successful" };
};

// ---------- Export ----------
export const AuthService = {
    register,
    login,
    refreshToken,
    passwordChanged,
    forgetPassword,
    resetPassword,
};
