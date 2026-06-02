import Style from '../models/styleModel.js';
import Review from '../models/reviewModel.js';
import { cloudinary } from '../config/cloudinaryConfig.js';

// @desc    Get all hijab styles
// @route   GET /api/styles
export const getStyles = async (req, res) => {
    try {
        const styles = await Style.find({});
        res.json(styles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single hijab style by ID (With Reviews Linked)
// @route   GET /api/styles/:id
export const getStyleById = async (req, res) => {
    try {
        const style = await Style.findById(req.params.id);
        
        if (style) {
            const reviews = await Review.find({ style: req.params.id }).sort({ createdAt: -1 });
            const styleData = style.toObject();
            styleData.reviews = reviews;
            res.json(styleData);
        } else {
            res.status(404).json({ message: 'Style not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a hijab style (With Cloudinary Image Upload)
// @route   POST /api/styles
export const createStyle = async (req, res) => {
    const { name, description } = req.body;

    try {
        // Check if file is uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload an image file' });
        }

        // Uploading buffer directly to Cloudinary
        const uploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: 'hijab-gallery' },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(req.file.buffer);
        });

        // Save real Cloudinary URL to database
        const style = new Style({ 
            name, 
            image: uploadResult.secure_url, 
            description 
        });

        const createdStyle = await style.save();
        res.status(201).json(createdStyle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};