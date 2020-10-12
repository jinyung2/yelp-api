const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

module.exports = mongoose.model("Review", reviewSchema);