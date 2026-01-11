import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./page.css";

function SpecialRequests() {
  const navigate = useNavigate();

  const [request, setRequest] = useState({
    room: "",
    category: "",
    details: "",
  });

  const handleChange = (e) => {
    setRequest({ ...request, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("📤 Special Request payload:");
  console.table(request);

  try {
    const response = await fetch("http://127.0.0.1:5001/special-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    });

    const data = await response.json();
    console.log("📥 Backend response:", data);

    if (data.success) {
      alert(`✅ Special request submitted for Room ${request.room}`);
      setRequest({ room: "", category: "", details: "" });
    } else {
      alert("❌ Special request failed");
    }
  } catch (err) {
    console.error("❌ Network error:", err);
  }
};

  return (
    <div className="special-bg">
      <div className="special-overlay">
        <div className="special-card">
          <button className="back-btn" onClick={() => navigate("/services")}>
            ⬅ Back to Services
          </button>

          <h1>Special Requests</h1>
          <p>Let us know how we can make your stay extra special</p>

          <form onSubmit={handleSubmit} className="special-form">
            <input
              type="text"
              name="room"
              placeholder="Room Number"
              value={request.room}
              onChange={handleChange}
              required
            />

            <select
              name="category"
              value={request.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Request Type</option>
              <option value="Birthday Setup">Birthday Setup</option>
              <option value="Anniversary Setup">Anniversary Setup</option>
              <option value="Accessibility Assistance">
                Accessibility Assistance
              </option>
              <option value="Extra Bedding">Extra Bedding</option>
              <option value="Other">Other</option>
            </select>

            <textarea
              name="details"
              placeholder="Describe your request"
              value={request.details}
              onChange={handleChange}
              required
            />

            <button type="submit">Submit Request</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SpecialRequests;
