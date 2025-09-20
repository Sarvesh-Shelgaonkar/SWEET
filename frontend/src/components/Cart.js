import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Cart({ cart, setCart }) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const applyCoupon = () => {
    const validCoupons = {
      'SWEET20': 20,
      'FIRST10': 10,
      'NEWUSER15': 15
    };

    if (validCoupons[couponCode.toUpperCase()]) {
      setDiscount(validCoupons[couponCode.toUpperCase()]);
      alert(`🎉 Coupon applied! ${validCoupons[couponCode.toUpperCase()]}% discount`);
    } else {
      alert('❌ Invalid coupon code');
      setDiscount(0);
    }
  };

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discount) / 100;
  const deliveryFee = subtotal > 500 ? 0 : 50;
  const total = subtotal - discountAmount + deliveryFee;

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    setIsCheckingOut(true);
    
    // Simulate payment process
    setTimeout(() => {
      alert('🎉 Order placed successfully! You will receive a confirmation email shortly.');
      setCart([]);
      setIsCheckingOut(false);
      setCouponCode('');
      setDiscount(0);
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="cart-container fade-in">
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <h2 style={{ color: '#c44569', marginBottom: '2rem' }}>🛒 Your Cart is Empty</h2>
          <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>
            Looks like you haven't added any sweets to your cart yet.
          </p>
          <Link to="/products" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container fade-in">
      <h1 style={{ color: '#c44569', textAlign: 'center', marginBottom: '2rem' }}>
        🛒 Your Sweet Cart
      </h1>

      {/* Cart Items */}
      <div>
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            
            <div className="cart-item-info">
              <h3 style={{ color: '#2f3542', marginBottom: '0.5rem' }}>{item.name}</h3>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>{item.description}</p>
              <p style={{ color: '#c44569', fontWeight: 'bold', fontSize: '1.1rem' }}>
                ₹{item.price} each
              </p>
            </div>
            
            <div className="cart-item-actions">
              <div className="quantity-controls">
                <button 
                  className="quantity-btn"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span style={{ 
                  padding: '0.5rem 1rem', 
                  background: '#f8f9fa', 
                  borderRadius: '5px',
                  fontWeight: 'bold'
                }}>
                  {item.quantity}
                </span>
                <button 
                  className="quantity-btn"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              
              <p style={{ fontWeight: 'bold', color: '#2f3542' }}>
                ₹{item.price * item.quantity}
              </p>
              
              <button 
                onClick={() => removeFromCart(item.id)}
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
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="cart-summary">
        <h3 style={{ color: '#c44569', marginBottom: '1.5rem' }}>Order Summary</h3>
        
        {/* Coupon Section */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              style={{
                flex: 1,
                padding: '0.8rem',
                border: '2px solid #e0e0e0',
                borderRadius: '8px'
              }}
            />
            <button onClick={applyCoupon} className="btn btn-secondary">
              Apply
            </button>
          </div>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            Try: SWEET20, FIRST10, or NEWUSER15
          </p>
        </div>

        {/* Price Breakdown */}
        <div style={{ borderTop: '2px solid #f0f0f0', paddingTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Subtotal:</span>
            <span>₹{subtotal}</span>
          </div>
          
          {discount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#27ae60' }}>
              <span>Discount ({discount}%):</span>
              <span>-₹{discountAmount}</span>
            </div>
          )}
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Delivery Fee:</span>
            <span style={{ color: deliveryFee === 0 ? '#27ae60' : '#2f3542' }}>
              {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
            </span>
          </div>
          
          {subtotal < 500 && deliveryFee > 0 && (
            <p style={{ fontSize: '0.9rem', color: '#ff4757', marginBottom: '1rem' }}>
              Add ₹{500 - subtotal} more for free delivery!
            </p>
          )}
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            borderTop: '2px solid #f0f0f0',
            paddingTop: '1rem',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#c44569'
          }}>
            <span>Total:</span>
            <span>₹{total}</span>
          </div>
        </div>

        {/* Checkout Button */}
        <button 
          onClick={handleCheckout}
          disabled={isCheckingOut}
          className="btn btn-primary"
          style={{ 
            width: '100%', 
            marginTop: '2rem',
            padding: '1rem',
            fontSize: '1.1rem'
          }}
        >
          {isCheckingOut ? '🔄 Processing...' : '🛍️ Proceed to Checkout'}
        </button>

        {/* Payment Options */}
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ color: '#666', marginBottom: '1rem' }}>We accept:</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <span style={{ padding: '0.5rem', background: '#f8f9fa', borderRadius: '5px' }}>💳</span>
            <span style={{ padding: '0.5rem', background: '#f8f9fa', borderRadius: '5px' }}>📱</span>
            <span style={{ padding: '0.5rem', background: '#f8f9fa', borderRadius: '5px' }}>💰</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            Credit Card, UPI, Cash on Delivery
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cart;