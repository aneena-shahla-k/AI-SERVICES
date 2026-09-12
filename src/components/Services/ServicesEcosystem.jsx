import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Globe,
  ShoppingCart,
  Smartphone,
  CalendarDays,
  Database,
  Brain,
  Check,
  ArrowRight,
  Compass,
  Zap,
  Infinity as InfinityIcon,
  Sparkles,
} from "lucide-react";

import "./servicesEcosystem.css";

import previewMockup from "../../assets/images/web.jpg";
import worldMap from "../../assets/images/world.jpg";
import ecommerceImg from "../../assets/images/e-commerce.jpg";
import mobileImg from "../../assets/images/app1.jpg";
import bookingImg from "../../assets/images/booking.jpg";
import erpImg from "../../assets/images/erp.jpg";
import aiImg from "../../assets/images/ai.jpg";

/* =========================================================
   CANVAS DIMENSIONS & BALANCED COORDINATES
   Exact Circle Radius around HUB
   ========================================================= */
const VIEWBOX_WIDTH = 570;
const VIEWBOX_HEIGHT = 500;

const HUB = {
  x: 285,
  y: 250,
};

// Exact circle radius for circular path
const ORBIT_RADIUS = 185;

/* 
 * CIRCULAR CLOCKWISE SEQUENCE (Equally spaced around 360°):
 * Angles (in radians):
 * 0: WEB       -> 120° (2.094 rad)
 * 1: MOBILE    -> 180° (3.141 rad)
 * 2: AI        -> 270° (4.712 rad)
 * 3: COMMERCE  -> 0°   (0 rad)
 * 4: BOOKING   -> 45°  (0.785 rad)
 * 5: ERP       -> 90°  (1.570 rad)
 */
