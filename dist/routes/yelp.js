"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const yelp_1 = __importDefault(require("../controllers/yelp"));
const router = express_1.Router();
const yelpController = new yelp_1.default();
// business
router.get('/businesses', yelpController.getBusinesses);
router.get('/businesses/:city/', yelpController.getQueriedBusinesses);
// tips
router.get('/tips', yelpController.getAllTips);
// checkins
router.get('/checkins', yelpController.getAllCheckins);
// reviews
router.get('/reviews', yelpController.getAllReviews);
// photos
router.get('/photos', yelpController.getAllPhotos);
exports.default = router;
