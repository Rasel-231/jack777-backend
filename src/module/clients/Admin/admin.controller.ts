import { Request, Response } from "express";
import { CustomAsyncFn } from "../../../common/CustomAsyncFn/CustomAsyncFn";
import { AdminService } from "./admin.service";
import { sendResponse } from "../../../common/CustomResponse/sendResponse";
import { IAdmin } from "./admin.interface";
import { StatusCodes } from "http-status-codes";

const CreateAdmin = CustomAsyncFn(async (req: Request, res: Response) => {
    const result = await AdminService.CreateAdmin(req.body)
    sendResponse<IAdmin>(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Admin create successfully",
        data: result
    })
})

const getAllAdmin = CustomAsyncFn(async (req: Request, res: Response) => {
    const result = await AdminService.getAllAdmin()
    sendResponse<IAdmin[]>(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Admin find successfully",
        data: result
    })
})
const getSingleAdmin = CustomAsyncFn(async (req: Request, res: Response) => {
    const result = await AdminService.getSingleAdmin(req.params.id)
    sendResponse<IAdmin>(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Admin find successfully",
        data: result
    })
})

const deleteAdmin = CustomAsyncFn(async (req: Request, res: Response) => {
    const result = await AdminService.deleteAdmin(req.params.id)
    sendResponse<IAdmin>(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Admin deleted successfully",
        data: result
    })
})
const updateAdmin = CustomAsyncFn(async (req: Request, res: Response) => {
    const id = req.params.id;
    const UpdateData = req.body;
    const result = await AdminService.updateAdmin(id, UpdateData)
    sendResponse<IAdmin>(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Admin updated successfully",
        data: result
    })
})

export const AdminController = {
    CreateAdmin,
    getAllAdmin,
    getSingleAdmin,
    deleteAdmin,
    updateAdmin,
}