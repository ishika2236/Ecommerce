const CART = require('../Model/cart')
const PRODUCT=require('../Model/product')
const USER=require('../Model/user')

const addtoCart=async(req,res)=>{
    try {
        const {productId, quantity}=req.body;
        const userId = req.session.userData.userId;

        let cart= await CART.findOne({user:userId});

        if(!cart){
            cart= new CART({
                user:userId,
                items:[]
            });
        }

        const product= await PRODUCT.findById(productId);

        if(!product){
            return res.status(401).json({message:'Product Not Found'});
        }
        
        const itemIndex = cart.items.findIndex(item => item.product && item.product.toString() === productId);

        if(itemIndex>-1){
            cart.items[itemIndex].quantity+=quantity;
        }
        else{
            cart.items.push({product:productId,quantity});
        }
        await cart.save();
        res.status(200).json({message:'Product added to cart',cart});
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ message: 'Error adding to cart' });
    }
}
const removeFromCart = async (req, res) => {
    try {
        const productId = req.params.productId;
        const userId = req.session.userData.userId;

        let cart = await CART.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Filter out the item with the specified productId
        cart.items = cart.items.filter(item => item.product.toString() !== productId);

        await cart.save();

        res.status(200).json({ message: 'Product removed from cart', cart });
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({ message: 'Error removing from cart' });
    }
};

const getCart=async(req,res)=>{
    try {
        const userId= req.session.userData.userId;
        const cart=await CART.findOne({user:userId}).populate('items.product');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json({ cart });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Error fetching cart' });
        
    }
}

module.exports={
    addtoCart, removeFromCart, getCart
}