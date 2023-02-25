import mongoose, { Schema, model, connect } from 'mongoose';

interface IGig {
    userId: string;
    title: string;
    desc: string;
    totalStars: number;
    starNumber: number;
    cat: string;
    price: number;
    cover: string;
    images: string[];
    shortTitle: string;
    shortDesc: string;
    deliveryTime: number;
    revisionNumber: number;
    features: number[];
    sales: number;
}

const gigSchema = new Schema<IGig>({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    totalStars: {
        type: Number,
        default: 0,
    },
    starNumber: {
        type: Number,
        default: 0,
    },
    cat: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    cover: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: false,
    },
    shortTitle: {
        type: String,
        required: true,
    },
    shortDesc: {
        type: String,
        required: true,
    },
    deliveryTime: {
        type: Number,
        required: true,
    },
    revisionNumber: {
        type: Number,
        required: true,
    },
    features: {
        type: [String],
        required: false,
    },
    sales: {
        type: Number,
        default: 0,
    },
},{
    timestamps:true
});

export default mongoose.model("Gig", gigSchema);