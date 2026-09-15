import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

import SmoothScroll from "./components/SmoothScroll/SmoothScroll";
import Navbar from "./components/Navigation/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
// import Solutions from "./pages/Solutions";
// import ProjectDetail from "./pages/ProjectDetail";
import About from "./pages/About";

// =====================================================
// APP CONTENT
// =====================================================

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  // const [selectedSlug, setSelectedSlug] = useState(null);
  const [projectOpen, setProjectOpen] = useState(false);

  // =====================================================
  // CURRENT PAGE
  // =====================================================

  const getCurrentPage = () => {
    const path = location.pathname;

    if (path === "/") {
      return "home";
    }

    if (path.startsWith("/about")) {
      return "about";
    }

    // if (path.startsWith("/solutions")) {
    //   return "solutions";
    // }

    if (path.startsWith("/contact")) {
      return "contact";
    }

    // if (path.startsWith("/project")) {
    //   return "details";
    // }

    return "";
  };

  const currentPage = getCurrentPage();

  // =====================================================
  // NAVIGATION
  // =====================================================

  const handleNavigate = (page, slug = null) => {
    // setSelectedSlug(slug);

    switch (page) {
      case "home":
        navigate("/");
        break;

      case "about":
        navigate("/about");
        break;

      case "solutions":
        if (slug) {
          navigate(`/solutions/${slug}`);
        } else {
          navigate("/solutions");
        }
        break;

      case "contact":
        navigate("/contact");
        break;

      case "details":
        navigate("/project");
        break;

      default:
        navigate("/");
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // START PROJECT
  // =====================================================

  const handleOpenProject = () => {
    setProjectOpen(true);
  };

  const handleCloseProject = () => {
    setProjectOpen(false);
  };

  // =====================================================
  // BOOKING
  // =====================================================

  const handleOpenBooking = () => {
    console.log("Open booking");
  };

  return (
    <SmoothScroll>

      {/* =================================================
          NAVBAR
      ================================================= */}

      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenProject={handleOpenProject}
      />


      {/* =================================================
          ROUTES
      ================================================= */}

      <main>

        <Routes>

          {/* HOME */}

          <Route
            path="/"
            element={<Home />}
          />


          {/* ABOUT */}

          <Route
            path="/about"
            element={<About />}
          />


          {/* SOLUTIONS */}
{/* 
          <Route
            path="/solutions"
            element={
              <Solutions
                onNavigate={handleNavigate}
                slug={selectedSlug}
              />
            }
          /> */}


          {/* SOLUTION DETAIL */}

          {/* <Route
            path="/solutions/:slug"
            element={
              <Solutions
                onNavigate={handleNavigate}
                slug={selectedSlug}
              />
            }
          /> */}


          {/* CONTACT */}

          {/* Replace ProjectDetail with Contact when
              you have a separate Contact page */}
{/* 
          <Route
            path="/contact"
            element={<ProjectDetail />}
          /> */}


          {/* PROJECT */}

          {/* <Route
            path="/project"
            element={<ProjectDetail />}
          /> */}

        </Routes>

      </main>


      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer
        onOpenBooking={handleOpenBooking}
        onOpenProject={handleOpenProject}
      />


      {/* =================================================
          PROJECT MODAL
      ================================================= */}

      {projectOpen && (
        <div
          className="project-modal-overlay"
          onClick={handleCloseProject}
        >
          <div
            className="project-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              type="button"
              onClick={handleCloseProject}
              className="project-modal-close"
              aria-label="Close"
            >
              ×
            </button>

            {/* <ProjectDetail /> */}

          </div>
        </div>
      )}

    </SmoothScroll>
  );
}


// =====================================================
// APP
// =====================================================

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}