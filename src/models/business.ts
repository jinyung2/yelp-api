import { Schema, model, Document } from 'mongoose';

export interface IBusiness extends Document {
    business_id: String,
    name: String,
    address: String,
    city: String,
    state: String,
    postal_code: String,
    latitude: Number,
    longitude: Number,
    stars: Number,
    review_count: Number,
    categories: String,
    hours?:  Object,
    priceRange: String
}

const businessSchema = new Schema<IBusiness>({
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
},{toJSON: {virtuals: true}});

businessSchema.virtual('checkin', {
    ref: 'Checkin',
    localField: 'business_id',
    foreignField: 'business_id',
    justOne: false,
    // options: { limit: 5 },
    // match: { business_id: businessSchema.business_id }
});

businessSchema.virtual('tip', {
    ref: 'Tip',
    localField: 'business_id',
    foreignField: 'business_id',
    justOne: false
})

businessSchema.virtual('review', {
    ref: 'Review',
    localField: 'business_id',
    foreignField: 'business_id',
    justOne: false
})

businessSchema.virtual('photo', {
    ref: 'Photo',
    localField: 'business_id',
    foreignField: 'business_id',
    justOne: false
})




const Business = model('Business', businessSchema);
export default Business;