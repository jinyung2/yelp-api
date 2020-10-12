const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

module.exports = mongoose.model("Photo", photoSchema);