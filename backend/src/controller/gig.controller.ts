import express, {Request, Response, NextFunction} from "express";
import {createError} from "../utils/hadleError.js";
import {IUserId} from "../middleware/jwt.js";
import Gig from '../models/gig.model.js';
// 1 41 51
export const createGig = async (req: Request, res: Response, next: NextFunction) => {
    if (!(req as IUserId).isSeller) return next(createError(403, 'Only sellers can create a gig'));

    const newGig = new Gig({
        userId: (req as IUserId).userId,
        ...req.body,
    });

    try {

        const savedGig = await newGig.save();
        res.status(201).json(savedGig);

    } catch (error: any) {
        next(error);
    }
};

export const deleteGig = async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error: any) {
        next(error);
    }
}

export const getGig = async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error: any) {
        next(error);
    }
}

export const getGigs = async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error: any) {
        next(error);
    }
}

/*
* export const createGig = async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error: any) {
        next(error);
    }
}
* */