import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();

    const handleSubmit=async (e)=>{
        e.preventDefault();

        try {
            const response=await axios.post('http://localhost:8000/auth/register',{
                name,
                email,
                password

            }, {
                headers: {
                  'Content-Type': 'application/json',
                },
            });
            
            console.log("data sent from frontend ", response.data);
            if(response.status==200){
                navigate('/auth/verify-otp');
            }
            else{
                console.error('Error during registration:', response.data);
            }

            
        } catch (error) {
            console.log("error while sending data from frontend ", error.response ? error.response.data : error.message);
            
        }
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='signup-name'>
            <label htmlFor="name">Name</label>
            <input type='text' name='name' id='name' value={name} onChange={(e)=>setName(e.target.value)}></input>
        </div>
        <div className='signup-email'>
            <label htmlFor="email">Email</label>
            <input type='email' name='email' id='email' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
        </div>
        <div className='signup-password'>
            <label htmlFor="password">Password</label>
            <input type='password' name='password' id='password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
        </div>
        <div>
            <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Signup
