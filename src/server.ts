import express, { NextFunction, Response, Request } from 'express';
import mongoose from 'mongoose';
// import cors from 'cors';
// import helmet from 'helmet';
import bodyParser from 'body-parser';
import path from 'path';


import yelpRoutes from './routes/yelp';
import wikiRoutes from './routes/wiki';


const app = express();

const mongodb = 'mongodb://127.0.0.1:27017/yelp';

app.use(bodyParser.json());
app.use('/photos', express.static(path.join(__dirname,'..', 'photos')));

// mongoose.pluralize();

// middleware for CORS stuff
// might not be needed because NGINX handles it? needs to be confirmed

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
app.use('/wiki', wikiRoutes);

// error handling route
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
})

mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connected to server, listening on 3000")
    app.listen(3000);
}).catch((err) => {
    if (err) throw err;
});

