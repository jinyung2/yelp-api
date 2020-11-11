import { Router } from 'express';
import WikiController from '../controllers/wiki';

const router = Router();


const wikiController = new WikiController();

// business
router.get('/:search', wikiController.getArticle);



export default router;