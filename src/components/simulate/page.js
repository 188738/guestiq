// src/components/simulate/page.js
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./page.css";

function SimulateStay() {
  const navigate = useNavigate();

  const [logs, setLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const timersRef = useRef([]);

  const addLog = (message) => {
    setLogs((prev) => [
      ...prev,
      { message, time: new Date().toLocaleTimeString() },
    ]);
  };

  const clearTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  const runSimulation = async () => {
  clearTimers();
  setLogs([]);
  setIsRunning(true);

  const baseURL = "http://127.0.0.1:5001";

  const guest = {
    name: "Ava Patel",
    email: "ava@demo.com",
    room: "412",
    nights: 2
  };

  const send = async (path, payload, label) => {
    try {
      await fetch(`${baseURL}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      addLog(label);
    } catch (err) {
      addLog("❌ Failed: " + label);
    }
  };

  const schedule = (ms, fn) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
  };

  // 1️⃣ Check-in
  schedule(400, () =>
    send("/checkin", guest, "🏨 Guest checked in — Room 412 (Ava Patel)")
  );

  // 2️⃣ Room service
  schedule(2000, () =>
    send("/room-service", {
      room: "412",
      item: "Burger & Fries",
      notes: "No onions"
    }, "🍽️ Room service ordered — Burger & Fries")
  );

  // 3️⃣ Spa
  schedule(3000, () =>
    send("/spa", {
      room: "412",
      service: "Swedish Massage",
      date: "2026-01-12",
      time: "15:00"
    }, "💆 Spa booked — Swedish Massage @ 3:00 PM")
  );

  // 4️⃣ Housekeeping
  schedule(4000, () =>
    send("/housekeeping", {
      room: "412",
      type: "Extra Towels",
      time: "Evening",
      notes: "2 sets please"
    }, "🧹 Housekeeping requested — Extra towels")
  );

  // 5️⃣ Late checkout
  schedule(5000, () =>
    send("/late-checkout", {
      room: "412",
      checkoutTime: "1:00 PM",
      reason: "Late flight"
    }, "⏰ Late checkout requested — 1:00 PM")
  );

  // 6️⃣ Transportation
  schedule(6000, () =>
    send("/transportation", {
      room: "412",
      tripType: "Airport Drop-off",
      location: "DFW Airport",
      date: "2026-01-13",
      time: "11:30",
      passengers: 1
    }, "🚗 Transportation scheduled — Airport drop-off")
  );

  // 7️⃣ Checkout
  schedule(7200, () => {
    send("/checkout", {
      room: "412",
      rating: 5,
      comments: "Amazing stay"
    }, "🧾 Checkout complete — Rating: 5⭐");
    setIsRunning(false);
  });
};


  const stopSimulation = () => {
    clearTimers();
    setIsRunning(false);
    addLog("⛔ Simulation stopped");
  };

  const clearLogs = () => {
    clearTimers();
    setIsRunning(false);
    setLogs([]);
  };

  return (
    <div className="simulate-bg">
      <div className="simulate-overlay">
        <div className="simulate-card">
          <button className="back-btn" onClick={() => navigate("/")}>
            ⬅ Back Home
          </button>

          <h1>Simulate Stay</h1>
          <p>Generate demo guest events for testing and demos</p>

          <div className="btn-row">
            <button
              className="primary-btn"
              onClick={runSimulation}
              disabled={isRunning}
            >
              ▶ Run Simulation
            </button>

            <button
              className="secondary-btn"
              onClick={stopSimulation}
              disabled={!isRunning}
            >
              ⏹ Stop
            </button>

            <button className="ghost-btn" onClick={clearLogs}>
              🧹 Clear
            </button>
          </div>

          <div className="log-box">
            {logs.length === 0 ? (
              <p className="placeholder">No events yet… Click “Run Simulation”.</p>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="log-item">
                  <span>{log.message}</span>
                  <small>{log.time}</small>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimulateStay;
