import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo-container">
                <img src="/images/logo.png" alt="SmartBite Logo" className="logo-img" />
                <h2 className="logo-text">SmartBite</h2>
            </div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/#features">Features</Link></li>
                <li><Link to="/#testimonials">Testimonials</Link></li>
                <li><Link to="/#contact">Contact</Link></li>
                <li><Link to="/login" className="cta-button">Login</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
