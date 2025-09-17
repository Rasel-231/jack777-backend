import { Model } from "mongoose";
import { ENUM_USER_ROLE } from "../../../enums/enum";


export type IAuth = {
    username: string;
    password: string;
    fullname: string;
    email: string;
    phone: string;
    dob: string;
    role?: string;
}

export type IStaticsModel = {
    isUserExist(username: string): Promise<IAuth | null>;
    isPasswordMatched(givenPassword: string, savedPassword: string): Promise<boolean>;
} & Model<IAuth>


export type ILoginUser = {
    username: string,
    password: string,
    accessToken: string,
}

export type ILoginUserResponse = {
    accessToken: string;
    refreshToken?: string;
};

export type IRefreshTokenResponse = {
    accessToken: string
}

