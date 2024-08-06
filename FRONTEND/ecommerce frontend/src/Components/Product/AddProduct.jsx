import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import './AddProduct.css' 
const AddProduct = () => {
    const [formData, setFormData] = useState({
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
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData({
            ...formData,
            [name]:value

        });
    }
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const imageUrls = files.map(file => URL.createObjectURL(file));
        setFormData({
            ...formData,
            images: imageUrls
        });
    };
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/product/add', formData);
            alert('Product added successfully!');
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Failed to add product.');
        }
    }    
  return (
    <div>
        <form className='productform' onSubmit={handleSubmit}>
            <div className="productlabel">
                <label >
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            
            <div className="productlabel">
                <label >
                    Description:
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            
            <div className="productlabel">
                <label className='productlabel'>
                    Price:
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            
            <div className="productlabel">
                <label className='productlabel'>
                    Discount Percentage:
                    <input
                        type="number"
                        name="discountPercentage"
                        value={formData.discountPercentage}
                        onChange={handleChange}
                    />
                </label>
            </div>
            
            <div className="productlabel">
                <label className='productlabel'>
                    Rating:
                    <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                    />
                </label>
                
            </div>
            
            <div className="productlabel">
                <label className='productlabel'>
                    Stock:
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        required
                    />
                </label >
            </div>
            
            
            
            <div className="productlabel">
                <label className='productlabel'>
                    Brand:
                    <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div className="productlabel">
                <label className='productlabel'>
                    Category:
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    />
                </label>
            </div>
            
            <div className="productlabel">
                <label className='productlabel'>
                    Thumbnail URL:
                    <input
                        type="text"
                        name="thumbnail"
                        value={formData.thumbnail}
                        onChange={handleChange}
                    />
                </label>
            </div>
            
            <div className="productlabel">
                <label className='productlabel'>
                    Images:
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    <div className='productlabel'>
                        {formData.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`preview ${index}`}
                                style={{ width: '100px', height: '100px', margin: '5px' }}
                            />
                        ))}
                    </div>
                </label>
            </div>
            
            <button type="submit">Add Product</button>
        </form>
    </div>
  )
}

export default AddProduct