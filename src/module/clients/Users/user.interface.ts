import { Model, Document, SortOrder } from "mongoose";
import { ENUM_USER_ROLE } from "../../../enums/enum";
export interface IUser extends Document {
    username: string;
    password: string;
    fullname: string;
    email: string;
    phone: string;
    dob: string;
    role?: typeof ENUM_USER_ROLE.USER
}

export type UserModel = Model<IUser>;


export type IPagination = {
    page?: number,
    limit?: number,
    skip?: number,
    sortBy?: string,
    sortOrder?: SortOrder

}

export type IFilters = {
    searchTerm?: string;
    [key: string]: any;
}


export type IGenericResponse<T> = {
    meta: {
        page: number,
        limit: number,
        sortBy?: string,
        sortOrder?: SortOrder
        total: number
    },
    data: T
}