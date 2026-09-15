import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import "./GlobalRoute.css";

import image from "../../assets/images/map2.jpg";
import kerala from "../../assets/images/kerala.jpg";
import newyork from "../../assets/images/newyork.jpg";
import sydney from "../../assets/images/sydney.jpg";
import mumbai from "../../assets/images/mumbai.jpg";
import dubai from "../../assets/images/dxb.jpg";
import berlin from "../../assets/images/berlin.jpg";
import london from "../../assets/images/london.jpg";
import singapore from "../../assets/images/singapore.jpg";

/* =========================================================
   DESTINATIONS
   Ordered path: Calicut -> Kochi -> Mumbai -> Hyderabad -> Delhi -> Dubai -> Singapore -> New York
========================================================= */

const locations = [
  {
    id: "calicut",
    number: "01",
    name: "CALICUT",
    country: "INDIA",
    flag: "🇮🇳",
    subtitle: "Our Origin",
    services: ["Web Development", "E-Commerce", "AI Solutions"],
    description:
      "Where our journey begins. We build digital solutions, AI systems and business technology.",
    image: kerala,
    mapX: 63,
    mapY: 63,
    cardX: 63,
    cardY: 72,
  },
  {
    id: "kochi",
    number: "02",
    name: "KOCHI",
    country: "INDIA",
    flag: "🇮🇳",
    subtitle: "Innovation Hub",
    services: ["Digital Transformation", "Cloud Solutions", "AI"],
    description:
      "Custom software and digital transformation for modern enterprises.",
    image: london,
    mapX: 64,
    mapY: 67,
    cardX: 64,
    cardY: 77,
  },
  {
    id: "mumbai",
    number: "03",
    name: "MUMBAI",
    country: "INDIA",
    flag: "🇮🇳",
    subtitle: "Growth Hub",
    services: ["E-Commerce", "ERP Systems", "Automation"],
    description:
      "A growing technology hub connecting ambitious businesses with digital solutions.",
    image: mumbai,
    mapX: 60,
    mapY: 53,
    cardX: 52,
    cardY: 53,
  },
  {
    id: "hyderabad",
    number: "04",
    name: "HYDERABAD",
    country: "INDIA",
    flag: "🇮🇳",
    subtitle: "Enterprise Hub",
    services: ["Enterprise Solutions", "Custom Software", "IT Consulting"],
    description:
      "Technology partnerships for enterprises seeking scalable digital systems.",
    image: berlin,
    mapX: 64,
    mapY: 52,
    cardX: 72,
    cardY: 52,
  },
  {
    id: "delhi",
    number: "05",
    name: "DELHI",
    country: "INDIA",
    flag: "🇮🇳",
    subtitle: "Technology Hub",
    services: ["Web Development", "Mobile Apps", "AI Solutions"],
    description:
      "Modern digital platforms and intelligent technology for growing companies.",
    image: sydney,
    mapX: 62,
    mapY: 41,
    cardX: 62,
    cardY: 32,
  },
  {
    id: "dubai",
    number: "06",
    name: "DUBAI",
    country: "UAE",
    flag: "🇦🇪",
    subtitle: "Business Hub",
    services: ["Business Systems", "AI Solutions", "E-Commerce"],
    description:
      "Intelligent systems and digital transformation for ambitious businesses.",
    image: dubai,
    mapX: 51,
    mapY: 47,
    cardX: 43,
    cardY: 43,
  },
  {
    id: "singapore",
    number: "07",
    name: "SINGAPORE",
    country: "SINGAPORE",
    flag: "🇸🇬",
    subtitle: "Digital Hub",
    services: ["Digital Commerce", "Mobile Apps", "AI Systems"],
    description:
      "Digital commerce, intelligent applications and AI-powered systems.",
    image: singapore,
    mapX: 77,
    mapY: 60,
    cardX: 77,
    cardY: 70,
  },
  {
    id: "new-york",
    number: "08",
    name: "NEW YORK",
    country: "USA",
    flag: "🇺🇸",
    subtitle: "Global Hub",
    services: ["Web & App Dev", "ERP Systems", "Cloud Solutions"],
    description:
      "High-performance digital products for businesses across North America.",
    image: newyork,
    mapX: 25,
    mapY: 36,
    cardX: 25,
    cardY: 26,
  },
];

