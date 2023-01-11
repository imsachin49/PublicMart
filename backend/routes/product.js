const express=require('express');
const router=express.Router();
const Product=require('../models/Product');
const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin}=require('../middleware/verify');

//NEW Product
router.post('/',verifyTokenAndAdmin,async(req,res)=>{
    const createdProduct=new Product(req.body);
    try{
        const product=await createdProduct.save();
        res.status(200).json(product);
    }    
    catch(err){
        res.status(500).json({message:'Error in creating the product'+err});
        console.log(err)
    }
})


//GET All_ITEMS
router.get('/',async(req,res)=>{
    const category=req.query.category;
    const userId=req.query.userId;

    try{
        let products;
        if(userId){
            products=await Product.find({userId:userId})
         }
        else if(category){
            products=await Product.find({categories:{$in:[category]}});
        }
        else{
            products=await Product.find();
        }
        res.status(200).json(products);
    }
    catch(err){
        res.status(400).json(err);
    }
})

//GET ITEM
router.get('/find/:id',async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        res.status(200).json(product);
    }
    catch(err){
        res.status(400).json({message:'error in getting the product'+err});
    }
})

//UPDATE ITEM
router.put('/:id',verifyTokenAndAdmin,async(req,res)=>{
    try{
        const Updatedproduct=await Product.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(Updatedproduct)
    }
    catch(err){
        res.status(400).json({message:'can not update'+err});
    }
})

//DELETE ITEM
router.delete('/:id',verifyTokenAndAdmin,async(req,res)=>{
    try{
        const deletedProduct=await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({message:`product with title ${deletedProduct.title} has been deleted successfully`});
    }
    catch(err){
        res.status(400).json({message:'error in deleting the product'+err});
    }
})

//for Query using regex later part


module.exports=router
