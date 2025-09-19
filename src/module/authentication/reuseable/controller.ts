import { Request, Response } from "express";
import { CustomAsyncFn } from "../../../common/CustomAsyncFn/CustomAsyncFn";
import { registerService } from "./service";
import { sendResponse } from "../../../common/CustomResponse/sendResponse";
import { IRegister } from "./interface";
import { StatusCodes } from "http-status-codes";

const registerUser = CustomAsyncFn(async (req: Request, res: Response) => {
    const result = await registerService.registerUser(req.body)
    sendResponse<IRegister>(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "User create successfully",
        data: result
    })
})

const getAllUser = CustomAsyncFn(async (req: Request, res: Response) => {
    const result = await registerService.getAllUser()
    sendResponse<IRegister[]>(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "User find successfully",
        data: result
    })
})
const getSingleUser = CustomAsyncFn(async (req: Request, res: Response) => {
    const result = await registerService.getSingleUser(req.params.id)
    sendResponse<IRegister>(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "User find successfully",
        data: result
    })
})

const deleteUser = CustomAsyncFn(async (req: Request, res: Response) => {
    const result = await registerService.deleteUser(req.params.id)
    sendResponse<IRegister>(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "User deleted successfully",
        data: result
    })
})
const updateUser = CustomAsyncFn(async (req: Request, res: Response) => {
    const id = req.params.id;
    const UpdateData = req.body;
    const result = await registerService.updateUser(id, UpdateData)
    sendResponse<IRegister>(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "User updated successfully",
        data: result
    })
})

export const registerController = {
    registerUser,
    getAllUser,
    getSingleUser,
    deleteUser,
    updateUser,
}