const Business = require('../models/business');
const Review = require('../models/review');
const Tip = require('../models/tip');
const Checkin = require('../models/checkin');
const Photos = require('../models/photo');

exports.getAllBusinesses = (req, res, next) => {
    Business.findOne({state: "ON"})
    // .populate('checkin')
    .populate({ path: 'checkin'})
    .populate('tip')
    .populate('review')
    .exec((err, business) => {
        res.status(200).json({data: business});
    })
    // .then(businesses => {
    //     console.log(businesses);
    // })
    // res.status(200).json()
}


exports.getQueriedBusinesses = (req, res, next) => {
    const city = req.params.city;
    Business.find({city: city}).then(businesses => {
        res.status(200).json({message: "found businesses", data: businesses})
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}


exports.getAllTips = (req, res, next) => {
    Tip.find().then(tips => {
        console.log(tips);
    })
    // res.status(200).json()
}

exports.getAllCheckins = (req, res, next) => {
    Checkin.find().then(checkins => {
        console.log(checkins);
    })
    // res.status(200).json()
}

exports.getAllReviews = (req, res, next) => {
    Review.find().then(reviews => {
        console.log(reviews);
    })
    // res.status(200).json()
}

exports.getAllPhotos = (req, res, next) => {
    Photos.find().then(photos => {
        console.log(photos);
    })
    // res.status(200).json()
}

