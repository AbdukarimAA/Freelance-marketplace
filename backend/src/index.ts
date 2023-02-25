import express from "express";
import * as mongoose from "mongoose";
import * as dotenv from 'dotenv';
import path from "path";
import {fileURLToPath} from "url";

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

app.listen(5000, () => {
    connect();
    console.log('server is started');
})
