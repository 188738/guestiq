import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./page.css";

function Transportation() {
  const navigate = useNavigate();

  const [request, setRequest] = useState({
    room: "",
    tripType: "",
    location: "",
    date: "",
    time: "",
    passengers: 1,
    notes: "",
  });

  const handleChange = (e) => {
    setRequest({ ...request, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("📤 Transportation payload:");
  console.table(request);

  try {
    const response = await fetch("http://127.0.0.1:5001/transportation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    });

    const data = await response.json();
    console.log("📥 Backend response:", data);

    if (data.success) {
      alert(`✅ Transportation requested for Room ${request.room}`);
      setRequest({
        room: "",
        tripType: "",
        location: "",
        date: "",
        time: "",
        passengers: 1,
        notes: "",
      });
    } else {
      alert("❌ Transportation request failed");
    }
  } catch (err) {
    console.error("❌ Network error:", err);
  }
};


  return (
    <div className="transport-bg">
      <div className="transport-overlay">
        <div className="transport-card">
          <button className="back-btn" onClick={() => navigate("/services")}>
            ⬅ Back to Services
          </button>

          <h1>Transportation</h1>
          <p>Schedule airport or local transportation</p>

          <form onSubmit={handleSubmit} className="transport-form">
            <input
              type="text"
              name="room"
              placeholder="Room Number"
              value={request.room}
              onChange={handleChange}
              required
            />

            <select
              name="tripType"
              value={request.tripType}
              onChange={handleChange}
              required
            >
              <option value="">Trip Type</option>
              <option value="Airport Pickup">Airport Pickup</option>
              <option value="Airport Drop-off">Airport Drop-off</option>
              <option value="Local Ride">Local Ride</option>
            </select>

            <input
              type="text"
              name="location"
              placeholder="Pickup / Drop-off Location"
              value={request.location}
              onChange={handleChange}
              required
            />

            <div className="row">
              <input
                type="date"
                name="date"
                value={request.date}
                onChange={handleChange}
                required
              />

              <input
                type="time"
                name="time"
                value={request.time}
                onChange={handleChange}
                required
              />
            </div>

            <input
              type="number"
              name="passengers"
              min="1"
              placeholder="Passengers"
              value={request.passengers}
              onChange={handleChange}
            />

            <textarea
              name="notes"
              placeholder="Notes (flight number, luggage, child seat, etc.)"
              value={request.notes}
              onChange={handleChange}
            />

            <button type="submit">Request Transportation</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Transportation;
