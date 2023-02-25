import express, {Request, Response} from "express";
import User, {IUser} from '../models/user.model.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
    try {
        const hash = bcrypt.hashSync(req.body.password, 7);
        const newUser: IUser = new User({
            ...req.body,
            password: hash,
        });
        await newUser.save();
        res.status(201).send("User has been created");
    } catch (error: any) {
        res.status(500).send('Something went wrong');
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if(!user) return res.status(404).send("User not found")

        const isCorrect = bcrypt.compareSync(req.body.password, user.password);
        if(!isCorrect) return res.status(400).send("Wrong password or username");

        const token = jwt.sign({
            id: user._id,
            isSeller: user.isSeller
        }, process.env.JWT_KEY as string);

        const {password, ...info} = user._doc;
        res.cookie("accessToken", token, {
            httpOnly: true
        }).status(200).send(info);

    } catch (error: any) {
        res.status(500).send('Something went wrong');
    }
}

export const logout = async (req: Request, res: Response) => {
    try {

    } catch (error: any) {
        res.status(500).send('Something went wrong');
    }
}