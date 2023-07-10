const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    googleId:{
        type:String
    },
    githubId:{
        type:String
    },
    username:{
        type:String,
        required:true,
        // unique:true
    },
    email:{
        type:String,
        // required:true,
        // unique:true
    },
    password:{
        type:String,
        // required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    userimg:{
        type:String,
    },
    dateOfBirth:{
        type:String,
    },
    phoneNo:{
        type:String,
    },
    address:{
        type:String,
    },
},{timestamps:true})

const User=mongoose.model("User",userSchema);
module.exports=User
