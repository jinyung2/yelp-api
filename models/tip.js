const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tipSchema = new Schema({
    business_id: {
        type: String,
        required: true,
        ref: "Business"
    },
    text: {
        type: String,
        required: true
    },
    compliment_count: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Tip", tipSchema);