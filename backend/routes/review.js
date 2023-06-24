const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin,corsMiddleware } = require('../middleware/verify');
const User = require('../models/User');
const Review = require('../models/Review');

// add a review and push to reviews of product
router.post('/:productid', corsMiddleware,async (req, res) => {
    console.log(req.body);
    const productId = req.params.productid;
    const user=await User.findById(req.body.userId);
    const newReview = new Review({
        ...req.body,
        productId: productId,
        userId: req.body.userId,
        username:user.username
    });
    try {
        const savedReview = await newReview.save();
        const product = await Product.findById(productId);
        await product.updateOne({ $push: { reviews: savedReview._id } }, {
            new: true,
        });
        const products=await Product.find();
        console.log(savedReview);
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Edit a review
router.put('/:id',corsMiddleware, verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedReview);
    } catch (err) {
        res.status(500).json(err);
    }
})

// delete a review
router.delete('/:productid/:id',corsMiddleware, verifyTokenAndAuthorization, async (req, res) => {
    try {
        const product = await Product.findById(req.params.productid);
        const reviewId = req.params.id;
        await Review.findByIdAndDelete(reviewId);
        // remove review from product
        await product.updateOne({ $pull: { reviews: reviewId } });
        res.status(200).json("Review has been deleted");
    } catch (err) {
        res.status(500).json(err);
    }
})

// get a review
router.get('/:id',corsMiddleware, async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        res.status(200).json(review);
    } catch (err) {
        res.status(500).json(err);
    }
})

// get All reviews of a product
router.get('/product/:id',corsMiddleware, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        const reviews = await Promise.all(
            product.reviews.map((reviewId) => {
                return Review.findById(reviewId).sort({createdAt:-1}); // sort by createdAt in descending order latest review first
            })
        );
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json(err);
    }
})

// get All reviews of a user
// router.get('/user/:id',async(req,res)=>{
//     try{
//         const user=await User.findById(req.params.id);
//         const reviews=await Promise.all(
//             user.reviews.map((reviewId)=>{
//                 return Review.findById(reviewId);
//             })
//         );
//         res.status(200).json(reviews);
//     }catch(err){
//         res.status(500).json(err);
//     }
// });

module.exports = router;
