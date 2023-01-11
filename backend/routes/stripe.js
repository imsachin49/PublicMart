//USE PUBLISHABLE KEY IN FRONTEND SIDE AND SECRET KEY IN SERVER SIDE..
const express=require('express');
const router=express.Router();
const KEY=process.env.STRIPE_KEY;
const stripe=require('stripe')(KEY)

router.post('/payment',(req,res)=>{
    stripe.charges.create(
       {
            source:req.body.tokenId,
            amount: req.body.amount,
            currency: "usd",
       },
       (stripeErr,stripeRes)=>{
            if(stripeErr){
                res.status(500).json(stripeErr);
            }
            else{
                res.status(200).json(stripeRes);
            }
       }
    )
})

module.exports=router
