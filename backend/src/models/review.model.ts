import mongoose, { Schema, model, connect } from 'mongoose';

interface IReview {
    gigId: string;
    userId: string;
    star: number;
    desc: string;
}

const reviewSchema = new Schema<IReview>({
    gigId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    star: {
        type: Number,
        required: true,
        enum:[1,2,3,4,5]
    },
    desc: {
        type: String,
        required: true,
    },
},{
    timestamps:true
});

export default mongoose.model("review", reviewSchema);