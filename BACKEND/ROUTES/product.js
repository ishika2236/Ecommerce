const express=require('express');
const PRODUCT= require('../Model/product');
const {showProduct, myProduct,getProduct,addProduct, editProduct, deleteProduct}=require('../CONTROLLERS/product')

const router=express.Router();

router.get('/',showProduct);
router.get('/myListedProducts',myProduct);
router.get('/:id',getProduct);
router.post('/add',addProduct);
router.put('/edit/:id',editProduct);
router.delete('/delete/:id',deleteProduct);


module.exports=router;