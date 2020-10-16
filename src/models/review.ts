import { Schema, model, Document } from 'mongoose';

export interface IReview extends Document {
    business_id: String,
    review_id: String,
    stars: Number,
    useful: Number,
    funny: Number,
    cool: Number,
    text: String
}

const reviewSchema = new Schema({
    business_id: {
        type: String,
        required: true,
        ref: "Business"
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