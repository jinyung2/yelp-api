import { RandomForestClassifier as RFClassifier } from 'ml-random-forest';
import Tip, { ITip } from '../src/models/tip';
import Checkin, { ICheckin } from '../src/models/checkin';
import Business, { IBusiness } from '../src/models/business';
import fs from 'fs';

const options = {
  seed: 3,
  maxFeatures: 0.9,
  replacement: true,
  nEstimators: 25,
};

/**
 * THIS WAS JUST SOME SCRIPTS TO LEARN HOW TO USE THE MACHINE LEARNING LIBRARY.
 * IT IS NO LONGER BEING USED IN THE MAIN PROGRAM, THE BULK OF WHAT I LEARNED
 * HAS BEEN IMPLEMENTED IN THE CONSTRUCTOR OF THE YELP CONTROLLER.
 * 
 * IMPORTANT NOTES: THIS RANDOM FOREST LIBRARY DOES **NOT** SUPPORT INCREMENTAL
 * LEARNING, WHICH IS SOMETHING I HAD MISTAKENLY FACTORED INTO THE DESIGN.
 * I 'HACKED' TOGETHER A SOLUTION BY INSTEAD STORING THE TRAINSET IN MY YELP 
 * CONTROLLER AND I PLAN TO PUSH NEW ENTRIES INTO IT AND RUN THE TRAIN ON THE
 * CLASSIFIER EVERY TIME TRAINSET REACHS X VALUE (MAYBE EVERY 200 OR SO). 
 * -->THIS IS AN OBVIOUSLY FLAWED MODEL<--
 * 
 * IN THE FUTURE, IF/WHEN THERE IS A ML RANDOM FOREST LIBARY THAT SUPPORTS 
 * INCREMENTAL OR SOMETHING SIMILAR TO WARM_START IN THE SCIKITLEARN LIBRARY
 * THIS PROGRAM CAN BE FURTHER IMPROVED. 
 * 
 * UNTIL THEN, FOR YOUR MACHINE LEARNING NEEDS, STICK TO PYTHON.
 */

// New Classifier
const classifier = new RFClassifier(options);

// For Loading classifier
// const classifier = RFClassifier.load(JSON.parse(fs.readFileSync('./rf/rf-model.json').toString()));

// console.log(classifier.predict([[2, 0, 0, 0]]));
// console.log(classifier.estimators);
// classifier.predictOOB();
// console.log(classifier.getConfusionMatrix())

// realine interface for user input

export const training = async () => {
  let trainSet: any[] = [];
  const limit = 9;
  const cursor = Business.find().limit(limit).cursor();

  let count = 1;

  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    const checkin = await Checkin.findOne({ business_id: doc.business_id });
    const tip_count = await Tip.find({ business_id: doc.business_id }).countDocuments();
    const training = [
      doc.stars,
      doc.review_count,
      checkin?.toJSON().checkin_count || 0,
      tip_count
    ];
    trainSet.push(training);
    // let prediction = training[0] > 3 ? [1] : [0]
    // classifier.train(trainSet, prediction);
    console.log(`Added ${count++}/${limit} training set: ${training}`);

    // heuristic? //
  }
  cursor.close();

  let prediction = trainSet.map(e => e[0] > 3 ? 1 : 0);
  console.log(`Training Set: ${trainSet} || Prediction Set: ${prediction}`);
  classifier.train(trainSet, [...prediction]);
  console.log(`\nPredictions (1/0 for Recommended/Not Recommended): `);
  
  write('./rf/rf-model.json', JSON.stringify(classifier.toJSON()));
};

/**
 * Loads model from specified filepath and returns RandomForestClassifier
 * @param filepath - The filepath which contains the random forest model
 */
const load = (filepath: string): RFClassifier => {
  const model = JSON.parse(fs.readFileSync(filepath).toString());
  return RFClassifier.load(model);
};

/**
 * Writes a Stringified JSON into a .json file at the specified filepath/name.
 * @param filepath - the filepath for the file to write to.checked
 * @param data - stringified data that is to be written to a json file
 */
const write = (filepath: string, data: string) => {
  fs.writeFile(filepath, data, (err) => {
    if (err) throw err;
    console.log("Successfully updated training JSON");
  })
};