
# Huddle - Job Application System
## Overview
### Huddle is a comprehensive job application system designed to streamline the recruitment process for both job seekers and employers. Built using Node.js and Express.js, it provides a user-friendly interface for job seekers to apply for positions and for employers to manage job listings.

## Features
- User Authentication: Secure sign-up and sign-in functionality for users and employers.
- Job Listings: Employers can post job openings with detailed descriptions and requirements.
- Job Applications: Job seekers can easily apply for listed positions by submitting their details and required documents.
- Password Recovery: Forgot password functionality for users and administrators to reset their passwords securely.

## Folder Structure
- config: Contains configuration files for different environments (e.g., development, production).
- controllers: Houses controller functions responsible for handling various application logic, such as user authentication and job management.
- middleware: Middleware functions, including JWT verification for authenticated routes.
- public: Stores static assets like CSS files and client-side JavaScript files.
- services: Service modules responsible for interacting with external services or performing complex operations.
- utils: Utility functions and helper modules used across the application.
- views: HTML templates for rendering different pages of the application.
- routes: Express.js route handlers for different endpoints of the application.
## Installation
### Clone the repository:
```bash  ### Copy code
git clone [https://github.com/your-username/huddle-job-application.git](https://github.com/Couragenwanduka/Jobseeker-project.git)
```
### Install dependencies:
```bash  Copy code
npm install
```


### Usage
- Visit the landing page (/ or /Huddle) to explore the application.
- Sign up as a user or employer to access the respective features.
- Sign in with your credentials to access your account.
- View job listings (/viewjobs) and apply for positions by submitting the required application details.
- Employers can post job listings (/employer-signup) and manage their listings.
## Dependencies
- express: Fast, unopinionated, minimalist web framework for Node.js.
- jsonwebtoken: JSON Web Token implementation for Node.js.
-  bcryptjs: Library for hashing passwords.
- ejs: Embedded JavaScript templates for rendering HTML pages.
- mongoose: MongoDB object modeling tool for Node.js.
