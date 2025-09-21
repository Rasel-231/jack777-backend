import { Model, Document } from "mongoose";
import { ENUM_USER_ROLE } from "../../../enums/enum";
export interface IMasterAdmin extends Document {
    username: string;
    password: string;
    fullname: string;
    email: string;
    phone: string;
    dob: string;
    role: typeof ENUM_USER_ROLE.MASTER_ADMIN
}

export type MasterAdminModel = Model<IMasterAdmin>;
