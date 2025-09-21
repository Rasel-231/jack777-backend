import { StatusCodes } from "http-status-codes"
import ApiError from "../../../common/CustomError/CustomApiError/ApiError"
import { IMasterAdmin } from "./masterAdmin.interface"
import { MasterAdmin } from "./masterAdmin.model"

const CreateMasterAdmin = async (data: IMasterAdmin): Promise<IMasterAdmin | null> => {
    const existingMasterAdmin = await MasterAdmin.findOne({
        $or: [
            { username: data.username },
            { email: data.email },
            { phone: data.phone },
        ],
    });

    if (existingMasterAdmin) {
        if (existingMasterAdmin.username === data.username) {
            throw new ApiError(StatusCodes.CONFLICT, "MasterAdminname already exists");
        }
        if (existingMasterAdmin.email === data.email) {
            throw new ApiError(StatusCodes.CONFLICT, "Email already exists");
        }
        if (existingMasterAdmin.phone === data.phone) {
            throw new ApiError(StatusCodes.CONFLICT, "Phone Number already exists");
        }
    }

    const result = await MasterAdmin.create(data);
    return result;
}




const getAllMasterAdmin = async (): Promise<IMasterAdmin[]> => {
    const result = await MasterAdmin.find()
    return result
}
const getSingleMasterAdmin = async (id: string): Promise<IMasterAdmin | null> => {
    const result = await MasterAdmin.findById(id)
    return result
}
const deleteMasterAdmin = async (id: string): Promise<IMasterAdmin | null> => {
    const result = await MasterAdmin.findByIdAndDelete(id)
    return result
}
const updateMasterAdmin = async (
    id: string,
    payload: Partial<IMasterAdmin>
): Promise<IMasterAdmin | null> => {
    const result = await MasterAdmin.findByIdAndUpdate(id, payload, { new: true })
    return result
}

export const MasterAdminService = {
    CreateMasterAdmin,
    getAllMasterAdmin,
    getSingleMasterAdmin,
    deleteMasterAdmin,
    updateMasterAdmin,

}