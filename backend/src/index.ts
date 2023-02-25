import express from "express";
import * as mongoose from "mongoose";
import * as dotenv from 'dotenv';
import path from "path";
import {fileURLToPath} from "url";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import conversationRoute from "./routes/conversation.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import reviewRoute from "./routes/review.route.js";
import messageRoute from "./routes/message.route.js";

const __filename: string = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config({ path: __dirname+'/.env' });

mongoose.set("strictQuery", true);

function handleError(e: any) {
    console.log(`${e} didn't connect`)
}

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO as string);
        console.log(process.env.MONGO);
        console.log("connected to mongoDB")
    } catch (error) {
        handleError(error);
        console.log(error)
    }
}
app.use(express.json());
app.use(cookieParser());


app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/conversations', conversationRoute)
app.use('/api/messages', messageRoute)
app.use('/api/gigs', gigRoute)
app.use('/api/reviews', reviewRoute)
app.use('/api/orders', orderRoute)

app.listen(5000, () => {
    connect();
    console.log('server is started');
})
