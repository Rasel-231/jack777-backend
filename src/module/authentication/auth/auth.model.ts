import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt'
import config from "../../../config";
import { IAuth, IStaticsModel } from "./auth.interface";
import { ENUM_USER_ROLE } from "../../../enums/enum";



const AuthSchema = new Schema<IAuth>({

    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    email: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    dob: { type: String, required: true },
    role: { type: String, enum: ["super_admin", "master_admin", "admin", "user"], default: ENUM_USER_ROLE.USER },
    passwordChangedAt: { type: Date },
}, {
    timestamps: true
});


// AuthSchema.statics.isUserExist = async function (username: string, role?: string): Promise<IAuth | null> {
//     return this.findOne({ username, role }).select('+password');
// }

AuthSchema.statics.isUserExist = async function (username: string, role?: string) {
    const query: any = { username };
    if (role) query.role = role;
    return this.findOne(query).select('+password');
}


AuthSchema.statics.isPasswordMatched = async function (givenPassword: string, savePassword: string): Promise<boolean> {
    return await bcrypt.compare(givenPassword, savePassword)

}


AuthSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds));
    next();
})

export const Auth = model<IAuth, IStaticsModel>("Auth", AuthSchema);
