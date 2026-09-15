import React, { useState } from "react";
import SmoothScroll from "./components/SmoothScroll/SmoothScroll";
import Navbar from "./components/Navigation/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Solutions from "./pages/Solutions";
// import GrowthPlans from "./pages/GrowthPlans";
import ProjectDetail from "./pages/ProjectDetail";
import About from "./pages/About";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedSlug, setSelectedSlug] = useState(null);

  const handleNavigate = (page, slug = null) => {
    console.log("Navigating to:", page); // Console-il page name varunundo ennariyan
    setCurrentPage(page);
    setSelectedSlug(slug);
    window.scrollTo(0, 0); // Page change aavumbol mukhalilekku scroll aavan
  };

  return (
    <SmoothScroll>
      <Navbar 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
        onOpenProject={() => setCurrentPage("details")} 
      />

      <main>
        {/* Fallback check: 'solutions' allengilum 'Solutions' enn vannalum open aakum */}
        {(currentPage === "home" || !currentPage) && <Home />}
        {(currentPage === "about" || !currentPage) && <About />}
        {(currentPage === "solutions" || currentPage === "Solutions") && <Solutions onNavigate={handleNavigate} slug={selectedSlug} />}
        {currentPage === "details" && <ProjectDetail />}
      </main>

      <Footer />
    </SmoothScroll>
  );
}

export default App;