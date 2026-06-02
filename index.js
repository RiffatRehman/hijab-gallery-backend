import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'; // Route import kiya
import styleRoutes from './routes/styleRoutes.js'; // Import Style Routes
import reviewRoutes from './routes/reviewRoutes.js'; // Import Review Routes

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json()); // Request body parse karne ke liye zaroori hai

 
// Routes
app.use('/api/users', userRoutes);
app.use('/api/styles', styleRoutes);
app.use('/api/reviews', reviewRoutes);

app.get('/', (req, res) => {
    res.send('API is running successfully...');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));