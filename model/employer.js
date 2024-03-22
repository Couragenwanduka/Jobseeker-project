import mongoose from "mongoose";

const employerSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String,
        required:true
    },
    companyname:{
        type:String,
        required:true
    },

})
const Employer= mongoose.model('employer',employerSchema);

export default Employer;