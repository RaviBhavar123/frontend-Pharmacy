import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AddProduct from '../AddProduct.js';
import './AdminDashboard.css'; 

function AdminDashboard() {
  return (
    <div>
      <div className="nav"> 
        <Link to="/addProduct" className="card">Add Product</Link> 
        <Link to="/viewAllProducts" className="card">View All Products</Link> 
        <Link to="/allOrders" className="card">Order Request</Link>
      </div>

    </div>
    
  );
}

export default AdminDashboard;
