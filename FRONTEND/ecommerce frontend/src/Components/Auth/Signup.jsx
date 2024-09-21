import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");
    // const [address,setAddress]
    const [role, setRole] = useState("user");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleToggleRole = () => {
        setRole(role === "user" ? "manufacturer" : "user");
    };
    const handleFileChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const formattedAddress = {
            street,
            city,
            state,
            postalCode,
            country
        };

        // console.log("Form submitted with:", { name, email, password, phoneNumber, address, role, dateOfBirth, profilePicture });

        try {
            const response = await axios.post('http://localhost:8000/auth/register', {
                name,
                email,
                password,
                phoneNumber,
                address: formattedAddress,
                role,
                dateOfBirth,
                profilePicture,
                isEmailVerified: false  // Set to false by default
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log("Response received:", response);

            if (response.status === 200) {
                navigate('/auth/verify-otp');
            } else {
                console.log("Unexpected status code:", response.status);
                setError('An error occurred during registration.');
            }

        } catch (error) {
            console.log("Error during registration:", error);
            setError(error.response ? error.response.data.message : 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='signup-container'>
            <div className="signup-heading">
                <h3>Sign Up here!</h3>
            </div>
            <form className='signup-form' onSubmit={handleSubmit}>
                <div className="general-info">
                    <div className='signup-name'>
                        <label htmlFor="name">Name</label>
                        <input type='text' name='name' id='name' value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className='signup-email'>
                        <label htmlFor="email">Email</label>
                        <input type='email' name='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className='signup-password'>
                        <label htmlFor="password">Password</label>
                        <input type='password' name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className='signup-phoneNumber'>
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input type='text' name='phoneNumber' id='phoneNumber' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                    </div>

                </div>
                
                <div className='signup-address'>
                    <label htmlFor="street">Street</label>
                    <input type='text' name='street' id='street' value={street} onChange={(e) => setStreet(e.target.value)} required />
                    
                    <label htmlFor="city">City</label>
                    <input type='text' name='city' id='city' value={city} onChange={(e) => setCity(e.target.value)} required />
                    
                    <label htmlFor="state">State</label>
                    <input type='text' name='state' id='state' value={state} onChange={(e) => setState(e.target.value)} required />
                    
                    <label htmlFor="postalCode">Postal Code</label>
                    <input type='text' name='postalCode' id='postalCode' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                    
                    <label htmlFor="country">Country</label>
                    <input type='text' name='country' id='country' value={country} onChange={(e) => setCountry(e.target.value)} required />
                </div>
                <div className='signup-dateOfBirth'>
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <input type='date' name='dateOfBirth' id='dateOfBirth' value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
                </div>
                
                <div>
                    <button type='submit' disabled={loading}>Submit</button>
                </div>
                <div className='signup-role-toggle'>
                    <label>
                        <input type='checkbox' checked={role === "manufacturer"} onChange={handleToggleRole} />
                        Sign up as Manufacturer
                    </label>
                </div>
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>

            <div className="signup-login">
                <p>Already have an account? <a href="/auth/login">Login here</a></p>
            </div>
        </div>
    );
};

export default Signup;
