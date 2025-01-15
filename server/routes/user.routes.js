import express from 'express';
const router = express.Router();
import { loginUser,registerUser,logoutUser,getProfile } from '../controllers/user.controller.js';

// API endpoints

router.post('/login',loginUser);
router.post('/register',registerUser);
router.get('/logout',logoutUser);
router.get('/getprofile',getProfile);
export default router;