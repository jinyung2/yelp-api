import { Router } from 'express';
import { RandomForestClassifier } from 'ml-random-forest';
import YelpController from '../controllers/yelp';

const router = Router();


const yelpController = new YelpController();

// business
router.get('/businesses', yelpController.getBusinesses);
router.put('/businesses/training', yelpController.updateTraining);
export default router;