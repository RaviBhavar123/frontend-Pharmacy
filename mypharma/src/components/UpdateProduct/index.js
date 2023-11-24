import React, { useEffect, useState } from "react";
import axios from "axios";
import './updateProduct.css';
function UpdateProductForm({ product, onUpdate, onClose }) {
  const [updatedProduct, setUpdatedProduct] = useState({ ...product });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      window.confirm("Are you sure want to Update Product..!");
      console.log(updatedProduct); // Make sure to use the updatedProduct state
      const response = await axios.put(`http://localhost:8082/drug/update/${updatedProduct.drugid}`, updatedProduct);
      if (response.status === 200) {
        alert("Product updated successfully");
        window.location.reload();
        onUpdate(updatedProduct);
        onClose(); 
      }
    } catch (error) {
      console.error("Error updating product:", error);
      window.Error("Failed to Update the Product..!")
    }
  };
  

  return (
    <div className="UpdateFormContainer">
      <h2>Update Product</h2>
      <label>Drug Name:</label>
      <input
        type="text"
        value={updatedProduct.drugName}
        onChange={(e) => setUpdatedProduct({ ...updatedProduct, drugName: e.target.value })}
      />
      <label>Drug Quantity:</label>
      <input
        type="number"
        value={updatedProduct.drugQuantity}
        onChange={(e) => setUpdatedProduct({ ...updatedProduct, drugQuantity: e.target.value })}
      />
      <label>Expiry Date:</label>
      <input
        type="date"
        value={updatedProduct.expiryDate}
        onChange={(e) => setUpdatedProduct({ ...updatedProduct, expiryDate: e.target.value })}
      />
      <label>Price:</label>
      <input
        type="number"
        value={updatedProduct.price}
        onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
      />
      <button onClick={handleUpdate}>Update</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default UpdateProductForm;
