import { Schema, model, Document } from 'mongoose';

export interface IReview extends Document {
    business_id: string,
    review_id: string,
    stars: number,
    useful: number,
    funny: number,
    cool: number,
    text: string
}

const reviewSchema = new Schema<IReview>({
    business_id: {
        type: String,
        required: true,
    },
    review_id: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: true
    },
    useful: {
        type: Number,
        required: true
    },
    funny: {
        type: Number,
        required: true
    },
    cool: {
        type: Number,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})

const Review = model("Review", reviewSchema);
export default Review;