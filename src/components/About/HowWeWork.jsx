import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import "./HowWeWork.css";
import img1 from "../../assets/images/about/img1.png";
import img2 from "../../assets/images/about/img2.png";
import img3 from "../../assets/images/about/img3.png";
import img4 from "../../assets/images/about/img4.png";
import img5 from "../../assets/images/about/img5.png";

const steps = [
  {
    number: "01",
    title: "Discover",
    text: "Understand the idea, business, market, customers, and objectives.",
    image: img1,
  },
  {
    number: "02",
    title: "Design the Route",
    text: "Create the Growth Plan, business model, technology strategy, and marketing roadmap.",
    image: img2,
  },
  {
    number: "03",
    title: "Build",
    text: "Develop the website, app, e-commerce, booking system, ERP, AI, integrations, and other technology.",
    image: img3,
  },
  {
    number: "04",
    title: "Connect",
    text: "Connect the systems into one business ecosystem.",
    image: img4,
  },
  {
    number: "05",
    title: "Hand Over",
    text: "You receive the roadmap, technology, systems, and operating structure. You drive the business.",
    image: img5,
  },
];

const cardPositions = [
  { left: "15%", top: "18%" },
  { left: "35%", top: "7%" },
  { left: "55%", top: "20%" },
  { left: "74%", top: "6%" },
  { left: "90%", top: "18%" },
];

