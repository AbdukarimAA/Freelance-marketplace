import express, {Request, Response, NextFunction} from "express";
import {createError} from "../utils/hadleError.js";
import ConversationModel from "../models/conversation.model.js";
import {IUserId} from "../middleware/jwt.js";

export const createConversation = async (req: Request, res: Response, next: NextFunction) => {
    const newConversation = new ConversationModel({
        id: (req as IUserId).isSeller ? (req as IUserId).userId + req.body.to : req.body.to + (req as IUserId).userId,
        sellerId: (req as IUserId).isSeller ? (req as IUserId).userId : req.body.to,
        buyerId: (req as IUserId).isSeller ? req.body.to : (req as IUserId).userId,
        readBySeller: (req as IUserId).isSeller,
        readByBuyer: !(req as IUserId).isSeller
    })

    try {
        const savedConversations = await newConversation.save();
        res.status(200).send(savedConversations);
    } catch (error: any) {
        next(error);
    }
}

export const getConversations = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const conversation = await ConversationModel.find(
            (req as IUserId).isSeller ? {sellerId: (req as IUserId).userId} : {buyerId: (req as IUserId).userId}
        )
        if(!conversation) return next(createError(403, 'There are no conversations'));
        res.status(200).send(conversation);
    } catch (error: any) {
        next(error);
    }
}

export const getSingleConversation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const conversation = await ConversationModel.findOne({id: req.params.id});
        if(!conversation) return next(createError(403, 'There is no conversation'));
        res.status(200).send(conversation);
    } catch (error: any) {
        next(error);
    }
}

export const updateConversation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updateConversation = await ConversationModel.findOneAndUpdate(
            { id: req.params.id},
            {
                $set: {
                    // readBySeller: true,
                    // readByBuyer: true,
                    ...(req as IUserId).isSeller ? {readBySeller: true} : {readByBuyer: true}
                },
            },
            {new: true}
        );
        res.status(200).send(updateConversation);
    } catch (error: any) {
        next(error);
    }
}