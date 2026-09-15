import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import "./CaseStudies.css";
import img1 from "../../assets/images/about/lumiere.png";
import img2 from "../../assets/images/about/honey.png";
import img3 from "../../assets/images/about/kitchen.png";
import img4 from "../../assets/images/about/nexora.png";
import img6 from "../../assets/images/about/lumiere.png";

const projects = [
  {
    id: 1,
    number: "01",
    category: "DIGITAL COMMERCE",
    title: "Lumière",
    subtitle: "A digital identity built around beauty.",
    year: "2026",
    location: "Global",
    image: img1,
    description:
      "A premium digital experience designed to make product discovery feel immersive, intuitive and refined.",
    services: ["UI / UX", "E-Commerce", "Motion"],
  },
  {
    id: 2,
    number: "02",
    category: "INTERIOR EXPERIENCE",
    title: "Kitchen Crafts",
    subtitle: "Where architecture becomes experience.",
    year: "2026",
    location: "Kerala, India",
    image: img3,
    description:
      "A visual platform bringing contemporary kitchen design, materials and technology together.",
    services: ["Web Experience", "3D", "Configurator"],
  },
  {
    id: 4,
    number: "04",
    category: "BRAND EXPERIENCE",
    title: "Nexora",
    subtitle: "A new language for modern brands.",
    year: "2026",
    location: "Global",
    image: img4,
    description:
      "A flexible digital identity created for a modern technology-led brand.",
    services: ["Brand Strategy", "Web Design", "Motion"],
  },
  {
    id: 5,
    number: "05",
    category: "NATURAL BRAND",
    title: "Wayanad Premium",
    subtitle: "Architecture presented differently.",
    year: "2026",
    location: "Kerala, India",
    image: img2,
    description:
      "A cinematic property experience designed to make architecture feel tangible online.",
    services: ["Web Design", "Interaction", "Development"],
  },
  {
    id: 6,
    number: "06",
    category: "DIGITAL PRODUCT",
    title: "Orbit",
    subtitle: "Technology with a human centre.",
    year: "2026",
    location: "Global",
    image: img6,
    description:
      "A clean product experience built around simplicity, movement and intuitive interaction.",
    services: ["Product Design", "UX", "Development"],
  },
];

