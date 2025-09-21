import { model, Schema } from "mongoose";
import { IMasterAdmin, MasterAdminModel } from "./masterAdmin.interface";
import { ENUM_USER_ROLE } from "../../../enums/enum";

const MasterAdminSchema = new Schema<IMasterAdmin>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    dob: { type: String, required: true },
    role: { type: String, enum: [ENUM_USER_ROLE.MASTER_ADMIN], default: ENUM_USER_ROLE.MASTER_ADMIN }
});

export const MasterAdmin = model<IMasterAdmin, MasterAdminModel>("MasterAdmin", MasterAdminSchema);
