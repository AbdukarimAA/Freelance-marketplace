import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import {createError} from "../utils/hadleError.js";

export interface IUserId extends Request {
    userId: string;
    isSeller: boolean;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken;
    if(!token) return next(createError(401, "You are not authenticated"));

    jwt.verify(token, process.env.JWT_KEY as string, async (err: any, payload: any) => {
        if(err) return next(createError(403, "Token is not valid"));
        (req as IUserId).userId = payload.id;
        (req as IUserId).isSeller = payload.isSeller;
        next();
    });
}