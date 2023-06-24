const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../models/User');
const {corsMiddleware}=require('../middleware/verify')
//Register User
router.post('/register',corsMiddleware,async(req,res)=>{
    const {
        username,
        email,
        password,
    }=req.body;
    
    if(!username || !email || !password){
        res.status(400).json({message:'All field are Required'});
    }
    
    const isExisting=await User.findOne({email});

    if(isExisting){
        res.status(500).json({message:'User already exist'});
    }

    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt); //req.body.password

    const newUser=new User({
        username,
        email,
        password:hashedPassword,
    })

    try{
        const savedUser=await newUser.save();
        res.status(200).json({savedUser});
    }
    catch(err){
        res.status(401).json({message:'Error in saving user'+err})
    }

})


//Login User
router.post('/login',corsMiddleware,async(req,res)=>{
    try{
        const { email, password } = req.body;
        const user=await User.findOne({email});
        console.log(user)

        if(!email || !password){
            res.status(400).json({message: 'Please enter all fields'});
        }
        
        if(!user){
            res.status(400).json({message: 'User does not exist'});
        }
        
        const validPwd=await bcrypt.compare(password,user.password);

        if(!validPwd){
            res.status(500).json({message: 'Invalid credentials'});
        }

        const accessToken = jwt.sign(
            {
              id: user._id,
              isAdmin: user.isAdmin,
            },
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        );        

        res.status(200).json({
                user:{
                id:user._id,
                username:user.username,
                email:user.email,
                isAdmin:user.isAdmin,
                // restricting password
            },accessToken});
            console.log("done with login")
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports=router
