import { useNavigate } from "react-router-dom";
import "./home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-bg">
      <div className="overlay">
        <div className="home-container">
          <h1 className="home-title"> StaySync</h1>
          <p className="home-subtitle">
            Smart guest engagement powered by real-time Klaviyo events
          </p>

          <div className="card-grid">
            <div className="card" onClick={() => navigate("/checkin")}>
              <span className="icon">🏨</span>
              <h3>Guest Check-In</h3>
              <p>Register arrivals and start guest journeys</p>
            </div>

            <div className="card" onClick={() => navigate("/services")}>
              <span className="icon">🍽</span>
              <h3>Services & Amenities</h3>
              <p>Room service, spa, and special requests</p>
            </div>

            <div className="card" onClick={() => navigate("/checkout")}>
              <span className="icon">🧾</span>
              <h3>Checkout</h3>
              <p>Complete stay and capture feedback</p>
            </div>

            <div className="card" onClick={() => navigate("/simulate")}>
              <span className="icon">⚡</span>
              <h3>Simulate Stay</h3>
              <p>Auto-generate demo guest events</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
