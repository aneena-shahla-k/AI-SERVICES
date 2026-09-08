import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./JourneyRoute.css";

gsap.registerPlugin(ScrollTrigger);

const checkpoints = [
  {
    id: "hero",
    label: "START",
    number: "01",
  },
  {
    id: "route",
    label: "ROUTE",
    number: "02",
  },
  {
    id: "services",
    label: "SERVICES",
    number: "03",
  },
  {
    id: "ai42",
    label: "42 HOURS",
    number: "04",
  },
  {
    id: "packages",
    label: "PACKAGES",
    number: "05",
  },
  {
    id: "final",
    label: "DESTINATION",
    number: "06",
  },
];

export default function JourneyRoute() {
  const rootRef = useRef(null);
  const dotRef = useRef(null);
  const progressRef = useRef(null);
  const glowRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const dot = dotRef.current;
    const progress = progressRef.current;
    const glow = glowRef.current;

    if (!root || !dot || !progress) return;

    const ctx = gsap.context(() => {
      /*
       * The path is intentionally long enough to span
       * the entire website.
       */
      const path = root.querySelector(".journey-path");
      const pathLength = path.getTotalLength();

      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      gsap.set(progress, {
        scaleY: 0,
      });

      /*
       * Main global journey progress.
       */
      const journey = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,

          onUpdate: (self) => {
            const progressValue = self.progress;

            /*
             * Move GPS dot using the same global progress.
             */
            const point = path.getPointAtLength(
              pathLength * progressValue
            );

            dot.setAttribute("cx", point.x);
            dot.setAttribute("cy", point.y);

            /*
             * Glow follows the dot.
             */
            glow.setAttribute("cx", point.x);
            glow.setAttribute("cy", point.y);

            /*
             * Overall progress indicator.
             */
            gsap.set(progress, {
              scaleY: progressValue,
            });

            /*
             * Determine active section.
             */
            updateActiveSection(progressValue);
          },
        },
      });

      /*
       * Draw route progressively.
       */
      journey.to(
        path,
        {
          strokeDashoffset: 0,
          ease: "none",
        },
        0
      );

      /*
       * Section detection.
       */
      const sectionElements = checkpoints
        .map((item) =>
          document.getElementById(item.id)
        )
        .filter(Boolean);

      function updateActiveSection(globalProgress) {
        if (!sectionElements.length) return;

        let activeIndex = 0;

        sectionElements.forEach((section, index) => {
          const rect = section.getBoundingClientRect();
          const sectionCenter =
            rect.top + rect.height / 2;

          if (sectionCenter <= window.innerHeight * 0.55) {
            activeIndex = index;
          }
        });

        root
          .querySelectorAll(".journey-checkpoint")
          .forEach((checkpoint, index) => {
            checkpoint.classList.toggle(
              "is-active",
              index === activeIndex
            );
          });
      }

      /*
       * Small breathing animation for the GPS dot.
       */
      gsap.to(dot, {
        r: 6,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /*
       * Refresh after layout is ready.
       */
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      className="journey-route"
      ref={rootRef}
      aria-hidden="true"
    >
      {/* LEFT GPS UI */}
      <div className="journey-ui">
        <div className="journey-progress">
          <div
            className="journey-progress-fill"
            ref={progressRef}
          />
        </div>

        <div className="journey-checkpoints">
          {checkpoints.map((checkpoint) => (
            <div
              key={checkpoint.id}
              className="journey-checkpoint"
              data-section={checkpoint.id}
            >
              <span className="journey-checkpoint-dot" />

              <div className="journey-checkpoint-info">
                <span>
                  {checkpoint.number}
                </span>

                <strong>
                  {checkpoint.label}
                </strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GLOBAL SVG ROUTE */}
      <svg
        className="journey-svg"
        viewBox="0 0 160 6000"
        preserveAspectRatio="none"
      >
        <path
          className="journey-path-base"
          d="
            M 80 0

            C 80 250,
              25 400,
              80 650

            C 135 900,
              135 1050,
              80 1250

            C 25 1450,
              25 1650,
              80 1850

            C 135 2050,
              135 2250,
              80 2450

            C 25 2650,
              25 2850,
              80 3050

            C 135 3250,
              135 3450,
              80 3650

            C 25 3850,
              25 4050,
              80 4250

            C 135 4450,
              135 4650,
              80 4850

            C 25 5050,
              25 5250,
              80 5450

            C 80 5600,
              80 5800,
              80 6000
          "
        />

        <path
          className="journey-path"
          d="
            M 80 0

            C 80 250,
              25 400,
              80 650

            C 135 900,
              135 1050,
              80 1250

            C 25 1450,
              25 1650,
              80 1850

            C 135 2050,
              135 2250,
              80 2450

            C 25 2650,
              25 2850,
              80 3050

            C 135 3250,
              135 3450,
              80 3650

            C 25 3850,
              25 4050,
              80 4250

            C 135 4450,
              135 4650,
              80 4850

            C 25 5050,
              25 5250,
              80 5450

            C 80 5600,
              80 5800,
              80 6000
          "
        />

        {/* GPS glow */}
        <circle
          ref={glowRef}
          className="journey-dot-glow"
          cx="80"
          cy="0"
          r="20"
        />

        {/* GPS dot */}
        <circle
          ref={dotRef}
          className="journey-dot"
          cx="80"
          cy="0"
          r="5"
        />
      </svg>
    </div>
  );
}