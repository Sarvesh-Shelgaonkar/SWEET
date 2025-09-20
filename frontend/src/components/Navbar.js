import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, logout, cartCount }) {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="logo">
          🍭 Sweet Paradise
        </Link>
        
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Products</Link>
          
          {user?.isLoggedIn ? (
            <div className="user-menu">
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/cart" className="nav-link cart-icon">
                🛒
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </Link>
              <button onClick={logout} className="btn btn-secondary">Logout</button>
            </div>
          ) : (
            <div className="user-menu">
              <Link to="/login" className="btn btn-primary">Login</Link>
              <Link to="/register" className="btn btn-secondary">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;