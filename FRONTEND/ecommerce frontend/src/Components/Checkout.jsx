import React from 'react'
import axios from 'axios'
import Stripe from 'react-stripe-checkout'
import {loadstripe} from '@stripe/stripe-js'
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js'

const stripePromise= loadstripe('')
const Checkout =  () => {

    const token = localStorage.getItem('token');

    const handleCheckout = async (totalAmount, token)=>{
        try{
            const response = await axios.post('http://localhost:8000/order/create-order'),{
                token : 
            }

        }
        catch(error){

        }

    }

  return (
    <div>Checkout</div>
  )
}

export default Checkout