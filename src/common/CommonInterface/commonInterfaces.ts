import { IGenericErorrMessage } from "../CustomError/ErrorInterfaces/interface"

export type IGenericErorrResponses = {
    statusCode: number,
    message: string,
    errorMessage: {
        path: string,
        message: string
        errorMessage: IGenericErorrMessage[]
    }[]
}