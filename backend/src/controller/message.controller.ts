import {NextFunction, Request, Response} from "express";
import {createError} from "../utils/hadleError.js";
import MessageModel from "../models/message.model.js";
import {IUserId} from "../middleware/jwt.js";
import ConversationModel from "../models/conversation.model.js";

export const createMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newMessage = await new MessageModel({
           conversationId: req.body.conversationId,
            userId: (req as IUserId).isSeller,
            desc: req.body.desc
        });

        const savedMessage = await newMessage.save();
        await ConversationModel.findOneAndUpdate(
            {id: req.body.conversationId},
            {
                $set: {
                    readBySeller: (req as IUserId).isSeller,
                    readByBuyer: (req as IUserId).isSeller,
                    lastMessage: req.body.desc,
                },
            }, {new: true}
        );

        res.status(201).send(savedMessage);
    } catch (error: any) {
        next(error);
    }
}

export const getMessages = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const messages = await MessageModel.find({conversationId: req.params.id});
        res.status(200).send(messages);
    } catch (error: any) {
        next(error);
    }
}