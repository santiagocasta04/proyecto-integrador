import React from "react";
import "./Layout.css";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Diseases from "../pages/diseases/Diseases";
import Quiz from "../pages/Quiz";
import AboutUs from "../pages/AboutUs";
import WelcomeSection from "../pages/home/WelcomeSection";
import FattyLiverSection from "../pages/diseases/fattyLiver."
import LiverCirrhosisSection from "../pages/diseases/liverCirrhosis"
import EhaSection from "../pages/diseases/EHA";
import Login from "../pages/Login";
import { Routes, Route } from "react-router-dom";
import MapaSection from "../pages/home/mapa";

const Layout = () => {
  return (
    <div className="layout-container">
  
      <Header />


      <main className="main-content">
        <Routes>
          <Route path="/mapa" element={<MapaSection />}/>
          <Route path="/" element={<WelcomeSection />} />
          <Route path="/enfermedades" element={<Diseases />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/sobre-nosotros" element={<AboutUs />} />
          <Route path="/registrarse" element={<Login />} /> 
          <Route path="/higadograso" element={<FattyLiverSection/>} />
          <Route path="/cirrosishepatica" element={<LiverCirrhosisSection/>} />
          <Route path="/hepatitis-alcohólica" element={<EhaSection/>} />
        </Routes>
      </main>
        
      <Footer />
    </div>
  );
};

export default Layout;