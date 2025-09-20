import React, { useEffect, useState } from "react";
import API from "../apis/api";
import "./Dashboard.css"; // Import CSS file

function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch sweets from backend
  useEffect(() => {
    const fetchSweets = async () => {
      try {
        const res = await API.get("/sweets");
        setSweets(res.data);
      } catch (err) {
        setError("Failed to load sweets");
      } finally {
        setLoading(false);
      }
    };
    fetchSweets();
  }, []);

  // Handle purchase
  const handlePurchase = async (id) => {
    try {
      await API.post(`/sweets/${id}/purchase`);
      alert("Sweet purchased successfully!");
      const res = await API.get("/sweets"); // refresh
      setSweets(res.data);
    } catch (err) {
      alert(err.response?.data?.error || "Purchase failed");
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">🍭 Sweet Shop Dashboard</h2>

      {/* Loading State */}
      {loading && <p className="info-text">Loading sweets...</p>}

      {/* Error Message */}
      {error && <p className="error-text">{error}</p>}

      {/* Sweets Grid */}
      {!loading && !error && (
        <div className="sweet-grid">
          {sweets.length === 0 ? (
            <p className="info-text">No sweets available.</p>
          ) : (
            sweets.map((sweet) => (
              <div key={sweet._id} className="sweet-card">
                <h3>{sweet.name}</h3>
                <p>
                  <strong>Category:</strong> {sweet.category}
                </p>
                <p>
                  <strong>Price:</strong> ₹{sweet.price}
                </p>
                <p>
                  <strong>In Stock:</strong> {sweet.quantity}
                </p>
                <button
                  className={`purchase-btn ${
                    sweet.quantity === 0 ? "disabled" : ""
                  }`}
                  disabled={sweet.quantity === 0}
                  onClick={() => handlePurchase(sweet._id)}
                >
                  {sweet.quantity === 0 ? "Out of Stock" : "Purchase"}
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
