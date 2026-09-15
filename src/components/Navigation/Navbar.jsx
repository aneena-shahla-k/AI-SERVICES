import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import {
  NavLink,
  useNavigate,
} from "react-router-dom";
import gsap from "gsap";
import "./Navbar.css";


// =====================================================
// SOLUTION ITEMS
// =====================================================

const solutionItems = [
  {
    label: "Website Development",
    slug: "website-development",
  },
  {
    label: "E-Commerce",
    slug: "e-commerce",
  },
  {
    label: "App Development",
    slug: "app-development",
  },
  {
    label: "Booking Platforms",
    slug: "booking-platforms",
  },
  {
    label: "ERP Solutions",
    slug: "erp-solutions",
  },
  {
    label: "Custom Software",
    slug: "custom-software",
  },
  {
    label: "AI Solutions",
    slug: "ai-solutions",
  },
];


// =====================================================
// NAVBAR
// =====================================================

export default function Navbar({
  onOpenProject,
}) {

  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] =
    useState(false);

  const navRef = useRef(null);
  const navLinksRef = useRef(null);
  const pillRef = useRef(null);

  const lastScrollY = useRef(0);
  const closeTimeoutRef = useRef(null);


  // =====================================================
  // HIDE NAVBAR ON SCROLL DOWN
  // =====================================================

  useEffect(() => {

    const handleScroll = () => {

      const currentScroll = window.scrollY;

      if (mobileOpen) return;

      if (
        currentScroll > 50 &&
        currentScroll > lastScrollY.current
      ) {

        gsap.to(navRef.current, {
          y: -100,
          duration: 0.35,
          ease: "power2.out",
        });

      } else {

        gsap.to(navRef.current, {
          y: 0,
          duration: 0.35,
          ease: "power2.out",
        });

      }

      lastScrollY.current = currentScroll;
    };


    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );


    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };

  }, [mobileOpen]);


  // =====================================================
  // HOVER ACTIVE PILL
  // =====================================================

  const handleItemHover = (e) => {

    const link = e.currentTarget;

    if (
      !navLinksRef.current ||
      !pillRef.current
    ) {
      return;
    }

    const navBounds =
      navLinksRef.current.getBoundingClientRect();

    const linkBounds =
      link.getBoundingClientRect();


    gsap.to(pillRef.current, {
      opacity: 1,
      x: linkBounds.left - navBounds.left,
      width: linkBounds.width,
      duration: 0.25,
      ease: "power2.out",
    });

  };


  // =====================================================
  // REMOVE HOVER PILL
  // =====================================================

  const handleMouseLeaveNav = () => {

    if (!pillRef.current) return;

    gsap.to(pillRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
    });

  };


  // =====================================================
  // DROPDOWN
  // =====================================================

  const handleDropdownEnter = () => {

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    setDropdownOpen(true);
  };


  const handleDropdownLeave = () => {

    closeTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 280);

  };


  // =====================================================
  // NAVIGATE
  // =====================================================

  const goTo = (path) => {

    setMobileOpen(false);
    setDropdownOpen(false);
    setMobileSolutionsOpen(false);

    navigate(path);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  // =====================================================
  // SOLUTION
  // =====================================================

  const goToSolution = (slug) => {

    setMobileOpen(false);
    setDropdownOpen(false);
    setMobileSolutionsOpen(false);

    navigate(`/solutions/${slug}`);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  return (

    <header
      ref={navRef}
      className="ac-nav"
    >

      <div className="ac-nav__bar">


        {/* =================================================
            BRAND
        ================================================= */}

        <button
          type="button"
          className="ac-nav__brand"
          onClick={() => goTo("/")}
          aria-label="Go to home"
        >

          <span className="ac-nav__brand-name">
            AI CONCEPT
          </span>

          <span className="ac-nav__brand-badge">
            LLC
          </span>

        </button>


        {/* =================================================
            DESKTOP NAVIGATION
        ================================================= */}

        <nav
          ref={navLinksRef}
          className="ac-nav__links"
          onMouseLeave={handleMouseLeaveNav}
        >

          <div
            ref={pillRef}
            className="ac-nav-active-pill"
          />


          {/* HOME */}

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `ac-nav__link-btn ${
                isActive ? "active-link" : ""
              }`
            }
            onMouseEnter={handleItemHover}
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            Home
          </NavLink>


          {/* ABOUT */}

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `ac-nav__link-btn ${
                isActive ? "active-link" : ""
              }`
            }
            onMouseEnter={handleItemHover}
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            About
          </NavLink>


          {/* =================================================
              SOLUTIONS
          ================================================= */}

          <div
            className="ac-nav__dropdown-wrap"
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >

            <NavLink
              to="/solutions"
              className={({ isActive }) =>
                `ac-nav__link-btn ac-nav__dropdown-trigger ${
                  isActive ? "active-link" : ""
                }`
              }
              onMouseEnter={handleItemHover}
              onClick={() => goTo("/solutions")}
            >

              <span>
                Solutions
              </span>

              <ChevronDown
                size={13}
                className={`ac-dropdown-chevron ${
                  dropdownOpen
                    ? "is-rotated"
                    : ""
                }`}
              />

            </NavLink>


            {/* DROPDOWN */}

            {dropdownOpen && (

              <div
                className="ac-nav__dropdown-menu"
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >

                <div className="ac-dropdown-grid">

                  {solutionItems.map(
                    (item, idx) => (

                      <button
                        key={idx}
                        type="button"
                        className="ac-dropdown-item"
                        onClick={() =>
                          goToSolution(item.slug)
                        }
                      >

                        <span className="ac-dropdown-dot" />

                        <span>
                          {item.label}
                        </span>

                      </button>

                    )
                  )}

                </div>

              </div>

            )}

          </div>


          {/* CONTACT */}

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `ac-nav__link-btn ${
                isActive ? "active-link" : ""
              }`
            }
            onMouseEnter={handleItemHover}
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            Contact
          </NavLink>

        </nav>


        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div className="ac-nav__right">

          <button
            type="button"
            className="ac-nav__cta desktop-only-cta"
            onClick={onOpenProject}
          >

            <span>
              START A PROJECT
            </span>

            <ArrowUpRight size={14} />

          </button>


          {/* MOBILE MENU */}

          <button
            type="button"
            className="ac-nav__menu-btn"
            onClick={() =>
              setMobileOpen(!mobileOpen)
            }
            aria-label="Toggle menu"
          >

            {mobileOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}

          </button>

        </div>

      </div>


      {/* =================================================
          MOBILE DRAWER
      ================================================= */}

      {mobileOpen && (

        <div className="ac-mobile-drawer">

          <div className="ac-mobile-links">


            {/* HOME */}

            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `ac-mobile-link ${
                  isActive ? "active" : ""
                }`
              }
              onClick={() => {
                setMobileOpen(false);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              <span>
                Home
              </span>
            </NavLink>


            {/* ABOUT */}

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `ac-mobile-link ${
                  isActive ? "active" : ""
                }`
              }
              onClick={() => {
                setMobileOpen(false);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              <span>
                About
              </span>
            </NavLink>


            {/* =================================================
                MOBILE SOLUTIONS
            ================================================= */}

            <div className="ac-mobile-accordion">

              <div className="ac-mobile-accordion-row">

                <button
                  type="button"
                  className="ac-mobile-link ac-mobile-link-main"
                  onClick={() => goTo("/solutions")}
                >
                  <span>
                    Solutions
                  </span>
                </button>


                <button
                  type="button"
                  className="ac-mobile-chevron-btn"
                  onClick={() =>
                    setMobileSolutionsOpen(
                      !mobileSolutionsOpen
                    )
                  }
                  aria-label="Toggle solutions"
                >

                  <ChevronDown
                    size={16}
                    className={
                      mobileSolutionsOpen
                        ? "is-rotated"
                        : ""
                    }
                  />

                </button>

              </div>


              {/* SUB ITEMS */}

              {mobileSolutionsOpen && (

                <div className="ac-mobile-subitems">

                  {solutionItems.map(
                    (item, idx) => (

                      <button
                        key={idx}
                        type="button"
                        className="ac-mobile-sublink"
                        onClick={() =>
                          goToSolution(
                            item.slug
                          )
                        }
                      >

                        <span className="ac-dropdown-dot" />

                        <span>
                          {item.label}
                        </span>

                      </button>

                    )
                  )}

                </div>

              )}

            </div>


            {/* CONTACT */}

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `ac-mobile-link ${
                  isActive ? "active" : ""
                }`
              }
              onClick={() => {
                setMobileOpen(false);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >

              <span>
                Contact
              </span>

            </NavLink>

          </div>


          {/* MOBILE CTA */}

          <div className="ac-mobile-footer">

            <button
              type="button"
              className="ac-mobile-cta-btn"
              onClick={() => {
                setMobileOpen(false);

                if (onOpenProject) {
                  onOpenProject();
                }
              }}
            >

              <span>
                START A PROJECT
              </span>

              <ArrowUpRight size={15} />

            </button>

          </div>

        </div>

      )}

    </header>
  );
}