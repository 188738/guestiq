import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./page.css";

function SpaAppointment() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    room: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Spa Appointment Request:", form);

    // 🔥 Later: send to Klaviyo Events API
    alert(`✅ Spa appointment requested for Room ${form.room}`);

    setForm({ room: "", service: "", date: "", time: "", notes: "" });
  };

  return (
    <div className="spa-bg">
      <div className="spa-overlay">
        <div className="spa-card">
          <button className="back-btn" onClick={() => navigate("/services")}>
            ⬅ Back to Services
          </button>

          <h1>Spa Appointment</h1>
          <p>Book a massage, facial, or wellness session</p>

          <form onSubmit={handleSubmit} className="spa-form">
            <input
              type="text"
              name="room"
              placeholder="Room Number"
              value={form.room}
              onChange={handleChange}
              required
            />

            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              required
            >
              <option value="">Select Service</option>
              <option value="Swedish Massage">Swedish Massage</option>
              <option value="Deep Tissue Massage">Deep Tissue Massage</option>
              <option value="Facial Treatment">Facial Treatment</option>
              <option value="Sauna Session">Sauna Session</option>
              <option value="Couples Massage">Couples Massage</option>
            </select>

            <div className="row">
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />

              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                required
              />
            </div>

            <textarea
              name="notes"
              placeholder="Notes (optional) — preferences, allergies, etc."
              value={form.notes}
              onChange={handleChange}
            />

            <button type="submit">Book Appointment</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SpaAppointment;