const services = [
  {
    id: "01",
    tag: "WEB",
    title: "Websites & Digital Platforms",
    badgeTitle: "WEB",
    badgeSub: "Websites & Platforms",
    shortDescription: "Modern. Fast. Scalable.",
    description: "High-performance websites and digital platforms built around your customers, workflows and growth goals.",
    icon: Globe,
    image: previewMockup,
    angle: (140 * Math.PI) / 180,
    features: ["Corporate Websites", "Web Applications", "Customer Portals", "SaaS Platforms"],
    stat1: "24–48h",
    stat1Label: "Typical Development",
    stat2: "12+",
    stat2Label: "Platform Types",
  },
  {
    id: "02",
    tag: "MOBILE",
    title: "Mobile App Development",
    badgeTitle: "MOBILE",
    badgeSub: "Apps & Experiences",
    shortDescription: "iOS. Android. Cross-Platform.",
    description: "Native and hybrid applications engineered for smooth animations, zero lag, and deeply tailored user interactions.",
    icon: Smartphone,
    image: mobileImg,
    angle: (200 * Math.PI) / 180,
    features: ["Cross-Platform Architecture", "Offline-first Sync", "Device Hardware APIs", "App Store Optimization"],
    stat1: "4–8w",
    stat1Label: "Typical Development",
    stat2: "60 FPS",
    stat2Label: "Native Performance",
  },
  {
    id: "03",
    tag: "AI",
    title: "AI Solutions & Automation",
    badgeTitle: "AI",
    badgeSub: "Automation & Intelligence",
    shortDescription: "Intelligent. Efficient. Future-ready.",
    description: "Autonomous agent workflows, custom LLM integrations, and automated pipelines that cut operational overhead.",
    icon: Brain,
    image: aiImg,
    angle: (270 * Math.PI) / 180,
    features: ["Autonomous AI Agents", "Proprietary Model Fine-tuning", "Intelligent Document OCR", "Automated Support Bots"],
    stat1: "2–4w",
    stat1Label: "Typical Development",
    stat2: "10×",
    stat2Label: "Efficiency Lift",
  },
  {
    id: "04",
    tag: "COMMERCE",
    title: "E-Commerce Systems",
    badgeTitle: "E-COMMERCE",
    badgeSub: "Stores & Sales",
    shortDescription: "Sell. Manage. Grow.",
    description: "Scalable commerce engines built to drive conversions, handle high order volumes, and automate fulfillment.",
    icon: ShoppingCart,
    image: ecommerceImg,
    angle: (340 * Math.PI) / 180,
    features: ["Headless Storefronts", "Multi-Currency Gateways", "Real-time Inventory Sync", "Conversion Optimization"],
    stat1: "3–5w",
    stat1Label: "Typical Development",
    stat2: "99.9%",
    stat2Label: "Uptime Guaranteed",
  },
  {
    id: "05",
    tag: "BOOKING",
    title: "Booking & Reservations",
    badgeTitle: "BOOKING",
    badgeSub: "Reservations & Scheduling",
    shortDescription: "Automate. Simplify. Delight.",
    description: "Frictionless booking flows with intelligent calendar syncing, dynamic slots, and automated notification loops.",
    icon: CalendarDays,
    image: bookingImg,
    angle: (35 * Math.PI) / 180,
    features: ["Live Slot Scheduling", "Payment Upfront / Escrow", "Automated SMS Reminders", "Timezone Coordination"],
    stat1: "1–3w",
    stat1Label: "Typical Development",
    stat2: "24/7",
    stat2Label: "Automated Bookings",
  },
  {
    id: "06",
    tag: "ERP",
    title: "ERP & Business Core",
    badgeTitle: "ERP",
    badgeSub: "Business Core",
    shortDescription: "Connect. Organize. Optimize.",
    description: "End-to-end custom operational software that connects inventory, finance, staff workflows, and pipeline analytics.",
    icon: Database,
    image: erpImg,
    angle: (90 * Math.PI) / 180,
    features: ["Custom Workflow Automation", "Granular Role Permissions", "Centralized Data Warehouse", "Live Analytics Dashboards"],
    stat1: "6–12w",
    stat1Label: "Typical Development",
    stat2: "100%",
    stat2Label: "Custom Architecture",
  },
].map((s) => ({
  ...s,
  // Coordinates calculated directly along the exact circle circumference
  x: Math.round(HUB.x + ORBIT_RADIUS * Math.cos(s.angle)),
  y: Math.round(HUB.y + ORBIT_RADIUS * Math.sin(s.angle)),
}));

