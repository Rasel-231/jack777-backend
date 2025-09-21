import { Request, Response } from "express";
import { CustomAsyncFn } from "../../../common/CustomAsyncFn/CustomAsyncFn";
import { MasterAdminService } from "./masterAdmin.service";
import { sendResponse } from "../../../common/CustomResponse/sendResponse";
import { IMasterAdmin } from "./masterAdmin.interface";
import { StatusCodes } from "http-status-codes";

const CreateMasterAdmin = CustomAsyncFn(async (req: Request, res: Response) => {
    const result = await MasterAdminService.CreateMasterAdmin(req.body)
    sendResponse<IMasterAdmin>(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "MasterAdmin create successfully",
        data: result
    })
})

const getAllMasterAdmin = CustomAsyncFn(async (req: Request, res: Response) => {
    const result = await MasterAdminService.getAllMasterAdmin()
    sendResponse<IMasterAdmin[]>(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "MasterAdmin find successfully",
        data: result
    })
})
const getSingleMasterAdmin = CustomAsyncFn(async (req: Request, res: Response) => {
    const result = await MasterAdminService.getSingleMasterAdmin(req.params.id)
    sendResponse<IMasterAdmin>(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "MasterAdmin find successfully",
        data: result
    })
})

const deleteMasterAdmin = CustomAsyncFn(async (req: Request, res: Response) => {
    const result = await MasterAdminService.deleteMasterAdmin(req.params.id)
    sendResponse<IMasterAdmin>(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "MasterAdmin deleted successfully",
        data: result
    })
})
const updateMasterAdmin = CustomAsyncFn(async (req: Request, res: Response) => {
    const id = req.params.id;
    const UpdateData = req.body;
    const result = await MasterAdminService.updateMasterAdmin(id, UpdateData)
    sendResponse<IMasterAdmin>(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "MasterAdmin updated successfully",
        data: result
    })
})

export const MasterAdminController = {
    CreateMasterAdmin,
    getAllMasterAdmin,
    getSingleMasterAdmin,
    deleteMasterAdmin,
    updateMasterAdmin,
}