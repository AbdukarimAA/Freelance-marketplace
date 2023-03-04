import express, {Request, Response, NextFunction} from "express";
import User, {IUser} from '../models/user.model.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {createError} from "../utils/hadleError.js";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hash = bcrypt.hashSync(req.body.password, 7);
        const newUser: IUser = new User({
            ...req.body,
            password: hash,
        });
        await newUser.save();
        res.status(201).send("User has been created");
    } catch (error: any) {
        next(error);
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if(!user) return next(createError(404, "User not found"));

        const isCorrect = bcrypt.compareSync(req.body.password, user.password);
        if(!isCorrect) return next(createError(404, "Wrong password or username"));

        const token = jwt.sign({
            id: user._id,
            isSeller: user.isSeller
        }, process.env.JWT_KEY as string);

        const {password, ...info} = user._doc;

        res.cookie("accessToken", token, {
            maxAge: 10000000,
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).send(info);

    } catch (error: any) {
        next(error);
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("accessToken", {
           sameSite: "none",
            secure: true
        }).status(200).send("User has been logged out")
    } catch (error: any) {
        res.status(500).send('Something went wrong');
    }
}