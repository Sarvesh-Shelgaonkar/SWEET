import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import ProductCatalog from "./components/ProductCatalog";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Cart from "./components/Cart";
import AdminPanel from "./components/AdminPanel";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Decode user info from token or fetch from API
      setUser({ isLoggedIn: true });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <Router>
      <div className="app">
        <Navbar user={user} logout={logout} cartCount={cart.length} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<ProductCatalog cart={cart} setCart={setCart} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
