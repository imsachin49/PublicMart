const express=require('express');
const router=express.Router();
const Order=require('../models/Order');
const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin,corsMiddleware}=require('../middleware/verify')

//NEW ORDER
router.post('/',corsMiddleware,verifyToken,async(req,res)=>{
    const newOrder=new Order(req.body);
    try{
        const savedOrder=await newOrder.save();
        res.status(200).json(savedOrder);
    }    
    catch(err){
        res.status(500).json({message:'Error in new order'+err});
        console.log(err)
    }
})

//GET All_ORDERS
router.get('/',corsMiddleware,verifyToken,async(req,res)=>{
    try{
        const orders=await Order.find();
        if(!orders){
            res.status(500).json({message:"No order found"});
        }
        res.status(200).json(orders);
    }
    catch(err){
        res.status(400).json(err);
    }
})

//GET USER ORDERS
router.get("/find/:userId",corsMiddleware,verifyTokenAndAuthorization,async(req, res)=>{
    try{
      const orders =await Order.find({userId:req.params.userId});
      res.status(200).json(orders);
    } catch(err){
      res.status(500).json(err);
    }
});

//UPDATE ORDER
router.put('/:id',corsMiddleware,verifyTokenAndAdmin,async(req,res)=>{
    try{
        const updatedOrder=await Order.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(updatedOrder)
    }
    catch(err){
        res.status(400).json({message:'can not update'+err});
    }
})

//DELETE ITEM
router.delete('/:id',corsMiddleware,verifyTokenAndAdmin,async(req,res)=>{
    try{
        const deletedOrder=await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({message:'Your order has been deleted successfully'+deletedOrder});
    }
    catch(err){
        res.status(400).json({message:'error in deleting the order'+err});
    }
})

// GET MONTHLY INCOME
router.get("/income", corsMiddleware,verifyTokenAndAdmin, async (req, res) => {
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  
    try {
      const income = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: previousMonth },
            ...(productId && {
              products: { $elemMatch: { productId } },
            }),
          },
        },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

module.exports=router
