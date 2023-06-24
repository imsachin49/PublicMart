//USE PUBLISHABLE KEY IN FRONTEND SIDE AND SECRET KEY IN SERVER SIDE..
const express=require('express');
const router=express.Router();
const KEY=process.env.STRIPE_KEY;
const stripe=require('stripe')(KEY)
const { v4: uuidv4 } = require('uuid');
const {corsMiddleware}=require('../middleware/verify')

router.post('/payment',corsMiddleware, async (req, res) => {
    console.log(req.body.token);
    const {token,amount}=req.body;
    const idempotencyKey = uuidv4();

    return stripe.customers.create({
        email: token.email,
        source: token
    }).then(customer=>{
        stripe.changes.create({
            amount: amount*100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
        },{idempotencyKey})
    }).then(result=>{
        res.status(200).json(result)
    }).catch(err=>{
        console.log(err)
    })
})

// router.post('/payment',(req,res)=>{
//     stripe.charges.create(
//        {
//             source:req.body.tokenId,
//             amount: req.body.amount,
//             currency: "INR",
//        },
//        (stripeErr,stripeRes)=>{
//             if(stripeErr){
//                 res.status(500).json(stripeErr);
//                 console.log(stripeErr)
//             }
//             else{
//                 res.status(200).json(stripeRes);
//                 console.log(stripeRes)
//             }
//        }
//     )
// })


// router.post('/payment', async (req, res) => {
//     const session = await stripe.checkout.sessions.create({
//         line_items: [
//             {
//                 price_data: {
//                     currency: 'usd',
//                     product_data: {
//                         name: 'T-shirt',
//                     },
//                     unit_amount: 2000,
//                 },
//                 quantity: 1,
//             },
//         ],
//         mode: 'payment',
//         success_url: 'http://localhost:3000/success',
//         cancel_url: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.searchenginejournal.com%2Fwp-content%2Fuploads%2F2020%2F08%2Fkiller-404-page-disney-5f3d563a47cff.png&imgrefurl=https%3A%2F%2Fwww.searchenginejournal.com%2F404-page-examples%2F211154%2F&tbnid=zK257dTsV_73UM&vet=12ahUKEwiXoeDOkML8AhUwjtgFHTPsCkoQMygBegUIARDiAQ..i&docid=A3TElsevwM7BgM&w=1394&h=746&q=404%20page&ved=2ahUKEwiXoeDOkML8AhUwjtgFHTPsCkoQMygBegUIARDiAQ',
//     });
    
//     res.redirect(303, session.url);
// });

module.exports=router