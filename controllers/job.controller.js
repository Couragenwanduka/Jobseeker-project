import {employerDbCheck} from '../service/employer.service.js';
import {jobValidation} from '../utils/utils.js';
import {saveJob,getJob,getEmployerDetails} from '../service/job.service.js';
import main from '../config/nodemailer.js'



export const Job = async (req, res) => {
    try {
        const { title, email, location, description } = req.body;
        
        // Validate job data
        const jobValidate = jobValidation(title, email, location, description);
        if (!jobValidate) {
            return res.status(400).json({ error: 'Validation error', message: 'Invalid job data' });
        }

        // Check if employer exists
        const existingUser = await employerDbCheck(email);
        if (!existingUser) {
            return res.status(400).json({ error: 'Employer not found', message: 'No employer found with the provided email' });
        }

        // Save job
        const company = existingUser._id;
        const job = await saveJob(title,company, location, description);
        console.log(job);
        // Send response
        return res.status(200).json({ message: 'Job successfully saved', job });
    } catch (error) {
        console.error('Error occurred during job save:', error);
        return res.status(500).json({ error: 'Internal server error', message: 'An internal server error occurred' });
    }
};

export const getAllJob = async(req, res) =>{
    try{
       const job= await getJob();
       if(!job){
        return res.status(400).json({error:"error getting job"});
       }
       return res.status(200).json({job});
    }catch(error){
        console.error('Error occurred', error);
        return res.status(500).json({ error: 'internal server error', message: 'An internal server error occurred' });
    }
};

export const searchJob= async(req, res) =>{
    try{
       const {title}=req.body;
       const job= await getJob(title);
       if(!job){
        return res.status(400).json({error:"no job found"});
       }
       return res.status(200).json({job});
    }catch(error){
        console.error('Error occurred', error);
        return res.status(500).json({ error: 'internal server error', message: 'An internal server error occurred' });
    }
};

export const jobapplication=async(req,res)=>{
    try{
        const{id,jobapplication}=req.body
      const employerEmail= await getEmployerDetails(id)
      await main(employerEmail,jobapplication)

     res.status(200).send({message: 'Job application was successfully'});
    }catch(error){
        console.error('Error occurred', error);
        return res.status(500).json({ error: 'internal server error', message: 'An internal server error occurred' });
    }

}