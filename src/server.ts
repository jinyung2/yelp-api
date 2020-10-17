import express, { NextFunction, Response, Request } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';

import yelpRoutes from './routes/yelp';

const app = express();


// localhost address for my mongoDB
// later replace with mongoDB_URI for connection mongodb atlas?
const mongodb = 'mongodb://127.0.0.1:27017/yelp';

// mongoose.pluralize();

// middleware for CORS stuff
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     // set to only allow GET for retrieving data.
//     res.setHeader(
//         'Access-Control-Allow-Methods',
//         'GET'
//     );
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     // including the check for OPTIONS since response sends OPTIONS first
//     // if (req.method === 'OPTIONS') {
//     //     return res.sendStatus(200);
//     // }
//     next();
// })

// routes
app.use('/yelp', yelpRoutes);


// error handling route
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
})

mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connected to server, listening on 8080")
    app.listen(3000);
}).catch(err => {
    console.log(err);
});

