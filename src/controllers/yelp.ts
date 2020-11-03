import { Response, Request, NextFunction, json } from 'express';
import { RandomForestClassifier as RFClassifier } from 'ml-random-forest';

import Business, { IBusiness } from '../models/business';
import Review from '../models/review';
import Tip from '../models/tip';
import Checkin, { ICheckin } from '../models/checkin';
import Photo from '../models/photo';

import weighted from 'weighted';
import sentiment from 'sentiment';

class YelpController {
    classifier: RFClassifier;
    trainSet: number[][] = [];
    predictions: number[] = [];

    constructor() {
        this.classifier = new RFClassifier({
            seed: 3,
            maxFeatures: 0.9,
            replacement: true,
            nEstimators: 25,
        });

        const limit = 1000;
        const cursor = Business.find().limit(limit).cursor();

        let count = 1;

        (async () => {
            for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
                const checkin = await Checkin.findOne({ business_id: doc.business_id });
                const tip_count = await Tip.find({ business_id: doc.business_id }).countDocuments();
                const training = [
                    doc.stars,
                    doc.review_count,
                    checkin?.toJSON().checkin_count || 0,
                    tip_count
                ];
                this.trainSet.push(training);
                // Super simple initial training, is stars > 3? then recommend
                this.predictions.push(training[0] >= 4 || training[1] >= 50 ? 1 : 0);
                console.log(`Added ${count++}/${limit} training set: \tStar Rating: ${training[0]}  \tReview Count: ${training[1]}  \tCheckin Count: ${training[2]}  \tTip Count: ${training[3]}`);
            }
            cursor.close();
        })().then(() => {
            console.log('Initial training has finished.')
            this.classifier.train(this.trainSet, this.predictions);
        }).catch(err => {
            console.log(`Error has occurred: \n${err}`);
        });
    }

    /**
     * Function assumes the following query in the URL:
     * city, interests, budget, distance
     * 
     * Finds queried businesses, filtered by model for prediction for
     * recommend/not recommend, fed into a weighted random distribution
     * based on a simple heuristic: (A/B) stars > 3 ? A : B
     * stars * 100 + review_count * (2/1) + tip_count * (3/2) + checkin_count * 5
     * reviews and tips are weighted differently depending on average rating
     * better average rating results in a higher quality of reviews and tips
     * checkins are generally considered always good, repeat customers
     * 
     * @param req query of city, interests, budget, distance
     * @param res JSON data with <=5 recommendations
     * @param next ???
     */
    getBusinesses = (req: any, res: Response, next: NextFunction) => {
        const currentGeo = req.query.city === 'Las Vegas' ?
            [-115.1398, 36.1699] : // Las Vegas
            [-79.3832, 43.6532]; // Toronto
        const distance = req.query.distance ? +req.query.distance : 10;
        const query = {
            city: req.query.city,
            categories: new RegExp(req.query.interests.split(",").join("|"), "gi"),
            priceRange: req.query.budget,
            location: {
                $geoWithin: {
                    $centerSphere: [currentGeo, distance / 3963.2]
                }
            }
        };

        let queriedData;
        const queryResult = Business
            .find(query)
            .populate({ path: 'checkin' })
            .exec()
            .then((data) => {
                // Store for later?
                queriedData = data;
                const pred = this.classifier.predict(data.map((d: any) => [d.stars, d.review_count, d.tip_count, d.checkin!.checkin_count]))
                // this will filter based on which businesses were predicted to be recommended by the rf model
                return data.filter((_, i) => pred[i]);
            })
        .then((trimmedData: any)=> {
            // options created for use with weighted library for random selection
            let options: {[key: number]: number} = {};
            trimmedData.forEach((business: IBusiness, index: number) => {
                options[index] = 
                business.stars * 100 + 
                business.review_count * (business.stars > 3 ? 2 : 1) +
                (business.tip_count || 0) * (business.stars > 3 ? 2 : 1) +
                (business.checkin!.checkin_count || 0) * 5;
            })
            let responseData: Set<IBusiness> = new Set();
            while (responseData.size < (trimmedData.length > 5 ? 5 : trimmedData.length)) {
                const key: string = weighted.select(options);
                responseData.add(trimmedData[+key]);
            }
            return responseData;
        }).then((data) => {
            console.log(data);
            res.status(200).json({data: [...data]});
        }).catch(err => {
            console.log("Something went wrong!");
            next(err);
        })
    }

    updateTraining = (req: Request, res: Response, next: NextFunction) => {

    }
}

export default YelpController;
