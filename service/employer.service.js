import Employer from '../model/employer.js';
import {hashPassword} from '../utils/utils.js';

export const employerDbCheck= async(email)=>{
    const employerDb= await Employer.findOne({email});
    return employerDb;
}
export   const updatePasswordAdim= async (userid, password) => {
    const hashedPassword = await hashPassword(password);
    const updatedUser = await Admin.findOneAndUpdate({_id:userid},{password:hashedPassword},{new:true})
    return updatedUser;
}

export const saveEmployer= async(name, email, password, phonenumber, companyname)=>{
    try{
        const hashedPassword = await hashPassword(password);
    const newEmployer= new Employer({
        email,
        password: hashedPassword,
        name,
        phonenumber,
        companyname
    })
   const save= newEmployer.save();
   return save;
    }catch(error){
        throw error;
    }
}

