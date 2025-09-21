import { Request, Response } from "express";
import { CustomAsyncFn } from "../../../common/CustomAsyncFn/CustomAsyncFn";
import { SuperAdminService } from "./superAdmin.service";
import { sendResponse } from "../../../common/CustomResponse/sendResponse";
import { ISuperAdmin } from "./superAdmin.interface";
import { StatusCodes } from "http-status-codes";

const CreateSuperAdmin = CustomAsyncFn(async (req: Request, res: Response) => {
    const result = await SuperAdminService.CreateSuperAdmin(req.body)
    sendResponse<ISuperAdmin>(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "User create successfully",
        data: result
    })
})

const getAllUser = CustomAsyncFn(async (req: Request, res: Response) => {
    const result = await SuperAdminService.getAllUser()
    sendResponse<ISuperAdmin[]>(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "User find successfully",
        data: result
    })
})
const getSingleUser = CustomAsyncFn(async (req: Request, res: Response) => {
    const result = await SuperAdminService.getSingleUser(req.params.id)
    sendResponse<ISuperAdmin>(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "User find successfully",
        data: result
    })
})

const deleteUser = CustomAsyncFn(async (req: Request, res: Response) => {
    const result = await SuperAdminService.deleteUser(req.params.id)
    sendResponse<ISuperAdmin>(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "User deleted successfully",
        data: result
    })
})
const updateUser = CustomAsyncFn(async (req: Request, res: Response) => {
    const id = req.params.id;
    const UpdateData = req.body;
    const result = await SuperAdminService.updateUser(id, UpdateData)
    sendResponse<ISuperAdmin>(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "User updated successfully",
        data: result
    })
})

export const SuperAdminController = {
    CreateSuperAdmin,
    getAllUser,
    getSingleUser,
    deleteUser,
    updateUser,
}