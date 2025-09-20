import React from 'react';
import { Link } from 'react-router-dom';

function Homepage() {
  const featuredSweets = [
    {
      id: 1,
      name: "Chocolate Truffle",
      price: "₹299",
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300",
      description: "Rich dark chocolate truffles"
    },
    {
      id: 2,
      name: "Gulab Jamun",
      price: "₹149",
      image: "https://images.unsplash.com/photo-1631452180539-96aca7d48617?w=300",
      description: "Traditional Indian sweet"
    },
    {
      id: 3,
      name: "Rasgulla",
      price: "₹199",
      image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=300",
      description: "Soft spongy cottage cheese balls"
    }
  ];

  return (
    <div className="homepage fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">🍭 Welcome to Sweet Paradise 🍭</h1>
        <p className="hero-subtitle">
          Indulge in the finest collection of traditional and modern sweets
        </p>
        <Link to="/products" className="btn btn-primary">
          Explore Our Collection
        </Link>
      </section>

      {/* Features Section */}
      <section className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🍬</div>
          <h3 className="feature-title">Premium Quality</h3>
          <p>Made with finest ingredients and traditional recipes</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">🚚</div>
          <h3 className="feature-title">Fast Delivery</h3>
          <p>Same day delivery for orders within the city</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">💳</div>
          <h3 className="feature-title">Secure Payment</h3>
          <p>Multiple payment options with 100% security</p>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <h2 style={{ textAlign: 'center', margin: '3rem 0 2rem', color: '#c44569', fontSize: '2.5rem' }}>
          🌟 Featured Sweets 🌟
        </h2>
        
        <div className="products-grid">
          {featuredSweets.map(sweet => (
            <div key={sweet.id} className="product-card">
              <img src={sweet.image} alt={sweet.name} className="product-image" />
              <div className="product-info">
                <h3 className="product-name">{sweet.name}</h3>
                <p className="product-description">{sweet.description}</p>
                <div className="product-price">{sweet.price}</div>
                <div className="product-actions">
                  <button className="btn btn-primary">Add to Cart</button>
                  <button className="btn btn-secondary">❤️</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <Link to="/products" className="btn btn-primary">
            View All Products →
          </Link>
        </div>
      </section>

      {/* Promotional Banner */}
      <section style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        color: 'white', 
        padding: '3rem', 
        borderRadius: '20px', 
        textAlign: 'center',
        margin: '3rem 0'
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎉 Special Offer! 🎉</h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          Get 20% off on your first order! Use code: SWEET20
        </p>
        <Link to="/register" className="btn btn-secondary">
          Register Now & Save!
        </Link>
      </section>
    </div>
  );
}

export default Homepage;