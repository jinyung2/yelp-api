import { Schema, model, Document } from 'mongoose';

export interface IPhoto extends Document {
    business_id: String,
    photo_id: String,
    caption: String,
    label: String
}

const photoSchema = new Schema({
    business_id: {
        type: String,
        required: true,
        ref: "Business"
    },
    photo_id: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    }
});

const Photo = model("Photo", photoSchema);
export default Photo;