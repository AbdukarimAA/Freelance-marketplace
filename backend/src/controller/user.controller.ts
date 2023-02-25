import {Request, Response} from "express";
import User, {IUser} from '../models/user.model.js';
import jwt from "jsonwebtoken";

//1
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        const token = req.cookies.accessToken;
        if(!token) return res.status(401).send("You are not authenticated")

        jwt.verify(token, process.env.JWT_KEY as string, async (err: any, payload: any) => {
            if(payload.id !== user!._id.toString()) {
                return res.status(401).send("You can delete only your account")
            }
            await User.findByIdAndDelete(req.params.id)
            res.status(200).send("User Deleted")
        });

    } catch (error: any) {
        res.status(500).send('Something went wrong');
    }
}