import './App.css';
// import React, { useEffect } from "react";
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navigation/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

import Home from './pages/Home';
import About from './pages/About';
// import Solutions from './pages/Solutions';
// import Contact from './pages/Contact';

const App = () => {
  // useEffect(() => {
  //   AOS.init({
  //     duration: 1000, 
  //     once: true,    
  //   });
  // }, []);

  return (
    <>
      <Navbar />
      <ScrollToTop />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/solutions" element={<Solutions />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
      
      <Footer />
    </>
  );
};

export default App;