"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tipSchema = new mongoose_1.Schema({
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
});
const Tip = mongoose_1.model("Tip", tipSchema);
exports.default = Tip;
