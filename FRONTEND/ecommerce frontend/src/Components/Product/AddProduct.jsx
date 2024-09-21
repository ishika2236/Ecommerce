import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import './AddProduct.css' 
const AddProduct = () => {
    const token =localStorage.getItem('token');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState('');
    const [rating, setRating] = useState('');
    const [stock, setStock] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [images, setImages] = useState([]);

    
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const imageUrls = files.map(file => URL.createObjectURL(file));
        setFormData({
            ...formData,
            images: imageUrls
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = {
            title,
            description,
            price,
            discountPercentage,
            rating,
            stock,
            brand,
            category,
            thumbnail,
            images,
        };
        console.log('Product data being sent:', productData);
        try {
            const response = await axios.post('http://localhost:8000/product/add', productData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };
    
        
  return (
    <div>
        <form className='productform' onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
            />
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
            />
            <input
                type="number"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
                placeholder="Discount Percentage"
            />
            <input
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                placeholder="Rating"
            />
            <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Stock"
            />
            <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Brand"
            />
            <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
            />
            <input
                type="text"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder="Thumbnail URL"
            />
            <input
                type="text"
                value={images}
                onChange={(e) => setImages(e.target.value.split(','))}
                placeholder="Image URLs (comma separated)"
            />

            
            <button type="submit">Add Product</button>
        </form>
    </div>
  )
}

export default AddProduct