import { userValidation, validateLogin, comparePassword } from '../utils/utils.js';
import { userDbCheck, saveuser} from '../service/user.service.js';
import jwt from 'jsonwebtoken'

// User signup endpoint
export const signup = async (req, res) => {
    const { firstname, lastname, email, password,phonenumber} = req.body;
    try {
        // Check if user already exists
        const existingUser = await userDbCheck(email);
        if (existingUser) {
            return res.status(400).json({ message: "Existing user" });
        }

        // Validate user input
        const result = userValidation(firstname, lastname, email, password,phonenumber);
        if (result.error) {
            return res.status(400).json({ error: result.error, message: result.message });
        }

        // Save user to the database
        await saveuser(firstname, lastname, email, password,phonenumber);
        res.redirect('/signin')
    } catch (error) {
        // Handle errors
        console.error('Error occurred during user signup:', error);
        return res.status(500).json({ error: "An internal server error occurred" });
    }
};

// User login endpoint
export const signin = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        // Validate user input
        const validation = validateLogin(email, password);
        if (validation.error) {
            return res.status(400).json({ error: validation.error, message: validation.message });
        }

        // Compare provided password with hashed password in the database
        const loginLogic = await comparePassword(email, password);
        console.log(loginLogic)
        if (!loginLogic.loginUser) {
            return res.status(400).json({ error: loginLogic.error, message: loginLogic.message });
        }
        if (!loginLogic.match) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate JWT token for authentication
        const loggedInUserEmail = await loginLogic.loginUser.email; // Rename the inner variable
        const token = jwt.sign({ email: loggedInUserEmail }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });

        // Respond with successful login message
        res.redirect('/viewjobs');
        // return res.status(200).json({ message: 'User successfully logged in', loginUser: loginLogic.loginUser });
    } catch (error) {
        // Handle errors
        console.error('Error occurred during user login:', error);
        return res.status(500).json({ error: "An internal server error occurred" });
    }
};
