const stripe= require('stripe')(process.env.STRIPE_SECRET_KEY);
const CART= require('../Model/cart')
const USER = require('../Model/user')
const PRODUCT = require('../Model/product')


const createOrder = async(req,res)=>{
    try {
        const userId=  req.userId;
        const {cartId, paymentMethod}=req.body;
        const user = USER.findById(userId);

        const cart= await CART.findById(cartId).populate('items.product');

        if(!cart){
            return res.status(404).json({message:'Cart not found'});
        }

        const OrderItems= cart.items.map(item=>({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price
        }))

        const totalAmount = OrderItems.reduce((total, item) => total + item.price * item.quantity, 0);

        //creating payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount,
            currency: 'inr',
            receipt_email: user.email,
            customer: userId, 
            confirm:true,
            
        })

        const newOrder = new ORDER({
            user: userId,
            items: OrderItems,
            totalAmount,
            paymentStatus: paymentIntent.status=='succeeded' ? 'completed':'failed',

        })
        await newOrder.save();

        cart.items=[];
        await cart.save();
        res.status(201).json({ message: 'Order created successfully', order: newOrder });


    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Error creating order' });
        
    }
}

module.exports={createOrder}