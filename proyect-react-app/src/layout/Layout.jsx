import React from "react";
import "./Layout.css";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Diseases from "../pages/Diseases";
import Quiz from "../pages/Quiz";
import AboutUs from "../pages/AboutUs";
import WelcomeSection from "../pages/home/WelcomeSection";
import { Routes, Route } from "react-router-dom";

const Layout = () => {
  return (
    <div className="layout-container">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<WelcomeSection />} />
          <Route path="/enfermedades" element={<Diseases />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/sobre-nosotros" element={<AboutUs />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;