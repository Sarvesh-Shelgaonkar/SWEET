import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../apis/api';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (form.password !== form.confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }
    
    if (form.password.length < 6) {
      alert("❌ Password must be at least 6 characters long!");
      return;
    }
    
    setLoading(true);
    
    try {
      const res = await API.post("/auth/register", form);
      alert("🎉 Registration successful! Please login to continue.");
      window.location.href = "/login";
    } catch (err) {
      alert("❌ " + (err.response?.data?.message || "Registration failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container fade-in">
      <h2 className="form-title">🍭 Join Sweet Paradise!</h2>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>
        Create your account and start your sweet journey
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input 
            type="text" 
            name="name" 
            placeholder="👤 Full Name"
            className="form-input"
            value={form.name}
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <input 
            type="email" 
            name="email" 
            placeholder="📧 Email Address"
            className="form-input"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <input 
            type="password" 
            name="password" 
            placeholder="🔒 Password (min 6 chars)"
            className="form-input"
            value={form.password}
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <input 
            type="password" 
            name="confirmPassword" 
            placeholder="🔒 Confirm Password"
            className="form-input"
            value={form.confirmPassword}
            onChange={handleChange} 
            required 
          />
        </div>

        <button 
          type="submit" 
          className="form-submit"
          disabled={loading}
        >
          {loading ? "🔄 Creating Account..." : "🚀 Create Account"}
        </button>
      </form>
      
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <p style={{ color: '#666' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#c44569', textDecoration: 'none', fontWeight: 'bold' }}>
            Sign in here
          </Link>
        </p>
        
        <div style={{ margin: '1.5rem 0', padding: '1rem', background: '#f8f9fa', borderRadius: '10px' }}>
          <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}>
            🎁 <strong>Special Offer:</strong> Get 20% off on your first order with code <strong>SWEET20</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
