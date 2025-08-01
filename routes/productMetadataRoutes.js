import express from 'express';
import { getProductMetadata } from '../controllers/productMetadataController.js';

const router = express.Router();
router.get('/product-metadata', getProductMetadata);
export default router;
