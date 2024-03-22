import { validation, validateLogin,compareEmployerPassword } from '../utils/utils.js';
import { employerDbCheck, saveEmployer, } from '../service/employer.service.js';
import jwt from 'jsonwebtoken'

export const employerSignup = async (req, res) => {
    const { name, email, password, phonenumber, companyname } = req.body;
    try {
        const existingUser = await employerDbCheck(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const result = validation(name, email, password, phonenumber, companyname);
        if (result.error) {
            return res.status(400).json({ error: result.error, message: result.message });
        }

        const newEmployer = await saveEmployer(name, email, password, phonenumber, companyname);
        res.redirect('/employer-login')
    } catch (error) {
        console.error('Error occurred during signup:', error);
        return res.status(500).json({ message: 'An internal server error occurred' });
    }
};

export const employerLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const validation = validateLogin( email, password);
        if (validation.error) {
            return res.status(400).json({ error: validation.error, message: validation.message });
        }

        const loginLogic = await compareEmployerPassword(email, password);
        if (!loginLogic.loginUser) {
            return res.status(400).json({ message: 'Invalid email' });
        }
        if (!loginLogic.match) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const loggedInUserEmail = await loginLogic.loginUser.email; // Rename the inner variable
        const token = jwt.sign({ email: loggedInUserEmail }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });

        res.redirect('jobs');
    } catch (error) {
        console.error('Error occurred during login:', error);
        return res.status(500).json({ message: 'An internal server error occurred' });
    }
};
