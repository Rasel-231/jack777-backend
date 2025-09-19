import { Request, Response } from "express";
import { CustomAsyncFn } from "../../../common/CustomAsyncFn/CustomAsyncFn";
import { UserService } from "./user.service";
import { sendResponse } from "../../../common/CustomResponse/sendResponse";
import { IUser } from "./user.interface";
import { StatusCodes } from "http-status-codes";

const UserUser = CustomAsyncFn(async (req: Request, res: Response) => {
    const result = await UserService.UserUser(req.body)
    sendResponse<IUser>(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "User create successfully",
        data: result
    })
})

const getAllUser = CustomAsyncFn(async (req: Request, res: Response) => {
    const result = await UserService.getAllUser()
    sendResponse<IUser[]>(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "User find successfully",
        data: result
    })
})
const getSingleUser = CustomAsyncFn(async (req: Request, res: Response) => {
    const result = await UserService.getSingleUser(req.params.id)
    sendResponse<IUser>(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "User find successfully",
        data: result
    })
})

const deleteUser = CustomAsyncFn(async (req: Request, res: Response) => {
    const result = await UserService.deleteUser(req.params.id)
    sendResponse<IUser>(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "User deleted successfully",
        data: result
    })
})
const updateUser = CustomAsyncFn(async (req: Request, res: Response) => {
    const id = req.params.id;
    const UpdateData = req.body;
    const result = await UserService.updateUser(id, UpdateData)
    sendResponse<IUser>(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "User updated successfully",
        data: result
    })
})

export const UserController = {
    UserUser,
    getAllUser,
    getSingleUser,
    deleteUser,
    updateUser,
}