import "./App.css";
import Home from "./Components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import TutorMain from "./Components/TutorMain";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Tutor from "./Components/Tutor";
import GetTutor from "./Components/GetTutor";
import SelTutor from "./Components/SelTutor";
import TutorDetails from "./Components/TutorDetails.jsx";
import Inbox from "./Components/Inbox.jsx";
import RoomPage from "./Components/RoomPage.jsx";
import PaymentPage from "./Components/PaymentPage.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<TutorMain />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/tutors" element={<Tutor />} />
        <Route path="/tutor" element={<GetTutor />} />
        <Route path="/seltutor" element={<SelTutor />} />
        <Route path="/tutor-details/:tutorId" element={<TutorDetails />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/room/:roomCode" element={<RoomPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
