import mongoose, { Schema, model, connect } from 'mongoose';


const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
    desc: {
        type: String,
        required: false,
    },
    isSeller: {
        type: Boolean,
        default:false
    },
},{
    timestamps:true
});

export interface IUser extends mongoose.Document{
    username: string;
    email: string;
    password: string;
    img: string;
    country: string;
    phone: string;
    desc: string;
    isSeller: boolean;
    _doc?: any
}

export default mongoose.model("User", userSchema);
