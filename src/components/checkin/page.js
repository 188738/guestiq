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
  const { name, value } = e.target;

  setGuest({
    ...guest,
    [name]: name === "nights" ? Number(value) : value
  });
};


 const handleSubmit = async (e) => {
  e.preventDefault();

  // 👇 Print everything that will be sent
  console.log("📤 Submitting Guest Check-In:");
  console.table(guest);

  try {
    const response = await fetch("http://127.0.0.1:5001/checkin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(guest)
    });

    const data = await response.json();

    console.log("📥 Backend response:", data);

    if (data.success) {
      alert(`✅ ${guest.name} checked in!`);
      setGuest({ name: "", email: "", room: "", nights: 1 });
    } else {
      alert("❌ Something went wrong");
    }
  } catch (err) {
    console.error("❌ Network error:", err);
  }
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
