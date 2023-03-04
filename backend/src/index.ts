import express, {NextFunction, Request, Response} from "express";
import * as mongoose from "mongoose";
import * as dotenv from 'dotenv';
import path from "path";
import {fileURLToPath} from "url";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import conversationRoute from "./routes/conversation.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import reviewRoute from "./routes/review.route.js";
import messageRoute from "./routes/message.route.js";

const app = express();
const __filename: string = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: __dirname+'/.env' });
mongoose.set("strictQuery", true);

function handleError(e: any) {
    console.log(`${e} didn't connect`)
}

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO as string);
        console.log("connected to mongoDB")
    } catch (error) {
        handleError(error);
    }
}

app.use(cors({origin: 'http://127.0.0.1:5173', credentials: true})); //credentials for cookies
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/gigs', gigRoute);
app.use('/api/orders', orderRoute);
app.use('/api/conversations', conversationRoute);
app.use('/api/messages', messageRoute);
app.use('/api/reviews', reviewRoute);


interface Error {
    status?: number;
    message?: string;
}
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";

    return res.status(errorStatus).send(errorMessage);
});

app.listen(8000, () => {
    connect();
    console.log('server is started');
})
