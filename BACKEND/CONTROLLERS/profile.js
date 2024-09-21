const express = require('express');
const USER= require('../Model/user');
const PRODUCT = require('../Model/product');
const router= express.Router();
// const {authenticateUser, authorizeUser}= require('../MIDDLEWARES/user');


const getProfile = async(req,res)=>{
    try {
        const user= await USER.findById(req.userId).select('-password');
        if(!user) return res.status(404).json({messgae:'User not found'});

        let products=[];
        if(user.role=='manufacturer'){
            products = await PRODUCT.find({manufacturerId:user._id}).limit(5);
        }
        res.json({user,products});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Server Error'});
        
    }

}

module.exports= {getProfile};

//update manufacturer details


