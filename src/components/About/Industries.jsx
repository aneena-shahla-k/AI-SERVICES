import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Industries.css";

import retailImg from "../../assets/images/about/retail.jpg";
import healthcareImg from "../../assets/images/about/hosp.jpg";
import hospitalityImg from "../../assets/images/about/hotel.jpg";
import educationImg from "../../assets/images/about/educa.jpg";
import professionalImg from "../../assets/images/about/prof.jpg";
import logisticsImg from "../../assets/images/about/logistic.jpg";
import realEstateImg from "../../assets/images/about/real.jpg";
import startupsImg from "../../assets/images/about/start.jpg";

const industries = [
  { no: "01", title: "Retail", text: "E-commerce, inventory, POS, CRM, loyalty.", image: retailImg },
  { no: "02", title: "Healthcare", text: "Booking, patient systems, portals, AI assistance.", image: healthcareImg },
  { no: "03", title: "Hospitality", text: "Reservations, websites, apps, CRM, operations.", image: hospitalityImg },
  { no: "04", title: "Education", text: "Learning platforms, student systems, ERP.", image: educationImg },
  { no: "05", title: "Professional Services", text: "Booking, CRM, invoicing, dashboards.", image: professionalImg },
  { no: "06", title: "Logistics", text: "Tracking, dispatch, delivery systems, mobile applications.", image: logisticsImg },
  { no: "07", title: "Real Estate", text: "Property portals, CRM, booking, lead management.", image: realEstateImg },
  { no: "08", title: "Startups", text: "MVPs, SaaS platforms, apps, AI products.", image: startupsImg },
];

