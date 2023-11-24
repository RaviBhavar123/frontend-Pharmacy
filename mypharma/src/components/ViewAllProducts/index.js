import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import UpdateProductForm from "../UpdateProduct";
import "./viewAllProducts.css";

function ViewAllProducts() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);

  const updateFormRef = useRef(null); // Create a ref here

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8082/drug/get");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching all Products data:", error.message);
        alert("Error fetching all Products data:");
      }
    };
    fetchAllProducts();
  }, []);

  const handleDeleteButton = async (drugid) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8082/drug/delete/${drugid}`);
        alert("Product Deleted Successfully!");
        window.location.reload();
      } catch (error) {
        console.error("Delete Handle error:", error);
        alert("Error deleting item. Please try again.");
      }
    }
  };

  const handleUpdateButton = (product) => {
    setSelectedProduct(product);
    setUpdateFormVisible(true);
    console.log("Update button clicked for product ID: " + product.drugid);

    // Scroll to the update form
    if (updateFormRef.current) {
      updateFormRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const handleCloseUpdateForm = () => {
    setUpdateFormVisible(false);
  };

  return (
    <>
      <h1 className="PageHeading">Available Products</h1>
      <div className="GridProductsContainer">
        {products.map((product) => (
          <div key={product.drugid} className="GridCard">
            <div>
              <p>Drug Id = {product.drugid}</p>
              <p>Drug Name = {product.drugName}</p>
              <p>Drug Quantity = {product.drugQuantity}</p>
              <p>Expiry Date = {product.expiryDate ? product.expiryDate.slice(0, 10) : 'N/A'}</p>
              <p>Price = {product.price}</p>
              <button
                className="DeleteButton"
                onClick={() => handleDeleteButton(product.drugid)}
              >
                Delete
              </button>
              <button
                className="UpdateButton"
                onClick={() => handleUpdateButton(product)}
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
      {isUpdateFormVisible && (
        <div className="UpdateFormOverlay">
          <UpdateProductForm
            product={selectedProduct}
            onUpdate={handleUpdateButton}
            onClose={handleCloseUpdateForm}
          />
        </div>
      )}
      {/* Add a hidden element with the ref to scroll to */}
      <div ref={updateFormRef}></div>
    </>
  );
}

export default ViewAllProducts;
