import {NextFunction, Request, Response} from "express";
import {createError} from "../utils/hadleError.js";
import {IUserId} from "../middleware/jwt.js";
import Order from '../models/order.model.js';
import Gig from '../models/gig.model.js';
import Stripe from 'stripe';

// export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const gig = await Gig.findById(req.params.gigId);
//
//         const newOrder = new Order({
//             gigId: gig._id,
//             img: gig.cover,
//             title: gig.title,
//             buyerId: (req as IUserId).userId,
//             sellerId: gig.userId,
//             price: gig.price,
//             payment_intent: 'temp'
//         });
//
//         await newOrder.save();
//         res.status(200).send('successful')
//     } catch (error: any) {
//         next(error);
//     }
// }

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await Order.find({
            ...((req as IUserId).isSeller ? { sellerId: (req as IUserId).userId } : { buyerId: (req as IUserId).userId }),
            isCompleted: true,
        });

        res.status(200).send(orders);
    } catch (err) {
        next(err);
    }
};

export const paymentIntent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const stripe = new Stripe(process.env.STRIPE, {
            apiVersion: '2022-11-15',
        });

        const gig = await Gig.findById(req.params.id)

        const paymentIntent = await stripe.paymentIntents.create({
            amount: gig.price * 100,
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            },
        });

        const newOrder = new Order({
            gigId: gig._id,
            img: gig.cover,
            title: gig.title,
            buyerId: (req as IUserId).userId,
            sellerId: gig.userId,
            price: gig.price,
            payment_intent: paymentIntent.id
        });

        await newOrder.save();
        res.status(200).send({clientSecret: paymentIntent.client_secret});

    } catch (err) {
        next(err);
    }
};

