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


// // add multiple Product at once or json file
// router.post('/postMany',async(req,res)=>{
//     try{
//         const products=await Product.insertMany(req.body);
//         console.log(products);
//         res.status(200).json(products);
//     }
//     catch(err){
//         res.status(400).json(err);
//     }
// })

//GET All_ITEMS
router.get('/',async(req,res)=>{
    const category=req.query.category;
    const userId=req.query.userId;
    
    try{
        let products;
        if(userId){
            products=await Product.find({userId:userId})
            res.status(200).json(products);
         }
        else if(category){
            products=await Product.find({categories:{$in:[category]}});
            res.status(200).json(products);
        }
        else{
            products=await Product.find();
            // total
            const total=products.length;
            let page=Number(req.query.page) || 1;
            let limit=Number(req.query.limit) || 10;
            let skip=(page-1)*limit;
            const paginatedProducts=products.slice(skip,skip+limit);
            
            // for random retrivel of products 
            // products=await Product.aggregate([
            //     { $sample: { size: 100 } } // Replace "10" with the desired number of random documents
            //   ]).exec();
              
            res.status(200).json({paginatedProducts,total});
        }
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

//for Query using regex later part and case insensitive search\
router.get('/search',async(req,res)=>{
    const title=req.query.title;
    try{
        const products=await Product.find({title:{$regex:title,$options:'$i'}});
        res.status(200).json(products);
    }
    catch(err){
        res.status(400).json({message:'error in getting the product'+err});
    }
})

// for like and dislike the product by users
router.put('/:id/like',async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        if(!product.likes.includes(req.body.userId)){
            console.log(req.body.userId)
            // update likes
            await product.updateOne({$push:{likes:req.body.userId}},{new:true});
            console.log(product);
            res.status(200).json({message:'the product has been liked',product});
        }
        else{
            await product.updateOne({$pull:{likes:req.body.userId}},{new:true});
            res.status(200).json({message:'the product has been disliked'});
        }
    }
    catch(err){
        res.status(400).json({message:'error in liking the product'+err});
    }
})

// for getting the liked products by the user
router.get('/likedProducts/:userId',verifyToken,async(req,res)=>{
    try{
        const products=await Product.find({likes:{$in:[req.params.userId]}});
        res.status(200).json(products);
    }
    catch(err){
        res.status(400).json({message:'error in getting the liked products'+err});
    }
})

module.exports=router
