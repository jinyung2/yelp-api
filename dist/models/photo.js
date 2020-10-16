"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const photoSchema = new mongoose_1.Schema({
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
const Photo = mongoose_1.model("Photo", photoSchema);
exports.default = Photo;
