import express from 'express';
import { getStyles, getStyleById, createStyle } from '../controllers/styleController.js';
import { createStyleReview, deleteStyleReview } from '../controllers/reviewController.js'; 
import { protect } from '../middleware/authMiddleware.js'; 
import { upload } from '../config/cloudinaryConfig.js';

const router = express.Router();

// 1. Base Routes - /api/styles
router.route('/')
  .get(getStyles)
  .post(protect, upload.single('image'), createStyle);

// 2. Single Style Route - /api/styles/:id
router.route('/:id')
  .get(getStyleById);

// 3. Reviews Routes - /api/styles/:id/reviews
// 🎯 Frontend se Aane Wali Request (${baseURL}/api/styles/${id}/reviews) Seedha Yahan Aaye Gi
router.post('/:id/reviews', protect, createStyleReview);

// 4. Delete Review Route - /api/styles/:id/reviews/:reviewId
router.delete('/:id/reviews/:reviewId', protect, deleteStyleReview);

export default router;