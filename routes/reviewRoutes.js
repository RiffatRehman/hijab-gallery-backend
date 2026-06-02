import express from 'express';
import { createReview, getReviewsByStyle } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createReview); // Check token before adding review
router.route('/:styleId').get(getReviewsByStyle);

export default router;