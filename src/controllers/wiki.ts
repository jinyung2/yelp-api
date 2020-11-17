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
            page.info().then((response) => {
                res.status(200).json({data: response});
            })
        });
    }
}

export default WikiController;