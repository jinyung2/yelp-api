import { Schema, SchemaTypes, model, Document } from 'mongoose';

export interface IPhoto extends Document {
    business_id: string,
    photo_id: string,
    caption: string,
    label: string
}

const photoSchema = new Schema<IPhoto>({
    business_id: {
        type: SchemaTypes.String,
        required: true,
    },
    photo_id: {
        type: SchemaTypes.String,
        required: true
    },
    caption: {
        type: SchemaTypes.String,
        required: true
    },
    label: {
        type: SchemaTypes.String,
        required: true
    }
});

const Photo = model("Photo", photoSchema);
export default Photo;