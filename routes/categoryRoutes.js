import express from 'express';

const router = express.Router();
import { getCategoriesBySection } from '../controllers/categoryController.js'; 

router.get('/:section', getCategoriesBySection);

export default router;