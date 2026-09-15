import React, { useEffect, useRef, useState } from "react";
import "./GPSPhilosophy.css";

// Change this only if your actual map filename is different
import worldMap from "../assets/images/world-map.avif";
import successionImage from "../assets/images/succession1.png";

const routeSteps = [
  {
    number: "01",
    title: "IDEA",
    description: "The spark of opportunity",
    progress: 0.13,
    className: "gps-step-idea",
  },
  {
    number: "02",
    title: "STRATEGY",
    description: "The right direction",
    progress: 0.29,
    className: "gps-step-strategy",
  },
  {
    number: "03",
    title: "TECHNOLOGY",
    description: "Built for scale",
    progress: 0.45,
    className: "gps-step-technology",
  },
  {
    number: "04",
    title: "MARKETING",
    description: "Reach & engage",
    progress: 0.62,
    className: "gps-step-marketing",
  },
  {
    number: "05",
    title: "GROWTH",
    description: "More customers. More revenue.",
    progress: 0.78,
    className: "gps-step-growth",
  },
  {
    number: "06",
    title: "SUCCESSION",
    description: "Built to last",
    progress: 0.91,
    className: "gps-step-succession",
  },
];

export default function GPSPhilosophy() {
  const sectionRef = useRef(null);
  const routePathRef = useRef(null);
  const animationRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  /*
   * ---------------------------------------------------------
   * SUBTLE WEB AUDIO API BEEP (MOBILE SAFE)
   * ---------------------------------------------------------
   */
  const playMilestoneSound = () => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();

      // Mobile Safari / Chrome audio unlock fallback
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5 note
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {
      // Audio autoplay policy might restrict sound before user interaction
    }
  };

  const prevActiveStepRef = useRef(activeStep);
  useEffect(() => {
    if (activeStep > prevActiveStepRef.current && activeStep <= 6) {
      playMilestoneSound();
    }
    prevActiveStepRef.current = activeStep;
  }, [activeStep]);

  /*
   * ---------------------------------------------------------
   * ANIMATION ENGINE WITH RESILIENT MOBILE INTERSECTION
   * ---------------------------------------------------------
   */
  useEffect(() => {
    const sectionNode = sectionRef.current;
    if (!sectionNode) return;

    const runAnimation = () => {
      const path = routePathRef.current;
      if (!path) return;

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      const duration = 12000; // 12 seconds
      let startTime = null;

      const stepAnimation = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        const rawProgress = Math.min(elapsed / duration, 1);

        // Smooth acceleration + deceleration
        const easedProgress =
          rawProgress < 0.5
            ? 2 * rawProgress * rawProgress
            : 1 - Math.pow(-2 * rawProgress + 2, 2) / 2;

        setProgress(easedProgress);

        let currentStep = 0;
        routeSteps.forEach((step, index) => {
          if (easedProgress >= step.progress) {
            currentStep = index + 1;
          }
        });
        setActiveStep(currentStep);

        if (rawProgress < 1) {
          animationRef.current = requestAnimationFrame(stepAnimation);
        } else {
          setProgress(1);
          setActiveStep(6);
        }
      };

      animationRef.current = requestAnimationFrame(stepAnimation);
    };

    // Mobile-friendly low threshold trigger
    const observerThreshold = window.innerWidth <= 768 ? 0.15 : 0.45;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setProgress(0);
            setActiveStep(0);
            runAnimation();
          } else {
            if (animationRef.current) {
              cancelAnimationFrame(animationRef.current);
            }
            setProgress(0);
            setActiveStep(0);
          }
        });
      },
      { threshold: observerThreshold }
    );

    observer.observe(sectionNode);

    return () => {
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  /*
   * ---------------------------------------------------------
   * GET PIN POSITION FROM SVG PATH
   * ---------------------------------------------------------
   */
  let pinX = 80;
  let pinY = 445;

  if (routePathRef.current) {
    try {
      const path = routePathRef.current;
      const totalLength = path.getTotalLength();
      const currentLength = totalLength * progress;
      const currentPoint = path.getPointAtLength(currentLength);

      pinX = currentPoint.x;
      pinY = currentPoint.y;
    } catch (e) {
      // SVG measurement fallback
    }
  }

  const pinLeft = (pinX / 900) * 100;
  const pinTop = (pinY / 550) * 100;

  return (
    <section className="gps-philosophy-section" ref={sectionRef}>
      <div className="gps-philosophy-container">
        {/* LEFT CONTENT */}
        <div className="gps-philosophy-content">
          <div className="gps-philosophy-eyebrow">
            <span className="gps-philosophy-dash"></span>
            GPS Philosophy
          </div>

          <h2 className="gps-philosophy-title">
            We Sell the GPS.
            <br />
            <em>You Drive.</em>
          </h2>

          <p className="gps-philosophy-desc">
            We don't drive your business for you. We build the route. We identify
            the opportunity, design the strategy, build the technology, organize
            the systems, and provide the marketing and growth roadmap. Then you
            take the wheel.
          </p>

          <div className="gps-philosophy-info">
            <div className="gps-info-item">
              <span className="gps-info-number">01</span>
              <div>
                <h3>FIND THE OPPORTUNITY</h3>
                <p>
                  We understand where you are and identify where your business can
                  go next.
                </p>
              </div>
            </div>

            <div className="gps-info-item">
              <span className="gps-info-number">02</span>
              <div>
                <h3>BUILD THE ROUTE</h3>
                <p>
                  Strategy, technology and systems become one connected path
                  toward growth.
                </p>
              </div>
            </div>

            <div className="gps-info-item">
              <span className="gps-info-number">03</span>
              <div>
                <h3>YOU TAKE THE WHEEL</h3>
                <p>
                  We give you the direction and infrastructure. You remain in
                  control of the journey.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT MAP */}
        <div className="gps-philosophy-visual">
          <div className="gps-map-wrapper">
            {/* WORLD MAP */}
            <div className="gps-world-map">
              <img
                src={worldMap}
                alt="World map"
                className="gps-world-map-image"
              />
              <div className="gps-map-overlay"></div>
              <div className="gps-map-glow"></div>
              <div className="gps-map-grid"></div>
            </div>

            {/* MAP LABELS */}
            <span className="gps-map-label gps-label-india">INDIA</span>
            <span className="gps-map-label gps-label-global">GLOBAL</span>

            {/* ROUTE SVG */}
            <svg
              className="gps-route-svg"
              viewBox="0 0 900 550"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="gpsRouteGradient"
                  x1="0%"
                  y1="100%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#7dd3fc" />
                  <stop offset="40%" stopColor="#38bdf8" />
                  <stop offset="75%" stopColor="#0284c7" />
                  <stop offset="100%" stopColor="#7dd3fc" />
                </linearGradient>

                <filter
                  id="gpsRouteBlur"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="7" />
                </filter>
              </defs>

              {/* ROUTE GLOW */}
              <path
                className="gps-route-glow"
                d="
                  M 80 445
                  C 112 415 128 375 150 350
                  C 165 333 177 342 195 335
                  C 225 323 238 286 275 268
                  C 305 253 330 244 354 260
                  C 372 272 383 278 402 258
                  C 426 232 440 202 474 190
                  C 502 180 528 184 548 204
                  C 566 222 580 216 600 203
                  C 625 187 642 159 671 154
                  C 699 149 722 163 741 151
                  C 773 132 790 108 850 88
                "
              />

              {/* MAIN ROUTE */}
              <path
                ref={routePathRef}
                className="gps-route-path"
                d="
                  M 80 445
                  C 112 415 128 375 150 350
                  C 165 333 177 342 195 335
                  C 225 323 238 286 275 268
                  C 305 253 330 244 354 260
                  C 372 272 383 278 402 258
                  C 426 232 440 202 474 190
                  C 502 180 528 184 548 204
                  C 566 222 580 216 600 203
                  C 625 187 642 159 671 154
                  C 699 149 722 163 741 151
                  C 773 132 790 108 850 88
                "
              />
            </svg>

            {/* STATIC ROUTE POINTS */}
            <div
              className={`gps-route-point gps-point-idea ${
                activeStep >= 1 ? "active" : ""
              } ${activeStep > 1 ? "completed" : ""}`}
            >
              <span></span>
            </div>

            <div
              className={`gps-route-point gps-point-strategy ${
                activeStep >= 2 ? "active" : ""
              } ${activeStep > 2 ? "completed" : ""}`}
            >
              <span></span>
            </div>

            <div
              className={`gps-route-point gps-point-technology ${
                activeStep >= 3 ? "active" : ""
              } ${activeStep > 3 ? "completed" : ""}`}
            >
              <span></span>
            </div>

            <div
              className={`gps-route-point gps-point-marketing ${
                activeStep >= 4 ? "active" : ""
              } ${activeStep > 4 ? "completed" : ""}`}
            >
              <span></span>
            </div>

            <div
              className={`gps-route-point gps-point-growth ${
                activeStep >= 5 ? "active" : ""
              } ${activeStep > 5 ? "completed" : ""}`}
            >
              <span></span>
            </div>

            <div
              className={`gps-route-point gps-point-succession ${
                activeStep >= 6 ? "active" : ""
              } ${activeStep > 6 ? "completed" : ""}`}
            >
              <span></span>
            </div>

            {/* MOVING LOCATION PIN */}
            <div
              className="gps-moving-pin"
              style={{
                left: `${pinLeft}%`,
                top: `${pinTop}%`,
                opacity: progress > 0 ? 1 : 0,
              }}
            >
              <div className="gps-pin-pulse"></div>
              <div className="gps-pin-core"></div>
            </div>

            {/* KERALA ORIGIN */}
            <div className="gps-origin">
              <div className="gps-origin-pulse"></div>
              <div className="gps-origin-pin">
                <span></span>
              </div>
            </div>

            <div className="gps-origin-card">
              <span className="gps-card-icon">⌖</span>
              <div>
                <strong>KERALA</strong>
                <small>OUR ORIGIN</small>
              </div>
            </div>

            {/* STEP CARDS */}
            {routeSteps.map((step, index) => {
              const stepIndex = index + 1;
              const isActive = activeStep === stepIndex;
              const isComplete = activeStep > stepIndex;

              return (
                <div
                  key={step.number}
                  className={`gps-route-step ${step.className} ${
                    isActive ? "is-active" : ""
                  } ${isComplete ? "is-complete" : ""}`}
                >
                  <div className="gps-step-dot">
                    <span></span>
                  </div>
                  <div className="gps-step-content">
                    <span className="gps-step-number">{step.number}</span>
                    <strong>{step.title}</strong>
                    <small>{step.description}</small>
                  </div>
                </div>
              );
            })}

            {/* GLOBAL DESTINATION */}
            <div className="gps-destination">
              <div className="gps-destination-glow"></div>
              <div className="gps-city">
                <img
                  src={successionImage}
                  alt="Succession Destination"
                  className="gps-succession-img"
                />
              </div>
              <div className="gps-destination-ring"></div>
            </div>

            <div className="gps-global-card">
              <span className="gps-card-icon">◎</span>
              <div>
                <strong>GLOBAL</strong>
                <small>YOUR NEXT DESTINATION</small>
              </div>
            </div>

            {/* STATS */}
            <div className="gps-route-stats">
              <div className="gps-route-stat">
                <strong>{Math.round(progress * 100)}%</strong>
                <span>LIVE PROGRESS</span>
              </div>

              <div className="gps-route-stat">
                <strong>01</strong>
                <span>CONNECTED ECOSYSTEM</span>
              </div>

              <div className="gps-route-stat">
                <strong>∞</strong>
                <span>POSSIBILITIES</span>
              </div>

              <div className="gps-route-stat-route">
                <span>FROM KERALA</span>
                <span>TO THE WORLD</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BUSINESS ECOSYSTEM */}
      <div className="gps-ecosystem">
        <div className="gps-ecosystem-title">
          <span>OUR BUSINESS ECOSYSTEM</span>
          <i>→</i>
        </div>

        <div className="gps-ecosystem-item">
          <span className="ecosystem-icon">▣</span>
          <span>
            Websites &amp;
            <br />
            Digital Platforms
          </span>
        </div>

        <div className="gps-ecosystem-item">
          <span className="ecosystem-icon">□</span>
          <span>
            E-Commerce
            <br />
            Systems
          </span>
        </div>

        <div className="gps-ecosystem-item">
          <span className="ecosystem-icon">▯</span>
          <span>
            Mobile App
            <br />
            Development
          </span>
        </div>

        <div className="gps-ecosystem-item">
          <span className="ecosystem-icon">▣</span>
          <span>
            Booking &amp;
            <br />
            Reservations
          </span>
        </div>

        <div className="gps-ecosystem-item">
          <span className="ecosystem-icon">⊞</span>
          <span>
            ERP &amp; Business
            <br />
            Core
          </span>
        </div>

        <div className="gps-ecosystem-item">
          <span className="ecosystem-icon">⚙</span>
          <span>
            AI Solutions &amp;
            <br />
            Automation
          </span>
        </div>
      </div>
    </section>
  );
}