export default function ServicesEcosystem() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hasScrolledIntoView, setHasScrolledIntoView] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const sectionRef = useRef(null);
  const carAngleRef = useRef(services[0].angle);
  const isFirstRender = useRef(true);
  const animIdRef = useRef(null);

  const activeService = services[activeIdx];

  /* =======================================================
     SCROLL DETECTION
     ======================================================= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasScrolledIntoView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  /* =======================================================
     INITIAL CAR EMERGENCE FROM HUB TO ORBIT CIRCLE
     ======================================================= */
  useEffect(() => {
    const car = document.querySelector(".eco-route-car");
    if (!car) return;

    if (!hasScrolledIntoView) {
      car.style.left = `${HUB.x}px`;
      car.style.top = `${HUB.y}px`;
      car.style.transform = `translate(-50%, -50%) scale(0) rotate(0deg)`;
      car.style.opacity = "0";
      return;
    }

    const timer = setTimeout(() => {
      const targetAngle = services[0].angle;
      const duration = 1200;
      const startTime = performance.now();

      car.style.opacity = "1";

      const animateInitial = (now) => {
        const elapsed = now - startTime;
        const rawProgress = Math.min(elapsed / duration, 1);
        const progress =
          rawProgress < 0.5
            ? 2 * rawProgress * rawProgress
            : 1 - Math.pow(-2 * rawProgress + 2, 2) / 2;

        const currentRadius = ORBIT_RADIUS * progress;
        const curX = HUB.x + currentRadius * Math.cos(targetAngle);
        const curY = HUB.y + currentRadius * Math.sin(targetAngle);

        // Circular tangent angle for vehicle alignment
        const tangentDeg = ((targetAngle + Math.PI / 2) * 180) / Math.PI;

        car.style.left = `${curX}px`;
        car.style.top = `${curY}px`;
        car.style.transform = `translate(-50%, -50%) scale(1) rotate(${tangentDeg + 90}deg)`;

        if (rawProgress < 1) {
          requestAnimationFrame(animateInitial);
        } else {
          carAngleRef.current = targetAngle;
          isFirstRender.current = false;
        }
      };

      requestAnimationFrame(animateInitial);
    }, 700);

    return () => clearTimeout(timer);
  }, [hasScrolledIntoView]);

  /* =======================================================
     EXACT CIRCULAR ARC TRANSIT (CONSTANT RADIUS)
     ======================================================= */
  useEffect(() => {
    if (isFirstRender.current || !hasScrolledIntoView) return;

    const startAngle = carAngleRef.current;
    let targetAngle = services[activeIdx].angle;

    // Ensure strictly clockwise forward motion
    while (targetAngle <= startAngle) {
      targetAngle += 2 * Math.PI;
    }

    const angularDistance = targetAngle - startAngle;
    const duration = Math.max(1400, Math.min(3600, angularDistance * 950));
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);

      const progress =
        rawProgress < 0.5
          ? 4 * rawProgress * rawProgress * rawProgress
          : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2;

      // Pure Polar Coordinates: x = Hub.x + R*cos(θ), y = Hub.y + R*sin(θ)
      const currentAngle = startAngle + angularDistance * progress;
      const curX = HUB.x + ORBIT_RADIUS * Math.cos(currentAngle);
      const curY = HUB.y + ORBIT_RADIUS * Math.sin(currentAngle);

      // Tangent to circle is exactly perpendicular to radius (θ + 90°)
      const tangentDeg = ((currentAngle + Math.PI / 2) * 180) / Math.PI;

      const car = document.querySelector(".eco-route-car");
      if (car) {
        car.style.left = `${curX}px`;
        car.style.top = `${curY}px`;
        car.style.transform = `translate(-50%, -50%) scale(1) rotate(${tangentDeg + 90}deg)`;
      }

      carAngleRef.current = currentAngle % (2 * Math.PI);

      if (rawProgress < 1) {
        animIdRef.current = requestAnimationFrame(animate);
      } else {
        if (isPaused) {
          clearTimeout(window.resumeTourTimeout);
          window.resumeTourTimeout = setTimeout(() => {
            setIsPaused(false);
          }, 15000);
        }
      }
    };

    if (animIdRef.current) {
      cancelAnimationFrame(animIdRef.current);
    }
    animIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animIdRef.current) {
        cancelAnimationFrame(animIdRef.current);
      }
    };
  }, [activeIdx, hasScrolledIntoView, isPaused]);

  /* =======================================================
     AUTOMATIC ROTATION LOOP
     ======================================================= */
  useEffect(() => {
    if (!hasScrolledIntoView || isPaused) return;

    const interval = setInterval(() => {
      setActiveIdx((prevIdx) => (prevIdx + 1) % services.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [hasScrolledIntoView, isPaused]);

  const handleUserClick = useCallback((index) => {
    setIsPaused(true);
    setActiveIdx(index);
  }, []);

  return (
    <section className="eco-system-container" ref={sectionRef}>
      <div className="eco-world-map" style={{ backgroundImage: `url(${worldMap})` }} />
      <div className="eco-world-map-fade" />
      <div className="eco-background-grid" />

      <div className="eco-main-stage">
        {/* LEFT COLUMN */}
        <div className="eco-left-col">
          <div className="eco-eyebrow">
            <span>SERVICES</span>
            <span className="eco-dash" />
          </div>

          <h1 className="eco-headline">
            Build the system.
            <br />
            <em>Not just the service.</em>
          </h1>

          <p className="eco-subtext">
            Websites, apps, commerce, booking, ERP and AI — operating automatically as one connected ecosystem.
          </p>

          <div className="eco-stat-pills">
            <div className="eco-pill-row">
              <span className="eco-pill-icon"><Sparkles size={14} /></span>
              <div>
                <strong>06 Core Systems</strong>
                <p>Fully connected</p>
              </div>
            </div>

            <div className="eco-pill-row">
              <span className="eco-pill-icon"><Zap size={14} /></span>
              <div>
                <strong>24–48h</strong>
                <p>Typical development allocation</p>
              </div>
            </div>

            <div className="eco-pill-row">
              <span className="eco-pill-icon"><InfinityIcon size={15} /></span>
              <div>
                <strong>{isPaused ? "Manual Control" : "Auto-Pilot"}</strong>
                <p>{isPaused ? "Tour paused. Click nodes." : "Circular automated loop"}</p>
              </div>
            </div>
          </div>

          <div className="eco-hint">
            <span className="eco-hint-icon"><Compass size={15} /></span>
            <div>
              <strong>CLICK ANY NODE</strong>
              <span>Redirect the car & details panel instantly</span>
            </div>
          </div>
        </div>

        {/* CENTER INTERACTIVE CANVAS */}
        <div className="eco-center-wrapper">
          <div className="eco-center-canvas">
            <div className="eco-map-glow" />

            {/* SVG EXACT CIRCLE TRACK AND SPOKES */}
            <svg
              className="eco-svg-network"
              viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <radialGradient id="hubRadial">
                  <stop offset="0%" stopColor="#00b4d8" stopOpacity="0.3" />
                  <stop offset="70%" stopColor="#0284c7" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
                </radialGradient>
              </defs>

              <circle cx={HUB.x} cy={HUB.y} r="130" fill="url(#hubRadial)" />

              {/* Exact Circular Orbit Track */}
              <circle
                cx={HUB.x}
                cy={HUB.y}
                r={ORBIT_RADIUS}
                className={`eco-route-base ${hasScrolledIntoView ? "is-drawn" : ""}`}
                style={{ strokeDasharray: "3 5" }}
              />

              {/* Connecting Spoke Lines & Circle Endpoints */}
              {services.map((service, index) => {
                const isActive = index === activeIdx;
                return (
                  <g key={index}>
                    <line
                      x1={HUB.x}
                      y1={HUB.y}
                      x2={service.x}
                      y2={service.y}
                      className={`eco-route-base ${hasScrolledIntoView ? "is-drawn" : ""} ${
                        isActive ? "is-active-base" : ""
                      }`}
                      style={{ strokeDasharray: "2 4" }}
                    />
                    <circle
                      cx={service.x}
                      cy={service.y}
                      r={isActive ? 4.5 : 3}
                      className={`eco-route-end ${hasScrolledIntoView ? "is-visible" : ""} ${
                        isActive ? "active" : ""
                      }`}
                    />
                  </g>
                );
              })}
            </svg>

            {/* SMOOTH ROTATING CAR */}
            <div className="eco-route-car">
              <svg viewBox="0 0 28 50" width="22" height="40">
                <ellipse cx="14" cy="25" rx="8" ry="18" fill="rgba(0,0,0,.35)" />
                <rect x="4" y="3" width="20" height="40" rx="6" fill="#11191b" />
                <path d="M6 13 Q14 10 22 13 L20 20 Q14 18 8 20 Z" fill="#536267" />
                <path d="M7 32 Q14 35 21 32 L20 27 Q14 29 8 27 Z" fill="#536267" />
                <rect x="7" y="19" width="14" height="9" rx="2" fill="#182326" />
                <circle cx="6" cy="5" r="2.2" fill="#00b4d8" />
                <circle cx="22" cy="5" r="2.2" fill="#00b4d8" />
                <rect x="6" y="41" width="3" height="2" rx="1" fill="#ff5050" />
                <rect x="19" y="41" width="3" height="2" rx="1" fill="#ff5050" />
              </svg>
            </div>

            {/* STATIC HUB NODE */}
            <div
              className="eco-hub-node"
              style={{ left: `${HUB.x}px`, top: `${HUB.y}px` }}
            >
              <div className="eco-hub-pulse-ring" />
              <div className="eco-hub-ring" />
              <div className="eco-hub-inner">
                <span className="eco-hub-title">YOUR<br />BUSINESS</span>
                {/* <span className="eco-hub-desc">{isPaused ? "Paused" : "Auto-Pilot"}</span> */}
              </div>
            </div>

            {/* SERVICE CARD NODES */}
            {services.map((service, index) => {
              const Icon = service.icon;
              const selected = index === activeIdx;

              const offsetX = service.x - HUB.x;
              const offsetY = service.y - HUB.y;

              return (
                <button
                  type="button"
                  key={service.id}
                  className={`eco-node-wrap ${hasScrolledIntoView ? "is-expanded" : "is-collapsed"} ${
                    selected ? "is-selected" : ""
                  }`}
                  style={{
                    left: `${HUB.x}px`,
                    top: `${HUB.y}px`,
                    "--tx": `${offsetX}px`,
                    "--ty": `${offsetY}px`,
                    "--delay": `${index * 100}ms`,
                  }}
                  onClick={() => handleUserClick(index)}
                >
                  <div className="eco-node-halo" />
                  <div className="eco-node-icon-ring">
                    <div className="eco-circle-button">
                      <Icon size={20} strokeWidth={1.8} />
                    </div>
                  </div>
                  <div className="eco-node-pill">
                    <strong>{service.badgeTitle}</strong>
                    <span>{service.badgeSub}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT DETAILS PANEL */}
        <div className="eco-right-panel">
          <div className="eco-panel-card" key={activeService.id}>
            <div className="eco-panel-head">
              <div className="eco-panel-tag">
                <strong>{activeService.id}</strong>
                <span>/ {activeService.tag}</span>
              </div>
              <span className="eco-active-pill">ACTIVE</span>
            </div>

            <h2 className="eco-panel-title">{activeService.title}</h2>
            <p className="eco-panel-desc">{activeService.description}</p>

            <div className="eco-features-box">
              {activeService.features.map((feature, i) => (
                <div className="eco-feat-item" key={i}>
                  <span className="eco-feat-check">
                    <Check size={10} strokeWidth={3} />
                  </span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="eco-panel-stats">
              <div className="eco-pstat">
                <strong>{activeService.stat1}</strong>
                <span>{activeService.stat1Label}</span>
              </div>
              <div className="eco-pstat-divider" />
              <div className="eco-pstat">
                <strong>{activeService.stat2}</strong>
                <span>{activeService.stat2Label}</span>
              </div>
            </div>

            <button type="button" className="eco-cta-btn">
              <span>Explore this route</span>
              <ArrowRight size={14} />
            </button>

            <div className="eco-mockup-frame">
              <img 
                src={activeService.image || previewMockup} 
                alt={activeService.title} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SERVICE STRIP */}
      <div className="eco-bottom-section">
        <div className="eco-strip-header">
          <span className="eco-tag">OUR SERVICES</span>
          <h3>A complete<br />digital ecosystem</h3>
        </div>

        <div className="eco-strip-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            const selected = index === activeIdx;

            return (
              <button
                type="button"
                key={service.id}
                className={`eco-strip-item ${selected ? "active" : ""}`}
                onClick={() => handleUserClick(index)}
              >
                <div className="eco-strip-icon-box">
                  <Icon size={19} strokeWidth={1.8} />
                </div>
                <strong>{service.badgeTitle}</strong>
                <p>{service.shortDescription}</p>
                <span className="eco-strip-arrow">
                  <ArrowRight size={11} />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* BRAND FOOTER */}
      <div className="eco-brand-line">
        <div className="eco-brand-left">
          <span className="eco-brand-mark">A<span>I</span></span>
          <strong>AI CONCEPT</strong>
          <span className="eco-brand-divider" />
          <span>We sell the route. You drive.</span>
        </div>
        <div className="eco-brand-right">
          <span>Not sure where to start?</span>
          <button type="button">
            Let us calculate the route <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </section>
  );
}