/* =========================================================
   STRICT CONTINUOUS ROUTE PASSING EVERY PIN COORDINATE
========================================================= */

const ROUTE_PATH = `
  M 63 63
  C 63.3 64.5, 63.7 65.8, 64 67
  C 62.5 62, 61.2 57.5, 60 53
  C 61.2 52.5, 62.5 52.2, 64 52
  C 63.5 48, 62.8 44.5, 62 41
  C 58.5 43, 54.5 45, 51 47
  C 60 51.5, 68.5 56, 77 60
  C 60 52, 42 44, 25 36
`;

const LOCATION_PROGRESS = [
  0.0,
  0.05,
  0.21,
  0.28,
  0.42,
  0.58,
  0.82,
  1.0,
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function GlobalRoute() {
  const sectionRef = useRef(null);
  const routeRef = useRef(null);
  const cardRefs = useRef([]);

  const [pinPosition, setPinPosition] = useState({ x: 63, y: 63 });
  const [activeLocation, setActiveLocation] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.2,
  });

  const routeDashOffset = useTransform(smoothProgress, [0, 1], [1, 0]);

  useMotionValueEvent(smoothProgress, "change", (progress) => {
    const path = routeRef.current;
    if (!path) return;

    const totalLength = path.getTotalLength();
    const distance = Math.min(progress * totalLength, totalLength);
    const point = path.getPointAtLength(distance);

    setPinPosition({ x: point.x, y: point.y });

    let active = 0;
    for (let i = 0; i < LOCATION_PROGRESS.length; i++) {
      if (progress >= LOCATION_PROGRESS[i] - 0.03) {
        active = i;
      }
    }
    setActiveLocation(active);
  });

  useEffect(() => {
    const activeCard = cardRefs.current[activeLocation];
    const container = document.querySelector(".destination-cards");

    if (activeCard && container) {
      const cardLeft = activeCard.offsetLeft;
      const cardWidth = activeCard.offsetWidth;
      const containerWidth = container.offsetWidth;

      container.scrollTo({
        left: cardLeft - containerWidth / 2 + cardWidth / 2,
        behavior: "smooth",
      });
    }
  }, [activeLocation]);

  useEffect(() => {
    const path = routeRef.current;
    if (!path) return;
    const point = path.getPointAtLength(0);
    setPinPosition({ x: point.x, y: point.y });
  }, []);

  const scrollDestinations = (direction) => {
    const container = document.querySelector(".destination-cards");
    if (!container) return;
    const amount = window.innerWidth <= 800 ? 210 : 320;
    container.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section ref={sectionRef} className="global-route">
      <div className="route-scroll">
        <div className="route-sticky">

          <div className="route-content">
            <div className="route-eyebrow">
              <span>OUR GLOBAL ROUTE</span>
              <i />
            </div>

            <h2>
              From Kerala<br />
              to the <em>World</em>
            </h2>

            <p className="route-lead">
              One route. Many destinations.<br />
              Connected possibilities.
            </p>

            <p className="route-description">
              We started in Kerala, grew across India, and <br />
              are now serving clients worldwide. Our journey
              <br />
              continues, and so does yours.
            </p>

            <div className="route-selector">
              <div
                className={`route-selector-item ${
                  activeLocation <= 1 ? "active" : ""
                }`}
              >
                <span className="selector-dot" />
                Kerala
              </div>

              <div
                className={`route-selector-item ${
                  activeLocation >= 2 && activeLocation <= 4 ? "active" : ""
                }`}
              >
                <span className="selector-dot" />
                India
              </div>

              <div
                className={`route-selector-item ${
                  activeLocation >= 5 ? "active" : ""
                }`}
              >
                <span className="selector-dot" />
                World
              </div>
            </div>
          </div>

          <div className="map-stage">
            <img src={image} alt="Global Map" className="world-map-image" />
            <div className="map-vignette" />
            <div className="map-grid" />

            <svg
              className="route-svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path ref={routeRef} d={ROUTE_PATH} className="route-base" />

              <motion.path
                d={ROUTE_PATH}
                className="route-active"
                pathLength="1"
                style={{
                  pathLength: 1,
                  strokeDasharray: 1,
                  strokeDashoffset: routeDashOffset,
                }}
              />

              <g
                className="route-marker-pin"
                transform={`translate(${pinPosition.x}, ${pinPosition.y})`}
              >
                <circle cx="0" cy="0" r="1.3" fill="rgba(0, 240, 255, 0.4)" />
                <path
                  d="M 0 0 C -0.8 -1.1 -1.3 -1.8 -1.3 -2.7 C -1.3 -3.5 -0.7 -4.1 0 -4.1 C 0.7 -4.1 1.3 -3.5 1.3 -2.7 C 1.3 -1.8 0.8 -1.1 0 0 Z"
                  fill="#00f0ff"
                  stroke="#ffffff"
                  strokeWidth="0.18"
                />
                <circle cx="0" cy="-2.7" r="0.45" fill="#02090d" />
              </g>
            </svg>

            {locations.map((location, index) => (
              <MapLocation
                key={location.id}
                location={location}
                active={index === activeLocation}
                reached={index <= activeLocation}
              />
            ))}

            {locations.map((location, index) => (
              <FloatingLocationCard
                key={location.id}
                location={location}
                active={index === activeLocation}
                reached={index <= activeLocation}
              />
            ))}
          </div>

          <div className="destination-strip">
            <div className="destination-header">
              <div className="destination-heading">
                <span className="destination-eyebrow">GLOBAL DESTINATIONS</span>
                <h3>
                  Explore our <em>locations.</em>
                </h3>
              </div>

              <div className="destination-controls">
                <span className="destination-counter">
                  {String(activeLocation + 1).padStart(2, "0")}
                  <i>/</i>
                  {String(locations.length).padStart(2, "0")}
                </span>

                <button
                  className="destination-arrow"
                  onClick={() => scrollDestinations("prev")}
                  aria-label="Previous destinations"
                >
                  ←
                </button>

                <button
                  className="destination-arrow"
                  onClick={() => scrollDestinations("next")}
                  aria-label="Next destinations"
                >
                  →
                </button>
              </div>
            </div>

            <div className="destination-slider">
              <div className="destination-cards">
                {locations.map((location, index) => (
                  <div
                    key={location.id}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                  >
                    <DestinationCard
                      location={location}
                      active={index === activeLocation}
                      reached={index <= activeLocation}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SUB-COMPONENTS
========================================================= */

function MapLocation({ location, active, reached }) {
  return (
    <div
      className={`map-point ${active ? "active" : ""} ${
        reached ? "reached" : ""
      }`}
      style={{
        left: `${location.mapX}%`,
        top: `${location.mapY}%`,
      }}
    >
      <div className="map-point-pulse" />
      <div className="map-point-ring">
        <span />
      </div>
    </div>
  );
}

function FloatingLocationCard({ location, active, reached }) {
  return (
    <div
      data-location={location.id}
      className={`floating-location-card ${active ? "active" : ""} ${
        reached ? "reached" : ""
      }`}
      style={{
        left: `${location.cardX}%`,
        top: `${location.cardY}%`,
      }}
    >
      <div className="floating-card-header">
        <span className="floating-flag">{location.flag}</span>
        <strong>{location.name}</strong>
        <span className="floating-country">/ {location.country}</span>
      </div>

      <div className="floating-services">
        {location.services.map((service) => (
          <span key={service}>{service}</span>
        ))}
      </div>

      <div className="floating-arrow">↗</div>
    </div>
  );
}

function DestinationCard({ location, active, reached }) {
  return (
    <article
      className={`destination-card ${active ? "active" : ""} ${
        reached ? "reached" : ""
      }`}
    >
      <div className="destination-card-info">
        <span className="destination-number">{location.number}</span>
        <h3>{location.name}</h3>
        <span className="destination-subtitle">{location.subtitle}</span>
        <p>{location.description}</p>
        <button>
          View Details <span>→</span>
        </button>
      </div>

      <div className="destination-image">
        <img src={location.image} alt={location.name} loading="lazy" />
        <div className="destination-image-overlay" />
        <span className="destination-image-number">{location.number}</span>
      </div>
    </article>
  );
}