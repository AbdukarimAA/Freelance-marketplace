import mongoose, { Schema, model, connect } from 'mongoose';

interface IMessage {
    conversationId: string;
    userId: string;
    desc: string;
    price: number;
    sellerId: string;
    buyerId: string;
    isCompleted: boolean;
    payment_intent: string;
}

const messageSchema = new Schema<IMessage>({
    conversationId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
},{
    timestamps:true
});

export default mongoose.model("Message", messageSchema);