import React, { useEffect, useRef, useState } from "react";
import "./Industries.css";

// =====================================================
// IMAGES
// =====================================================
import retailImg from "../../assets/images/about/retail.jpg";
import healthcareImg from "../../assets/images/about/hosp.jpg";
import hospitalityImg from "../../assets/images/about/hotel.jpg";
import educationImg from "../../assets/images/about/educa.jpg";
import professionalImg from "../../assets/images/about/prof.jpg";
import logisticsImg from "../../assets/images/about/logistic.jpg";
import realEstateImg from "../../assets/images/about/real.jpg";
import startupsImg from "../../assets/images/about/start.jpg";

const industries = [
  {
    no: "01",
    title: "Retail",
    text: "E-commerce, inventory, POS, CRM, loyalty.",
    image: retailImg,
  },
  {
    no: "02",
    title: "Healthcare",
    text: "Booking, patient systems, portals, AI assistance.",
    image: healthcareImg,
  },
  {
    no: "03",
    title: "Hospitality",
    text: "Reservations, websites, apps, CRM, operations.",
    image: hospitalityImg,
  },
  {
    no: "04",
    title: "Education",
    text: "Learning platforms, student systems, ERP.",
    image: educationImg,
  },
  {
    no: "05",
    title: "Professional Services",
    text: "Booking, CRM, invoicing, dashboards.",
    image: professionalImg,
  },
  {
    no: "06",
    title: "Logistics",
    text: "Tracking, dispatch, delivery systems, mobile applications.",
    image: logisticsImg,
  },
  {
    no: "07",
    title: "Real Estate",
    text: "Property portals, CRM, booking, lead management.",
    image: realEstateImg,
  },
  {
    no: "08",
    title: "Startups",
    text: "MVPs, SaaS platforms, apps, AI products.",
    image: startupsImg,
  },
];

