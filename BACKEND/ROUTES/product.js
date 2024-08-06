const express=require('express');
const PRODUCT= require('../Model/product');
const {getProduct,addProduct, editProduct, deleteProduct}=require('../CONTROLLERS/product')

const router=express.Router();

router.get('/:id',getProduct);
router.post('/add',addProduct);
router.put('/edit/:id',editProduct);
router.delete('/delete',deleteProduct);

module.exports=router;