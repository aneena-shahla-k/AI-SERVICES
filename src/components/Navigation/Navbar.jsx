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
  const lastScrollY = useRef(0);
  const closeTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (mobileOpen) return;

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
        {/* Brand / Home */}
        <button
          type="button"
          className="ac-nav__brand"
          onClick={() => handleItemSelect("home")}
        >
          <span className="ac-nav__brand-name">AI CONCEPT</span>
          <span className="ac-nav__brand-badge">LLC</span>
        </button>

        {/* Desktop Links (4-Page Structure) */}
        <nav 
          ref={navLinksRef} 
          className="ac-nav__links"
          onMouseLeave={handleMouseLeaveNav}
        >
          <div ref={pillRef} className="ac-nav-active-pill" />

          {/* Page 1: Home */}
          <button
            type="button"
            className={`ac-nav__link-btn ${currentPage === "home" ? "active-link" : ""}`}
            onMouseEnter={handleItemHover}
            onClick={() => handleItemSelect("home")}
          >
            Home
          </button>

          {/* Page 3: Growth Plans */}
          <button
            type="button"
            className={`ac-nav__link-btn ${currentPage === "about" ? "active-link" : ""}`}
            onMouseEnter={handleItemHover}
            onClick={() => handleItemSelect("about")}
          >
            About
          </button>

          {/* Page 2: Solutions (with Dropdown) */}
          <div
            className="ac-nav__dropdown-wrap"
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <button
              type="button"
              className={`ac-nav__link-btn ac-nav__dropdown-trigger ${currentPage === "solutions" ? "active-link" : ""}`}
              onMouseEnter={handleItemHover}
              onClick={() => onNavigate("solutions")}
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
                      onClick={() => handleItemSelect("solutions", item.slug)}
                    >
                      <span className="ac-dropdown-dot" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>


          {/* Page 4: Project Details & Contact */}
          <button
            type="button"
            className={`ac-nav__link-btn ${currentPage === "contact" ? "active-link" : ""}`}
            onMouseEnter={handleItemHover}
            onClick={() => handleItemSelect("contact")}
          >
            Contact
          </button>
        </nav>

        {/* Right CTA */}
        <div className="ac-nav__right">
          <button
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

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="ac-mobile-drawer">
          <div className="ac-mobile-links">
            <button
              type="button"
              className={`ac-mobile-link ${currentPage === "home" ? "active" : ""}`}
              onClick={() => handleItemSelect("home")}
            >
              <span>Home</span>
            </button>
            <button
              type="button"
              className={`ac-mobile-link ${currentPage === "about" ? "active" : ""}`}
              onClick={() => handleItemSelect("about")}
            >
              <span>About</span>
            </button>

            {/* Mobile Solutions Accordion */}
            <div className="ac-mobile-accordion">
              <div className={`ac-mobile-link ac-mobile-accordion-row ${currentPage === "solutions" ? "active" : ""}`}>
                <span className="ac-mobile-link-text" onClick={() => handleItemSelect("solutions")}>
                  Solutions
                </span>
                <button 
                  type="button" 
                  className="ac-mobile-chevron-btn"
                  onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                >
                  <ChevronDown size={16} className={mobileSolutionsOpen ? "is-rotated" : ""} />
                </button>
              </div>

              {mobileSolutionsOpen && (
                <div className="ac-mobile-subitems">
                  {solutionItems.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="ac-mobile-sublink"
                      onClick={() => handleItemSelect("solutions", item.slug)}
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
              className={`ac-mobile-link ${currentPage === "contact" ? "active" : ""}`}
              onClick={() => handleItemSelect("contact")}
            >
              <span>Contact</span>
            </button>
          </div>

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