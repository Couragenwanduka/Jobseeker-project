import User from '../model/user.js'
import {hashPassword} from '../utils/utils.js'

// Function to check if a user with the given email exists in the database
export const userDbCheck = async (email) => {
    // Find a user by their email in the User model
    const userDb = await User.findOne({ email: email});
    // Return the user object or null if not found
    return userDb;
}

export   const updatePassword= async (userid,password) => {
    const hashedPassword = await hashPassword(password);
    const updatedUser = await User.findOneAndUpdate({_id:userid},{password:hashedPassword},{new:true})
    return updatedUser;
}
// Function to save a new user to the database
export const saveuser = async (firstname, lastname, email, password,phonenumber) => {
    try {
        // Hash the password before saving it to the database
        const hashedPassword = await hashPassword(password);
        
        // Create a new User object with the provided data
        const user = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            phonenumber,
        });
        
        // Save the new user to the database
        const result = await user.save();
        
        // Log the result (for debugging purposes)
        console.log(result);
    } catch (error) {
        // Throw any errors encountered during the process
        throw error;
    }
}

