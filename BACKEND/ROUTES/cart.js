const CART= require('../Model/cart')
const cartController=  require('../CONTROLLERS/cart')
const express = require('express')
const router= express.Router();


router.get('/', cartController.getCart);
router.post('/add',cartController.addtoCart);
router.post('/remove/:productId',cartController.removeFromCart);


module.exports=router;

