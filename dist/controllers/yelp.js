"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const business_1 = __importDefault(require("../models/business"));
const review_1 = __importDefault(require("../models/review"));
const tip_1 = __importDefault(require("../models/tip"));
const checkin_1 = __importDefault(require("../models/checkin"));
const photo_1 = __importDefault(require("../models/photo"));
class YelpController {
    constructor() { }
    getBusinesses(req, res, next) {
        console.log(req.query);
        const query = {};
        business_1.default.findOne({})
            .populate('checkin')
            .populate('tip')
            .populate('review')
            .populate('photo')
            .exec((err, business) => {
            res.status(200).json({ data: business });
        });
    }
    getQueriedBusinesses(req, res, next) {
        const city = req.params.city;
        business_1.default.find({ city: city }).then(businesses => {
            res.status(200).json({ message: "found businesses", data: businesses });
        }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    }
    getAllTips(req, res, next) {
        tip_1.default.find().then(tips => {
            console.log(tips);
        });
        // res.status(200).json()
    }
    getAllCheckins(req, res, next) {
        checkin_1.default.find().then(checkins => {
            console.log(checkins);
        });
        // res.status(200).json()
    }
    getAllReviews(req, res, next) {
        review_1.default.find().then(reviews => {
            console.log(reviews);
        });
        // res.status(200).json()
    }
    getAllPhotos(req, res, next) {
        photo_1.default.find().then(photos => {
            console.log(photos);
        });
        // res.status(200).json()
    }
}
exports.YelpController = YelpController;
exports.default = YelpController;
