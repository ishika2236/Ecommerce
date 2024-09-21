    const PRODUCT = require("../Model/product");
    const USER= require('../Model/user')
    const mongoose = require('mongoose')
    const showProduct=async(req,res)=>{
        try {
            const products=await PRODUCT.find();
            if(!products){
                return res.status(404).json({message:"products not available in db"});
            }
            return res.status(201).json(products);
            
        } catch (error) {
            return res.status(500).json({message:error.message});
            
        }
    }
    const myProduct = async(req,res)=>{
        try {
            const user= await USER.findById(req.userId).select('-password');
            if(!user) return res.status(404).json({messgae:'User not found'});

            let products=[];
            if(user.role=='manufacturer'){
                products = await PRODUCT.find({manufacturerId:user._id});
            }
            return res.json(products);
        } catch (error) {
            return res.status(500).json({message:error.message});
            
        }
    }
    const getProduct=async(req,res)=>{
        try{
            let { id } = req.params;
            id = id.slice(1);
            console.log(id)


            // Validate if the id is a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: 'Invalid product ID' });
            }
            const product=await PRODUCT.findById(id);

            if(!product){
                return res.status(404).json({message:'Product not found'});
            }

            res.json(product);

        }catch(error){
            return res.status(500).json({error:error.message});

        }
    }

    const addProduct=async(req,res)=>{
        console.log('Request body:', req.body);
        const userId = req.session.userData;
        console.log('User ID from session:', userId);
        try {
            const newProduct= new PRODUCT({
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                discountPercentage: req.body.discountPercentage,
                rating: req.body.rating,
                stock: req.body.stock,
                brand: req.body.brand,
                category: req.body.category,
                thumbnail: req.body.thumbnail,
                images: req.body.images,
                manufacturerId: req.userId
            });
            
            const savedProduct= await newProduct.save();
            res.status(201).json({message:"Product saved"});
            
        } catch (error) {
            res.status(500).json({error:error.message}); 
        }
    }
    const editProduct=async(req,res)=>{
        console.log('request received');
        try {
            console.log(req.params.id.slice(1), req.userId)
            const updatedProduct= await PRODUCT.findByIdAndUpdate(
                
                {_id:req.params.id.slice(1),manufacturerId: req.userId},
                {
                    title: req.body.title,
                    description: req.body.description,
                    price: req.body.price,
                    discountPercentage: req.body.discountPercentage,
                    rating: req.body.rating,
                    stock: req.body.stock,
                    brand: req.body.brand,
                    category: req.body.category,
                    thumbnail: req.body.thumbnail,
                    images: req.body.images
        
                },
                {new:true}
            );
            console.log(updatedProduct);
            if(!updatedProduct){
                return res.status(404).json({ message: 'Product not found' });
            }
            return res.status(201).json({message:'Product details updated successfully'});
            
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
        

    }
    const deleteProduct=async(req,res)=>{
        try{
            console.log(req.params.id.slice(1));
            const deletedProduct= await PRODUCT.findByIdAndDelete(req.params.id.slice(1));

            if(!deletedProduct){
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json({ message: 'Product deleted successfully' });
        }
        catch(error){
            res.status(500).json({ error: error.message });
        }
    }
    module.exports={
        showProduct, myProduct , getProduct,addProduct,editProduct,deleteProduct
    };