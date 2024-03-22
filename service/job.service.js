import Job from '../model/jobs.js';
import Employer from '../model/employer.js';

export const saveJob=async(title,company,location,description)=>{
    try{
        const job= new Job({
            title,
            company,
            location,
            description,
            
        })
      const result=await job.save();
        return result;
    }catch(error){
        console.log(error);
    }
}

export const getJob= async()=>{
   try{
    const allJob= await Job.find();
    return allJob;
   }catch(error){
    console.log(error);
   }
}

export const getEmployerDetails=async(id)=>{
    try{
        const employer= await Employer.findById(id);
        const {email}=employer
        return email;
    }catch(error){
        console.log(error);
    }
}