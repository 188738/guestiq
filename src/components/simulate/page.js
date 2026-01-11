import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./page.module.css";

function SimulateStay() {
  const navigate = useNavigate();
  const [guests, setGuests] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5001/guests")
      .then(res => res.json())
      .then(data => setGuests(data))
      .catch(err => console.error("Failed to load guests", err));
  }, []);

  return (
    <div className={styles["simulate-bg"]}>
      <div className={styles["simulate-overlay"]}>
        <div className={styles["simulate-card"]}>

          <button
            className={styles["back-btn"]}
            onClick={() => navigate("/")}
          >
            ⬅ Back Home
          </button>

          <h1>Guest Directory</h1>
          <p>Every guest who interacted with the hotel</p>

          <div className={styles["guest-grid"]}>
            {guests.map((g, i) => (
              <div
                key={i}
                className={styles["guest-tile"]}
                onClick={() => setSelectedGuest(g)}
              >
                <h3>{g.name}</h3>
                <p>Room {g.room}</p>
                <small>{g.events.length} actions</small>
              </div>
            ))}
          </div>

          {selectedGuest && (
            <div className={styles["guest-panel"]}>
              <h2>{selectedGuest.name}</h2>
              <p>Room: {selectedGuest.room}</p>
              <p>Email: {selectedGuest.email || "Unknown"}</p>

              <h3>Timeline</h3>

              {selectedGuest.events.map((e, i) => (
                <div key={i} className={styles["timeline-item"]}>
                  <strong>{e.type}</strong>
                  <pre>{JSON.stringify(e.data, null, 2)}</pre>
                </div>
              ))}

              <button
                className={styles["ghost-btn"]}
                onClick={() => setSelectedGuest(null)}
              >
                Close
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default SimulateStay;
