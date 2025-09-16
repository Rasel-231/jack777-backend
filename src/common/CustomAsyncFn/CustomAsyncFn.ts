import { NextFunction, Request, Response } from "express"
import { RequestHandler } from "express-serve-static-core";

export const CustomAsyncFn = (fn: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next)
        } catch (err) {
            next(err);
        }
    }
}