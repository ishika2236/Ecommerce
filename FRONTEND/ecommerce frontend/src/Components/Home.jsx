import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

const Home = () => {
  const token= localStorage.getItem('token');
  const navigate= useNavigate();
  useEffect(()=>{
    if(token) navigate('/products');
  else navigate('/auth/register')

  },[token]);

  
  return (
    <div>
      Welcome to Ecommerce Website!
    </div>
  )
}

export default Home
