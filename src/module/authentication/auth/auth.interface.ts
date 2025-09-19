import { Model, Types } from "mongoose";
import { ENUM_USER_ROLE } from "../../../enums/enum";



export type IAuth = {
    _id?: Types.ObjectId;
    username: string;
    password: string;
    fullname: string;
    email: string;
    phone: string;
    dob: string;
    role?: ENUM_USER_ROLE,
    passwordChangedAt?: Date;

}
export type IChangePassword = {
    oldPassword: string,
    newPassword: string,
}

export type IStaticsModel = {
    isUserExist(username: string): Promise<IAuth | null>;
    isPasswordMatched(givenPassword: string, savedPassword: string): Promise<boolean>;
} & Model<IAuth>


export type ILoginUser = {
    username: string,
    password: string,
}

export type ILoginUserResponse = {
    accessToken: string;
    refreshToken?: string;
};

export type IRefreshTokenResponse = {
    accessToken: string
    refreshToken: string
}

