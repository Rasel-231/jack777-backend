

export type IApiResponses<T> = {
    statusCode: number,
    message?: string | null,
    success: boolean,
    data?: T | null
}