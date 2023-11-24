// src/components/DeleteProduct.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DeleteProduct = () => {
  const { id } = useParams(); // Assuming you are using a route parameter for the product ID
  const navigate = useNavigate();
  const [product, setProduct] = useState({ drugname: '', drugQuantity: '', drugid: '', expiryDate: '', price: '' });

  useEffect(() => {
   
    async function fetchProduct() {
      try {
        const response = await axios.get(`http://localhost:8082/drug/${id}`);
        if (response.status === 200) {
          const existingProduct = response.data; 
          setProduct(existingProduct);
        }
      } catch (error) {
        console.log("error:", error);
      }
    }

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await axios.delete(`http://localhost:8082/drug/delete/${id}`);
        if (response.status === 200) {
          navigate("/Admindashboard");
        }
      } catch (error) {
        console.log("error:", error);
      }
    }
  };

  return (
    <div>
      <h2>Delete Product</h2>
      <p>Product Name: {product.drugname}</p>
      <p>Product Price: {product.price}</p>
      <button onClick={handleDelete}>Delete Product</button>
    </div>
  );
}

export default DeleteProduct;
