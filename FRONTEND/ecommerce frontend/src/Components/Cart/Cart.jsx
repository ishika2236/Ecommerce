import React from 'react'
import { useState, useEffect } from 'react'
import './Cart.css'
import axios from 'axios'

const Cart = () => {

    const [cart,setCart]=useState(null);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(false);
    useEffect(()=>{
        const token = localStorage.getItem('token');
        const fetchCart=async()=>{
            try {
                const response = await axios.get('http://localhost:8000/cart', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCart(response.data.cart);
                
            } catch (error) {
                console.log('Error fetching cart');
                setError(error.message);
            }
            finally{
                setLoading(false);
            }

        }
        fetchCart();
    },[]);
    const handleRemove=async(productId)=>{
        try {
            const token=localStorage.getItem('token');
            console.log(token);
            await axios.post(`http://localhost:8000/cart/remove/${productId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCart(prevCart => ({
                ...prevCart,
                items: prevCart.items.filter(item => item.product._id !== productId)
            }));
            
        } catch (error) {
            console.log('Error removing item from cart:', error);
        }
    }
    if(loading){
        return <p>Loading...</p>;
    }

    if(error){
        return(
            <>
            <p>Error fetching your Cart</p>
            <p> <a href='/auth/register'>Sign Up</a> OR <a href="auth/login"> Login first</a> </p>
            </>
        
    )}
    if(!cart || cart.items.length===0){
        return <p>Your cart is empty</p>;
    }
  return (
    <div>

        <div className="cart-container">
            <h2>Your Cart</h2>
            <ul className="cart-items">
                {cart.items.map(item => (
                    <li key={item.product._id} className='cart-item'>
                        <span>{item.product.name}</span>
                        <span>Quantity: {item.quantity}</span>
                        <span>Price: ${item.quantity * item.product.price}</span>
                        <button onClick={() => handleRemove(item.product._id)}>Remove</button>
                    </li>
                ))}
            </ul>

            <div className='cart-total'>
            <h3>
            Total: Rs {cart.items && cart.items.length > 0
                ? cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0)
                : 0}
            </h3>


            </div>
        </div>

    </div>
  )
}

export default Cart