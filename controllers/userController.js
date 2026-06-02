import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// Token generator helper function (Safe check ke sath)
const generateToken = (id) => {
    // Agar process.env.JWT_SECRET nahi milega toh 'secret123' use hoga taake crash na ho
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', { expiresIn: '30d' });
};

// @desc    Register a new user
// @route   POST /api/users
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // 1. Validation check
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        // 2. Email verification
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // 3. User Creation
        const user = await User.create({ name, email, password });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid user data received' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Auth user & get token (Login)
// @route   POST /api/users/login
export const authUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Please enter email and password' });
        }

        // 1. Database mein email check krain
        const user = await User.findOne({ email });

        // 🔥 Agar user nahi mila, to yeh error jaye ga:
        if (!user) {
            return res.status(404).json({ message: 'User does not exist. Please signup first!' });
        }

        // 2. User milne par password match krain
        const isMatch = await user.matchPassword(password);
        if (isMatch) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            // 🔥 Agar sirf password galat ho, to yeh error jaye ga:
            res.status(401).json({ message: 'Invalid password. Please try again.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};