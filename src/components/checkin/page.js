import { useState } from "react";
import "./page.css";
import { useNavigate } from "react-router-dom";

function CheckIn() {
  const navigate = useNavigate(); // ✅ hook at top level

  const [guest, setGuest] = useState({
    name: "",
    email: "",
    room: "",
    nights: 1,
  });

  const handleChange = (e) => {
    setGuest({ ...guest, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Guest Check-In:", guest);
    alert(`✅ ${guest.name} checked in successfully!`);

    setGuest({ name: "", email: "", room: "", nights: 1 });
  };

  const goHome = () => {
    console.log("We are going home");
    navigate("/"); // or "/home" depending on your routes
  };

  return (
    <div className="checkin-bg">
      <div className="checkin-overlay">
        <div className="checkin-card">
          <button onClick={goHome}>⬅ Go Back Home</button>

          <h1>Guest Check-In</h1>
          <p>Start a personalized guest journey</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Guest Name"
              value={guest.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={guest.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="room"
              placeholder="Room Number"
              value={guest.room}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="nights"
              min="1"
              value={guest.nights}
              onChange={handleChange}
            />

            <button type="submit">Check In Guest</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CheckIn;
