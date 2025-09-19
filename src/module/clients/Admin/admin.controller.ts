import { Request, Response } from "express";
import { CustomAsyncFn } from "../../../common/CustomAsyncFn/CustomAsyncFn";
import { AdminService } from "./admin.service";
import { sendResponse } from "../../../common/CustomResponse/sendResponse";
import { IAdmin } from "./admin.interface";
import { StatusCodes } from "http-status-codes";

const AdminUser = CustomAsyncFn(async (req: Request, res: Response) => {
    const result = await AdminService.AdminUser(req.body)
    sendResponse<IAdmin>(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "User create successfully",
        data: result
    })
})

const getAllUser = CustomAsyncFn(async (req: Request, res: Response) => {
    const result = await AdminService.getAllUser()
    sendResponse<IAdmin[]>(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "User find successfully",
        data: result
    })
})
const getSingleUser = CustomAsyncFn(async (req: Request, res: Response) => {
    const result = await AdminService.getSingleUser(req.params.id)
    sendResponse<IAdmin>(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "User find successfully",
        data: result
    })
})

const deleteUser = CustomAsyncFn(async (req: Request, res: Response) => {
    const result = await AdminService.deleteUser(req.params.id)
    sendResponse<IAdmin>(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "User deleted successfully",
        data: result
    })
})
const updateUser = CustomAsyncFn(async (req: Request, res: Response) => {
    const id = req.params.id;
    const UpdateData = req.body;
    const result = await AdminService.updateUser(id, UpdateData)
    sendResponse<IAdmin>(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "User updated successfully",
        data: result
    })
})

export const AdminController = {
    AdminUser,
    getAllUser,
    getSingleUser,
    deleteUser,
    updateUser,
}