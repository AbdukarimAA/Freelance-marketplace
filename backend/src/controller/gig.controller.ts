import express, {Request, Response, NextFunction} from "express";
import {createError} from "../utils/hadleError.js";
import {IUserId} from "../middleware/jwt.js";
import Gig from '../models/gig.model.js';

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
        const gig = await Gig.findById(req.params.id);
        console.log(gig)

        if (gig.userId !== (req as IUserId).userId) {
            return next(createError(403, 'You can only delete your own gig'));
        }

        await Gig.findByIdAndDelete(req.params.id);
        res.status(200).send('Gig has been deleted');
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