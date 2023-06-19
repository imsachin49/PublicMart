const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
    title:{ 
        type: String,
        required: true,
    },
    desc:{ 
        type: String, 
        required: true,
        unique: true 
    },
    company:{
        type:String,
        required:true
    },
    img:{ 
        type: String, 
        required: true 
    },
    categories:{ 
        type: Array 
    },
    size:{ 
        type: Array 
    },
    color:{ 
        type: Array 
    },
    price:{ 
        type: Number, 
        required: true 
    },
    availability:{ 
        type: Boolean, 
        default: true 
    },
},{timestamps:true})

const Product=mongoose.model("Product",productSchema);
module.exports=Product
