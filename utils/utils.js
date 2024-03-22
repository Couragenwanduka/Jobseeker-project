import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import {joiSchema,joiJobSchema,joiUserSchema,joivalidationSchema} from '../config/joi.config.js'
import  {userDbCheck} from '../service/user.service.js'
import {employerDbCheck} from '../service/employer.service.js'
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
export const comparePassword =async (email, password)=>{
    try{
        const loginUser= await userDbCheck(email);
      const match = await new Promise((resolve, reject) => {
        bcrypt.compare(password,loginUser.password,(error,outCome)=>{
        if(error){
            reject(error);
        }else{
            resolve(outCome);
        }
    })
});
  return {match , loginUser};
  }catch(error){
     throw error;
  }
}

export const compareEmployerPassword =async (email, password)=>{
    try{
        const loginUser= await employerDbCheck(email);
      const match = await new Promise((resolve, reject) => {
        bcrypt.compare(password,loginUser.password,(error,outCome)=>{
        if(error){
            reject(error);
        }else{
            resolve(outCome);
        }
    })
});
  return {match , loginUser};
  }catch(error){
     throw error;
  }
}
export const validation=(name, email, password, phonenumber, companyname)=>{
    try{
        const result = joiSchema.validate({
            name,
            email,
            password,
            phonenumber,
            companyname,
           
        });
        return result;
    }catch(error){
        console.log(error);
        throw error
    }
}
export const jobValidation=(title,email,location,description)=>{
    try{
        const result =joiJobSchema.validate({
            email,
            title,
            location,
            description
           
        });
        return result;
    }catch(error){
        console.log(error);
        throw error
    }

}
export const userValidation=(firstname, lastname, email, password,phonenumber)=>{
    try{
        const result =joiUserSchema.validate({
           firstname,
            lastname,
            email,
            password,
            phonenumber
           
        });
        return result;
    }catch(error){
        console.log(error);
        throw error
    }
}

export const validateLogin=(email, password)=>{
    try{
        const result = joivalidationSchema.validate({
            email,
            password
        });
        return result;
    }catch(error){
        console.log(error);
        throw error
    }
}