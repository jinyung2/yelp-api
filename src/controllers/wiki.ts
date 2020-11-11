import { Response, NextFunction } from 'express';
import wiki from 'wikijs';



/**
 * I don't know if I'm going to use this..
 * Honestly I don't think I am
 */
class WikiController {
    constructor() {}

    getArticle(req: any, res: Response, next: NextFunction) {
        const query = req.params.search;
        wiki().page(query).then(page => {
            res.status(200).json({data: page});
            // page.html().then((res) => {
            //     console.log(res);
            // })
        });
    }
}

export default WikiController;