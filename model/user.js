import mongoose from 'mongoose';
const userDb= mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String,
        required:true
    }

});

const User= mongoose.model('User',userDb);

export default User;