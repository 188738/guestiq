import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./page.css";
  import { useEffect } from "react";

function RoomService() {
  const navigate = useNavigate();

  const [order, setOrder] = useState({
    room: "",
    item: "",
    notes: "",
  });

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("📤 Room Service payload:");
  console.table(order);

  try {
    const response = await fetch("http://127.0.0.1:5001/room-service", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    });

    const data = await response.json();
    console.log("📥 Backend response:", data);

    if (data.success) {
      alert(`✅ Room service request sent for Room ${order.room}`);
      setOrder({ room: "", item: "", notes: "" });
    } else {
      alert("❌ Room service request failed");
    }
  } catch (err) {
    console.error("❌ Network error:", err);
  }
};



useEffect(() => {
  console.log("roomservice has been rendered")
  // side effects here
}, []);


  return (
    <div className="room-bg">
      <div className="room-overlay">
        <div className="room-card">
          <button className="back-btn" onClick={() => navigate("/services")}>
            ⬅ Back to Services
          </button>

          <h1>Room Service</h1>
          <p>Order food and drinks directly to your room</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="room"
              placeholder="Room Number"
              value={order.room}
              onChange={handleChange}
              required
            />

            <select
              name="item"
              value={order.item}
              onChange={handleChange}
              required
            >
              <option value="">Select Menu Item</option>
              <option value="Breakfast Combo">Breakfast Combo</option>
              <option value="Burger & Fries">Burger & Fries</option>
              <option value="Pasta Alfredo">Pasta Alfredo</option>
              <option value="Caesar Salad">Caesar Salad</option>
              <option value="Coffee & Dessert">Coffee & Dessert</option>
            </select>

            <textarea
              name="notes"
              placeholder="Special instructions (optional)"
              value={order.notes}
              onChange={handleChange}
            />

            <button type="submit">Place Order</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RoomService;
