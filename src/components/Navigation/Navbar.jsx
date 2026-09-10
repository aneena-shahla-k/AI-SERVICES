import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X, ChevronDown } from "lucide-react";
import gsap from "gsap";
import "./Navbar.css";

const solutionItems = [
  { label: "Website Development", slug: "website-development" },
  { label: "E-Commerce", slug: "e-commerce" },
  { label: "App Development", slug: "app-development" },
  { label: "Booking Platforms", slug: "booking-platforms" },
  { label: "ERP Solutions", slug: "erp-solutions" },
  { label: "Custom Software", slug: "custom-software" },
  { label: "AI Solutions", slug: "ai-solutions" },
];

export default function Navbar({ onOpenProject, onNavigate, currentPage = "home" }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  
  const navRef = useRef(null);
  const navLinksRef = useRef(null);
  const pillRef = useRef(null);
  const ctaRef = useRef(null);
  const lastScrollY = useRef(0);
  const closeTimeoutRef = useRef(null);

  // GSAP Auto-Hide on Scroll (Desktop only)
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (mobileOpen) return; // Don't hide navbar if mobile menu is open

      if (currentScroll > 50 && currentScroll > lastScrollY.current) {
        gsap.to(navRef.current, { y: -100, duration: 0.35, ease: "power2.out" });
      } else {
        gsap.to(navRef.current, { y: 0, duration: 0.35, ease: "power2.out" });
      }
      lastScrollY.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileOpen]);

  // Desktop Hover Pill
  const handleItemHover = (e) => {
    const link = e.currentTarget;
    if (!navLinksRef.current || !pillRef.current) return;
    const navBounds = navLinksRef.current.getBoundingClientRect();
    const linkBounds = link.getBoundingClientRect();

    gsap.to(pillRef.current, {
      opacity: 1,
      x: linkBounds.left - navBounds.left,
      width: linkBounds.width,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleMouseLeaveNav = () => {
    if (pillRef.current) {
      gsap.to(pillRef.current, { opacity: 0, duration: 0.25, ease: "power2.in" });
    }
  };

  const handleDropdownEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 280);
  };

  const handleItemSelect = (page, slug = null) => {
    setMobileOpen(false);
    setDropdownOpen(false);
    setMobileSolutionsOpen(false);

    if (onNavigate) {
      onNavigate(page, slug);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header ref={navRef} className="ac-nav">
      <div className="ac-nav__bar">
        {/* Brand */}
        <button
          type="button"
          className="ac-nav__brand"
          onClick={() => handleItemSelect("home")}
        >
          <span className="ac-nav__brand-name">AI CONCEPT</span>
          <span className="ac-nav__brand-badge">LLC</span>
        </button>

        {/* Desktop Navigation Links */}
        <nav 
          ref={navLinksRef} 
          className="ac-nav__links"
          onMouseLeave={handleMouseLeaveNav}
        >
          <div ref={pillRef} className="ac-nav-active-pill" />

          <button
            type="button"
            className={`ac-nav__link-btn ${currentPage === "home" ? "active-link" : ""}`}
            onMouseEnter={handleItemHover}
            onClick={() => handleItemSelect("home")}
          >
            Home
          </button>

          <button
            type="button"
            className={`ac-nav__link-btn ${currentPage === "growth-plans" ? "active-link" : ""}`}
            onMouseEnter={handleItemHover}
            onClick={() => handleItemSelect("growth-plans")}
          >
            Growth Plans
          </button>

          {/* Solutions Dropdown */}
          <div
            className="ac-nav__dropdown-wrap"
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <button
              type="button"
              className={`ac-nav__link-btn ac-nav__dropdown-trigger ${currentPage === "solution-detail" ? "active-link" : ""}`}
              onMouseEnter={handleItemHover}
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <span>Solutions</span>
              <ChevronDown size={13} className={`ac-dropdown-chevron ${dropdownOpen ? "is-rotated" : ""}`} />
            </button>

            {dropdownOpen && (
              <div 
                className="ac-nav__dropdown-menu"
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <div className="ac-dropdown-grid">
                  {solutionItems.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="ac-dropdown-item"
                      onClick={() => handleItemSelect("solution-detail", item.slug)}
                    >
                      <span className="ac-dropdown-dot" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            className={`ac-nav__link-btn ${currentPage === "ai" ? "active-link" : ""}`}
            onMouseEnter={handleItemHover}
            onClick={() => handleItemSelect("ai")}
          >
            AI
          </button>

          <button
            type="button"
            className={`ac-nav__link-btn ${currentPage === "industries" ? "active-link" : ""}`}
            onMouseEnter={handleItemHover}
            onClick={() => handleItemSelect("industries")}
          >
            Industries
          </button>

          <button
            type="button"
            className={`ac-nav__link-btn ${currentPage === "work" ? "active-link" : ""}`}
            onMouseEnter={handleItemHover}
            onClick={() => handleItemSelect("work")}
          >
            Our Work
          </button>

          <button
            type="button"
            className={`ac-nav__link-btn ${currentPage === "about" ? "active-link" : ""}`}
            onMouseEnter={handleItemHover}
            onClick={() => handleItemSelect("about")}
          >
            About
          </button>

          <button
            type="button"
            className={`ac-nav__link-btn ${currentPage === "contact" ? "active-link" : ""}`}
            onMouseEnter={handleItemHover}
            onClick={() => handleItemSelect("contact")}
          >
            Contact
          </button>
        </nav>

        {/* Right CTA (Desktop) & Mobile Toggle */}
        <div className="ac-nav__right">
          <button
            ref={ctaRef}
            type="button"
            className="ac-nav__cta desktop-only-cta"
            onClick={onOpenProject}
          >
            <span>START A PROJECT</span>
            <ArrowUpRight size={14} />
          </button>

          <button
            type="button"
            className="ac-nav__menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown Menu */}
      {mobileOpen && (
        <div className="ac-mobile-drawer">
          <div className="ac-mobile-links">
            <button
              type="button"
              className={`ac-mobile-link ${currentPage === "home" ? "active" : ""}`}
              onClick={() => handleItemSelect("home")}
            >
              Home
            </button>

            <button
              type="button"
              className={`ac-mobile-link ${currentPage === "growth-plans" ? "active" : ""}`}
              onClick={() => handleItemSelect("growth-plans")}
            >
              Growth Plans
            </button>

            {/* Mobile Solutions Accordion */}
            <div className="ac-mobile-accordion">
              <button
                type="button"
                className="ac-mobile-link ac-mobile-accordion-toggle"
                onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
              >
                <span>Solutions</span>
                <ChevronDown size={14} className={mobileSolutionsOpen ? "is-rotated" : ""} />
              </button>

              {mobileSolutionsOpen && (
                <div className="ac-mobile-subitems">
                  {solutionItems.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="ac-mobile-sublink"
                      onClick={() => handleItemSelect("solution-detail", item.slug)}
                    >
                      <span className="ac-dropdown-dot" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              className={`ac-mobile-link ${currentPage === "ai" ? "active" : ""}`}
              onClick={() => handleItemSelect("ai")}
            >
              AI
            </button>

            <button
              type="button"
              className={`ac-mobile-link ${currentPage === "industries" ? "active" : ""}`}
              onClick={() => handleItemSelect("industries")}
            >
              Industries
            </button>

            <button
              type="button"
              className={`ac-mobile-link ${currentPage === "work" ? "active" : ""}`}
              onClick={() => handleItemSelect("work")}
            >
              Our Work
            </button>

            <button
              type="button"
              className={`ac-mobile-link ${currentPage === "about" ? "active" : ""}`}
              onClick={() => handleItemSelect("about")}
            >
              About
            </button>

            <button
              type="button"
              className={`ac-mobile-link ${currentPage === "contact" ? "active" : ""}`}
              onClick={() => handleItemSelect("contact")}
            >
              Contact
            </button>
          </div>

          {/* START A PROJECT inside Mobile Drawer */}
          <div className="ac-mobile-footer">
            <button
              type="button"
              className="ac-mobile-cta-btn"
              onClick={() => {
                setMobileOpen(false);
                if (onOpenProject) onOpenProject();
              }}
            >
              <span>START A PROJECT</span>
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}