import { Model, Document } from "mongoose";
export interface IUser extends Document {
    username: string;
    password: string;
    fullname: string;
    email: string;
    phone: string;
    dob: string;
}

export type UserModel = Model<IUser>;
