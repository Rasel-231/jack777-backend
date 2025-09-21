import { StatusCodes } from "http-status-codes"
import ApiError from "../../../common/CustomError/CustomApiError/ApiError"
import { ISuperAdmin } from "./superAdmin.interface"
import { SuperAdmin } from "./superAdmin.model"

const CreateSuperAdmin = async (data: ISuperAdmin): Promise<ISuperAdmin | null> => {
    const existingUser = await SuperAdmin.findOne({
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

    const result = await SuperAdmin.create(data);
    return result;
}




const getAllUser = async (): Promise<ISuperAdmin[]> => {
    const result = await SuperAdmin.find()
    return result
}
const getSingleUser = async (id: string): Promise<ISuperAdmin | null> => {
    const result = await SuperAdmin.findById(id)
    return result
}
const deleteUser = async (id: string): Promise<ISuperAdmin | null> => {
    const result = await SuperAdmin.findByIdAndDelete(id)
    return result
}
const updateUser = async (
    id: string,
    payload: Partial<ISuperAdmin>
): Promise<ISuperAdmin | null> => {
    const result = await SuperAdmin.findByIdAndUpdate(id, payload, { new: true })
    return result
}

export const SuperAdminService = {
    CreateSuperAdmin,
    getAllUser,
    getSingleUser,
    deleteUser,
    updateUser,

}