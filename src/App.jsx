import React from "react";
import {Routes, Route} from 'react-router-dom';
import Layout from "./layout/Layout";
import WelcomeSection from './pages/home/WelcomeSection';


function App() {
  return (
    <Layout>
    <div className="App">
      <WelcomeSection />
      {/* Otros componentes */}
    </div>
    </Layout>
  );
}

export default App;
