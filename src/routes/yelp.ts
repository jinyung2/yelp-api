import { Router } from 'express';
import YelpController from '../controllers/yelp';

const router = Router();

const yelpController = new YelpController();

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

export default router;