import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {FaEdit, FaRemoveFormat} from 'react-icons/fa'
import { IoTrashBin } from "react-icons/io5";
import './ListedProduct.css';

export const ListedProduct = () => {
    const Navigate= useNavigate();
    const token= localStorage.getItem('token');
   const [products, setProducts]= useState([]);
   const [loading,setLoading]=useState();
   const [error,setError]=useState("");
   const [disabledProducts, setDisabledProducts] = useState({});    
   useEffect(()=>{
    const fetchProducts = async()=>{
        try {
            const response =  await axios.get('http://localhost:8000/product/myListedProducts', {
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
              });
              console.log(response);
              if(response.status==404){
                alert('Error encountered while fetching product details');
                setLoading(false);
                return;
              }
              console.log(response.data);
              setProducts(response.data);
              setLoading(false);
            
        } catch (error) {
            setError(error.message);
            return;
            
        }
        
    
    }
    fetchProducts();
   },[token])
   const handleDelete = async(id)=>{
        try{
            const response= await axios.delete(`http://localhost:8000/product/delete/:${id}`,{
                headers:{
                    'Authorization' : `Bearer ${token}`
                }
            })
        }
        catch(error){
            alert(error.message)
            console.log(error.message);
        }
    
    
   }
   
   if(loading) return <div>loading...</div>
   if(error) return <div>Error... {error}</div>
  return (
    <>
    <div>ListedProduct</div>
    {products.length > 0 ? (
            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        {product.title}
                        <FaEdit
                            onClick={() => {
                                Navigate(`/products/edit/:${product._id}`)
                            }}
                        />
                        < IoTrashBin  onClick={() => {

                                handleDelete(product._id)
                            }}
                            style={{ cursor: 'pointer' }}
                            disabled={disabledProducts[product._id]}/>
                    </li>
                ))}
            </ul>
        ) : (
            <div>No products found</div>
        )}
    </>
    
  )
}
