import { model, Schema } from "mongoose";
import { ISuperAdmin, SuperAdminModel } from "./superAdmin.interface";
import { ENUM_USER_ROLE } from "../../../enums/enum";

const SuperAdminSchema = new Schema<ISuperAdmin>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    dob: { type: String, required: true },
    role: { type: String, enum: [ENUM_USER_ROLE.SUPER_ADMIN], default: ENUM_USER_ROLE.SUPER_ADMIN },
},
    {
        timestamps: true,
    });

export const SuperAdmin = model<ISuperAdmin, SuperAdminModel>("SuperAdmin", SuperAdminSchema);