export default function CaseStudies() {
  const [activeIndex, setActiveIndex] = useState(0);

  const filmRef = useRef(null);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);
  const isDragging = useRef(false);

  const project = projects[activeIndex];

  const nextProject = () => {
    setActiveIndex((current) => Math.min(current + 1, projects.length - 1));
  };

  const previousProject = () => {
    setActiveIndex((current) => Math.max(current - 1, 0));
  };

  const selectProject = (index) => {
    setActiveIndex(index);
  };

  /* --------------------------------
     KEEP ACTIVE CARD VISIBLE WITHOUT BLANK SPACE
  -------------------------------- */
  useEffect(() => {
    if (!filmRef.current) return;

    const cards = filmRef.current.querySelectorAll(".case-studies__film-item");
    const activeCard = cards[activeIndex];

    if (!activeCard) return;

    const container = filmRef.current;
    const maxScroll = container.scrollWidth - container.clientWidth;

    // Calculate position without going past maxScroll
    const cardLeft = activeCard.offsetLeft;
    const targetScroll = Math.max(0, Math.min(cardLeft - 22, maxScroll));

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  }, [activeIndex]);

  /* --------------------------------
     PREVENT SAFARI & TRACKPAD OVERFLOW ON WHEEL
  -------------------------------- */
  useEffect(() => {
    const el = filmRef.current;
    if (!el) return;

    const onWheel = (e) => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) return;

      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;

      // Prevent scrolling past the edges (0 and maxScroll)
      if (
        (el.scrollLeft <= 0 && delta < 0) ||
        (el.scrollLeft >= maxScroll && delta > 0)
      ) {
        return; // Allows normal page scroll instead of blank horizontal overflow
      }

      e.preventDefault();
      el.scrollLeft = Math.max(0, Math.min(el.scrollLeft + delta, maxScroll));
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  /* --------------------------------
     MOUSE DRAG
  -------------------------------- */
  const handlePointerDown = (event) => {
    if (!filmRef.current) return;

    isDragging.current = true;
    dragStartX.current = event.clientX;
    scrollStartX.current = filmRef.current.scrollLeft;
    filmRef.current.classList.add("is-dragging");
  };

  const handlePointerMove = (event) => {
    if (!isDragging.current || !filmRef.current) return;

    const distance = event.clientX - dragStartX.current;
    const maxScroll = filmRef.current.scrollWidth - filmRef.current.clientWidth;

    const nextScroll = scrollStartX.current - distance;
    filmRef.current.scrollLeft = Math.max(0, Math.min(nextScroll, maxScroll));
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    if (filmRef.current) {
      filmRef.current.classList.remove("is-dragging");
    }
  };

  /* --------------------------------
     KEYBOARD
  -------------------------------- */
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") nextProject();
      if (event.key === "ArrowLeft") previousProject();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="case-studies" id="case-studies">
      {/* HEADER */}
      <div className="case-studies__header">
        <div className="case-studies__eyebrow">
          <span className="case-studies__line" />
          <span>SELECTED WORK</span>
        </div>

        <div className="case-studies__count">
          <strong>
            {project.number}
            <i>/</i>
            {String(projects.length).padStart(2, "0")}
          </strong>
        </div>
      </div>

      {/* TITLE */}
      <div className="case-studies__heading">
        <div>
          <h2>
            Work that speaks
            <br />
            <em>for itself.</em>
          </h2>
        </div>

        <p>
          A collection of digital experiences, identities and products created
          with clarity and intention.
        </p>
      </div>

      {/* FILM ROLL */}
      <div className="case-studies__film">
        <div className="case-studies__sprockets">
          {Array.from({ length: 50 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>

        {/* FILM TRACK WINDOW */}
        <div
          className="case-studies__film-window"
          ref={filmRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <div className="case-studies__film-track">
            {projects.map((item, index) => (
              <button
                type="button"
                key={item.id}
                className={`case-studies__film-item ${
                  index === activeIndex ? "active" : ""
                }`}
                onClick={() => selectProject(index)}
              >
                <div className="case-studies__frame-header">
                  <span>FRAME {item.number}</span>
                  <span>{item.year}</span>
                </div>

                <div className="case-studies__frame-image">
                  <img src={item.image} alt={item.title} draggable="false" />
                  <div className="case-studies__image-overlay" />
                  <span className="case-studies__category">{item.category}</span>
                  <span className="case-studies__project-name">{item.title}</span>

                  {index === activeIndex && (
                    <motion.span
                      className="case-studies__active-dot"
                      layoutId="case-active-dot"
                    />
                  )}
                </div>

                <div className="case-studies__frame-footer">
                  <span>{item.number}</span>
                  <strong>{item.title}</strong>
                  <ArrowUpRight size={13} />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="case-studies__sprockets">
          {Array.from({ length: 50 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>
      </div>

      {/* CONTROLS */}
      <div className="case-studies__controls">
        <div className="case-studies__scroll-hint">
          <span />
          <p>DRAG TO EXPLORE</p>
        </div>

        <div className="case-studies__buttons">
          <button
            type="button"
            onClick={previousProject}
            disabled={activeIndex === 0}
            className={activeIndex === 0 ? "disabled" : ""}
            aria-label="Previous project"
          >
            <ArrowLeft size={15} />
          </button>

          <button
            type="button"
            onClick={nextProject}
            disabled={activeIndex === projects.length - 1}
            className={activeIndex === projects.length - 1 ? "disabled" : ""}
            aria-label="Next project"
          >
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* DETAILS */}
      <div className="case-studies__details">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            className="case-studies__details-content"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="case-studies__details-main">
              <div className="case-studies__details-label">
                <span>{project.number}</span>
                <span className="case-studies__details-line" />
                <span>{project.category}</span>
              </div>

              <h3>{project.title}</h3>
              <p className="case-studies__details-subtitle">{project.subtitle}</p>
            </div>

            <div className="case-studies__details-middle">
              <p>{project.description}</p>
            </div>

            <div className="case-studies__details-meta">
              <div>
                <span>YEAR</span>
                <strong>{project.year}</strong>
              </div>

              <div>
                <span>LOCATION</span>
                <strong>{project.location}</strong>
              </div>

              <div className="case-studies__services">
                <span>SERVICES</span>
                <div>
                  {project.services.map((service) => (
                    <b key={service}>{service}</b>
                  ))}
                </div>
              </div>
            </div>

            <button type="button" className="case-studies__view">
              <span>VIEW PROJECT</span>
              <ArrowUpRight size={15} />
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}