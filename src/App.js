import './App.css';
import React, { useEffect } from "react";
// import AOS from 'aos';
// import 'aos/dist/aos.css'; // AOS സ്റ്റൈൽ ഇംപോർട്ട് ഉറപ്പാക്കുക
import { Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';

import Home from './pages/Home';
import About from './pages/About';
// import Solutions from './pages/Solutions';
// import Contact from './pages/Contact';

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true,    
    });
  }, []);

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