const express=require('express');
const router=express.Router();
const Cart=require('../models/Cart');
const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin}=require('../middleware/verify')

//Crreate Cart
router.post('/',verifyToken,async(req,res)=>{
    const newCart=new Cart(req.body);
    try{
        const cart=await newCart.save();
        res.status(200).json(cart);
    }catch(err){
        res.status(500).json({message:'creating in cart'+err})
    }
})

//get user cart
router.get('/find/:userId',verifyTokenAndAuthorization,async(req,res)=>{
    try{
        const userCart=await Cart.findOne({userId:req.params.userId});
        if(userCart){
            res.status(200).json(userCart);
        }
        else{
            res.status(200).json({msg:"userCart is empty"});            
        }
    }catch{
        res.status(400).json({message:'error in getting user cart'+err});
    }
    // res.status(200).json({msg:"hello"})
})

//Update Cart
router.put('/:id',verifyTokenAndAuthorization,async(req,res)=>{
    try{
        const updatedCart=await Cart.findOneAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(updatedCart);
    }
    catch(err){
        res.status(400).json({message:'error in updating the cart'+err});
    }
})

//Deleting Cart
router.delete('/:id',verifyTokenAndAuthorization,async(req,res)=>{
    try{
        const deletedCart=await Cart.findByIdAndDelete(req.params.id);  //if fails findOneAndDelete 
        res.status(200).json({message:'cart deleted successfully'+deletedCart});
    }catch(err){
        res.status(400).json({message:'error in deleting the cart'+err});
    }
})

//get all carts
router.get('/',verifyTokenAndAdmin,async(req,res)=>{
    try{
        const allCart=await Cart.find().sort({createdAt:-1});
        res.status(200).json(allCart);
    }catch(err){
        res.status(400).json({message:'error in getting all cart'+err});
    }
}) 

module.exports=router