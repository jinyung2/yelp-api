import { RandomForestClassifier as RFClassifier } from 'ml-random-forest';
import Review, { IReview } from '../src/models/review';
import Tip, { ITip } from '../src/models/tip';
import Checkin, { ICheckin } from '../src/models/checkin';
import Photo, { IPhoto } from '../src/models/photo';
import Business, { IBusiness } from '../src/models/business';
import mongoose from 'mongoose';
import express, { NextFunction } from 'express';
import fs from 'fs';

const options = {
  seed: 3,
  maxFeatures: 0.8,
  replacement: true,
  nEstimators: 25
};

const classifier = new RFClassifier(options);

export const training = async () => {
  let trainSet: any[] = [];
  const limit = 50;
  const cursor = Business.find().limit(limit).cursor();

  let count = 1;

  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    const checkin = await Checkin.findOne({ business_id: doc.business_id });
    const tip_count = await Tip.find({ business_id: doc.business_id }).countDocuments();
    const training = [
      doc.stars,
      doc.review_count,
      checkin?.toJSON().checkin_count,
      tip_count
    ];
    trainSet.push(training);
    console.log(`Added ${count++}/${limit} training set: ${training}`);

    // heuristic? //
  }
  // console.log(trainSet);
  const prediction = trainSet.map(e => e[0] > 1.5 ? 1 : 0);
  // console.log(prediction);
  classifier.train(trainSet, prediction);
  let result = classifier.predict([[5,100,10,10]]);
  console.log(`with 5 star: ${result}`);
  result = classifier.predict([[1,100,10,10]]);
  console.log(`with 1 star ${result}`);
  result = classifier.predict([[3,100,10,10]]);
  console.log(`with 3 star ${result}`);
  result = classifier.predict([[3.5,100,10,10]]);
  console.log(`with 3.5 star ${result}`);
  
  fs.writeFileSync('./scripts/rf-model.json', JSON.stringify(classifier.toJSON()));
  // console.log(classifier.toJSON());
};