import jwt, { Secret, SignOptions } from "jsonwebtoken"
const createToken = (
    payload: Record<string, unknown>,
    jwt_access_Token: Secret,
    expireTime: SignOptions["expiresIn"]
): string => {
    return jwt.sign(payload, jwt_access_Token, { expiresIn: expireTime })

}
const createResetToken = (
    payload: Record<string, unknown>,
    jwt_access_Token: Secret,
    expireTime: SignOptions["expiresIn"]
): string => {
    return jwt.sign(payload, jwt_access_Token, { expiresIn: expireTime })

}
const verifyToken = (token: string, jwt_access_Token: Secret) => {
    return jwt.verify(token, jwt_access_Token);

}

export const jwtToken = {
    createToken,
    createResetToken,
    verifyToken
}