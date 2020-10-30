import Business, { IBusiness } from '../models/business';
import { Response, Request, NextFunction } from 'express';

import Review from '../models/review';
import Tip from '../models/tip';
import Checkin from '../models/checkin';
import Photo from '../models/photo';

import { RandomForestClassifier as RFClassifier } from 'ml-random-forest';

class YelpController {

    constructor() { }

    getBusinesses(req: Request, res: Response, next: NextFunction) {
        const query = {}; // list of query params supplied by user
        Business.find({
            // eventually populated with query params to filter
            // ie. location, interests, budget, distance, duration
        }).limit(1)
            .populate('checkin')
            .populate('review').limit(1)
            .exec((err, businesses: IBusiness[]) => {
                Tip.find({business_id: businesses[0].business_id}).countDocuments().then((tip) => {
                    console.log(tip);
                })
                Photo.find({business_id: businesses[0].business_id}).exec((id) => {
                    // CODE TO BE IMPLEMENTED:
                    
                    // load up the model that was trained and stored to JSON
                    // feed in the filtered list of businesses
                    // the model will return whether the specific businesses' parameters result in a recommend or not
                    // feed into heuristic to determine how good of a recommendation it is and return top results based on distribution
                    // console.log("hello");
                    res.status(200).json({ data: businesses, pid: id });
                })
            })
    }
    getQueriedBusinesses(req: Request, res: Response, next: NextFunction) {
        const city = req.params.city;
        Business.find({ city: city }).then(businesses => {
            res.status(200).json({ message: "found businesses", data: businesses })
        }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
    }


    getAllTips(req: Request, res: Response, next: NextFunction) {
        Tip.find().then(tips => {
            console.log(tips);
        })
        // res.status(200).json()
    }

    getAllCheckins(req: Request, res: Response, next: NextFunction) {
        Checkin.find().then(checkins => {
            console.log(checkins);
        })
        // res.status(200).json()
    }

    getAllReviews(req: Request, res: Response, next: NextFunction) {
        Review.find().then(reviews => {
            console.log(reviews);
        })
        // res.status(200).json()
    }

    getAllPhotos(req: Request, res: Response, next: NextFunction) {
        Photo.find().then(photo => {
            console.log(photo);
        })
        // res.status(200).json()

    }
}

export default YelpController;