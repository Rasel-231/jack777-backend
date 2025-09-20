import { StatusCodes } from "http-status-codes"
import ApiError from "../../../common/CustomError/CustomApiError/ApiError"
import { IFilters, IGenericResponse, IPagination, IUser } from "./user.interface"
import { User } from "./user.model"
import { Pagination } from "../../../common/CustomPagination/pagination"
import { userSearchableFields } from "./user.constant"
import { SortOrder } from "mongoose"

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






export const getAllUser = async (
    filter: IFilters,
    pagination: IPagination
): Promise<IGenericResponse<IUser[]>> => {
    const { searchTerm, ...filtersData } = filter;

    // ✅ Pagination calculation ঠিক করেছি
    const { page, limit, skip, sortBy, sortOrder } =
        Pagination.calculatePagination(pagination);

    const andCondition: any[] = []; // ✅ টাইপ any[] করে দিয়েছি (আগে টাইপ ছিল না)

    // ✅ Search condition অপরিবর্তিত রেখেছি (ঠিকই ছিল)
    if (searchTerm) {
        andCondition.push({
            $or: userSearchableFields.map(field => ({
                [field]: { $regex: searchTerm, $options: "i" },
            })),
        });
    }

    // ✅ filtersData check করার সময় Object.keys ঠিক রেখেছি কিন্তু
    // এখানে andCondition.push এর মধ্যে map এর আগে $and দিয়েছি
    // যাতে multiple filter একসাথে কাজ করে
    if (Object.keys(filtersData).length > 0) {
        andCondition.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }

    // ✅ sortConditons → নাম পরিবর্তন করে sortConditions করেছি
    const sortConditions: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder
    }

    // ✅ whereCondition এ $and না থাকলে খালি object পাঠাচ্ছি
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

    // ✅ countDocuments() এ filter condition ব্যবহার করেছি
    const result = await User.find(whereCondition)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await User.countDocuments(whereCondition); // ✅ ঠিক করা হয়েছে

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};





















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