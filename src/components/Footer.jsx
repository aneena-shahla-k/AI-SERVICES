import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  ArrowUp,
  Globe2,
} from "lucide-react";
import "./Footer.css";

export default function Footer({ onOpenBooking, onOpenProject }) {
  const go = (selector) => {
    document
      .querySelector(selector)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleStartProject = () => {
    if (onOpenProject) {
      onOpenProject();
    }
  };

  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="fn-footer">

      {/* =====================================================
          FINAL CTA
      ===================================================== */}
      <section className="fn-cta">

        <div className="fn-cta__ambient fn-ambient-one" />
        <div className="fn-cta__ambient fn-ambient-two" />

        <div className="fn-cta__grid" />

        <motion.div
          className="fn-cta__content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >

          {/* Eyebrow */}
          <div className="fn-eyebrow">
            <span className="fn-eyebrow-line" />
            <span className="fn-eyebrow-dot" />
            <span>AI CONCEPT LLC</span>
            <span className="fn-eyebrow-line" />
          </div>

          {/* Heading */}
          <h2 className="fn-cta__title">
            Have An Idea?
            <br />

            <span className="fn-cta__title-accent">
              Let's Make It Real.
            </span>
          </h2>

          {/* Description */}
          <p className="fn-cta__lead">
            From strategy to technology, we build digital systems
            that turn ambitious ideas into measurable growth.
          </p>

          {/* CTA */}
          <button
            type="button"
            className="fn-btn-primary"
            onClick={handleStartProject}
          >
            <span>START A PROJECT</span>

            <span className="fn-btn-icon">
              <ArrowUpRight size={17} />
            </span>
          </button>

          {/* Small route statement */}
          <div className="fn-cta-route">
            <span className="fn-route-point" />
            <span>FROM KERALA</span>

            <span className="fn-route-dash">
              ─────────
            </span>

            <Globe2 size={13} />

            <span>TO THE WORLD</span>
            <span className="fn-route-point" />
          </div>

        </motion.div>
      </section>


      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}
      <div className="fn-footer__container">

        <div className="fn-footer__main">

          {/* =================================================
              BRAND
          ================================================= */}
          <div className="fn-footer__brand">

            <button
              type="button"
              className="fn-brand-logo"
              onClick={backToTop}
              aria-label="Back to top"
            >
              <span className="fn-brand-main">
                AI CONCEPT
              </span>

              <span className="fn-logo-sub">
                LLC
              </span>
            </button>

            <p className="fn-brand-desc">
              Building digital experiences,
              <br />
              software systems and intelligent
              <br />
              technology for ambitious businesses.
            </p>

            <div className="fn-location-badge">
              <span className="fn-location-icon">
                <MapPin size={13} />
              </span>

              <span>
                Calicut, Kerala, India
              </span>
            </div>

            <div className="fn-status">
              <span className="fn-status-dot" />
              <span>Digital systems studio</span>
            </div>

          </div>


          {/* =================================================
              FOOTER COLUMNS
          ================================================= */}
          <div className="fn-footer__columns">

            {/* Explore */}
            <div className="fn-col">

              <span className="fn-col-label">
                EXPLORE
              </span>

              <button
                type="button"
                onClick={() => go("#home")}
              >
                <span>Home</span>
                <ArrowUpRight size={12} />
              </button>

              <button
                type="button"
                onClick={() => go("#services")}
              >
                <span>Services</span>
                <ArrowUpRight size={12} />
              </button>

              <button
                type="button"
                onClick={() => go("#work")}
              >
                <span>Selected Works</span>
                <ArrowUpRight size={12} />
              </button>

              <button
                type="button"
                onClick={() => go("#reviews")}
              >
                <span>Reviews</span>
                <ArrowUpRight size={12} />
              </button>

              <button
                type="button"
                onClick={handleStartProject}
              >
                <span>Start Project</span>
                <ArrowUpRight size={12} />
              </button>

              {onOpenBooking && (
                <button
                  type="button"
                  onClick={onOpenBooking}
                >
                  <span>Book 1:1 Meet</span>
                  <ArrowUpRight size={12} />
                </button>
              )}

            </div>


            {/* Capabilities */}
            <div className="fn-col">

              <span className="fn-col-label">
                CAPABILITIES
              </span>

              <span>Web Platforms</span>
              <span>Digital Experiences</span>
              <span>Mobile Applications</span>
              <span>E-Commerce Systems</span>
              <span>Booking Engines</span>
              <span>AI & Automation</span>

            </div>


            {/* Direct Intake */}
            <div className="fn-col fn-direct">

              <span className="fn-col-label">
                DIRECT INTAKE
              </span>

              <a href="mailto:info@aiconcept.in">
                <span className="fn-contact-icon">
                  <Mail size={14} />
                </span>

                <span>
                  info@aiconcept.in
                </span>
              </a>

              <button
                type="button"
                onClick={handleStartProject}
              >
                <span className="fn-contact-icon">
                  <Phone size={14} />
                </span>

                <span>
                  Project Desk
                </span>
              </button>

              <div className="fn-base-pill">
                <span className="fn-green-dot" />

                <span>
                  Calicut Core Studio
                </span>
              </div>

            </div>

          </div>
        </div>


        {/* =================================================
            ROUTE DIVIDER
        ================================================= */}
        <div className="fn-footer-route">

          <div className="fn-route-line">
            <span className="fn-route-progress" />
          </div>

          <div className="fn-route-label fn-route-left">
            <span className="fn-route-marker" />
            <strong>KERALA</strong>
            <small>ORIGIN</small>
          </div>

          <div className="fn-route-center">

            <span />
            <span />
            <span />
            <span />
            <span />

          </div>

          <div className="fn-route-label fn-route-right">
            <small>DESTINATION</small>
            <strong>GLOBAL</strong>
            <span className="fn-route-marker" />
          </div>

        </div>


        {/* =================================================
            BOTTOM BAR
        ================================================= */}
        <div className="fn-footer__bottom">

          <span className="fn-copy">
            © {new Date().getFullYear()} AI CONCEPT LLC.
            ALL RIGHTS RESERVED.
          </span>

          <span className="fn-bottom-tag">
            BUILDING DIGITAL EXPERIENCES
          </span>

          <button
            type="button"
            className="fn-top-btn"
            onClick={backToTop}
          >
            <span>BACK TO TOP</span>

            <span className="fn-top-icon">
              <ArrowUp size={13} />
            </span>
          </button>

        </div>

      </div>
    </footer>
  );
}