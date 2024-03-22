import {userDbCheck,updatePassword} from '../service/user.service.js'
import {employerDbCheck,updatePasswordAdim} from '../service/employer.service.js'



export const findUser=async(req,res)=>{
    try{
     const {email}=req.body;
     if(!email){
         return res.status(400).json({message:"Please provide email"});
     }
     const existingUser = await userDbCheck(email)
     if(!existingUser){
         return res.status(400).json({message:"User does not exist"});
     }
     res.redirect('/user/recoverpassword')
    }catch(error){
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const forgotPassword= async (req, res) => {
    try{
       const{email,password}=req.body;
       const existingUser = await userDbCheck(email)
       const userid= existingUser._id;
       const updatedUser = await updatePassword(userid,password)
       if(!updatedUser){
           return res.status(400).json({ message:"couldn't update password"});
       }
       return res.status(200).json(updatedUser);

    }catch(error){
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const findAdim=async(req,res)=>{
    try{
     const {email}=req.body;
     if(!email){
         return res.status(400).json({message:"Please provide email"});
     }
     const existingUser = await employerDbCheck(email)
     if(!existingUser){
         return res.status(400).json({message:"User does not exist"});
     }
     res.redirect('/employer/recoverpassword')
    }catch(error){
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const forgotPasswordAdim= async (req, res) => {
    try{
       const{email,password}=req.body;
       const existingUser = await employerDbCheck(email)
       const userid= existingUser._id;
       const updatedUser = await updatePasswordAdim(userid,password)
       if(!updatedUser){
           return res.status(400).json({ message:"couldn't update password"});
       }
       return res.status(200).json(updatedUser);

    }catch(error){
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}