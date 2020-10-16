import Business from '../models/business';
import Review from '../models/review';
import Tip from '../models/tip';
import Checkin from '../models/checkin';
import Photos from '../models/photo';
import { Response, Request, NextFunction } from 'express';
    
export class YelpController {

    constructor() { }

    getBusinesses(req: Request, res: Response, next: NextFunction) {
        console.log(req.query);
        const query = {};
        Business.findOne({})
            .populate('checkin')
            .populate('tip')
            .populate('review')
            .populate('photo')
            .exec((err, business) => {
                res.status(200).json({ data: business });
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
        Photos.find().then(photos => {
            console.log(photos);
        })
        // res.status(200).json()

    }
}

export default YelpController;