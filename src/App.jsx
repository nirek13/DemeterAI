// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import ImageUpload from './components/ImageUpload';
import LandingPage from './components/LandingPage';
import CameraPage from "./components/CameraPage.js";

function App() {
    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route path="/" element={<LandingPage />} />

                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/classification" element={<ImageUpload />} />
                    <Route path="/Camera" element={<CameraPage/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;