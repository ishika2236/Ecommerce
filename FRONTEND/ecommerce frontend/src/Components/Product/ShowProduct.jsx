import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export const ShowProduct = () => {
  const token = localStorage.getItem('token');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const Navigate = useNavigate();
 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/product', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          setAlert('You need to sign up first');
          setError('You need to sign up first');
          return;
        }

        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  const handleAddToCart = async (product) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/cart/add',
        {
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      console.log('Product added to cart:', response.data);
      alert(`${product.title} added to cart successfully!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert(`Error occurred while adding ${product.title} to cart.`);
    }
  };

  if (loading) return <>Loading...</>;
  if (error) return <>Error: {error}</>;

  return (
    <>
      {/* {alert && (
        <div className="alert alert-success" role="alert">
          {alert}
        </div>
      )} */}

      <div>Products</div>
      <div className="cart"><FaShoppingCart  
        onClick={()=>Navigate('/cart')}
      />
      </div>
      <div>
        {products.map((product) => (
          <li key={product._id}>
            <h2>{product.title}</h2>
            <p>{product.message}</p>
            <p>Price: {product.price}</p>
            {product.discountPercent && <p>Discount: {product.discountPercent}%</p>}
            {product.rating && <p>Rating: {product.rating}/5</p>}
            {product.brand && <p>Brand: {product.brand}</p>}
            <p>Category: {product.category}</p>
            {product.thumbnail && <img src={product.thumbnail} alt={product.title} />}
            {product.images &&
              product.images.map((img, index) => (
                <img key={index} src={img} alt={`${product.title}-${index}`} />
              ))}
            <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </li>
        ))}
      </div>
    </>
  );
};
