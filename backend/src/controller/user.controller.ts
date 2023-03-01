import {NextFunction, Request, Response} from "express";
import User, {IUser} from '../models/user.model.js';
import {IUserId} from "../middleware/jwt.js";
import {createError} from "../utils/hadleError.js";

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.params.id);

        res.status(200).send(user);
    } catch (error: any) {
        next(error);
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.params.id);

        if((req as IUserId).userId !== user!._id.toString()) {
            return next(createError(403, "You can delete only your account"));
        }
        await User.findByIdAndDelete(req.params.id)
        res.status(200).send("User Deleted");

    } catch (error: any) {
        next(error);
    }
};