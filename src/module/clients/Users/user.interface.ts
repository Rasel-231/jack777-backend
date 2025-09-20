import { Model, Document, SortOrder } from "mongoose";
export interface IUser extends Document {
    username: string;
    password: string;
    fullname: string;
    email: string;
    phone: string;
    dob: string;
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