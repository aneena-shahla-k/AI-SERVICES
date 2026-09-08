import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Packages.css";

gsap.registerPlugin(ScrollTrigger);

const packages = [
  {
    id: "01",
    type: "START",
    title: "Launch your route.",
    description:
      "Everything you need to establish a strong digital presence and start moving.",
    features: ["Website", "CMS", "Responsive UI", "Basic Integrations"],
    price: "STARTING FROM",
    value: "₹XX,XXX",
  },
  {
    id: "02",
    type: "GROW",
    title: "Scale your business.",
    description:
      "Advanced systems, automation and digital experiences built for growing businesses.",
    features: [
      "Advanced Website",
      "Payments",
      "Automation",
      "Analytics",
      "Integrations",
    ],
    price: "STARTING FROM",
    value: "₹XX,XXX",
  },
  {
    id: "03",
    type: "CUSTOM",
    title: "Build your route.",
    description:
      "No predefined package. We create the exact digital system your business needs.",
    features: ["AI", "ERP", "Booking", "E-Commerce", "Custom Platform"],
    price: "LET'S DISCUSS",
    value: "YOUR PLAN",
  },
];

export default function Packages() {
  const sectionRef = useRef(null);
  const startRef = useRef(null);
  const growRef = useRef(null);
  const customRef = useRef(null);
  const routeRef = useRef(null);
  const dotRef = useRef(null);
  const progressRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const route = routeRef.current;
    const dot = dotRef.current;
    const progress = progressRef.current;

    if (!section || !route || !dot) return;

    const ctx = gsap.context(() => {
      

      // Initial states
      gsap.set(startRef.current, {
        opacity: 0,
        y: 100,
        rotate: -3,
        scale: 0.94,
      });

      gsap.set(growRef.current, {
        opacity: 0,
        x: 120,
        y: -100,
        rotate: 3,
        scale: 0.92,
      });

      gsap.set(customRef.current, {
        opacity: 0,
        x: 140,
        y: 120,
        rotate: -3,
        scale: 0.92,
      });

      gsap.set(".package-feature", {
        opacity: 0,
        y: 15,
      });

      // Main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,

          onUpdate: (self) => {
            const p = self.progress;

            if (progress) {
              progress.style.transform = `scaleX(${p})`;
            }

            // GPS dot movement
            const routeLength = route.getTotalLength
              ? route.getTotalLength()
              : 1000;

            const point = route.getPointAtLength(
              routeLength * p
            );

            dot.setAttribute("cx", point.x);
            dot.setAttribute("cy", point.y);
          },
        },
      });

      // START
      tl.to(
        startRef.current,
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        },
        0
      );

      tl.to(
        startRef.current.querySelectorAll(".package-feature"),
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.4,
        },
        0.35
      );

      // GROW
      tl.to(
        growRef.current,
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        },
        0.28
      );

      tl.to(
        growRef.current.querySelectorAll(".package-feature"),
        {
          opacity: 1,
          y: 0,
          stagger: 0.07,
          duration: 0.4,
        },
        0.58
      );

      // Small START movement while GROW becomes dominant
      tl.to(
        startRef.current,
        {
          x: -40,
          y: 25,
          scale: 0.96,
          opacity: 0.65,
          duration: 0.8,
        },
        0.55
      );

      // CUSTOM
      tl.to(
        customRef.current,
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        },
        0.62
      );

      tl.to(
        customRef.current.querySelectorAll(".package-feature"),
        {
          opacity: 1,
          y: 0,
          stagger: 0.07,
          duration: 0.4,
        },
        0.82
      );

      // Final destination emphasis
      tl.to(
        customRef.current,
        {
          scale: 1.02,
          duration: 0.5,
          ease: "power2.out",
        },
        0.93
      );

      // Floating UI elements
      gsap.utils.toArray(".package-floating").forEach(
        (element, index) => {
          gsap.to(element, {
            y: index % 2 === 0 ? -12 : 12,
            duration: 2 + index * 0.3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      );

      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="packages-section"
      id="packages"
    >
      {/* HEADER */}
      <div className="packages-header">
        <div>
          <span className="packages-eyebrow">
            05 / PACKAGES
          </span>

          <h2>
            Choose your
            <br />
            <span>route.</span>
          </h2>
        </div>

        <div className="packages-header-meta">
          <span>BUSINESS ROUTE</span>

          <div>
            <span className="live-dot" />
            OPTIONS AVAILABLE
          </div>
        </div>
      </div>

      {/* GPS ROUTE */}
      <svg
        className="packages-route"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
      >
        <path
          ref={routeRef}
          className="route-base"
          d="
            M 80 650
            C 240 650 250 520 390 520
            C 540 520 540 260 720 260
            C 900 260 860 650 1060 650
            C 1200 650 1200 400 1370 400
          "
        />

        <path
          className="route-glow"
          d="
            M 80 650
            C 240 650 250 520 390 520
            C 540 520 540 260 720 260
            C 900 260 860 650 1060 650
            C 1200 650 1200 400 1370 400
          "
        />

        <circle
          ref={dotRef}
          className="route-dot"
          cx="80"
          cy="650"
          r="7"
        />

        <circle
          className="route-dot-pulse"
          cx="80"
          cy="650"
          r="18"
        />
      </svg>

      {/* START */}
      <article
        ref={startRef}
        className="package-card package-start"
      >
        <div className="package-card-top">
          <span>{packages[0].id}</span>
          <span>{packages[0].type}</span>
        </div>

        <div className="package-node">
          <span />
        </div>

        <div className="package-card-content">
          <span className="package-label">
            ENTRY ROUTE
          </span>

          <h3>{packages[0].title}</h3>

          <p>{packages[0].description}</p>

          <div className="package-features">
            {packages[0].features.map((feature) => (
              <span
                className="package-feature"
                key={feature}
              >
                <i>+</i>
                {feature}
              </span>
            ))}
          </div>

          <div className="package-price">
            <span>{packages[0].price}</span>
            <strong>{packages[0].value}</strong>
          </div>

          <button className="package-button">
            Explore
            <span>↗</span>
          </button>
        </div>
      </article>

      {/* GROW */}
      <article
        ref={growRef}
        className="package-card package-grow"
      >
        <div className="package-card-top">
          <span>{packages[1].id}</span>
          <span>{packages[1].type}</span>
        </div>

        <div className="package-card-content">
          <span className="package-label">
            GROWTH ROUTE
          </span>

          <h3>{packages[1].title}</h3>

          <p>{packages[1].description}</p>

          <div className="package-features">
            {packages[1].features.map((feature) => (
              <span
                className="package-feature"
                key={feature}
              >
                <i>+</i>
                {feature}
              </span>
            ))}
          </div>

          <div className="package-price">
            <span>{packages[1].price}</span>
            <strong>{packages[1].value}</strong>
          </div>

          <button className="package-button package-button-light">
            Explore
            <span>↗</span>
          </button>
        </div>

        <div className="package-floating floating-one">
          <span>GROWTH</span>
          <strong>+42%</strong>
        </div>

        <div className="package-floating floating-two">
          <span>SYSTEM</span>
          <strong>ACTIVE ✓</strong>
        </div>
      </article>

      {/* CUSTOM */}
      <article
        ref={customRef}
        className="package-card package-custom"
      >
        <div className="package-card-top">
          <span>{packages[2].id}</span>
          <span>{packages[2].type}</span>
        </div>

        <div className="custom-mark">
          <span />
          <span />
          <span />
        </div>

        <div className="package-card-content">
          <span className="package-label">
            DESTINATION ROUTE
          </span>

          <h3>{packages[2].title}</h3>

          <p>{packages[2].description}</p>

          <div className="package-features custom-features">
            {packages[2].features.map((feature) => (
              <span
                className="package-feature"
                key={feature}
              >
                <i>+</i>
                {feature}
              </span>
            ))}
          </div>

          <div className="package-price">
            <span>{packages[2].price}</span>
            <strong>{packages[2].value}</strong>
          </div>

          <button className="package-button">
            Build your route
            <span>↗</span>
          </button>
        </div>
      </article>

      {/* FLOATING METADATA */}
      <div className="package-floating package-meta meta-one">
        <span>ROUTE</span>
        <strong>03</strong>
      </div>

      <div className="package-floating package-meta meta-two">
        <span>FLEXIBLE</span>
        <strong>100%</strong>
      </div>

      {/* FOOTER */}
      <div className="packages-footer">
        <div className="packages-progress">
          <div
            ref={progressRef}
            className="packages-progress-bar"
          />
        </div>

        <span>SCROLL TO EXPLORE</span>

        <span>03 / 03</span>
      </div>
    </section>
  );
}