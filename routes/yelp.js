const express = require('express');
const yelpController = require('../controllers/yelp');
const router = express.Router();

// business
router.get('/businesses', yelpController.getAllBusinesses);
router.get('/businesses/:city', yelpController.getQueriedBusinesses);

// tips
router.get('/tips', yelpController.getAllTips);


// checkins
router.get('/checkins', yelpController.getAllCheckins);


// reviews
router.get('/reviews', yelpController.getAllReviews);


// photos
router.get('/photos', yelpController.getAllPhotos);


module.exports = router;