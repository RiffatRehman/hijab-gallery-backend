import express from 'express';
import { registerUser, authUser } from '../controllers/userController.js';

const router = express.Router();

// 🔥 ISLINE KO BADLA HAI: Ab full URL banega /api/users
router.post('/', registerUser); 

// 🔥 Iska full URL banega /api/users/login (Check karein Frontend ke Login.jsx me yahi ho)
router.post('/login', authUser);

export default router;