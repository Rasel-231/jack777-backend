import mongoose from "mongoose";
import { IGenericErorrMessage } from "../ErrorInterfaces/interface";
import { IGenericErorrResponses } from "../../CommonInterface/commonInterfaces";

const handleValidationError = (
    err: mongoose.Error.ValidationError
): IGenericErorrResponses => {
    const errors = Object.values(err.errors).map(
        (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => ({
            path: el?.path,
            message: el?.message,
            errorMessage: [
                {
                    path: el?.path,
                    message: el?.message
                } as IGenericErorrMessage
            ]
        })
    );

    return {
        statusCode: 400,
        message: "Validation Error",
        errorMessage: errors,
    };
};

export default handleValidationError;
