import { Response, NextFunction } from 'express';
import WikiJS from 'wikijs';
import wiki from 'wikijs';

class WikiController {
    constructor() {}

    getArticle(req: any, res: Response, next: NextFunction) { 
        wiki().page('Batman').then(page => console.log(page));
    }
}

export default WikiController;