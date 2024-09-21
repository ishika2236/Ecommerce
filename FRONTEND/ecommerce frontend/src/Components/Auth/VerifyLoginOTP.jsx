import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './VerifyLoginOTP.css';

const VerifyLoginOTP = () => {
    const [otp,setOtp]=useState("");
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ message: '', type: '' });
    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        try {
            e.preventDefault();
            setLoading(true);

            const response=await axios.post('http://localhost:8000/otp/verifyLoginOTP',{otp});
            console.log(response.data);
            setAlert({ message: 'OTP verified successfully!', type: 'success' });
            if (response.status === 201) {
                localStorage.setItem('token', response.data.token);
                navigate('/home');
            }
            // const token=console.log(response.data.token);
            // localStorage.setItem('token',token);
            // navigate('/home');
            
        } catch (error) {
            setAlert({ message: 'OTP verification failed. Please check your OTP.', type: 'error' });
        } finally {
            setLoading(false);
        }
        
    
    }

  return (
    <div className="verify-otp-container">
            <h2>Verify OTP</h2>
            {alert.message && (
                <div className={`alert ${alert.type}`}>
                    {alert.message}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="otp">OTP:</label>
                    <input
                        type="text"
                        id="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Verify OTP'}
                </button>
            </form>
        </div>
  );
}

export default VerifyLoginOTP