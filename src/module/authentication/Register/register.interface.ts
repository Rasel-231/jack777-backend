import { Model, Document } from "mongoose";
export interface IRegister extends Document {
    username: string;
    password: string;
    fullname: string;
    email: string;
    phone: string;
    dob: string;
}

export type RegisterModel = Model<IRegister>;
