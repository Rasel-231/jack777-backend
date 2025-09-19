import { StatusCodes } from "http-status-codes"
import ApiError from "../../../common/CustomError/CustomApiError/ApiError"
import { IAdmin } from "./admin.interface"
import { Admin } from "./admin.model"

const AdminUser = async (data: IAdmin): Promise<IAdmin | null> => {
    const existingUser = await Admin.findOne({
        $or: [
            { username: data.username },
            { email: data.email },
            { phone: data.phone },
        ],
    });

    if (existingUser) {
        if (existingUser.username === data.username) {
            throw new ApiError(StatusCodes.CONFLICT, "Username already exists");
        }
        if (existingUser.email === data.email) {
            throw new ApiError(StatusCodes.CONFLICT, "Email already exists");
        }
        if (existingUser.phone === data.phone) {
            throw new ApiError(StatusCodes.CONFLICT, "Phone Number already exists");
        }
    }

    const result = await Admin.create(data);
    return result;
}




const getAllUser = async (): Promise<IAdmin[]> => {
    const result = await Admin.find()
    return result
}
const getSingleUser = async (id: string): Promise<IAdmin | null> => {
    const result = await Admin.findById(id)
    return result
}
const deleteUser = async (id: string): Promise<IAdmin | null> => {
    const result = await Admin.findByIdAndDelete(id)
    return result
}
const updateUser = async (
    id: string,
    payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
    const result = await Admin.findByIdAndUpdate(id, payload, { new: true })
    return result
}

export const AdminService = {
    AdminUser,
    getAllUser,
    getSingleUser,
    deleteUser,
    updateUser,

}