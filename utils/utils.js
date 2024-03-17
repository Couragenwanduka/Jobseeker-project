import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
dotenv.config();

// Function to hash the given password using bcrypt
export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
};

// Transporter configuration for sending emails
const transport = nodemailer.createTransport({
    host: process.env.SMTPHOST,
    port: Number(process.env.SMTPPORT) || 465,
    secure: true,
    auth: {
        user: process.env.SMTPUSERNAME,
        pass: process.env.SMTPPASSWORD,
    },
    tls: {
        minVersion: 'TLSv1',
    },
});

// Function to generate a random OTP and associate it with the given email
export const generateOTP = async (email) => {
    const otp = Math.floor(Math.random() * 399999 + 300000).toString();
    return { otp, email };
};

// Function to send a verification email with the OTP
export const sendVerificationEmail = async (email, otp) => {
    try {
        await transport.sendMail({
            from: process.env.SMTPUSERNAME,
            to: email,
            subject: 'Account Verification',
            text: `Your OTP for account verification is: ${otp}`,
        });
        console.log('Verification email sent successfully!');
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Error sending verification email');
    }
};

// Function to generate a JWT token with the provided payload and expiry time
export const generateToken = async (email, otp, otpExpiry) => {
    const payload = {
        email,
        otp,
        otpExpiry,
    };
    const token = jwt.sign(payload, process.env.secretKey, { expiresIn: '1h' });
    return token;
};

// Function to verify the JWT token and return the decoded payload
export const vertifyToken = async (token) => {
    // const token = req.headers.authorization.split(' ')[1]; 
    try {
        const decoded = jwt.verify(token, process.env.secretKey);
        return decoded;
    } catch (error) {
        console.error('Error verifying token:', error);
        throw new Error('Error verifying token');
    }
};
