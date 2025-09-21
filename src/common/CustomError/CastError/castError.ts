
import mongoose from "mongoose";
import { IGenericErorrMessage } from "../ErrorInterfaces/interface";
import { StatusCodes } from "http-status-codes";

const handleCastError = (err: mongoose.Error.CastError) => {

    const errors: IGenericErorrMessage[] = [
        {
            path: err.path,
            message: "invalid id"
        }
    ]

    return {
        StatusCodes: StatusCodes.BAD_GATEWAY,
        message: "Cast Error",
        errorMessage: errors
    }
}

export default handleCastError;