export default function Industries() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const pinRef = useRef(null);

  const pathLengthRef = useRef(0);
  const tickingRef = useRef(false);
  const lastIndexRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [showCard, setShowCard] = useState(true);

  /*
   * --------------------------------------------------
   * SAFE SVG INITIALIZATION
   * --------------------------------------------------
   */
  const initializePath = useCallback(() => {
    const path = pathRef.current;

    if (!path) return false;

    try {
      if (typeof path.getTotalLength !== "function") {
        return false;
      }

      const length = path.getTotalLength();

      if (!Number.isFinite(length) || length <= 0) {
        return false;
      }

      pathLengthRef.current = length;
      return true;
    } catch (error) {
      console.warn("Industries SVG disabled:", error);
      pathLengthRef.current = 0;
      return false;
    }
  }, []);

  /*
   * --------------------------------------------------
   * SAFE PIN MOVEMENT
   * --------------------------------------------------
   */
  const movePinToProgress = useCallback((progress) => {
    const path = pathRef.current;
    const pin = pinRef.current;
    const length = pathLengthRef.current;

    if (!path || !pin || !length) return;

    try {
      const safeProgress = Math.max(
        0,
        Math.min(1, Number(progress) || 0)
      );

      if (typeof path.getPointAtLength !== "function") {
        return;
      }

      const point = path.getPointAtLength(
        safeProgress * length
      );

      if (
        !point ||
        !Number.isFinite(point.x) ||
        !Number.isFinite(point.y)
      ) {
        return;
      }

      pin.setAttribute(
        "transform",
        `translate(${point.x}, ${point.y})`
      );
    } catch (error) {
      console.warn("Industries pin animation disabled:", error);
    }
  }, []);

  /*
   * --------------------------------------------------
   * SCROLL ENGINE
   * --------------------------------------------------
   */
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    initializePath();

    let mounted = true;

    const update = () => {
      if (!mounted) return;

      tickingRef.current = false;

      const rect = section.getBoundingClientRect();

      const viewportHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        1;

      const scrollDistance =
        section.offsetHeight - viewportHeight;

      if (scrollDistance <= 0) return;

      let progress = -rect.top / scrollDistance;

      progress = Math.max(
        0,
        Math.min(1, progress)
      );

      movePinToProgress(progress);

      const isMobile = window.innerWidth <= 768;

      let index;

      if (!isMobile) {
        if (progress < 0.03 || progress > 0.98) {
          setShowCard(false);
          return;
        }

        setShowCard(true);

        const cardProgress =
          (progress - 0.03) / 0.95;

        index = Math.floor(
          cardProgress * industries.length
        );
      } else {
        index = Math.floor(
          progress * industries.length
        );
      }

      index = Math.max(
        0,
        Math.min(
          industries.length - 1,
          index
        )
      );

      /*
       * IMPORTANT:
       * Don't update React state every frame.
       */
      if (index !== lastIndexRef.current) {
        lastIndexRef.current = index;
        setActiveIndex(index);
      }
    };

    const handleScroll = () => {
      if (tickingRef.current) return;

      tickingRef.current = true;

      if ("requestAnimationFrame" in window) {
        window.requestAnimationFrame(update);
      } else {
        update();
      }
    };

    const handleResize = () => {
      initializePath();
      update();
    };

    update();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      mounted = false;

      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, [initializePath, movePinToProgress]);

  /*
   * --------------------------------------------------
   * ACTIVE INDEX → PIN
   * --------------------------------------------------
   */
  useEffect(() => {
    if (industries.length <= 1) return;

    const progress =
      activeIndex /
      (industries.length - 1);

    movePinToProgress(progress);
  }, [activeIndex, movePinToProgress]);

  const activeIndustry =
    industries[activeIndex] || industries[0];

  const handlePrev = () => {
    setActiveIndex((prev) => {
      const next =
        prev > 0
          ? prev - 1
          : industries.length - 1;

      lastIndexRef.current = next;
      return next;
    });
  };

  const handleNext = () => {
    setActiveIndex((prev) => {
      const next =
        prev < industries.length - 1
          ? prev + 1
          : 0;

      lastIndexRef.current = next;
      return next;
    });
  };

  const handleDotClick = (index) => {
    lastIndexRef.current = index;
    setActiveIndex(index);

    const section = sectionRef.current;

    if (
      window.innerWidth > 768 &&
      section
    ) {
      const viewportHeight =
        window.innerHeight ||
        document.documentElement.clientHeight;

      const scrollDistance =
        section.offsetHeight -
        viewportHeight;

      const target =
        section.offsetTop +
        (index /
          (industries.length - 1)) *
          scrollDistance;

      window.scrollTo({
        top: target,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="industries-section"
    >
      <div className="industries-sticky">

        <div className="industries-heading">
          <span className="eyebrow">
            INDUSTRIES WE SERVE
          </span>

          <h2>
            Powered Businesses
            <br />
            Across Industries
          </h2>

          <p>
            We build digital solutions tailored
            to the unique needs of different
            industries, helping them grow,
            innovate and stay ahead.
          </p>
        </div>

        <div className="top-pill">
          <span className="pill-icon">✦</span>
          <span>Different Industries</span>
          <b>•</b>
          <span>Same Goal</span>
          <b>→</b>
          <span>Your Growth</span>
        </div>

        <div className="industries-stage">

          <div className="route-container">
            <svg
              className="route-svg"
              viewBox="0 0 1400 700"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="industriesRouteFade"
                  x1="0%"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="white"
                    stopOpacity="0"
                  />
                  <stop
                    offset="14%"
                    stopColor="white"
                    stopOpacity="1"
                  />
                  <stop
                    offset="86%"
                    stopColor="white"
                    stopOpacity="1"
                  />
                  <stop
                    offset="100%"
                    stopColor="white"
                    stopOpacity="0"
                  />
                </linearGradient>

                <mask id="industriesRouteMask">
                  <rect
                    x="0"
                    y="0"
                    width="1400"
                    height="700"
                    fill="url(#industriesRouteFade)"
                  />
                </mask>

                {/* Keep the filter lightweight */}
                <filter
                  id="industriesPinGlow"
                  x="-30%"
                  y="-30%"
                  width="160%"
                  height="160%"
                >
                  <feDropShadow
                    dx="0"
                    dy="5"
                    stdDeviation="4"
                    floodColor="#1e88e5"
                    floodOpacity="0.3"
                  />
                </filter>
              </defs>

              <path
                className="route-glow"
                mask="url(#industriesRouteMask)"
                d="M 90 680 C 130 280 390 70 700 70 C 1010 70 1270 280 1310 680"
              />

              <path
                className="route-road"
                mask="url(#industriesRouteMask)"
                d="M 90 680 C 130 280 390 70 700 70 C 1010 70 1270 280 1310 680"
              />

              <path
                className="route-inner"
                mask="url(#industriesRouteMask)"
                d="M 90 680 C 130 280 390 70 700 70 C 1010 70 1270 280 1310 680"
              />

              <path
                ref={pathRef}
                className="route-center"
                mask="url(#industriesRouteMask)"
                d="M 90 680 C 130 280 390 70 700 70 C 1010 70 1270 280 1310 680"
              />

              <g
                ref={pinRef}
                className="moving-location-pin"
                filter="url(#industriesPinGlow)"
              >
                <circle
                  cx="0"
                  cy="0"
                  r="24"
                  className="pin-pulse-ring"
                />

                <path
                  d="M 0 6 C -14 6 -24 -4 -24 -18 C -24 -32 0 -54 0 -54 C 0 -54 24 -32 24 -18 C 24 -4 14 6 0 6 Z"
                  fill="#ffffff"
                  stroke="#1e88e5"
                  strokeWidth="3.5"
                />

                <circle
                  cx="0"
                  cy="-18"
                  r="9"
                  fill="#1e88e5"
                />

                <circle
                  cx="0"
                  cy="-18"
                  r="4"
                  fill="#ffffff"
                />
              </g>
            </svg>

            <div className="route-point point-2 desktop-only">
              <span />
            </div>

            <div className="route-point point-3 desktop-only">
              <span />
            </div>

            <div className="route-point point-4 desktop-only">
              <span />
            </div>

            <div className="route-point point-5 desktop-only">
              <span />
            </div>

            <div className="route-point point-6 desktop-only">
              <span />
            </div>
          </div>

          <div
            className={`center-industry-card ${
              showCard ? "show" : ""
            }`}
          >
            <div className="center-card-image">
              <img
                src={activeIndustry.image}
                alt={activeIndustry.title}
                loading="lazy"
                decoding="async"
              />

              <span className="card-counter-badge">
                {activeIndustry.no} / 08
              </span>
            </div>

            <div className="center-card-content">
              <div className="center-card-number">
                {activeIndustry.no}
              </div>

              <h3>{activeIndustry.title}</h3>

              <p>{activeIndustry.text}</p>

              <div className="center-card-arrow">
                →
              </div>
            </div>
          </div>

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

        <div className="route-message">
          <div className="small-dots">
            {industries.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Jump to industry ${
                  index + 1
                }`}
                onClick={() =>
                  handleDotClick(index)
                }
                className={`dot-btn ${
                  index === activeIndex
                    ? "active"
                    : ""
                }`}
              />
            ))}
          </div>
        </div>

        <div className="explore">
          <span>SCROLL TO EXPLORE</span>
          <div>↓</div>
        </div>
      </div>
    </section>
  );
}