import { StatusCodes } from "http-status-codes";
import ApiError from "../../../common/CustomError/CustomApiError/ApiError";
import bcrypt from 'bcrypt'
import config from "../../../config";
import { IAuth } from "./auth.interface";
import { Auth } from "./auth.model";
const login = async (payload: IAuth) => {
    const { username, password } = payload;
    console.log(payload);

    const allUsers = await Auth.find().lean();
    console.log("All users in DB:", allUsers);

    const isUserExist = await Auth.isUserExist(username)
    console.log(isUserExist);


    if (!isUserExist) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User does not exist');
    }
    if (isUserExist.password && !(await Auth.isPasswordMatched(password, isUserExist.password))) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Password is incorrect");
    }

    return isUserExist
}

const register = async (data: IAuth): Promise<IAuth | null> => {
    const existingUser = await Auth.findOne({
        $or: [
            { username: data.username },
            { email: data.email },
            { phone: data.phone },
        ],
    });

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
    const hasPassword = await bcrypt.hash(data.password, Number(config.bcrypt_salt_rounds))
    data.password = hasPassword;

    const result = await Auth.create(data);
    return result;
}

export const AuthService = {
    login,
    register,
}
