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

  const runSimulation = () => {
    clearTimers();
    setLogs([]);
    setIsRunning(true);

    const schedule = (ms, fn) => {
      const id = setTimeout(fn, ms);
      timersRef.current.push(id);
    };

    schedule(400, () => addLog("🏨 Guest checked in — Room 412 (Ava Patel)"));
    schedule(1200, () => addLog("📩 Welcome message sent (demo)"));
    schedule(2000, () => addLog("🍽️ Room service ordered — Burger & Fries"));
    schedule(2800, () => addLog("💆 Spa booked — Swedish Massage @ 3:00 PM"));
    schedule(3600, () => addLog("🧹 Housekeeping requested — Extra towels"));
    schedule(4400, () => addLog("⏰ Late checkout requested — 1:00 PM"));
    schedule(5200, () => addLog("🚗 Transportation scheduled — Airport drop-off"));
    schedule(6200, () => {
      addLog("🧾 Checkout complete — Rating: 5⭐");
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
