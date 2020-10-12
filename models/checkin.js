const mongoose = require('mongoose');
const Schema = mongoose.Schema;


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

module.exports = mongoose.model('Checkin', checkinSchema);