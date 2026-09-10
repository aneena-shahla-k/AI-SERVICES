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

import carSound from "../../assets/audio/car5.wav";

/* =========================================================
   DESTINATIONS
========================================================= */

const locations = [
  {
    id: "calicut",
    number: "01",
    name: "CALICUT",
    country: "INDIA",
    flag: "🇮🇳",
    subtitle: "Our Origin",
    services: [
      "Web Development",
      "E-Commerce",
      "AI Solutions",
    ],
    description:
      "Where our journey begins. We build digital solutions, AI systems and business technology.",
    image: kerala,
    mapX: 58,
    mapY: 66,
    cardX: 57,
    cardY: 65,
  },

  {
    id: "kochi",
    number: "02",
    name: "KOCHI",
    country: "INDIA",
    flag: "🇮🇳",
    subtitle: "Innovation Hub",
    services: [
      "Digital Transformation",
      "Cloud Solutions",
      "AI & Automation",
    ],
    description:
      "Custom software and digital transformation for modern enterprises.",
    image: london,
    mapX: 53,
    mapY: 60,
    cardX: 44,
    cardY: 57,
  },

  {
    id: "mumbai",
    number: "03",
    name: "MUMBAI",
    country: "INDIA",
    flag: "🇮🇳",
    subtitle: "Growth Hub",
    services: [
      "E-Commerce",
      "ERP Systems",
      "Business Automation",
    ],
    description:
      "A growing technology hub connecting ambitious businesses with digital solutions.",
    image: mumbai,
    mapX: 48,
    mapY: 51,
    cardX: 45,
    cardY: 47,
  },

  {
    id: "delhi",
    number: "04",
    name: "DELHI",
    country: "INDIA",
    flag: "🇮🇳",
    subtitle: "Technology Hub",
    services: [
      "Web Development",
      "Mobile Apps",
      "AI Solutions",
    ],
    description:
      "Modern digital platforms and intelligent technology for growing companies.",
    image: sydney,
    mapX: 38,
    mapY: 31,
    cardX: 35,
    cardY: 19,
  },

  {
    id: "hyderabad",
    number: "05",
    name: "HYDERABAD",
    country: "INDIA",
    flag: "🇮🇳",
    subtitle: "Enterprise Hub",
    services: [
      "Enterprise Solutions",
      "Custom Software",
      "IT Consulting",
    ],
    description:
      "Technology partnerships for enterprises seeking scalable digital systems.",
    image: berlin,
    mapX: 24,
    mapY: 38,
    cardX: 29,
    cardY: 39,
  },

  {
    id: "dubai",
    number: "06",
    name: "DUBAI",
    country: "UAE",
    flag: "🇦🇪",
    subtitle: "Business Hub",
    services: [
      "Business Systems",
      "AI Solutions",
      "E-Commerce",
    ],
    description:
      "Intelligent systems and digital transformation for ambitious businesses.",
    image: dubai,
    mapX: 43,
    mapY: 32,
    cardX: 48,
    cardY: 19,
  },

  {
    id: "singapore",
    number: "07",
    name: "SINGAPORE",
    country: "SINGAPORE",
    flag: "🇸🇬",
    subtitle: "Digital Hub",
    services: [
      "E-Commerce",
      "Mobile Apps",
      "AI Solutions",
    ],
    description:
      "Digital commerce, intelligent applications and AI-powered systems.",
    image: singapore,
    mapX: 61,
    mapY: 58,
    cardX: 72,
    cardY: 29,
  },

  {
    id: "new-york",
    number: "08",
    name: "NEW YORK",
    country: "USA",
    flag: "🇺🇸",
    subtitle: "Digital Hub",
    services: [
      "Web & App Development",
      "ERP Systems",
      "Cloud Solutions",
    ],
    description:
      "High-performance digital products for businesses across North America.",
    image: newyork,
    mapX: 78,
    mapY: 67,
    cardX: 80,
    cardY: 55,
  },
];

/* =========================================================
   ROUTE
========================================================= */

const ROUTE_PATH = `
  M 58 66
  C 56 64, 54 62, 53 60
  C 51 57, 49 54, 48 51
  C 45 45, 41 37, 38 31
  C 34 32, 29 34, 24 38
  C 30 39, 39 36, 43 32
  C 49 37, 55 46, 61 58
  C 66 62, 72 64, 78 67
`;

/* =========================================================
   LOCATION PROGRESS
========================================================= */

