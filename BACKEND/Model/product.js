const mongoose =require ('mongoose');

const productSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discountPercent:{
        type:Number,
        required:false
    },
    rating:{
        type:Number,
        required:false,
    },
    stock: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: false
    },
    images: {
        type: [String],
        required: false
    }

});
const PRODUCT=mongoose.model('PRODUCT',productSchema);
module.exports=PRODUCT;