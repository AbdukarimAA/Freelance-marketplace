import mongoose, { Schema, model, connect } from 'mongoose';

interface IConversation {
    id: string;
    sellerId: string;
    buyerId: string;
    readBySeller: boolean;
    readByBuyer: boolean;
    lastMessage: string;
}

const conversationSchema = new Schema<IConversation>({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    sellerId: {
        type: String,
        required: true,
    },
    buyerId: {
        type: String,
        required: true,
    },
    readBySeller: {
        type: Boolean,
        required: true,
    },
    readByBuyer: {
        type: Boolean,
        required: true,
    },
    lastMessage: {
        type: String,
        required: false,
    },
},{
    timestamps:true
});

export default mongoose.model("Conversation", conversationSchema);