const LOCATION_PROGRESS = [
  0.00,
  0.08,
  0.17,
  0.31,
  0.37,
  0.53,
  0.76,
  1.00,
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function GlobalRoute() {
  const sectionRef = useRef(null);
  const routeRef = useRef(null);
  const cardRefs = useRef([]);
  const audioRef = useRef(null);

  const [vehicle, setVehicle] = useState({
    x: 58,
    y: 66,
    angle: 0,
  });

  const [activeLocation, setActiveLocation] = useState(0);

  /* =======================================================
     AUDIO
  ======================================================= */

  useEffect(() => {
    const audio = new Audio(carSound);

    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = "auto";

    audioRef.current = audio;

    let stopTimer = null;

    const handleScroll = () => {
      if (!sectionRef.current || !audioRef.current) {
        return;
      }

      const rect =
        sectionRef.current.getBoundingClientRect();

      const viewportHeight =
        window.innerHeight;

      const isSectionVisible =
        rect.top < viewportHeight &&
        rect.bottom > 0;

      if (!isSectionVisible) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        return;
      }

      if (audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }

      clearTimeout(stopTimer);

      stopTimer = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      }, 120);
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      clearTimeout(stopTimer);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, []);

  /* =======================================================
     SCROLL
  ======================================================= */

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: [
      "start start",
      "end end",
    ],
  });

  const smoothProgress = useSpring(
    scrollYProgress,
    {
      stiffness: 75,
      damping: 24,
      mass: 0.25,
    }
  );

  const routeDashOffset = useTransform(
    smoothProgress,
    [0, 1],
    [1, 0]
  );

  /* =======================================================
     VEHICLE + ACTIVE LOCATION
  ======================================================= */

  useMotionValueEvent(
    smoothProgress,
    "change",
    (progress) => {
      const path = routeRef.current;

      if (!path) return;

      const totalLength =
        path.getTotalLength();

      const distance =
        progress * totalLength;

      const current =
        path.getPointAtLength(
          distance
        );

      const next =
        path.getPointAtLength(
          Math.min(
            distance + 1,
            totalLength
          )
        );

      const angle =
        Math.atan2(
          next.y - current.y,
          next.x - current.x
        ) *
        (180 / Math.PI);

      setVehicle({
        x: current.x,
        y: current.y,
        angle,
      });

      let active = 0;

      LOCATION_PROGRESS.forEach(
        (threshold, index) => {
          if (progress >= threshold) {
            active = index;
          }
        }
      );

      setActiveLocation(active);
    }
  );

  /* =======================================================
     DESTINATION CARD AUTO SCROLL
  ======================================================= */

  useEffect(() => {
    const activeCard =
      cardRefs.current[activeLocation];

    const container =
      document.querySelector(
        ".destination-cards"
      );

    if (
      activeCard &&
      container
    ) {
      const cardLeft =
        activeCard.offsetLeft;

      const cardWidth =
        activeCard.offsetWidth;

      const containerWidth =
        container.offsetWidth;

      container.scrollTo({
        left:
          cardLeft -
          containerWidth / 2 +
          cardWidth / 2,
        behavior: "smooth",
      });
    }
  }, [activeLocation]);

  /* =======================================================
     INITIAL VEHICLE
  ======================================================= */

  useEffect(() => {
    const path = routeRef.current;

    if (!path) return;

    const point =
      path.getPointAtLength(0);

    setVehicle({
      x: point.x,
      y: point.y,
      angle: 0,
    });
  }, []);

  /* =======================================================
     CARD SCROLL HELPERS
  ======================================================= */

  const scrollDestinations = (direction) => {
    const container =
      document.querySelector(
        ".destination-cards"
      );

    if (!container) return;

    const amount =
      window.innerWidth <= 800
        ? 240
        : 340;

    container.scrollBy({
      left:
        direction === "next"
          ? amount
          : -amount,
      behavior: "smooth",
    });
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section
      ref={sectionRef}
      className="global-route"
    >
      <div className="route-scroll">

        <div className="route-sticky">

          {/* =================================================
              WORLD MAP
          ================================================= */}

          <div className="world-map-layer">

            <img
              src={image}
              alt=""
              className="world-map-image"
            />

            <div className="map-vignette" />
            <div className="map-grid" />

          </div>

          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div className="route-content">

            <div className="route-eyebrow">

              <span>
                OUR GLOBAL ROUTE
              </span>

              <i />

            </div>

            <h2>
              From Kerala
              <br />
              to the <em>World</em>
            </h2>

            <p className="route-lead">
              One route. Many destinations.
              <br />
              Connected possibilities.
            </p>

            <p className="route-description">
              We started in Kerala, grew
              across India, and <br />
              are now serving clients
              worldwide. Our journey
              <br />
              continues, and so does yours.
            </p>

            {/* ROUTE SELECTOR */}

            <div className="route-selector">

              <div
                className={`route-selector-item ${
                  activeLocation <= 1
                    ? "active"
                    : ""
                }`}
              >
                <span className="selector-dot" />
                Kerala
              </div>

              <div
                className={`route-selector-item ${
                  activeLocation >= 2 &&
                  activeLocation <= 4
                    ? "active"
                    : ""
                }`}
              >
                <span className="selector-dot" />
                India
              </div>

              <div
                className={`route-selector-item ${
                  activeLocation >= 5
                    ? "active"
                    : ""
                }`}
              >
                <span className="selector-dot" />
                World
              </div>

            </div>

            {/* PROGRESS */}

            <div className="route-progress">

              <div className="route-play">
                <span>↓</span>
              </div>

              <div className="route-progress-track">

                <motion.div
                  className="route-progress-fill"
                  style={{
                    scaleX:
                      smoothProgress,
                  }}
                />

              </div>

              <span className="route-progress-label">
                SCROLL TO EXPLORE
              </span>

            </div>

          </div>

          {/* =================================================
              SVG ROUTE
          ================================================= */}

          <svg
            className="route-svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >

            <path
              ref={routeRef}
              d={ROUTE_PATH}
              className="route-base"
            />

            <motion.path
              d={ROUTE_PATH}
              className="route-active"
              pathLength="1"
              style={{
                pathLength: 1,
                strokeDasharray: 1,
                strokeDashoffset:
                  routeDashOffset,
              }}
            />

            {/* =================================================
                CAR
            ================================================= */}

            <g
              className="route-car"
              transform={`
                translate(
                  ${vehicle.x}
                  ${vehicle.y}
                )
                rotate(
                  ${vehicle.angle}
                )
              `}
            >

              <polygon
                points="
                  2.2,-0.9
                  6,-2.2
                  6,2.2
                  2.2,0.9
                "
                className="car-beam"
              />

              <rect
                x="-1.8"
                y="-1.65"
                width="1.1"
                height="0.45"
                rx="0.2"
                className="car-wheel"
              />

              <rect
                x="1.0"
                y="-1.65"
                width="1.1"
                height="0.45"
                rx="0.2"
                className="car-wheel"
              />

              <rect
                x="-1.8"
                y="1.2"
                width="1.1"
                height="0.45"
                rx="0.2"
                className="car-wheel"
              />

              <rect
                x="1.0"
                y="1.2"
                width="1.1"
                height="0.45"
                rx="0.2"
                className="car-wheel"
              />

              <rect
                className="car-body"
                x="-2.2"
                y="-1.35"
                width="4.4"
                height="2.7"
                rx="0.9"
              />

              <path
                className="car-windshield"
                d="
                  M -0.8 -0.95
                  L 0.7 -0.95
                  L 1.2 -0.6
                  L 1.2 0.6
                  L 0.7 0.95
                  L -0.8 0.95
                  L -1.2 0.7
                  L -1.2 -0.7
                  Z
                "
              />

              <rect
                className="car-roof"
                x="-0.7"
                y="-0.75"
                width="1.6"
                height="1.5"
                rx="0.3"
              />

              <circle
                cx="2.1"
                cy="-0.9"
                r="0.28"
                className="car-headlight"
              />

              <circle
                cx="2.1"
                cy="0.9"
                r="0.28"
                className="car-headlight"
              />

              <rect
                x="-2.25"
                y="-1.1"
                width="0.25"
                height="0.55"
                rx="0.1"
                className="car-taillight"
              />

              <rect
                x="-2.25"
                y="0.55"
                width="0.25"
                height="0.55"
                rx="0.1"
                className="car-taillight"
              />

            </g>

          </svg>

          {/* =================================================
              MAP POINTS
          ================================================= */}

          {locations.map(
            (location, index) => (
              <MapLocation
                key={location.id}
                location={location}
                active={
                  index === activeLocation
                }
                reached={
                  index <= activeLocation
                }
              />
            )
          )}

          {/* =================================================
              FLOATING LOCATION CARDS
          ================================================= */}

          {locations.map(
            (location, index) => (
              <FloatingLocationCard
                key={location.id}
                location={location}
                active={
                  index === activeLocation
                }
                reached={
                  index <= activeLocation
                }
              />
            )
          )}

          {/* =================================================
              JOURNEY NAVIGATION
          ================================================= */}

          <div className="journey-navigation">

            <span className="journey-nav-title">
              JOURNEY
            </span>

            <div className="journey-nav-line" />

            {locations.map(
              (location, index) => (
                <div
                  key={location.id}
                  className={`journey-nav-item ${
                    index === activeLocation
                      ? "active"
                      : ""
                  }`}
                >

                  <span className="journey-nav-dot" />

                  <div>

                    <strong>
                      {location.name}
                    </strong>

                    <small>
                      {location.number}
                    </small>

                  </div>

                </div>
              )
            )}

          </div>

          {/* =================================================
              DESTINATION STRIP
          ================================================= */}

          <div className="destination-strip">

            <div className="destination-header">

              <div className="destination-heading">

                <span className="destination-eyebrow">
                  GLOBAL DESTINATIONS
                </span>

                <h3>
                  Explore our{" "}
                  <em>locations.</em>
                </h3>

              </div>

              <div className="destination-controls">

                <span className="destination-counter">

                  {String(
                    activeLocation + 1
                  ).padStart(2, "0")}

                  <i>/</i>

                  {String(
                    locations.length
                  ).padStart(2, "0")}

                </span>

                <button
                  className="destination-arrow"
                  onClick={() =>
                    scrollDestinations("prev")
                  }
                  aria-label="Previous destinations"
                >
                  ←
                </button>

                <button
                  className="destination-arrow"
                  onClick={() =>
                    scrollDestinations("next")
                  }
                  aria-label="Next destinations"
                >
                  →
                </button>

              </div>

            </div>

            <div className="destination-slider">

              <div className="destination-cards">

                {locations.map(
                  (location, index) => (
                    <div
                      key={location.id}
                      ref={(el) => {
                        cardRefs.current[
                          index
                        ] = el;
                      }}
                    >

                      <DestinationCard
                        location={location}
                        active={
                          index ===
                          activeLocation
                        }
                        reached={
                          index <=
                          activeLocation
                        }
                      />

                    </div>
                  )
                )}

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

/* =========================================================
   MAP LOCATION
========================================================= */

function MapLocation({
  location,
  active,
  reached,
}) {
  return (
    <div
      className={`map-point ${
        active ? "active" : ""
      } ${
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

/* =========================================================
   FLOATING LOCATION CARD
========================================================= */

function FloatingLocationCard({
  location,
  active,
  reached,
}) {
  return (
    <div
      data-location={location.id}
      className={`floating-location-card ${
        active ? "active" : ""
      } ${
        reached ? "reached" : ""
      }`}
      style={{
        left: `${location.cardX}%`,
        top: `${location.cardY}%`,
      }}
    >

      <div className="floating-card-header">

        <span className="floating-flag">
          {location.flag}
        </span>

        <strong>
          {location.name}
        </strong>

        <span className="floating-country">
          / {location.country}
        </span>

      </div>

      <div className="floating-services">

        {location.services.map(
          (service) => (
            <span key={service}>
              {service}
            </span>
          )
        )}

      </div>

      <div className="floating-arrow">
        ↗
      </div>

    </div>
  );
}

/* =========================================================
   DESTINATION CARD
========================================================= */

function DestinationCard({
  location,
  active,
  reached,
}) {
  return (
    <article
      className={`destination-card ${
        active ? "active" : ""
      } ${
        reached ? "reached" : ""
      }`}
    >

      <div className="destination-card-info">

        <span className="destination-number">
          {location.number}
        </span>

        <h3>
          {location.name}
        </h3>

        <span className="destination-subtitle">
          {location.subtitle}
        </span>

        <p>
          {location.description}
        </p>

        <button>
          View Details
          <span>→</span>
        </button>

      </div>

      <div className="destination-image">

        <img
          src={location.image}
          alt={location.name}
          loading="lazy"
        />

        <div className="destination-image-overlay" />

        <span className="destination-image-number">
          {location.number}
        </span>

      </div>

    </article>
  );
}