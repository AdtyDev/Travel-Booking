import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BookingForm from "./components/BookingForm";
import BookingsList from "./components/BookingsList";
import "./index.css"; // Import styles

const Home = () => (
    <div className="container">
        <h1>✈️ Travel Booking</h1>
        <BookingForm />
        <Link to="/bookings" className="btn">View All Bookings</Link>
    </div>
);

const BookingsPage = () => (
    <div className="container">
        <h1>📜 All Bookings</h1>
        <BookingsList />
        <Link to="/" className="btn">Back to Home</Link>
    </div>
);

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bookings" element={<BookingsPage />} />
        </Routes>
    </Router>
);

export default App;
