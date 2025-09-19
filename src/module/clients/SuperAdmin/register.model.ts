import { model, Schema } from "mongoose";
import { IRegister, RegisterModel } from "./register.interface";

const RegisterSchema = new Schema<IRegister>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    dob: { type: String, required: true },
});

export const Register = model<IRegister, RegisterModel>("Register", RegisterSchema);
