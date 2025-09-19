import jwt, { Secret, SignOptions } from "jsonwebtoken"
import ApiError from "../../../common/CustomError/CustomApiError/ApiError"
import { StatusCodes } from "http-status-codes"
const createToken = (
    payload: Record<string, unknown>,
    jwt_secret: Secret,
    expireTime: SignOptions["expiresIn"]
): string => {
    return jwt.sign(payload, jwt_secret, { expiresIn: expireTime })

}
const createResetToken = (
    payload: Record<string, unknown>,
    jwt_reset_secret: Secret,
    expireTime: SignOptions["expiresIn"]
): string => {
    return jwt.sign(payload, jwt_reset_secret, { expiresIn: expireTime })

}
const verifyToken = (token: string, jwt_access_secret: Secret) => {
    console.log("token", token);

    try {
        return jwt.verify(token, jwt_access_secret);
    } catch (err) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Token")
    }

}

export const jwtToken = {
    createToken,
    createResetToken,
    verifyToken
}