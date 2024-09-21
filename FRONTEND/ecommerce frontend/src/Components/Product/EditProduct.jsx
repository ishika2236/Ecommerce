import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
    const token = localStorage.getItem('token');
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        title: '',
        description: '',
        price: '',
        discountPercentage: '',
        rating: '',
        stock: '',
        brand: '',
        category: '',
        thumbnail: '',
        images: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(()=>{
        axios.get(`http://localhost:8000/product/${id}`,{
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          })
        .then(response=>{
            setProduct(response.data);
            setLoading(false);
        })
        .catch(err=>{
            setError(err.message);
            setLoading(false);
        })
    },[id]);
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setProduct(prevProduct=>({...prevProduct,[name]:value}));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/product/edit/${id}`, product ,{
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          })
            .then(response => {
                alert('Product updated successfully!');
                navigate('/myListedProducts'); 
            })
            .catch(err => {
                setError(err.message);
            });
    };
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
  return (
    <div>
            <h1>Edit Product</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={product.title}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Discount Percentage:</label>
                    <input
                        type="number"
                        name="discountPercentage"
                        value={product.discountPercentage}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Rating:</label>
                    <input
                        type="number"
                        name="rating"
                        value={product.rating}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Stock:</label>
                    <input
                        type="number"
                        name="stock"
                        value={product.stock}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Brand:</label>
                    <input
                        type="text"
                        name="brand"
                        value={product.brand}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Thumbnail:</label>
                    <input
                        type="text"
                        name="thumbnail"
                        value={product.thumbnail}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Images (comma-separated URLs):</label>
                    <input
                        type="text"
                        name="images"
                        value={product.images.join(',')}
                        onChange={(e) => setProduct(prevProduct => ({ ...prevProduct, images: e.target.value.split(',') }))}
                    />
                </div>
                <button type="submit">Update Product</button>
            </form>
        </div>
  )
}

export default EditProduct