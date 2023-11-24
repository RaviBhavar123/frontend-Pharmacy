import React from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { Routes, Route } from "react-router-dom";
import Login from "./modules/Login";
import SignUp from "./modules/SignUp";
import Products from "./modules/Products";
import AdminDashboard from "./components/Admindashboard";
import AddProduct from "./components/AddProduct.js";
import UpdateProduct from "./components/UpdateProduct";
import ViewAllProducts from "./components/ViewAllProducts";
import OrderRequest from "./components/OrderRequest/orderRequest";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />

        <Route path="/Products" element={<Products />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/updateProduct" element={<UpdateProduct />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/viewAllProducts" element={<ViewAllProducts />} />
        <Route path="/allOrders" element={<OrderRequest />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
