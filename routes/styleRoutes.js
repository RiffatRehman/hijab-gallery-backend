import express from 'express';
import { getStyles, getStyleById, createStyle } from '../controllers/styleController.js';
import { createStyleReview, deleteStyleReview } from '../controllers/reviewController.js'; 
import { protect } from '../middleware/authMiddleware.js'; // 🔥 Only protect middleware is used
import { upload } from '../config/cloudinaryConfig.js';

const router = express.Router();

// 1. Base Routes (Get all styles & Create style)
// 💡 Admin check removed: Now any logged-in user can upload a style for testing
router.route('/')
  .get(getStyles)
  .post(protect, upload.single('image'), createStyle);

// 2. Single Style Route (Get style by ID)
router.route('/:id')
  .get(getStyleById);

// 3. Reviews Routes (Add & Delete Review)
// 🎯 This matches frontend URL: ${baseURL}/api/styles/${id}/reviews
router.route('/:id/reviews')
  .post(protect, createStyleReview);

// 🎯 This matches frontend URL for deleting a review
router.route('/:id/reviews/:reviewId')
  .delete(protect, deleteStyleReview);

export default router;