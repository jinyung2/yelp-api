import { Schema, model, Document, SchemaTypes } from 'mongoose';
import { ICheckin } from './checkin';

export interface IBusiness extends Document {
    business_id: string,
    name: string,
    address: string,
    city: string,
    state: string,
    postal_code: string,
    latitude: number,
    longitude: number,
    stars: number,
    review_count: number,
    categories: string,
    hours?: Object,
    priceRange: string,
    tip_count: number,
    checkin?: ICheckin,
    review?: Object,
}

const businessSchema = new Schema<IBusiness>({
    business_id: {
        type: SchemaTypes.String,
        required: true
    },
    name: {
        type: SchemaTypes.String,
        required: true
    },
    address: {
        type: SchemaTypes.String,
        required: true
    },
    city: {
        type: SchemaTypes.String,
        required: true
    },
    state: {
        type: SchemaTypes.String,
        required: true
    },
    postal_code: {
        type: SchemaTypes.String,
        required: true
    },
    location: {
        type: {
            type: SchemaTypes.String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [SchemaTypes.Number],
            required: true
        }
    },
    stars: {
        type: SchemaTypes.Number,
        required: true
    },
    review_count: {
        type: SchemaTypes.Number,
        required: true
    },
    categories: {
        type: SchemaTypes.String,
        required: true
    },
    hours: {
        type: Object,
    },
    priceRange: {
        type: SchemaTypes.String,
        required: true
    },
}, { toJSON: { virtuals: true } });

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