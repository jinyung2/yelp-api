"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
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
});
const Review = mongoose_1.model("Review", reviewSchema);
exports.default = Review;
