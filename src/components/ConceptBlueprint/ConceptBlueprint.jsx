import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ConceptBlueprint.css";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    label: "CONCEPT",
    title: "You identify the opportunity.",
    text: "Every business starts with an idea, an opportunity, or a problem worth solving.",
  },
  {
    number: "02",
    label: "BLUEPRINT",
    title: "We design the route.",
    text: "We turn your concept into a clear strategy, system, technology, and growth blueprint.",
  },
  {
    number: "03",
    label: "EXECUTION",
    title: "You operate. We build.",
    text: "With the route defined, we build the digital infrastructure that helps your business move forward.",
  },
];

export default function ConceptBlueprint() {
  const sectionRef = useRef(null);
  const routeRef = useRef(null);
  const progressRef = useRef(null);
  const dotRef = useRef(null);

  const stepRefs = useRef([]);
  const contentRefs = useRef([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const route = routeRef.current;
    const progress = progressRef.current;
    const dot = dotRef.current;

    if (!section || !route || !progress || !dot) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth <= 768;

      /* --------------------------------
         DESKTOP
      -------------------------------- */

      if (!isMobile) {
        const routeLength = progress.getTotalLength();

        gsap.set(progress, {
          strokeDasharray: routeLength,
          strokeDashoffset: routeLength,
        });

        gsap.set(dot, {
          opacity: 0,
        });

        const routeAnimation = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=1500",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,

            onUpdate: (self) => {
              const p = self.progress;

              /* --------------------------
                 Active step
              -------------------------- */

              let activeIndex = Math.floor(p * steps.length);

              if (activeIndex >= steps.length) {
                activeIndex = steps.length - 1;
              }

              stepRefs.current.forEach((step, index) => {
                if (!step) return;

                if (index === activeIndex) {
                  step.classList.add("active");
                } else {
                  step.classList.remove("active");
                }
              });

              /* --------------------------
                 Content
              -------------------------- */

              contentRefs.current.forEach((content, index) => {
                if (!content) return;

                const start = index / steps.length;
                const end = (index + 1) / steps.length;

                let localProgress =
                  (p - start) / (end - start);

                localProgress = Math.max(
                  0,
                  Math.min(1, localProgress)
                );

                const visible =
                  localProgress > 0.15 &&
                  localProgress < 0.95;

                gsap.to(content, {
                  opacity: visible ? 1 : 0,
                  y: visible ? 0 : 20,
                  duration: 0.3,
                  overwrite: true,
                  ease: "power2.out",
                });
              });
            },
          },
        });

        /* Draw route */
        routeAnimation.to(progress, {
          strokeDashoffset: 0,
          duration: 1,
          ease: "none",
        });

        /* Move GPS dot along route */
        const proxy = { value: 0 };

        routeAnimation.to(
          proxy,
          {
            value: 1,
            duration: 1,
            ease: "none",

            onUpdate: () => {
              const point = progress.getPointAtLength(
                routeLength * proxy.value
              );

              gsap.set(dot, {
                attr: {
                  cx: point.x,
                  cy: point.y,
                },
                opacity: 1,
              });
            },
          },
          0
        );
      }

      /* --------------------------------
         MOBILE
      -------------------------------- */

      if (isMobile) {
        contentRefs.current.forEach((content, index) => {
          if (!content) return;

          gsap.fromTo(
            content,
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",

              scrollTrigger: {
                trigger: content,
                start: "top 80%",
                end: "top 50%",
                scrub: true,
              },
            }
          );
        });

        stepRefs.current.forEach((step) => {
          if (!step) return;

          ScrollTrigger.create({
            trigger: step,
            start: "top 70%",

            onEnter: () => {
              step.classList.add("active");
            },

            onLeaveBack: () => {
              step.classList.remove("active");
            },
          });
        });
      }

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="concept-blueprint"
      id="concept"
    >
      {/* --------------------------------
          HEADER
      -------------------------------- */}

      <div className="concept-header">
        <h2>
          Your Concept.
          <br />
          <span>Our Blueprint.</span>
        </h2>
      </div>

      {/* --------------------------------
          DESKTOP ROUTE
      -------------------------------- */}

      <div className="concept-route-wrap">
        <svg
          ref={routeRef}
          className="concept-route"
          viewBox="0 0 1000 300"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Background route */}
          <path
            className="route-base"
            d="M70 220 C220 220 220 80 380 80 S520 220 650 180 S780 60 930 100"
          />

          {/* Animated route */}
          <path
            ref={progressRef}
            className="route-progress"
            d="M70 220 C220 220 220 80 380 80 S520 220 650 180 S780 60 930 100"
          />

          {/* Moving dot */}
          <circle
            ref={dotRef}
            className="route-dot"
            cx="70"
            cy="220"
            r="6"
          />
        </svg>
      </div>

      {/* --------------------------------
          STEPS
      -------------------------------- */}

      <div className="concept-steps">
        {steps.map((step, index) => (
          <div
            key={step.number}
            ref={(el) => {
              stepRefs.current[index] = el;
            }}
            className={`concept-step step-${index + 1}`}
          >
            <div className="step-node">
              <span />
            </div>

            <div className="step-info">
              <span className="step-number">
                {step.number}
              </span>

              <span className="step-label">
                {step.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* --------------------------------
          CONTENT
      -------------------------------- */}

      <div className="concept-content">
        {steps.map((step, index) => (
          <div
            key={step.number}
            ref={(el) => {
              contentRefs.current[index] = el;
            }}
            className={`concept-copy copy-${index + 1}`}
          >
            <span className="copy-label">
              {step.label}
            </span>

            <h3>{step.title}</h3>

            <p>{step.text}</p>
          </div>
        ))}
      </div>

      {/* --------------------------------
          SIMPLE FOOTER
      -------------------------------- */}

      <div className="concept-footer">
        <span>IDEA</span>

        <div className="footer-line">
          <span />
          <span />
          <span />
        </div>

        <span>EXECUTION</span>
      </div>

      {/* --------------------------------
          MOBILE VERTICAL LINE
      -------------------------------- */}

      <div className="mobile-route-line">
        <div />
      </div>
    </section>
  );
}