// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/home";
import CheckIn from "./components/checkin/page"; // 👈 ADD THIS
import Services from "./components/services/page"
import RoomService from "./components/services/roomservice/page";
import SpaAppointment from "./components/services/spa/page";
import Housekeeping from "./components/services/housekeeping/page";
import LateCheckout from "./components/services/latecheckout/page";
import Transportation from "./components/services/transportation/page";
import SpecialRequests from "./components/services/special-requests/page";
import Checkout from "./components/checkout/page";
import Simulate from "./components/simulate/page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/simulate" element={<Simulate /> } />
        <Route path="/checkin" element={<CheckIn />} /> {/* 👈 ADD THIS */}
        <Route path="/services" element={<Services />} />
        <Route path="/services/roomservice" element={<RoomService />} ></Route>
        <Route path="/services/spa-appointment" element={<SpaAppointment />} ></Route>
        <Route path="/services/housekeeping" element={<Housekeeping />} />
        <Route path="/services/late-checkout" element={<LateCheckout />} />
        <Route path="/services/transportation" element={<Transportation />} />
        <Route path="/services/special-requests" element={<Transportation />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