export default function Industries() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const pinRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [showCard, setShowCard] = useState(true);

  // Helper to move Pin to exact progress on path
  const movePinToProgress = (progress) => {
    if (!pathRef.current || !pinRef.current) return;
    const pathLength = pathRef.current.getTotalLength();
    const clampedProgress = Math.max(0, Math.min(1, progress));
    const point = pathRef.current.getPointAtLength(clampedProgress * pathLength);
    pinRef.current.setAttribute("transform", `translate(${point.x}, ${point.y})`);
  };

  // Scroll synchronization
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ticking = false;

    const updateAnimation = () => {
      const isMobile = window.innerWidth <= 768;
      const rect = section.getBoundingClientRect();
      const scrollDistance = section.offsetHeight - window.innerHeight;

      if (scrollDistance <= 0) return;

      let progress = -rect.top / scrollDistance;
      progress = Math.max(0, Math.min(1, progress));

      // Move Pin
      movePinToProgress(progress);

      if (!isMobile) {
        if (progress < 0.03 || progress > 0.98) {
          setShowCard(false);
        } else {
          setShowCard(true);
          const cardProgress = (progress - 0.03) / 0.95;
          let index = Math.floor(cardProgress * industries.length);
          index = Math.max(0, Math.min(industries.length - 1, index));
          setActiveIndex(index);
        }
      } else {
        // Mobile progress
        let index = Math.floor(progress * industries.length);
        index = Math.max(0, Math.min(industries.length - 1, index));
        setActiveIndex(index);
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateAnimation();
          ticking = false;
        });
        ticking = true;
      }
    };

    updateAnimation();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateAnimation);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateAnimation);
    };
  }, []);

  // Update Pin whenever activeIndex changes (for buttons & dots click)
  useEffect(() => {
    const progress = activeIndex / (industries.length - 1);
    movePinToProgress(progress);
  }, [activeIndex]);

  const activeIndustry = industries[activeIndex];

  // Mobile arrows navigation with smooth sync
  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : industries.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < industries.length - 1 ? prev + 1 : 0));
  };

  const handleDotClick = (idx) => {
    setActiveIndex(idx);
    if (window.innerWidth > 768 && sectionRef.current) {
      const scrollDistance = sectionRef.current.offsetHeight - window.innerHeight;
      const targetScroll =
        sectionRef.current.offsetTop + (idx / (industries.length - 1)) * scrollDistance;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <section ref={sectionRef} className="industries-section">
      <div className="industries-sticky">
        {/* ========================================
            HEADER (LEFT ALIGNED)
        ======================================== */}
        <div className="industries-heading">
          <span className="eyebrow">INDUSTRIES WE SERVE</span>
          <h2>
            Powered Businesses
            <br />
            Across Industries
          </h2>
          <p>
            We build digital solutions tailored to the unique needs of different
            industries, helping them grow, innovate and stay ahead.
          </p>
        </div>

        {/* ========================================
            TOP RIGHT PILL (Desktop Only)
        ======================================== */}
        <div className="top-pill">
          <span className="pill-icon">✦</span>
          <span>Different Industries</span>
          <b>•</b>
          <span>Same Goal</span>
          <b>→</b>
          <span>Your Growth</span>
        </div>

        {/* ========================================
            STAGE: ROUTE + CARD WRAPPER
        ======================================== */}
        <div className="industries-stage">
          {/* ROUTE SVG */}
          <div className="route-container">
            <svg
              className="route-svg"
              viewBox="0 0 1400 700"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient
                  id="routeFade"
                  x1="0%"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="white" stopOpacity="0" />
                  <stop offset="14%" stopColor="white" stopOpacity="1" />
                  <stop offset="86%" stopColor="white" stopOpacity="1" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>

                <mask id="routeMask">
                  <rect
                    x="0"
                    y="0"
                    width="1400"
                    height="700"
                    fill="url(#routeFade)"
                  />
                </mask>

                <filter id="pinGlow" x="-60%" y="-60%" width="220%" height="220%">
                  <feDropShadow dx="0" dy="8" stdDeviation="7" floodColor="#1e88e5" floodOpacity="0.45" />
                </filter>
              </defs>

              <path
                className="route-glow"
                mask="url(#routeMask)"
                d="M 90 680 C 130 280 390 70 700 70 C 1010 70 1270 280 1310 680"
              />
              <path
                className="route-road"
                mask="url(#routeMask)"
                d="M 90 680 C 130 280 390 70 700 70 C 1010 70 1270 280 1310 680"
              />
              <path
                className="route-inner"
                mask="url(#routeMask)"
                d="M 90 680 C 130 280 390 70 700 70 C 1010 70 1270 280 1310 680"
              />
              <path
                ref={pathRef}
                className="route-center"
                mask="url(#routeMask)"
                d="M 90 680 C 130 280 390 70 700 70 C 1010 70 1270 280 1310 680"
              />

              {/* =======================================
                  HIGH-CONTRAST LOCATION PIN (ALWAYS VISIBLE)
              ======================================= */}
              <g ref={pinRef} className="moving-location-pin" filter="url(#pinGlow)">
                {/* Pulse halo */}
                <circle cx="0" cy="0" r="26" className="pin-pulse-ring" />
                
                {/* Location Marker Drop */}
                <path
                  d="M 0 6 C -14 6 -24 -4 -24 -18 C -24 -32 0 -54 0 -54 C 0 -54 24 -32 24 -18 C 24 -4 14 6 0 6 Z"
                  fill="#ffffff"
                  stroke="#1e88e5"
                  strokeWidth="3.5"
                />

                {/* Inner glowing dot */}
                <circle cx="0" cy="-18" r="9" fill="#1e88e5" />
                <circle cx="0" cy="-18" r="4" fill="#ffffff" />
              </g>
            </svg>

            {/* Desktop stationary milestones */}
            <div className="route-point point-2 desktop-only"><span /></div>
            <div className="route-point point-3 desktop-only"><span /></div>
            <div className="route-point point-4 desktop-only"><span /></div>
            <div className="route-point point-5 desktop-only"><span /></div>
            <div className="route-point point-6 desktop-only"><span /></div>
          </div>

          {/* ========================================
              CENTER INDUSTRY CARD
          ======================================== */}
          <div
            className={`center-industry-card ${showCard ? "show" : ""}`}
            key={activeIndustry.no}
          >
            <div className="center-card-image">
              <img src={activeIndustry.image} alt={activeIndustry.title} />
              <span className="card-counter-badge">
                {activeIndustry.no} / 08
              </span>
            </div>

            <div className="center-card-content">
              <div className="center-card-number">{activeIndustry.no}</div>
              <h3>{activeIndustry.title}</h3>
              <p>{activeIndustry.text}</p>
              <div className="center-card-arrow">→</div>
            </div>
          </div>

          {/* Mobile Quick Nav Controls */}
          <div className="mobile-nav-controls">
            <button
              type="button"
              className="nav-arrow-btn prev"
              onClick={handlePrev}
              aria-label="Previous Industry"
            >
              ‹
            </button>
            <button
              type="button"
              className="nav-arrow-btn next"
              onClick={handleNext}
              aria-label="Next Industry"
            >
              ›
            </button>
          </div>
        </div>

        {/* ========================================
            BOTTOM DOTS
        ======================================== */}
        <div className="route-message">

          <div className="small-dots">
            {industries.map((_, index) => (
              <button
                type="button"
                aria-label={`Jump to industry ${index + 1}`}
                key={index}
                onClick={() => handleDotClick(index)}
                className={`dot-btn ${index === activeIndex ? "active" : ""}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Explore Indicator */}
        <div className="explore">
          <span>SCROLL TO EXPLORE</span>
          <div>↓</div>
        </div>
      </div>
    </section>
  );
}