export default function HowWeWork() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);

  // Track scroll through the sticky container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const markerSvgX = useMotionValue(40);
  const markerSvgY = useMotionValue(390);

  const markerLeft = useTransform(
    markerSvgX,
    (value) => `${(value / 1600) * 100}%`
  );

  const markerTop = useTransform(
    markerSvgY,
    (value) => `${value}px`
  );

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const path = pathRef.current;
    if (!path) return;

    const totalLength = path.getTotalLength();
    const clampedProgress = Math.min(Math.max(progress, 0), 1);
    const distance = clampedProgress * totalLength;
    const point = path.getPointAtLength(distance);

    markerSvgX.set(point.x);
    markerSvgY.set(point.y);
  });

  return (
    <div ref={containerRef} className="how-work-sticky-wrapper">
      <section className="how-work">
        <div className="how-work-glow glow-one" />
        <div className="how-work-glow glow-two" />

        <div className="how-work-container">
          <div className="how-work-header">
            <div className="section-label">
              <span>HOW WE WORK</span>
            </div>

            <h2>
              From idea to
              <br />
              Execution
            </h2>

            <p>
              We follow a clear and strategic process to turn your vision
              <br />
              into a connected digital business.
            </p>
          </div>

          <div className="route-tags">
            <div className="route-tag active">
              <span className="tag-icon">⌘</span>
              Strategy
            </div>

            <span className="tag-dot">•</span>

            <div className="route-tag">
              <span className="tag-icon">⚙</span>
              Systems
            </div>

            <span className="tag-dot">•</span>

            <div className="route-tag">
              <span className="tag-icon">↗</span>
              Growth
            </div>
          </div>

          <div className="route-area">
            <div className="map-line map-line-1" />
            <div className="map-line map-line-2" />
            <div className="map-line map-line-3" />

            <svg
              className="route-svg"
              viewBox="0 0 1600 500"
              preserveAspectRatio="none"
            >
              <path
                className="route-glow"
                d="
                  M 40 390
                  C 180 390,
                    210 310,
                    360 350
                  S 560 450,
                    700 340
                  S 900 250,
                    1030 350
                  S 1240 430,
                    1370 320
                  S 1500 220,
                    1580 270
                "
              />

              <path
                ref={pathRef}
                className="route-road"
                d="
                  M 40 390
                  C 180 390,
                    210 310,
                    360 350
                  S 560 450,
                    700 340
                  S 900 250,
                    1030 350
                  S 1240 430,
                    1370 320
                  S 1500 220,
                    1580 270
                "
              />

              <path
                className="route-dashed"
                d="
                  M 40 390
                  C 180 390,
                    210 310,
                    360 350
                  S 560 450,
                    700 340
                  S 900 250,
                    1030 350
                  S 1240 430,
                    1370 320
                  S 1500 220,
                    1580 270
                "
              />
            </svg>

            {/* <div className="start-label">
              <span className="location-icon">●</span>
              
            </div> */}

            {/* MOVING LOCATION TAG PIN */}
            <motion.div
              className="route-location-tag"
              style={{
                left: markerLeft,
                top: markerTop,
              }}
            >
              <div className="tag-ripple-ring" />
              <div className="tag-pin-bubble">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="tag-pin-icon"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
                </svg>
                {/* <span>Live Route</span> */}
              </div>
              <div className="tag-pointer-tip" />
            </motion.div>

            {steps.map((step, index) => {
              // 5 cards mapped across progress 0.0 -> 1.0
              const center = 0.12 + index * 0.2;
              const range = 0.08;

              return (
                <StepCard
                  key={step.number}
                  step={step}
                  index={index}
                  progress={scrollYProgress}
                  center={center}
                  range={range}
                  position={cardPositions[index]}
                />
              );
            })}
          </div>

          <div className="route-progress">
            {steps.map((step, index) => (
              <ProgressDot
                key={step.number}
                index={index}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function StepCard({
  step,
  index,
  progress,
  center,
  range,
  position,
}) {
  const start = center - range;
  const peak = center;
  const end = center + range;

  // Fade in, hold fully visible afterwards
  const opacity = useTransform(
    progress,
    [Math.max(0, start - 0.06), start],
    [0.25, 1]
  );

  // Pop up and enlarge strongly when active
  const scale = useTransform(
    progress,
    [start, peak, end],
    [1, 1.08, 1]
  );

  const y = useTransform(
    progress,
    [start, peak, end],
    [0, -14, 0]
  );

  // Strong dynamic lighting / glowing shadow
  const cardShadow = useTransform(
    progress,
    [start, peak, end],
    [
      "0 14px 30px rgba(62, 139, 191, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
      "0 26px 55px rgba(19, 141, 224, 0.38), 0 0 30px rgba(19, 141, 224, 0.28), inset 0 1px 0 rgba(255, 255, 255, 1)",
      "0 14px 30px rgba(62, 139, 191, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
    ]
  );

  const borderGradient = useTransform(
    progress,
    [start, peak, end],
    [
      "rgba(255, 255, 255, 0.95)",
      "rgba(19, 141, 224, 0.95)",
      "rgba(255, 255, 255, 0.95)",
    ]
  );

  const innerGlowOpacity = useTransform(
    progress,
    [start, peak, end],
    [0, 1, 0]
  );

  const pinScale = useTransform(
    progress,
    [start, peak, end],
    [1, 1.45, 1]
  );

  return (
    <>
      <motion.div
        className={`route-pin pin-${index + 1}`}
        style={{
          left: position.left,
          top: "66%",
          scale: pinScale,
        }}
      >
        <span />
      </motion.div>

      <motion.article
        className={`work-card card-${index + 1}`}
        style={{
          left: position.left,
          top: position.top,
          opacity,
          scale,
          y,
          boxShadow: cardShadow,
          borderColor: borderGradient,
        }}
      >
        <motion.div
          className="card-active-glow"
          style={{ opacity: innerGlowOpacity }}
        />

        <div className="card-number">{step.number}</div>
        <h3>{step.title}</h3>
        <p>{step.text}</p>
        <div className="card-image">
          <img src={step.image} alt={step.title} />
        </div>
      </motion.article>
    </>
  );
}

function ProgressDot({ index, progress }) {
  const center = 0.12 + index * 0.2;

  const opacity = useTransform(
    progress,
    [center - 0.08, center, center + 0.08],
    [0.35, 1, 0.6]
  );

  const scale = useTransform(
    progress,
    [center - 0.08, center, center + 0.08],
    [0.9, 1.3, 1]
  );

  return (
    <motion.span
      className="progress-dot"
      style={{
        opacity,
        scale,
      }}
    />
  );
}