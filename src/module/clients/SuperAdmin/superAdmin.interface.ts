import { Model, Document } from "mongoose";
import { ENUM_USER_ROLE } from "../../../enums/enum";
export interface ISuperAdmin extends Document {
    username: string;
    password: string;
    fullname: string;
    email: string;
    phone: string;
    dob: string;
    role: typeof ENUM_USER_ROLE.SUPER_ADMIN;
}

export type SuperAdminModel = Model<ISuperAdmin>;
