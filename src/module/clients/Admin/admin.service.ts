import { StatusCodes } from "http-status-codes"
import ApiError from "../../../common/CustomError/CustomApiError/ApiError"
import { IAdmin } from "./admin.interface"
import { Admin } from "./admin.model"

const CreateAdmin = async (data: IAdmin): Promise<IAdmin | null> => {
    const existingAdmin = await Admin.findOne({
        $or: [
            { username: data.username },
            { email: data.email },
            { phone: data.phone },
        ],
    });

    if (existingAdmin) {
        if (existingAdmin.username === data.username) {
            throw new ApiError(StatusCodes.CONFLICT, "username already exists");
        }
        if (existingAdmin.email === data.email) {
            throw new ApiError(StatusCodes.CONFLICT, "Email already exists");
        }
        if (existingAdmin.phone === data.phone) {
            throw new ApiError(StatusCodes.CONFLICT, "Phone Number already exists");
        }
    }

    const result = await Admin.create(data);
    return result;
}




const getAllAdmin = async (): Promise<IAdmin[]> => {
    const result = await Admin.find()
    return result
}
const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
    const result = await Admin.findById(id)
    return result
}
const deleteAdmin = async (id: string): Promise<IAdmin | null> => {
    const result = await Admin.findByIdAndDelete(id)
    return result
}
const updateAdmin = async (
    id: string,
    payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
    const result = await Admin.findByIdAndUpdate(id, payload, { new: true })
    return result
}

export const AdminService = {
    CreateAdmin,
    getAllAdmin,
    getSingleAdmin,
    deleteAdmin,
    updateAdmin,

}