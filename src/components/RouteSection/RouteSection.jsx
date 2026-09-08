import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./RouteSection.css";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(
  ScrollTrigger,
  MotionPathPlugin
);

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Discover",
    text: "Understand your business, audience and growth direction.",
  },
  {
    number: "02",
    title: "Design",
    text: "Turn strategy into a clear digital experience.",
  },
  {
    number: "03",
    title: "Build",
    text: "Develop the software, platform and systems.",
  },
  {
    number: "04",
    title: "Launch",
    text: "Deploy, optimise and prepare your business for growth.",
  },
];

export default function RouteSection() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const dotRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const path = pathRef.current;
      const dot = dotRef.current;

      const length = path.getTotalLength();

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      gsap.to(dot, {
        motionPath: {
          path: path,
          align: path,
          autoRotate: false,
          alignOrigin: [0.5, 0.5],
        },
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      gsap.utils.toArray(".routeStep").forEach((step) => {
        gsap.fromTo(
          step,
          {
            opacity: 0.2,
            y: 80,
          },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: step,
              start: "top 75%",
              end: "top 45%",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="routeSection" ref={sectionRef}>

      <div className="routeVisual">

        <svg
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
        >
          <path
            ref={pathRef}
            className="routeBackground"
            d="
              M 50 900
              C 180 800,
                180 700,
                300 650
              C 430 600,
                380 470,
                520 420
              C 650 370,
                650 280,
                760 250
              C 850 220,
                850 130,
                950 80
            "
          />
        </svg>

        <div className="routeDot" ref={dotRef}>
          <span />
        </div>

      </div>

      <div className="routeIntro">
        <span>THE ROUTE</span>

        <h2>
          We don't drive
          <br />
          your business.
        </h2>

        <p>
          We give you the route, systems and technology
          to move it forward.
        </p>
      </div>

      <div className="routeSteps">

        {steps.map((step) => (
          <div className="routeStep" key={step.number}>

            <span className="stepNumber">
              {step.number}
            </span>

            <div>
              <h3>{step.title}</h3>

              <p>{step.text}</p>
            </div>

          </div>
        ))}

      </div>

    </section>
  );
}