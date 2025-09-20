import React, { useState, useEffect } from 'react';
import API from '../apis/api';

function ProductCatalog({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [loading, setLoading] = useState(true);

  // Mock products data - replace with API call
  const mockProducts = [
    {
      id: 1,
      name: "Premium Chocolate Truffle",
      description: "Rich dark chocolate truffles with Belgian cocoa",
      price: 299,
      category: "chocolate",
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400",
      stock: 50,
      rating: 4.8
    },
    {
      id: 2,
      name: "Classic Gulab Jamun",
      description: "Traditional soft and spongy milk solid balls in sugar syrup",
      price: 149,
      category: "indian",
      image: "https://images.unsplash.com/photo-1631452180539-96aca7d48617?w=400",
      stock: 30,
      rating: 4.9
    },
    {
      id: 3,
      name: "Bengali Rasgulla",
      description: "Soft cottage cheese balls in light sugar syrup",
      price: 199,
      category: "indian",
      image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400",
      stock: 25,
      rating: 4.7
    },
    {
      id: 4,
      name: "French Macarons",
      description: "Delicate almond cookies with buttercream filling",
      price: 399,
      category: "pastries",
      image: "https://images.unsplash.com/photo-1569864358087-1d48b5d5495a?w=400",
      stock: 20,
      rating: 4.6
    },
    {
      id: 5,
      name: "Kaju Katli",
      description: "Diamond shaped cashew sweets with silver foil",
      price: 459,
      category: "indian",
      image: "https://images.unsplash.com/photo-1609501676725-7186f3a425ca?w=400",
      stock: 15,
      rating: 4.8
    },
    {
      id: 6,
      name: "Chocolate Brownies",
      description: "Fudgy chocolate brownies with walnuts",
      price: 249,
      category: "chocolate",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
      stock: 40,
      rating: 4.5
    },
    {
      id: 7,
      name: "Strawberry Cake",
      description: "Fresh strawberry sponge cake with cream",
      price: 599,
      category: "pastries",
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400",
      stock: 10,
      rating: 4.7
    },
    {
      id: 8,
      name: "Motichoor Laddu",
      description: "Traditional round sweets made with gram flour",
      price: 179,
      category: "indian",
      image: "https://images.unsplash.com/photo-1606471842501-c8b4ac2d3240?w=400",
      stock: 35,
      rating: 4.6
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, category, priceRange, products]);

  const filterProducts = () => {
    let filtered = products;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (category !== 'all') {
      filtered = filtered.filter(product => product.category === category);
    }

    // Price range filter
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      if (max) {
        filtered = filtered.filter(product => product.price >= min && product.price <= max);
      } else {
        filtered = filtered.filter(product => product.price >= min);
      }
    }

    setFilteredProducts(filtered);
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    // Show success message
    alert(`${product.name} added to cart! 🛒`);
  };

  const addToWishlist = (product) => {
    // Implement wishlist functionality
    alert(`${product.name} added to wishlist! ❤️`);
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="homepage fade-in">
      <div style={{ textAlign: 'center', padding: '2rem 0' }}>
        <h1 style={{ color: '#c44569', fontSize: '3rem', marginBottom: '1rem' }}>
          🍬 Our Sweet Collection 🍬
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>
          Discover our handcrafted sweets made with love and finest ingredients
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="search-filter">
        <input
          type="text"
          placeholder="🔍 Search sweets..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select
          className="filter-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="chocolate">🍫 Chocolate</option>
          <option value="indian">🇮🇳 Indian Sweets</option>
          <option value="pastries">🧁 Pastries</option>
        </select>
        
        <select
          className="filter-select"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        >
          <option value="all">All Prices</option>
          <option value="0-200">₹0 - ₹200</option>
          <option value="200-400">₹200 - ₹400</option>
          <option value="400-600">₹400 - ₹600</option>
          <option value="600">₹600+</option>
        </select>
      </div>

      {/* Results Count */}
      <div style={{ padding: '0 2rem', color: '#666' }}>
        <p>Showing {filteredProducts.length} of {products.length} products</p>
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <div style={{ position: 'relative' }}>
              <img src={product.image} alt={product.name} className="product-image" />
              {product.stock < 10 && (
                <span style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: '#ff4757',
                  color: 'white',
                  padding: '0.3rem 0.6rem',
                  borderRadius: '15px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  Low Stock!
                </span>
              )}
            </div>
            
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ color: '#ffa502' }}>
                  {'⭐'.repeat(Math.floor(product.rating))}
                </span>
                <span style={{ color: '#666', fontSize: '0.9rem' }}>
                  ({product.rating})
                </span>
              </div>
              
              <div className="product-price">₹{product.price}</div>
              
              <div style={{ fontSize: '0.9rem', color: product.stock < 10 ? '#ff4757' : '#27ae60', marginBottom: '1rem' }}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </div>
              
              <div className="product-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => addToCart(product)}
                  disabled={product.stock === 0}
                  style={{
                    opacity: product.stock === 0 ? 0.5 : 1,
                    cursor: product.stock === 0 ? 'not-allowed' : 'pointer'
                  }}
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => addToWishlist(product)}
                >
                  ❤️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#666' }}>
          <h3>No products found matching your criteria</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}

export default ProductCatalog;