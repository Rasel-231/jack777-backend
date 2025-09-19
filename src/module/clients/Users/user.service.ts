import { StatusCodes } from "http-status-codes"
import ApiError from "../../../common/CustomError/CustomApiError/ApiError"
import { IUser } from "./user.interface"
import { User } from "./user.model"

const UserUser = async (data: IUser): Promise<IUser | null> => {
    const existingUser = await User.findOne({
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

    const result = await User.create(data);
    return result;
}




const getAllUser = async (): Promise<IUser[]> => {
    const result = await User.find()
    return result
}
const getSingleUser = async (id: string): Promise<IUser | null> => {
    const result = await User.findById(id)
    return result
}
const deleteUser = async (id: string): Promise<IUser | null> => {
    const result = await User.findByIdAndDelete(id)
    return result
}
const updateUser = async (
    id: string,
    payload: Partial<IUser>
): Promise<IUser | null> => {
    const result = await User.findByIdAndUpdate(id, payload, { new: true })
    return result
}

export const UserService = {
    UserUser,
    getAllUser,
    getSingleUser,
    deleteUser,
    updateUser,

}