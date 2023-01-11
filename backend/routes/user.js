const express=require('express');
const router=express.Router();
const User=require('../models/User');
const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin}=require('../middleware/verify')
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');


//Updating User Info..
router.put('/:id',verifyTokenAndAuthorization,async(req,res)=>{
    const {username,emai,password}=req.body;
    try{
        if(password){
            const salt=await bcrypt.genSalt(10);
            const password=await bcrypt.hash(password,salt);
        }
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(updatedUser);    
    }
    catch(err){
        res.status(200).json({message:'Error while updating info..'+err});
    }
})


//Deleting User
router.delete('/:id',verifyTokenAndAuthorization,async(req,res)=>{
    try{
        const deletedUser=await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"User deleted successfully",deletedUser});
    }
    catch(err){
        res.status(400).json({message:'Error while deleting the user'+err});
    }
}) 


//Get a User
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
});


// GET all users
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    // const query=req.query.username;
    try {
      const users=await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
});

// User Data

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports=router