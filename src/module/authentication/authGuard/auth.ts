import { NextFunction, Request, Response } from "express";
import ApiError from "../../../common/CustomError/CustomApiError/ApiError";
import { StatusCodes } from "http-status-codes";
import { jwtToken } from "../jsonwebtoken/CustomJwt";
import config from "../../../config";
import { Secret } from "jsonwebtoken";



const auth =
    (...requiredRoles: string[]) =>
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                //get authorization token
                const token = req.headers.authorization;
                if (!token) {
                    throw new ApiError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
                }
                // verify token
                let verifiedUser = null;

                verifiedUser = jwtToken.verifyToken(token, config.jwt_access_secret as Secret) as any;

                req.user = verifiedUser;

                // role diye guard korar jnno
                if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
                    throw new ApiError(StatusCodes.FORBIDDEN, 'Forbidden');
                }
                next();
            } catch (error) {
                next(error);
            }
        };

export default auth;