import User from "../model/user.js";
import Employer from "../model/employer.js";
import jwt from 'jsonwebtoken';


// Middleware to verify user token
export const verifyUserToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Token not provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userEmail = decoded.email;
        // Check if token has expired
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        if (decoded.expiresIn && decoded.expiresIn < currentTime) {
            return res.status(401).json({ message: "Token has expired" });
        }
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized user' });
        }
        req.decoded = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token" });
    }
};

// Middleware to verify employer token
export const verifyEmployerToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Token not provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userEmail = decoded.email;
        // Check if token has expired
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        if (decoded.expiresIn && decoded.expiresIn < currentTime) {
            return res.status(401).json({ message: "Token has expired" });
        }
        const employer = await Employer.findOne({ email: userEmail });
        if (!employer) {
            return res.status(401).json({ message: 'Unauthorized user' });
        }
        req.decoded = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token" });
    }
};
