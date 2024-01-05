import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import your header styles

const Header = () => {
    return (
        <header className="app-header">
            <div className="logo-container">
                <Link to="/">
                    <h1>🛰️</h1>
                </Link>
            </div>
            <nav className="nav-links">

                <Link to="/dashboard" className="nav-link">
                    Dashboard
                </Link>
                <Link to="/classification" className="nav-link">
                    Classification
                </Link>
                <Link to="/Camera" className="nav-link">
                    Camera
                </Link>
            </nav>
        </header>
    );
};

export default Header;