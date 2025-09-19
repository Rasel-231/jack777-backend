import { Model, Document } from "mongoose";
export interface IAdmin extends Document {
    username: string;
    password: string;
    fullname: string;
    email: string;
    phone: string;
    dob: string;
}

export type AdminModel = Model<IAdmin>;
