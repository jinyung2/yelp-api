import { Router } from 'express';
import WikiController from '../controllers/wiki';

const router = Router();


const wikiController = new WikiController();

// business
router.get('/', wikiController.getArticle);



export default router;