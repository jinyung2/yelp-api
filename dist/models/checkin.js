"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const checkinSchema = new mongoose_1.Schema({
    business_id: {
        type: String,
        required: true,
    },
    checkin_count: {
        type: Number,
        required: true
    }
});
const Checkin = mongoose_1.model('Checkin', checkinSchema);
exports.default = Checkin;
