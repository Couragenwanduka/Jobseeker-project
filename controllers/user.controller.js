import {userDbCheck,saveuser} from'../service/user.service.js';
import {generateOTP,sendVerificationEmail,generateToken,vertifyToken} from '../utils/utils.js';

// Endpoint to send OTP verification email
export const sendOtpVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body;
        
        // Validate email
        if (!email) {
            return res.status(400).json({ error: "Please fill all the fields" });
        }

        // Generate OTP and OTP expiry
        const otpExpiry = new Date();
        otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);
        const { otp } = await generateOTP(email);

        // Send verification email
        await sendVerificationEmail(email, otp);

        // Generate JWT token with OTP and OTP expiry
        const token = generateToken(email, otp, otpExpiry);
        
        // Respond with success message and token
        res.status(200).json({ message: "Verification email sent.", token });
    } catch (error) {
        // Handle errors
        return res.status(500).json({ error: error.message });
    }
}

// Endpoint for user sign-up
export const userSignUp = async (req, res) => {
    try {
        const { email, password, firstname, lastname, gender, phonenumber, otp, token } = req.body;

        // Validate required fields
        if (!email || !password || !firstname || !lastname || !gender || !phonenumber || !otp || !token) {
            return res.status(400).json({ error: "Please fill all the fields" });
        }
        
        // Validate phone number format
        if (!/^\d{11}$/.test(phonenumber)) {
            return res.status(400).json({ error: "Please enter a valid phone number" });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }

        // Check if user already exists
        const existingUser = await userDbCheck(email);
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Verify the token and get the payload
        const { otpExpiry } = await vertifyToken(token);
        const currentTime = new Date();

        // Validate OTP and email
        if (otp !== vertifyToken.otp) {
            return res.status(400).json({ error: "Invalid OTP" });
        }
        if (email !== vertifyToken.email) {
            return res.status(400).json({ error: "Invalid email" });
        }

        // Check if OTP has expired
        if (currentTime >= new Date(otpExpiry)) {
            return res.status(400).json({ error: "OTP Expired" });
        }

        // Save user to database
        const newUser = await saveuser(email, password, firstname, lastname, gender, phonenumber);
        
        // Respond with success message and new user data
        res.status(200).json({ message: "User signed up successfully. Verification email sent.", newUser });
    } catch (error) {
        // Handle errors
        return res.status(500).json({ error: error.message });
    }
}

// Endpoint for user login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validate email and password
        if (!email || !password) {
            res.status(400).json({ message: 'please fill all the fields' });
        }
        
        // Check if user exists and password is correct
        const existingUser = await userDbCheck(email, password);  
        if (!existingUser) {
            res.status(400).json({ message: 'invalid email and password' });
        }
        
        // Respond with success message
        res.status(200).json({ message: 'user successfully logged in' });
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: error.message });
    }
}
