import Review from '../models/reviewModel.js';
import Style from '../models/styleModel.js';

// @desc    Create a new review (For styleRoutes)
export const createStyleReview = async (req, res) => {
    const { comment, rating } = req.body;
    try {
        const style = await Style.findById(req.params.id);
        if (!style) return res.status(404).json({ message: 'Style not found' });

        const review = await Review.create({
            user: req.user._id,
            name: req.user.name,
            style: req.params.id,
            comment,
            rating: rating ? Number(rating) : 5 
        });

        // Database updates style timestamp
        await style.save();
        
        res.status(201).json({ message: 'Review added successfully', review });
    } catch (error) { 
        res.status(500).json({ message: error.message }); 
    }
};

// @desc    Create review alias (For reviewRoutes - fallback)
export const createReview = createStyleReview;

// @desc    Get reviews for a specific style
export const getReviewsByStyle = async (req, res) => {
    try {
        const reviews = await Review.find({ style: req.params.styleId || req.params.id }).populate('user', 'name');
        res.json(reviews);
    } catch (error) { 
        res.status(500).json({ message: error.message }); 
    }
};

// @desc    Delete a review
export const deleteStyleReview = async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.reviewId);
        res.json({ message: 'Review removed successfully' });
    } catch (error) { 
        res.status(500).json({ message: error.message }); 
    }
};