import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';



const LoginIn = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ message: '', type: '' });
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/auth/login', {
                email,
                password
            });
            navigate('/auth/verify-login-otp')
            
        } catch (error) {
            setAlert({ message: 'Login failed. Please check your credentials.', type: 'error' });
            
        }finally {
            setLoading(false);
        }
    }
  return (
    <div className="login-container">
        <h2>Login</h2>
        {alert.message && (
            <div className={`alert ${alert.type}`}>
                {alert.message}
            </div>
        )}
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'Login'}
            </button>
        </form>
    </div>
  )
}

export default LoginIn