import { StatusCodes } from "http-status-codes";
import ApiError from "../../../common/CustomError/CustomApiError/ApiError";
import config from "../../../config";
import { IAuth, IRefreshTokenResponse } from "./auth.interface";
import { Auth } from "./auth.model";
import { jwtToken } from "../jsonwebtoken/CustomJwt";
import { JwtPayload, Secret } from "jsonwebtoken";

// LOGIN FUNCTION
const login = async (username: string, password: string) => {
    // চেক করা হচ্ছে ইউজার আছে কিনা
    const isUserExist = await Auth.isUserExist(username);
    if (!isUserExist) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User does not exist");
    }

    // যদি ইউজার থাকে, তবে পাসওয়ার্ড মিলছে কিনা চেক করা
    if (
        isUserExist?.password &&
        !(await Auth.isPasswordMatched(password, isUserExist?.password))
    ) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Password is incorrect");
    }

    // ✅ লগিন হলে অ্যাকসেস টোকেন এবং রিফ্রেশ টোকেন তৈরি করা
    const accessToken = jwtToken.createToken(
        { username: isUserExist.username, role: isUserExist.role },
        config.jwt_access_Token as Secret,
        Number(config.jwt_access_token_duration)
    );

    const refreshToken = jwtToken.createToken(
        { username: isUserExist.username, role: isUserExist.role },
        config.jwt_refresh_Token as Secret,
        Number(config.jwt_refresh_token_duration)
    );

    // টোকেন রিটার্ন করা
    return { accessToken, refreshToken };
};


// REFRESH TOKEN FUNCTION

const refreshToken = async (refreshtoken: string): Promise<IRefreshTokenResponse> => {
    let verifiedToken: JwtPayload | null = null;

    try {
        // রিফ্রেশ টোকেন ভেরিফাই করা
        verifiedToken = jwtToken.verifyToken(
            refreshtoken,
            config.jwt_refresh_Token as Secret
        ) as JwtPayload;
    } catch (err) {
        throw new ApiError(StatusCodes.FORBIDDEN, "Invalid Refresh Token");
    }

    // রিফ্রেশ টোকেন থেকে ইউজারনেম বের করা
    const { username } = verifiedToken;

    // ইউজার আছে কিনা চেক করা
    const isUserExist = await Auth.isUserExist(username);
    if (!isUserExist) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User does not exist");
    }

    // ✅ ইউজার থাকলে নতুন অ্যাকসেস টোকেন তৈরি করা
    const newAccessToken = jwtToken.createToken(
        { username },
        config.jwt_access_Token as Secret,
        Number(config.jwt_access_token_duration)
    );

    return { accessToken: newAccessToken };
};

// REGISTER FUNCTION
const register = async (data: IAuth): Promise<IAuth | null> => {
    // চেক করা হচ্ছে ইউজার, ইমেইল বা ফোন নং আগে থেকেই আছে কিনা
    const existingUser = await Auth.findOne({
        $or: [
            { username: data.username },
            { email: data.email },
            { phone: data.phone },
        ],
    });

    // যদি আগে থেকে থাকে, তাতে কনফ্লিক্ট হ্যান্ডেল করা
    if (existingUser) {
        if (existingUser.username === data.username) {
            throw new ApiError(StatusCodes.CONFLICT, "Username already exists");
        }
        if (existingUser.email === data.email) {
            throw new ApiError(StatusCodes.CONFLICT, "Email already exists");
        }
        if (existingUser.phone === data.phone) {
            throw new ApiError(StatusCodes.CONFLICT, "Phone Number already exists");
        }
    }

    // ✅ নতুন ইউজার তৈরি করা
    const result = await Auth.create(data);
    return result;
};

// EXPORTING AUTH SERVICE
export const AuthService = {
    login,
    register,
    refreshToken,
};
