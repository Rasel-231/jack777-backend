import { SortOrder } from "mongoose"



export const paginationFields = ['page', 'limit', 'sortBy', 'sortOrder']
export type IOptions = {
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: SortOrder
}
export type IOptionsResponse = {
    page: number,
    limit: number,
    skip: number,
    sortBy?: string,
    sortOrder?: SortOrder
}


const calculatePagination = (option: IOptions): IOptionsResponse => {
    const page = Number(option.page || 1);
    const limit = Number(option.limit || 10)
    const skip = (page - 1) * limit
    const sortBy = option.sortBy || 'createdAt';
    const sortOrder = option.sortOrder || 'asc';

    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder,
    }
}

export const Pagination = {
    calculatePagination
}

