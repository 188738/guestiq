import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./page.css";

function LateCheckout() {
  const navigate = useNavigate();

  const [request, setRequest] = useState({
    room: "",
    checkoutTime: "",
    reason: "",
  });

  const handleChange = (e) => {
    setRequest({ ...request, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("📤 Late Checkout payload:");
  console.table(request);

  try {
    const response = await fetch("http://127.0.0.1:5001/late-checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    });

    const data = await response.json();
    console.log("📥 Backend response:", data);

    if (data.success) {
      alert(`✅ Late checkout requested for Room ${request.room}`);
      setRequest({ room: "", checkoutTime: "", reason: "" });
    } else {
      alert("❌ Late checkout request failed");
    }
  } catch (err) {
    console.error("❌ Network error:", err);
  }
};


  return (
    <div className="late-bg">
      <div className="late-overlay">
        <div className="late-card">
          <button className="back-btn" onClick={() => navigate("/services")}>
            ⬅ Back to Services
          </button>

          <h1>Late Checkout</h1>
          <p>Request extra time before checkout</p>

          <form onSubmit={handleSubmit} className="late-form">
            <input
              type="text"
              name="room"
              placeholder="Room Number"
              value={request.room}
              onChange={handleChange}
              required
            />

            <select
              name="checkoutTime"
              value={request.checkoutTime}
              onChange={handleChange}
              required
            >
              <option value="">Requested Checkout Time</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="1:00 PM">1:00 PM</option>
              <option value="2:00 PM">2:00 PM</option>
              <option value="3:00 PM">3:00 PM</option>
            </select>

            <textarea
              name="reason"
              placeholder="Reason (optional)"
              value={request.reason}
              onChange={handleChange}
            />

            <button type="submit">Submit Request</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LateCheckout;
