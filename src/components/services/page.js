import "./page.css";
import { useNavigate } from "react-router-dom";
import RoomService from "./roomservice/page";
import SpaAppointment from "./spa/page";
import LateCheckout from "./latecheckout/page";
import Transportation from "./transportation/page"
import SpecialRequests from "./special-requests/page";
function Services() {
  const navigate = useNavigate();

  const services = [
    {
      title: "Room Service",
      description: "Order food and drinks directly to the guest room",
      icon: "🍽️",
    },
    {
      title: "Spa Appointment",
      description: "Book spa, massage, and wellness services",
      icon: "💆‍♀️",
    },
    {
      title: "Housekeeping",
      description: "Request room cleaning or extra supplies",
      icon: "🧹",
    },
    {
      title: "Late Checkout",
      description: "Request extended checkout time",
      icon: "⏰",
    },
    {
      title: "Transportation",
      description: "Schedule airport pickup or local transport",
      icon: "🚗",
    },
    {
      title: "Special Requests",
      description: "Birthdays, anniversaries, or custom needs",
      icon: "🎉",
    },
  ];

  const handleRequest = (serviceName) => {
    console.log(`Service requested: ${serviceName}`);

    if(serviceName == 'Room Service') {
      console.log("We are trying to go to room service page")
navigate("/services/roomservice");
    } 
    if(serviceName == 'Spa Appointment') {
      console.log("We are trying to go to spa page")
navigate("/services/spa-appointment");
    } 
    if(serviceName == 'Housekeeping') {
      console.log("We are trying to go to room service page")
      navigate("/services/housekeeping");
    } 

    if(serviceName == "Late Checkout") {
      navigate("/services/late-checkout")
    }

    if(serviceName == "Transportation") {
      console.log("We are trying to go to transprtation")
      navigate("/services/transportation")
    }

    if(serviceName == "Special Requests")
    // 🔥 Later: send this to Klaviyo Events API
    navigate("/services/special-requests")
  };

  return (
    <div className="services-bg">
      <div className="services-overlay">
        <div className="services-card">
          <button className="back-btn" onClick={() => navigate("/")}>
            ⬅ Back Home
          </button>

          <h1>Services & Amenities</h1>
          <p>Enhance the guest experience with on-demand services</p>

          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-item">
                <span className="service-icon">{service.icon}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <button onClick={() => handleRequest(service.title)}>
                  Request
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
