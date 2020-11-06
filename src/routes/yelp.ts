import { Router } from 'express';
import { RandomForestClassifier } from 'ml-random-forest';
import YelpController from '../controllers/yelp';

const router = Router();


const yelpController = new YelpController();

// business
router.get('/businesses', yelpController.getBusinesses);
router.get('/businesses/:business_id', yelpController.getBusinessInfo);
router.post('/training', yelpController.updateTraining);



export default router;