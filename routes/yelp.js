const express = require('express');
const yelpController = require('../controllers/yelp');
const router = express.Router();

router.get('business', yelpController.getAllBusiness);