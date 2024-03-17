import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


 const connectDb= async()=>{
   try{
      await mongoose.connect(process.env.MongoDb);
      console.log('Connected to MongoDB');
    }catch(error){
        console.log('Error connecting to MongoDB',error);
        throw error;
    }
};

export default connectDb;