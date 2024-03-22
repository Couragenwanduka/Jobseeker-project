import mongoose from "mongoose";
import Employer from "./employer.js";

const jobSchema =({
    title: {
        type: String,
        required: true
        
    },
    company: {
        type: mongoose.Types.ObjectId,
        ref:Employer,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Job = mongoose.model("Job", jobSchema);

export default Job;