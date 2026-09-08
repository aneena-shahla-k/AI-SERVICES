import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./FinalCTA.css";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef(null);
  const circleRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        circleRef.current,
        {
          scale: 0.2,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "center center",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="finalCTA"
      id="contact"
      ref={sectionRef}
    >
      <div
        className="destination"
        ref={circleRef}
      >
        DESTINATION
      </div>

      <p>ROUTE COMPLETE</p>

      <h2>
        Ready to
        <br />
        move?
      </h2>

      <button>
        Start your route →
      </button>

      <footer>
        <span>ROUTE.</span>
        <span>Digital systems for ambitious businesses.</span>
      </footer>
    </section>
  );
}