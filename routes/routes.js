import express from 'express';
import {login,userSignUp,sendOtpVerificationEmail} from'../controllers/user.controller.js';


const router = express.Router();

// Route to send OTP verification email
router.post('/sendOtp', sendOtpVerificationEmail);

// Route to sign up a new user
router.post('/signUp', userSignUp);

// Route to handle user login
router.post('/login', login);

export default router;
