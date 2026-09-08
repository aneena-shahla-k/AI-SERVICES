import { useEffect, useRef, useState } from "react";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AI42.css";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  "DISCOVER",
  "DESIGN",
  "DEVELOP",
  "TEST",
  "LAUNCH",
];

export default function AI42() {
  const sectionRef = useRef(null);
  const timerRef = useRef(null);

  const [hours, setHours] = useState(42);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHours((current) => {
        if (current <= 24) return 42;
        return current - 0.01;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,

        onUpdate: (self) => {
          const progress = self.progress;

          setActiveStage(
            Math.min(
              stages.length - 1,
              Math.floor(progress * stages.length)
            )
          );

          gsap.to(timerRef.current, {
            scale: 1 + progress * 0.3,
            duration: 0.2,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="aiSection" ref={sectionRef}>
      <div className="aiSticky">
        <div className="aiHeader">
          <span>AI-POWERED DELIVERY</span>

          <h2>
            From idea
            <br />
            to launch.
          </h2>
        </div>

        <div className="timer" ref={timerRef}>
          <small>BUILD TIME</small>

          <strong>
            {hours.toFixed(2)}
          </strong>

          <span>HOURS</span>
        </div>

        <div className="aiStages">
          {stages.map((stage, index) => (
            <div
              className={index <= activeStage ? "active" : ""}
              key={stage}
            >
              <span>0{index + 1}</span>
              {stage}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}