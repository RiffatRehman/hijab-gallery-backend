import express from 'express';
import { createReview, getReviewsByStyle } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// 💡 Frontend se matching ke liye yahan '/:styleId' lagana zaroori tha
router.route('/:styleId')
  .post(protect, createReview)      // Post review (Token required)
  .get(getReviewsByStyle);          // Get reviews for a specific style

export default router;