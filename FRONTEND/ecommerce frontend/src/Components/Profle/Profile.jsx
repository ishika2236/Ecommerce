import React from 'react'
import { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom' 
import axios from 'axios'
import './Profile.css';
const Profile = () => {
    const [user,setUser]=useState({});
    const [products,setProducts]=useState([]);
    const [loading,setLoading]= useState(true);
    const [viewMore, setViewMore] = useState(false);
    const [error,setError]=useState(false);
    const navigate=useNavigate();
    const token=localStorage.getItem('token');

    useEffect(() => {
      const fetchProfileData =  async() =>{
        try {
          const response = await axios.get('http://localhost:8000/profile', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const data= response.data;
          setUser(data.user);
          console.log(data.user);
          setProducts(data.products);
          setLoading(false);
          
        } catch (error) {
          console.log(error);
          setError(true);
          setLoading(false);
          
        }
      }
      fetchProfileData();
      // console.log(user);
    }, [token])
    
    if(loading) return <div className='loader'>Loading...</div>
    if(error) return <div className="error">Failed to load profile</div>;
    if(!user) return <div>fetching user...kindly wait!</div>
   

  return (
    <>
    <div className='profile-page'>
      <h1>Profile</h1>
      <div className="profile-info">
        <h2>Name: {user.name}</h2>
        <p>Email: {user.email}</p><br></br>
        <p>Phone Number: {user.phoneNumber}</p><br></br>
        {user.address && (
          <div className="profile-address">
              <h3>Address</h3>
              <p>Street: {user.address.street}</p>
              <p>City: {user.address.city}</p>
              <p>State: {user.address.state}</p>
              <p>Postal Code: {user.address.postalCode}</p>
              <p>Country: {user.address.country}</p>
          </div>
        )}
      </div>
      {user.role === 'manufacturer' && (
                    <div>
                        {/* <h3>Business Details</h3>
                        <p>Business Name: {user.businessName}</p>
                        <p>Address: {user.address.street}, {user.address.city}</p> */}
                        <h3>Products</h3>
                        <ul>
                            {products.map((product, index) => (
                                <li key={product._id}>
                                    {product.title} - ${product.price}
                                </li>
                            ))}
                        </ul>
                        {products.length === 5 && (
                            <button onClick={() => navigate('/myListedProducts')} className="view-more-btn">
                                View More
                            </button>
                        )}
                    </div>
                )}
    </div>

    </>
    


  )
}

export default Profile