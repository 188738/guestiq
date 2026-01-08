import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./page.css";

function Checkout() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    room: "",
    rating: "",
    comments: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Checkout details:", form);

    // 🔥 Later: send checkout event to Klaviyo
    alert(`✅ Checkout complete for Room ${form.room}`);

    setForm({ room: "", rating: "", comments: "" });
    navigate("/");
  };

  return (
    <div className="checkout-bg">
      <div className="checkout-overlay">
        <div className="checkout-card">
          <button className="back-btn" onClick={() => navigate("/")}>
            ⬅ Back Home
          </button>

          <h1>Checkout</h1>
          <p>Complete your stay and share feedback</p>

          <form onSubmit={handleSubmit} className="checkout-form">
            <input
              type="text"
              name="room"
              placeholder="Room Number"
              value={form.room}
              onChange={handleChange}
              required
            />

            <select
              name="rating"
              value={form.rating}
              onChange={handleChange}
              required
            >
              <option value="">Overall Rating</option>
              <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
              <option value="4">⭐⭐⭐⭐ Good</option>
              <option value="3">⭐⭐⭐ Average</option>
              <option value="2">⭐⭐ Poor</option>
              <option value="1">⭐ Very Poor</option>
            </select>

            <textarea
              name="comments"
              placeholder="Additional feedback (optional)"
              value={form.comments}
              onChange={handleChange}
            />

            <button type="submit">Complete Checkout</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
