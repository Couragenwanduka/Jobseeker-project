// Import necessary modules and controllers
import express from 'express';
import { signup, signin } from '../controllers/user.controller.js';
import { employerSignup, employerLogin } from '../controllers/employer.controller.js';
import { Job, getAllJob, jobapplication } from '../controllers/job.controller.js';
import { verifyEmployerToken, verifyUserToken } from '../middleware/jwt.js';
import { findUser, findAdim, forgotPassword, forgotPasswordAdim} from '../controllers/forgetpassword.controller.js';

const router = express.Router();

// Define routes
router.get('/Huddle', (req, res) => {
    res.render('landingpage');
});

router.get('/', (req, res) => {
    res.render('landingpage');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/signin', (req, res) => {
    res.render('signin');
});

router.get('/employer-signup', (req, res) => {
    res.render('employer-signup');
});

router.get('/employer-login', (req, res) => {
    res.render('employer-login');
});

router.get('/viewjobs', (req, res) => {
    res.render('viewjobs');
});

router.get('/displayJob', verifyUserToken, getAllJob); // Route to fetch all job listings

router.get('/forgotpassword', (req, res) => {
    res.render('forgotpassword');
});

router.post('/forgotpassword', findUser);

router.get('/adminforgotpassword', (req, res) => {
    res.render('adminforgotpassword');
});

router.post('/adminforgotpassword', findAdim);

router.get('/recoverpassword', (req, res) => {
    res.render('recoverpassword');
});

router.patch('/recoverpassword', forgotPassword);

router.get('/adimrecoverpassword', (req, res) => {
    res.render('adimrecoverpassword');
});

router.patch('/adimrecoverpassword', forgotPasswordAdim);

router.post('/displayJob', verifyUserToken, jobapplication); // Route to handle job applications

router.post('/signup', signup); // Route to sign up a new user

router.post('/signin', signin); // Route to handle user login

router.post('/employer-signup', employerSignup);

router.post('/employer-login', employerLogin);

router.get('/jobs',(req, res)=>{
    res.render('jobs');
})

router.post('/jobs', verifyEmployerToken, Job);

router.get('/*', (req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

export default router;
