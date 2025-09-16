import { Model } from "mongoose";

export type IAuth = {
    username: string;
    password: string;
    fullname: string;
    email: string;
    phone: string;
    dob: string;
}

export type IStaticsModel = {
    isUserExist(username: string): Promise<IAuth | null>;
    isPasswordMatched(givenPassword: string, savedPassword: string): Promise<boolean>;
} & Model<IAuth>
