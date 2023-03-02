import express, {Request, Response, NextFunction} from "express";
import {createError} from "../utils/hadleError.js";
import Review from '../models/review.model.js';
import Gig from '../models/gig.model.js';
import {IUserId} from "../middleware/jwt.js";

export const createReview = async (req: Request, res: Response, next: NextFunction) => {
    if((req as IUserId).isSeller) return next(createError(403, 'Sellers can\'t create a review'));

    const newReview = new Review({
        userId: (req as IUserId).userId,
        gigId: req.body.gigId,
        desc: req.body.desc,
        star: req.body.star
    });

    try {
        const review = await Review.findOne({
            gigId: req.body.gigId,
            userId: (req as IUserId).userId
        });
        //todo: check if the user purchased the gig using order model
        if(review) return next(createError(403, 'You have already created a review for this gig'));

        const savedReview = await newReview.save();
        await Gig.findByIdAndUpdate(req.body.gigId, {$inc: {totalStars: req.body.star, startNumber: 1}}); //updating the stars for review
        res.status(201).send(savedReview);
    } catch (error: any) {
        next(error);
    }
}

export const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error: any) {
        next(error);
    }
}

export const getReviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviews = await Review.find({gigId: req.params.gigId});
        if(!reviews) return next(createError(401, 'There are no reviews'));
        res.status(200).send(reviews);
    } catch (error: any) {
        next(error);
    }
}