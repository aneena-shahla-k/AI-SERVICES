import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import MagneticButton from "../MagneticButton";
import "./Services.css";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    tag: "PLATFORMS",
    title: "Websites & Digital Platforms",
    subtitle: "Turn visitors into high-value clients.",
    accent: "#0284c7",
    badge: "ROUTE 01",
    description:
      "Enterprise digital foundations engineered for speed, conversion, and global reach.",
    features: [
      "Corporate Sites",
      "Client Portals",
      "Landing Pages",
      "Web Dashboards",
    ],
  },
  {
    number: "02",
    tag: "COMMERCE",
    title: "E-Commerce Systems",
    subtitle: "Built to scale transaction volume.",
    accent: "#7c3aed",
    badge: "ROUTE 02",
    description:
      "High-performance storefronts and multi-vendor marketplaces with seamless checkout.",
    features: [
      "Modern Stores",
      "Marketplaces",
      "Payment Gateways",
      "ERP Sync",
    ],
  },
  {
    number: "03",
    tag: "MOBILE",
    title: "Mobile App Development",
    subtitle: "Native experiences in every pocket.",
    accent: "#059669",
    badge: "ROUTE 03",
    description:
      "Cross-platform mobile applications delivering intuitive UI and offline efficiency.",
    features: [
      "iOS & Android",
      "Flutter / React Native",
      "Live Tracking",
      "Internal Tools",
    ],
  },
  {
    number: "04",
    tag: "BOOKING",
    title: "Booking & Reservations",
    subtitle: "Zero friction scheduling infrastructure.",
    accent: "#d97706",
    badge: "ROUTE 04",
    description:
      "Automated calendars, instant multi-currency deposits, and SMS/Email reminders.",
    features: [
      "Clinic & Doctor Booking",
      "Hotel & Stays",
      "Event Ticketing",
      "Calendar Sync",
    ],
  },
  {
    number: "05",
    tag: "ENTERPRISE",
    title: "ERP & Business Core",
    subtitle: "Unify teams, data, and capital.",
    accent: "#e11d48",
    badge: "ROUTE 05",
    description:
      "Centralize your operational horsepower into an interconnected real-time dashboard.",
    features: [
      "CRM Pipelines",
      "HR & Payroll",
      "Inventory Sync",
      "Vendor Portals",
    ],
  },
  {
    number: "06",
    tag: "INTELLIGENCE",
    title: "AI Solutions & Automation",
    subtitle: "Inject machine intelligence across routines.",
    accent: "#0ea5e9",
    badge: "ROUTE 06",
    description:
      "Autonomous AI assistants, custom LLM workflows, and intelligent decision loops.",
    features: [
      "Custom AI Copilots",
      "Workflow Bots",
      "Document OCR",
      "Predictive Analytics",
    ],
  },
];

/* =========================================================
   ACTUAL CURVED HIGHWAY PATH

   The car follows this exact path.
========================================================= */

const ROAD_PATH = `
  M 0 108
  C 260 22, 610 18, 930 96
  S 1450 190, 1780 92
  S 2330 18, 2670 98
  S 3300 194, 4000 66
`;

