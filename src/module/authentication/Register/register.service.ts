import { StatusCodes } from "http-status-codes"
import ApiError from "../../../common/CustomError/CustomApiError/ApiError"
import { IRegister } from "./register.interface"
import { Register } from "./register.model"

const registerUser = async (data: IRegister): Promise<IRegister | null> => {
    const existingUser = await Register.findOne({
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

    const result = await Register.create(data);
    return result;
}




const getAllUser = async (): Promise<IRegister[]> => {
    const result = await Register.find()
    return result
}
const getSingleUser = async (id: string): Promise<IRegister | null> => {
    const result = await Register.findById(id)
    return result
}
const deleteUser = async (id: string): Promise<IRegister | null> => {
    const result = await Register.findByIdAndDelete(id)
    return result
}
const updateUser = async (
    id: string,
    payload: Partial<IRegister>
): Promise<IRegister | null> => {
    const result = await Register.findByIdAndUpdate(id, payload, { new: true })
    return result
}

export const registerService = {
    registerUser,
    getAllUser,
    getSingleUser,
    deleteUser,
    updateUser,

}