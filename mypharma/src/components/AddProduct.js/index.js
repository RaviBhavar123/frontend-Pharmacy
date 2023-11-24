// src/components/AddProduct.js
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './AddProduct.css'; // Import the CSS file for styling

const AddProduct = () => {
  const [product, setProduct] = useState({
    drugName: '',
    drugQuantity: '',
    drugid: '',
    expiryDate: '',
    price: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8082/drug/add", product);
      if (response.status === 200) {
        alert("Product Added Successfully..!")
        navigate("/Admindashboard");
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add Drugs</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            className="form-control"
            value={product.drugName}
            onChange={(e) => setProduct({ ...product, drugName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Product Price:</label>
          <input
            type="text"
            className="form-control"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Product Id:</label>
          <input
            type="number"
            className="form-control"
            value={product.drugid}
            onChange={(e) => setProduct({ ...product, drugid: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Product Quantity:</label>
          <input
            type="number"
            className="form-control"
            value={product.drugQuantity}
            onChange={(e) => setProduct({ ...product, drugQuantity: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Expiry Date:</label>
          <input
            type="date"
            className="form-control"
            value={product.expiryDate}
            onChange={(e) => setProduct({ ...product, expiryDate: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
