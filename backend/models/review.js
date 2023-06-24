const mongoose=require('mongoose');
const reviewSchema=new mongoose.Schema({
    productId:{type:String,required:true},
    userId:{type:String,required:true},
    rating:{type:Number,default:5},
    review:{type:String,required:true},
    username:{type:String,required:true}
},
{timestamps:true}
);

module.exports=mongoose.model('Review',reviewSchema);
