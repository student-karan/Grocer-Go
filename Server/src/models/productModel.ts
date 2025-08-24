import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    category:{
        type:String,
        enum: ["Vegetables","Fruits","Drinks","Instant","Dairy","Bakery","Grains"]
    },
    price:{
        type:Number,
        required:true
    },
    offerPrice:{
        type:Number,
        required:true
    },
    image:{
        type:[String],
        required:true,
    },
    description:{
        type:[String],
        required:true,
    },
    inStock:{
        type:Boolean,
        required:true,
        default:true
    }
},{timestamps:true});

const Product = mongoose.model("Product",productSchema);

export default Product;

