import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

export const validateRequest =
    (schema: ZodObject) =>
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                await schema.parseAsync({
                    body: req.body,
                    query: req.query,
                    params: req.params,
                    cookies: req.cookies, // ensure cookie-parser is used
                });
                return next();
            } catch (err) {
                next(err);
            }
        };
