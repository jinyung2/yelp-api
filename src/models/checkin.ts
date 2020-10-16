import { Schema, model, Document } from 'mongoose';

export interface ICheckin extends Document {
    business_id: String,
    checkin_count: Number
}

const checkinSchema = new Schema({
    business_id: {
        type: String,
        required: true,
    },
    checkin_count: {
        type: Number,
        required: true
    }
})

const Checkin = model('Checkin', checkinSchema);
export default Checkin;