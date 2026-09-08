import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import MagneticButton from "../MagneticButton";
import "./Services.css";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    title: "E-Commerce",
    subtitle: "Turn products into a digital business.",
    description:
      "High-converting storefronts, custom commerce experiences, payments, inventory, and scalable digital infrastructure.",
    tag: "SELL",
  },
  {
    number: "02",
    title: "Booking",
    subtitle: "Make every booking effortless.",
    description:
      "Smart booking platforms with availability, scheduling, payments, notifications, and automated workflows.",
    tag: "BOOK",
  },
  {
    number: "03",
    title: "ERP",
    subtitle: "Connect your entire operation.",
    description:
      "Centralized business systems that bring teams, data, inventory, finance, and operations into one connected platform.",
    tag: "OPERATE",
  },
  {
    number: "04",
    title: "AI",
    subtitle: "Add intelligence to the route.",
    description:
      "AI-powered products, automation, assistants, recommendations, and intelligent workflows built around your business.",
    tag: "ACCELERATE",
  },
];

function Services() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;

    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const getDistance = () => {
        return track.scrollWidth - window.innerWidth;
      };

      const horizontalScroll = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",

        scrollTrigger: {
          trigger: section,

          start: "top top",

          end: () => `+=${getDistance()}`,

          pin: true,

          scrub: 1,

          invalidateOnRefresh: true,

          onUpdate: (self) => {
            if (progress) {
              progress.style.transform =
                `scaleX(${self.progress})`;
            }
          },
        },
      });

      /*
       * Checkpoint animations
       */
      const panels = gsap.utils.toArray(
        ".service-panel"
      );

      panels.forEach((panel) => {
        gsap.fromTo(
          panel,
          {
            opacity: 0.35,
            scale: 0.94,
          },
          {
            opacity: 1,
            scale: 1,
            ease: "none",

            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizontalScroll,

              start: "left 80%",
              end: "left 40%",

              scrub: true,
            },
          }
        );
      });

      /*
       * Refresh after browser calculates widths.
       */
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="services-section"
      id="services"
    >
      <div className="services-header">
        <div>
          <span className="services-eyebrow">
            03 / SERVICES
          </span>

          <h2>
            Choose your
            <br />
            <span>route.</span>
          </h2>
        </div>

        <div className="services-header-right">
          <span>YOUR BUSINESS</span>

          <div className="route-status">
            <span className="status-dot" />
            ROUTE AVAILABLE
          </div>
        </div>
      </div>

      <div className="services-viewport">
        <div
          ref={trackRef}
          className="services-track"
        >
          {/* START */}

          <div className="service-start">
            <span className="start-label">
              START
            </span>

            <div className="start-node">
              <div className="start-core" />
            </div>

            <p>
              One route.
              <br />
              Multiple possibilities.
            </p>
          </div>

          {/* SERVICES */}

          {services.map((service, index) => (
            <article
              className="service-panel"
              key={service.title}
            >
              <div className="service-top">
                <span className="service-number">
                  {service.number}
                </span>

                <span className="service-tag">
                  {service.tag}
                </span>
              </div>

              <div className="service-content">
                <div className="service-checkpoint">
                  <span />
                </div>

                <div className="service-copy">
                  <span className="service-label">
                    ROUTE 0{index + 1}
                  </span>

                  <h3>{service.title}</h3>

                  <h4>{service.subtitle}</h4>

                  <p>
                    {service.description}
                  </p>

                  <MagneticButton
                    className="service-link"
                    strength={0.25}
                  >
                    Explore service
                  </MagneticButton>
                </div>
              </div>

              <div className="service-coordinates">
                <span>
                  LAT 10.{index + 21}4
                </span>

                <span>
                  LNG 76.{index + 38}2
                </span>
              </div>
            </article>
          ))}

          {/* END */}

          <div className="service-end">
            <span className="end-label">
              DESTINATION
            </span>

            <div className="end-node">
              <div />
            </div>

            <h3>
              Built for
              <br />
              growth.
            </h3>

            <span className="end-arrow">
              →
            </span>
          </div>
        </div>
      </div>

      {/* FOOTER */}

      <div className="services-footer">
        <div className="progress-track">
          <div
            ref={progressRef}
            className="progress-bar"
          />
        </div>

        <div className="scroll-hint">
          <span>SCROLL TO EXPLORE</span>
          <span>→</span>
        </div>

        <div className="service-count">
          04 <span>/ 04</span>
        </div>
      </div>
    </section>
  );
}

export default Services;