const Business = require('../models/business');

exports.getAllBusiness = (req, res, next) => {
    Business.find().then(businesses => {
        console.log(businesses);
    })
    // res.status(200).json()
}