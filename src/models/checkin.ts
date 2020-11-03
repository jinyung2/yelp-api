import { Schema, model, Document } from 'mongoose';

export interface ICheckin extends Document {
    business_id: string,
    checkin_count: number
}

const checkinSchema = new Schema<ICheckin>({
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