const PRODUCT = require("../Model/product");

const getProduct=async(req,res)=>{
    try{
        const product=await PRODUCT.findById(req.params.id);

        if(!product){
            return res.status(404).json({message:'Product not found'});
        }

        res.json(product);

    }catch(error){
        return res.status(500).json({error:error.message});

    }
}

const addProduct=async(req,res)=>{
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
            images: req.body.images
        });
        const savedProduct= await newProduct.save();
        res.status(201).json({message:"Product saved"});
        
    } catch (error) {
        res.status(501).json({error:error.message}); 
    }
}
const editProduct=async(req,res)=>{
    console.log('request received');
    try {
        const updatedProduct= await PRODUCT.findByIdAndUpdate(
            req.params.id,
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
        const deletedProduct= await PRODUCT.findByIdAndDelete(req.params.id);

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
    getProduct,addProduct,editProduct,deleteProduct
};