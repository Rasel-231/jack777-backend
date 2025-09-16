import { Response } from "express";
import { IApiResponses } from "./ResponseInterface";


export const sendResponse = <T>(res: Response, data: IApiResponses<T>): void => {

    const responseData: IApiResponses<T> = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message || null,
        data: data.data || null
    }
    res.status(data.statusCode).json({ responseData })
}