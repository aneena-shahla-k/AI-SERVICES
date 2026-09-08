import React, { useRef } from "react";
import gsap from "gsap";

import "./MagneticButton.css";

export default function MagneticButton({
  children = "Explore",
  onClick,
  className = "",
  strength = 0.35,
}) {
  const buttonRef = useRef(null);

  const handleMouseMove = (event) => {
    const button = buttonRef.current;

    if (!button) return;

    const rect = button.getBoundingClientRect();

    const x =
      event.clientX - (rect.left + rect.width / 2);

    const y =
      event.clientY - (rect.top + rect.height / 2);

    gsap.to(button, {
      x: x * strength,
      y: y * strength,
      duration: 0.35,
      ease: "power3.out",
      overwrite: true,
    });
  };

  const handleMouseLeave = () => {
    const button = buttonRef.current;

    if (!button) return;

    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.45)",
      overwrite: true,
    });
  };

  return (
    <button
      ref={buttonRef}
      className={`magnetic-button ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      type="button"
    >
      <span className="magnetic-button-text">
        {children}
      </span>

      <span className="magnetic-button-arrow">
        ↗
      </span>
    </button>
  );
}