function Services() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const carRef = useRef(null);
  const roadPathRef = useRef(null);

  const [activeService, setActiveService] =
    useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    const car = carRef.current;
    const roadPath = roadPathRef.current;

    if (
      !section ||
      !track ||
      !progress ||
      !car ||
      !roadPath
    ) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      /* =====================================================
         HORIZONTAL DISTANCE
      ===================================================== */

      const getDistance = () =>
        Math.max(
          0,
          track.scrollWidth -
            window.innerWidth
        );

      /* =====================================================
         CAR POSITION
      ===================================================== */

      const updateCarPosition = (progressValue) => {
        const pathLength =
          roadPath.getTotalLength();

        const distance =
          progressValue * pathLength;

        const point =
          roadPath.getPointAtLength(
            distance
          );

        const nextPoint =
          roadPath.getPointAtLength(
            Math.min(
              distance + 2,
              pathLength
            )
          );

        const angle =
          Math.atan2(
            nextPoint.y - point.y,
            nextPoint.x - point.x
          ) *
          (180 / Math.PI);

        /*
          The SVG road is 180px high.

          Since preserveAspectRatio="none"
          is being used, SVG coordinates map
          directly into the rendered road box.
        */

        gsap.set(car, {
          x: point.x - 25,
          y: point.y - 12,
          rotation: angle,
        });
      };

      /* =====================================================
         HORIZONTAL SCROLL
      ===================================================== */

      const horizontalScroll = gsap.to(
        track,
        {
          x: () => -getDistance(),

          ease: "none",

          scrollTrigger: {
            trigger: section,

            start: "top top",

            end: () =>
              `+=${Math.max(
                getDistance(),
                1
              )}`,

            pin: true,

            scrub: 1,

            invalidateOnRefresh: true,

            onUpdate: (self) => {
              const progressValue =
                self.progress;

              /* Progress bar */

              progress.style.transform =
                `scaleX(${progressValue})`;

              /* Car follows actual SVG curve */

              updateCarPosition(
                progressValue
              );

              /* Determine active service */

              const serviceCount =
                services.length;

              const serviceProgress =
                progressValue *
                serviceCount;

              const nextIndex = Math.min(
                serviceCount - 1,
                Math.floor(
                  serviceProgress
                )
              );

              setActiveService(
                nextIndex
              );
            },
          },
        }
      );

      /* =====================================================
         INITIAL CAR
      ===================================================== */

      updateCarPosition(0);

      /* =====================================================
         SERVICE CARD ENTRANCE
      ===================================================== */

      const panels =
        gsap.utils.toArray(
          ".service-panel"
        );

      panels.forEach((panel) => {
        gsap.fromTo(
          panel,
          {
            opacity: 0.35,
            scale: 0.94,
            y: 25,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,

            ease: "power2.out",

            scrollTrigger: {
              trigger: panel,

              containerAnimation:
                horizontalScroll,

              start: "left 92%",

              end: "left 52%",

              scrub: true,
            },
          }
        );
      });

      /* =====================================================
         REFRESH
      ===================================================== */

      const refreshTimer =
        setTimeout(() => {
          ScrollTrigger.refresh();

          updateCarPosition(0);
        }, 200);

      return () => {
        clearTimeout(refreshTimer);
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="services-section light-theme"
      id="services"
    >
      {/* ===================================================
          AMBIENT BACKGROUND
      =================================================== */}

      <div className="services-bg-ambient" />

      <div className="services-road-grid" />

      <div className="services-orbit-glow" />

      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="services-header">
        <div className="services-header-left">

          <span className="services-eyebrow">
            03 // WHAT WE BUILD & DELIVER
          </span>

          <h2>
            Choose your{" "}
            <em>strategic route.</em>
          </h2>

          <p className="services-header-description">
            Six connected capabilities.
            <br />
            One digital ecosystem.
          </p>

        </div>

        <div className="services-header-right">

          <div className="route-status">
            <span className="status-dot pulse" />
            LIVE HIGHWAY CONNECTED
          </div>

          <span>
            FULL STACK INFRASTRUCTURE
          </span>

        </div>
      </header>

      {/* ===================================================
          HORIZONTAL VIEWPORT
      =================================================== */}

      <div className="services-viewport">

        <div
          ref={trackRef}
          className="services-track"
        >

          {/* =================================================
              HIGHWAY
          ================================================= */}

          <div className="highway-road-curved">

            <svg
              className="curved-road-svg"
              viewBox="0 0 4000 200"
              preserveAspectRatio="none"
              aria-hidden="true"
            >

              {/* Outer soft lane */}

              <path
                d={ROAD_PATH}
                className="road-outer"
              />

              {/* Main road */}

              <path
                d={ROAD_PATH}
                className="curved-road-glow"
              />

              {/* Inner luminous lane */}

              <path
                d={ROAD_PATH}
                className="road-inner"
              />

              {/* Moving lane markings */}

              <path
                d={ROAD_PATH}
                className="curved-road-dashes"
              />

              {/* Fine center line */}

              <path
                d={ROAD_PATH}
                className="road-center-line"
              />

              {/* Hidden geometry used by car */}

              <path
                ref={roadPathRef}
                d={ROAD_PATH}
                className="road-measure-path"
              />

            </svg>

            {/* =================================================
                CAR
            ================================================= */}

            <div
              ref={carRef}
              className="route-car-runner"
            >

              <div className="car-shadow" />

              <div className="car-headlight-flare" />

              <div className="car-light-trail" />

              <svg
                className="mini-car-svg"
                viewBox="0 0 54 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >

                {/* Wheels */}

                <rect
                  x="7"
                  y="1"
                  width="10"
                  height="3"
                  rx="1.5"
                  fill="#0f172a"
                />

                <rect
                  x="36"
                  y="1"
                  width="10"
                  height="3"
                  rx="1.5"
                  fill="#0f172a"
                />

                <rect
                  x="7"
                  y="22"
                  width="10"
                  height="3"
                  rx="1.5"
                  fill="#0f172a"
                />

                <rect
                  x="36"
                  y="22"
                  width="10"
                  height="3"
                  rx="1.5"
                  fill="#0f172a"
                />

                {/* Main body */}

                <rect
                  x="4"
                  y="4"
                  width="44"
                  height="18"
                  rx="6"
                  fill="#0284c7"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                />

                {/* Windows */}

                <path
                  d="
                    M16 6.5
                    H34
                    L39 9
                    V17
                    L34 19.5
                    H16
                    L12 16.5
                    V9.5
                    L16 6.5Z
                  "
                  fill="#ffffff"
                />

                <rect
                  x="18"
                  y="8"
                  width="14"
                  height="10"
                  rx="2"
                  fill="#075985"
                />

                {/* Reflection */}

                <path
                  d="M20 8.7H31"
                  stroke="#bae6fd"
                  strokeWidth="1"
                  strokeLinecap="round"
                />

                {/* Front lights */}

                <circle
                  cx="47"
                  cy="7.5"
                  r="1.8"
                  fill="#facc15"
                />

                <circle
                  cx="47"
                  cy="18.5"
                  r="1.8"
                  fill="#facc15"
                />

                {/* Rear lights */}

                <rect
                  x="3"
                  y="6.5"
                  width="2"
                  height="3.5"
                  rx="0.8"
                  fill="#ef4444"
                />

                <rect
                  x="3"
                  y="16"
                  width="2"
                  height="3.5"
                  rx="0.8"
                  fill="#ef4444"
                />

              </svg>

            </div>

          </div>

          {/* =================================================
              START
          ================================================= */}

          <div className="service-start">

            <span className="start-label">
              ORIGIN 00
            </span>

            <div className="start-node">

              <div className="start-core" />

              <div className="start-ping" />

            </div>

            <p>
              Your digital evolution
              <br />
              starts here.
            </p>

            <span className="start-scroll">
              SCROLL TO BEGIN →
            </span>

          </div>

          {/* =================================================
              SERVICE CARDS
          ================================================= */}

          {services.map(
            (service, index) => (
              <article
                className={`service-panel ${
                  index ===
                  activeService
                    ? "is-active"
                    : ""
                }`}
                key={service.title}
                style={{
                  "--accent-color":
                    service.accent,
                }}
                onMouseEnter={() =>
                  setActiveService(index)
                }
                onClick={() =>
                  setActiveService(index)
                }
              >

                {/* CHECKPOINT */}

                <div className="service-checkpoint-pillar">

                  <div className="pillar-node">

                    <div className="pillar-core" />

                    <span className="pillar-ring" />

                  </div>

                  <div className="pillar-line" />

                  <span className="checkpoint-code">
                    CP-0{index + 1}
                  </span>

                </div>

                {/* CARD */}

                <div className="service-card-compact">

                  {/* Accent glow */}

                  <div className="card-accent-glow" />

                  {/* Top */}

                  <div className="card-top-row">

                    <span className="service-badge">
                      {service.badge}
                    </span>

                    <span className="service-number">
                      {service.number}
                    </span>

                  </div>

                  {/* Tag */}

                  <span className="service-tag">
                    {service.tag}
                  </span>

                  {/* Heading */}

                  <div className="card-heading-group">

                    <h3>
                      {service.title}
                    </h3>

                    <h4>
                      {service.subtitle}
                    </h4>

                    <p>
                      {service.description}
                    </p>

                  </div>

                  {/* Features */}

                  <div className="service-features-pills">

                    {service.features.map(
                      (feature) => (
                        <span
                          className="feature-pill"
                          key={feature}
                        >

                          <i
                            style={{
                              background:
                                service.accent,
                            }}
                          />

                          {feature}

                        </span>
                      )
                    )}

                  </div>

                  {/* Footer */}

                  <div className="service-card-footer">

                    <MagneticButton
                      className="service-link-compact"
                      strength={0.2}
                    >
                      Explore Route
                      <span>↗</span>
                    </MagneticButton>

                    <span className="card-route-status">
                      ACTIVE PATH
                    </span>

                  </div>

                  {/* Corner number */}

                  <span className="card-watermark">
                    {service.number}
                  </span>

                </div>

              </article>
            )
          )}

          {/* =================================================
              END
          ================================================= */}

          <div className="service-end">

            <span className="end-label">
              ARRIVAL // READY TO SCALE
            </span>

            <div className="end-node">

              <div className="end-inner" />

              <div className="end-flare" />

              <div className="end-orbit" />

            </div>

            <h3>
              Accelerate your
              <br />
              <em>Market Position.</em>
            </h3>

            <p>
              Ready to deploy your
              connected ecosystem?
            </p>

            <MagneticButton
              className="end-cta-btn"
              strength={0.3}
            >
              Schedule Architecture Call
              <span>↗</span>
            </MagneticButton>

          </div>

        </div>
      </div>

      {/* ===================================================
          BOTTOM PROGRESS
      =================================================== */}

      <div className="services-footer">

        <div className="progress-track">

          <div
            ref={progressRef}
            className="progress-bar"
          />

        </div>

        <div className="scroll-hint">

          <span className="hint-arrow">
            ←
          </span>

          <span>
            SCROLL TO EXPLORE
          </span>

          <span className="hint-arrow">
            →
          </span>

        </div>

        <div className="service-count">

          {String(
            activeService + 1
          ).padStart(2, "0")}

          <span>
            {" "}
            / 06 ROUTES
          </span>

        </div>

      </div>
    </section>
  );
}

export default Services;