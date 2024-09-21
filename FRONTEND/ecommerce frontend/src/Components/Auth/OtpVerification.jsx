import React, { useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
import { useNavigate } from 'react-router-dom';

const OtpVerification = () => {
    const navigate = useNavigate();
    const [OTP, setOTP] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(""); 

        try {
            const response = await axios.post('http://localhost:8000/otp/verify-otp', {
                otp: OTP,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true 
            });
            console.log(response);

            if (response.status === 201) {
                localStorage.setItem('token', response.data.token);
                navigate('/home');
            }
        } catch (error) {
            setError("Error submitting OTP. Please try again.");
            console.error("Error submitting OTP: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="otp">OTP</label>
                <input 
                    type="text" 
                    id="otp" 
                    name="otp" 
                    value={OTP} 
                    onChange={(e) => setOTP(e.target.value)} 
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default OtpVerification;
