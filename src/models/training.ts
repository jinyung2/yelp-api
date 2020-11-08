import { Schema, model, Document } from 'mongoose';

export interface ITraining extends Document {
    trainingSet: number[][],
    predictions: number[]
}

const trainingSchema = new Schema<ITraining>({
    trainingSet: {
        type: [[Number]],
        required: true
    },
    predictions: {
        type: [Number],
        required: true
    }
})

const Training = model<ITraining>("Training", trainingSchema);
export default Training;