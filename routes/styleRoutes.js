import express from 'express';
import { getStyles, getStyleById, createStyle } from '../controllers/styleController.js';
import { createStyleReview, deleteStyleReview } from '../controllers/reviewController.js'; 
import { protect } from '../middleware/authMiddleware.js'; // 🔥 Sirf protect rehne diya
import { upload } from '../config/cloudinaryConfig.js';

const router = express.Router();

// 1. Base Routes (Get all styles & Create style)
// 🔥 Yahan se bhi admin hata diya, ab normal logged-in user bhi upload test kar sakega
router.route('/').get(getStyles).post(protect, upload.single('image'), createStyle);

// 2. Single Style Route (Get style by ID)
router.route('/:id').get(getStyleById);

// 3. Reviews Routes (Add & Delete Review)
router.route('/:id/reviews').post(protect, createStyleReview);
router.route('/:id/reviews/:reviewId').delete(protect, deleteStyleReview);

export default router;