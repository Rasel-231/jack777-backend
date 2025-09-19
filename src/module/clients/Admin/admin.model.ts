import { model, Schema } from "mongoose";
import { IAdmin, AdminModel } from "./admin.interface";

const AdminSchema = new Schema<IAdmin>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    dob: { type: String, required: true },
});

export const Admin = model<IAdmin, AdminModel>("Admin", AdminSchema);
