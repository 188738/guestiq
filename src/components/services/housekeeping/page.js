import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./page.css";

function Housekeeping() {
  const navigate = useNavigate();

  const [request, setRequest] = useState({
    room: "",
    type: "",
    time: "",
    notes: "",
  });

  const handleChange = (e) => {
    setRequest({ ...request, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Housekeeping Request:", request);

    // 🔥 Later: send to Klaviyo Events API
    alert(`✅ Housekeeping request sent for Room ${request.room}`);

    setRequest({ room: "", type: "", time: "", notes: "" });
  };

  return (
    <div className="house-bg">
      <div className="house-overlay">
        <div className="house-card">
          <button className="back-btn" onClick={() => navigate("/services")}>
            ⬅ Back to Services
          </button>

          <h1>Housekeeping</h1>
          <p>Request cleaning, towels, or supplies</p>

          <form onSubmit={handleSubmit} className="house-form">
            <input
              type="text"
              name="room"
              placeholder="Room Number"
              value={request.room}
              onChange={handleChange}
              required
            />

            <select
              name="type"
              value={request.type}
              onChange={handleChange}
              required
            >
              <option value="">Select Request</option>
              <option value="Full Cleaning">Full Cleaning</option>
              <option value="Towel Replacement">Towel Replacement</option>
              <option value="Bed Sheet Change">Bed Sheet Change</option>
              <option value="Trash Removal">Trash Removal</option>
              <option value="Extra Toiletries">Extra Toiletries</option>
            </select>

            <select
              name="time"
              value={request.time}
              onChange={handleChange}
              required
            >
              <option value="">Preferred Time</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
            </select>

            <textarea
              name="notes"
              placeholder="Additional instructions (optional)"
              value={request.notes}
              onChange={handleChange}
            />

            <button type="submit">Submit Request</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Housekeeping;
