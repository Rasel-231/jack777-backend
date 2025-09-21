
import { ErrorRequestHandler } from 'express'
import { IGenericErorrMessage } from '../ErrorInterfaces/interface';
import handleValidationError from '../CustomValidationError/handleVlaidationError';
import config from '../../../config';
import ApiError from '../CustomApiError/ApiError';
import { errorLogger } from '../../CustomLogger/logger';
import handleCastError from '../CastError/castError';



const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    config.node_env === 'development' ? console.log('Global Error handler', err) : errorLogger.error('GlobalError handler', err)



    let statusCode = 500;
    let message = "Something went wrong";
    let errorMessage: IGenericErorrMessage[] = []

    if (err?.name === "validationError") {
        const simplified = handleValidationError(err)
        statusCode = simplified.statusCode;
        message = simplified.message;
        errorMessage = simplified.errorMessage
    }
    else if (err?.name === "CastError") {
        const simplifiedError = handleCastError(err)
        statusCode = simplifiedError.StatusCodes
        message = simplifiedError.message
        errorMessage = simplifiedError.errorMessage
    }

    else if (err instanceof ApiError) {
        statusCode = err?.statusCode;
        message = err?.message;
        errorMessage = err?.message ? [{ path: '', message: err?.message }] : []
    }


    else if (err instanceof Error) {
        message = err?.message;
        errorMessage = err?.message ? [{ path: '', message: err?.message }] : []
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        stack: config.node_env !== 'production' ? err?.stack : undefined,
    })


}

export default globalErrorHandler