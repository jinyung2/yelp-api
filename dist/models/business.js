"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const businessSchema = new mongoose_1.Schema({
    business_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    postal_code: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    stars: {
        type: Number,
        required: true
    },
    review_count: {
        type: Number,
        required: true
    },
    categories: {
        type: String,
        required: true
    },
    hours: {
        type: Object,
    },
    priceRange: {
        type: String,
        required: true
    },
}, { toJSON: { virtuals: true } });
businessSchema.virtual('checkin', {
    ref: 'Checkin',
    localField: 'business_id',
    foreignField: 'business_id',
    justOne: false,
});
businessSchema.virtual('tip', {
    ref: 'Tip',
    localField: 'business_id',
    foreignField: 'business_id',
    justOne: false
});
businessSchema.virtual('review', {
    ref: 'Review',
    localField: 'business_id',
    foreignField: 'business_id',
    justOne: false
});
const Business = mongoose_1.model('Business', businessSchema);
exports.default = Business;
