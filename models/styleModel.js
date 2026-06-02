import mongoose from 'mongoose';

const styleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true }, // Image URL or Cloudinary path
    description: { type: String, required: true },
    averageRating: { type: Number, default: 0 }
}, { timestamps: true });

const Style = mongoose.model('Style', styleSchema);
export default Style;