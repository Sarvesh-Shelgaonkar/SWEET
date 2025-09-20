import React, { useState, useEffect } from 'react';

function AdminPanel() {
  const [activeTab, setActiveTab] = useState('inventory');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: 'chocolate',
    stock: '',
    image: ''
  });

  // Mock data
  const mockProducts = [
    { id: 1, name: "Chocolate Truffle", price: 299, category: "chocolate", stock: 50 },
    { id: 2, name: "Gulab Jamun", price: 149, category: "indian", stock: 30 },
    { id: 3, name: "Rasgulla", price: 199, category: "indian", stock: 25 }
  ];

  const mockOrders = [
    { id: 1, customer: "John Doe", items: "Chocolate Truffle x2", total: 598, status: "pending", date: "2024-01-15" },
    { id: 2, customer: "Jane Smith", items: "Gulab Jamun x3", total: 447, status: "shipped", date: "2024-01-14" },
    { id: 3, customer: "Bob Wilson", items: "Rasgulla x1", total: 199, status: "delivered", date: "2024-01-13" }
  ];

  const mockAnalytics = {
    totalSales: 125000,
    totalOrders: 350,
    totalCustomers: 180,
    averageOrderValue: 357,
    topProducts: [
      { name: "Chocolate Truffle", sales: 45000 },
      { name: "Gulab Jamun", sales: 32000 },
      { name: "Rasgulla", sales: 28000 }
    ]
  };

  useEffect(() => {
    setProducts(mockProducts);
    setOrders(mockOrders);
    setAnalytics(mockAnalytics);
  }, []);

  const handleAddProduct = (e) => {
    e.preventDefault();
    const product = {
      id: products.length + 1,
      ...newProduct,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock)
    };
    setProducts([...products, product]);
    setNewProduct({ name: '', description: '', price: '', category: 'chocolate', stock: '', image: '' });
    alert('🎉 Product added successfully!');
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    alert(`📦 Order #${orderId} status updated to ${newStatus}`);
  };

  const deleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
      alert('🗑️ Product deleted successfully!');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ffa502';
      case 'shipped': return '#3742fa';
      case 'delivered': return '#2ed573';
      case 'cancelled': return '#ff4757';
      default: return '#666';
    }
  };

  return (
    <div className="homepage fade-in">
      <h1 style={{ textAlign: 'center', color: '#c44569', marginBottom: '2rem' }}>
        👑 Admin Dashboard
      </h1>

      {/* Tab Navigation */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginBottom: '2rem',
        borderBottom: '2px solid #f0f0f0'
      }}>
        {[
          { id: 'analytics', label: '📊 Analytics', icon: '📊' },
          { id: 'inventory', label: '📦 Inventory', icon: '📦' },
          { id: 'orders', label: '🛍️ Orders', icon: '🛍️' },
          { id: 'customers', label: '👥 Customers', icon: '👥' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '1rem 2rem',
              border: 'none',
              background: activeTab === tab.id ? '#c44569' : 'transparent',
              color: activeTab === tab.id ? 'white' : '#666',
              borderRadius: '10px 10px 0 0',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.3s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon" style={{ color: '#27ae60' }}>💰</div>
              <h3 className="feature-title">Total Sales</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#27ae60' }}>
                ₹{analytics.totalSales?.toLocaleString()}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon" style={{ color: '#3742fa' }}>📦</div>
              <h3 className="feature-title">Total Orders</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3742fa' }}>
                {analytics.totalOrders}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon" style={{ color: '#ff6b9d' }}>👥</div>
              <h3 className="feature-title">Total Customers</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ff6b9d' }}>
                {analytics.totalCustomers}
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon" style={{ color: '#ffa502' }}>📈</div>
              <h3 className="feature-title">Avg Order Value</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffa502' }}>
                ₹{analytics.averageOrderValue}
              </p>
            </div>
          </div>

          <div style={{ background: 'white', padding: '2rem', borderRadius: '15px', marginTop: '2rem' }}>
            <h3 style={{ color: '#c44569', marginBottom: '1rem' }}>🏆 Top Selling Products</h3>
            {analytics.topProducts?.map((product, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '1rem',
                borderBottom: '1px solid #f0f0f0'
              }}>
                <span>{index + 1}. {product.name}</span>
                <span style={{ fontWeight: 'bold', color: '#27ae60' }}>₹{product.sales.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inventory Tab */}
      {activeTab === 'inventory' && (
        <div>
          {/* Add Product Form */}
          <div style={{ background: 'white', padding: '2rem', borderRadius: '15px', marginBottom: '2rem' }}>
            <h3 style={{ color: '#c44569', marginBottom: '1rem' }}>➕ Add New Product</h3>
            <form onSubmit={handleAddProduct} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <input
                type="text"
                placeholder="Product Name"
                className="form-input"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Description"
                className="form-input"
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                required
              />
              <input
                type="number"
                placeholder="Price (₹)"
                className="form-input"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                required
              />
              <select
                className="form-input"
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
              >
                <option value="chocolate">Chocolate</option>
                <option value="indian">Indian Sweets</option>
                <option value="pastries">Pastries</option>
              </select>
              <input
                type="number"
                placeholder="Stock Quantity"
                className="form-input"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                required
              />
              <input
                type="url"
                placeholder="Image URL"
                className="form-input"
                value={newProduct.image}
                onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
              />
              <button type="submit" className="btn btn-primary">Add Product</button>
            </form>
          </div>

          {/* Products List */}
          <div style={{ background: 'white', padding: '2rem', borderRadius: '15px' }}>
            <h3 style={{ color: '#c44569', marginBottom: '1rem' }}>📦 Current Inventory</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #f0f0f0' }}>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Product</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Category</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Price</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Stock</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '1rem' }}>{product.name}</td>
                      <td style={{ padding: '1rem' }}>{product.category}</td>
                      <td style={{ padding: '1rem' }}>₹{product.price}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ 
                          color: product.stock < 10 ? '#ff4757' : '#27ae60',
                          fontWeight: 'bold'
                        }}>
                          {product.stock}
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <button 
                          onClick={() => deleteProduct(product.id)}
                          style={{ 
                            background: '#ff4757', 
                            color: 'white', 
                            border: 'none', 
                            padding: '0.5rem', 
                            borderRadius: '5px', 
                            cursor: 'pointer' 
                          }}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div style={{ background: 'white', padding: '2rem', borderRadius: '15px' }}>
          <h3 style={{ color: '#c44569', marginBottom: '1rem' }}>🛍️ Order Management</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f0f0f0' }}>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Order ID</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Customer</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Items</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Total</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Date</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '1rem' }}>#{order.id}</td>
                    <td style={{ padding: '1rem' }}>{order.customer}</td>
                    <td style={{ padding: '1rem' }}>{order.items}</td>
                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>₹{order.total}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ 
                        color: getStatusColor(order.status),
                        fontWeight: 'bold',
                        textTransform: 'capitalize'
                      }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>{order.date}</td>
                    <td style={{ padding: '1rem' }}>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        style={{ padding: '0.5rem', borderRadius: '5px' }}
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Customers Tab */}
      {activeTab === 'customers' && (
        <div style={{ background: 'white', padding: '2rem', borderRadius: '15px' }}>
          <h3 style={{ color: '#c44569', marginBottom: '1rem' }}>👥 Customer Management</h3>
          <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>
            Customer management features coming soon...
          </p>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;