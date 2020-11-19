import { Router } from 'express';
import YelpController from '../controllers/yelp';

const router = Router();


const yelpController = new YelpController();

// business
router.get('/businesses', yelpController.getRecommendation);
router.get('/businesses/random', yelpController.getRandom);
router.get('/businesses/:business_id', yelpController.getBusinessInfo);
router.post('/training', yelpController.updateTraining);



export default router;