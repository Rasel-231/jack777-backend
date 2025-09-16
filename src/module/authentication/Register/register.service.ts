import { IRegister } from "./register.interface"
import { Register } from "./register.model"

const registerUser = async (data: IRegister): Promise<IRegister | null> => {
    const result = await Register.create(data)
    return result
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
    const result = await Register.findByIdAndUpdate(id, payload)
    return result
}

export const registerService = {
    registerUser,
    getAllUser,
    getSingleUser,
    deleteUser,
    updateUser,

}