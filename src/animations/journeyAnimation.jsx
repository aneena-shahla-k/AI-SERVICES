import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initJourneyAnimations() {
  const sections = [
    "#hero",
    "#route",
    "#services",
    "#ai42",
    "#packages",
    "#final",
  ];

  sections.forEach((selector, index) => {
    const section = document.querySelector(selector);

    if (!section) return;

    const content =
      section.querySelector(
        "[data-section-content]"
      ) || section;

    /*
     * Don't animate Hero on initial load.
     */
    if (index !== 0) {
      gsap.fromTo(
        content,
        {
          opacity: 0.5,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          ease: "none",

          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 40%",
            scrub: true,
          },
        }
      );
    }
  });

  ScrollTrigger.refresh();
}