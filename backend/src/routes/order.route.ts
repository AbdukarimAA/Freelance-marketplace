import express from "express";
import {verifyToken} from "../middleware/jwt.js";
import {getOrders, paymentIntent} from "../controller/order.controller.js";
const router = express.Router();

// router.post('/:gigId', verifyToken, createOrder)
router.get('/', verifyToken, getOrders)
router.post('/create-payment-intent/:id', verifyToken, paymentIntent)

export default router;