import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Login from "./Components/Login";
import Products from "./Components/Products";
import ProductDetails from "./Components/ProductDetails";
import { useParams } from "react-router-dom";
function App() {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate(); // Access navigate function
  const [token, setToken] = useState(null);
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (!localToken) {
      // If there's no token, navigate to login page
      navigate("/login");
      // console.log("Navigating to login page");
    } else {
      setToken(localToken);
      // Only navigate to products if we're on the root route
      if (window.location.pathname === '/') {
        navigate('/products');
      }
    }
  }, [navigate]);



  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/products/:id" element={<ProductDetails token={token}/>} />
        <Route path="/products" element={<Products token = {token}/>} />

        <Route
          path="/"
          element={
            <header className="App-header">
             
            </header>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
