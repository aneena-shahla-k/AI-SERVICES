import React, { useRef, useState, useEffect } from "react";
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

const desktopCardPositions = [
  { left: "15%", top: "18%" },
  { left: "35%", top: "7%" },
  { left: "55%", top: "20%" },
  { left: "74%", top: "6%" },
  { left: "90%", top: "18%" },
];

// റോഡിന്റെ വളവുകളിലുള്ള 5 കാർഡുകളുടെ കൃത്യമായ മൊബൈൽ പൊസിഷനുകൾ (മുകളിൽ നിന്ന് താഴേക്ക്)
const mobileCardPositions = [
  { left: "28%", top: "8%" },   // Step 1: മുകൾ ഭാഗത്ത് ഇടത്തോട്ട്
  { left: "70%", top: "26%" },  // Step 2: അടുത്ത വളവിൽ വലത്തോട്ട്
  { left: "26%", top: "45%" },  // Step 3: നടുവിലെ വളവിൽ ഇടത്തോട്ട്
  { left: "72%", top: "65%" },  // Step 4: താഴത്തെ വളവിൽ വലത്തോട്ട്
  { left: "34%", top: "84%" },  // Step 5: അവസാന ഭാഗത്ത്
];

export default function HowWeWork() {
  const containerRef = useRef(null);
  const desktopPathRef = useRef(null);
  const mobilePathRef = useRef(null);

  // Cache SVG path lengths once. Calling getTotalLength() on every
  // scroll frame can be expensive and has caused failures in some
  // Android WebViews.
  const desktopPathLengthRef = useRef(0);
  const mobilePathLengthRef = useRef(0);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 850);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    const cachePathLengths = () => {
      const desktopPath = desktopPathRef.current;
      const mobilePath = mobilePathRef.current;

      try {
        if (
          desktopPath &&
          typeof desktopPath.getTotalLength === "function"
        ) {
          const length = desktopPath.getTotalLength();
          desktopPathLengthRef.current =
            Number.isFinite(length) && length > 0 ? length : 0;
        }

        if (
          mobilePath &&
          typeof mobilePath.getTotalLength === "function"
        ) {
          const length = mobilePath.getTotalLength();
          mobilePathLengthRef.current =
            Number.isFinite(length) && length > 0 ? length : 0;
        }
      } catch (error) {
        console.warn("HowWeWork SVG animation disabled:", error);
        desktopPathLengthRef.current = 0;
        mobilePathLengthRef.current = 0;
      }
    };

    cachePathLengths();
    window.addEventListener("resize", cachePathLengths);

    return () => {
      window.removeEventListener("resize", cachePathLengths);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Desktop coordinates
  const desktopX = useMotionValue(40);
  const desktopY = useMotionValue(390);
  const desktopMarkerLeft = useTransform(desktopX, (val) => `${(val / 1600) * 100}%`);
  const desktopMarkerTop = useTransform(desktopY, (val) => `${val}px`);

  // Mobile coordinates (ViewBox: 360 x 850)
  const mobileX = useMotionValue(180);
  const mobileY = useMotionValue(30);
  const mobileMarkerLeft = useTransform(mobileX, (val) => `${(val / 360) * 100}%`);
  const mobileMarkerTop = useTransform(mobileY, (val) => `${(val / 850) * 100}%`);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const clampedProgress = Math.min(Math.max(progress, 0), 1);

    try {
      if (isMobile) {
        const path = mobilePathRef.current;
        const length = mobilePathLengthRef.current;

        if (
          !path ||
          !length ||
          typeof path.getPointAtLength !== "function"
        ) {
          return;
        }

        const point = path.getPointAtLength(
          clampedProgress * length
        );

        if (
          point &&
          Number.isFinite(point.x) &&
          Number.isFinite(point.y)
        ) {
          mobileX.set(point.x);
          mobileY.set(point.y);
        }
      } else {
        const path = desktopPathRef.current;
        const length = desktopPathLengthRef.current;

        if (
          !path ||
          !length ||
          typeof path.getPointAtLength !== "function"
        ) {
          return;
        }

        const point = path.getPointAtLength(
          clampedProgress * length
        );

        if (
          point &&
          Number.isFinite(point.x) &&
          Number.isFinite(point.y)
        ) {
          desktopX.set(point.x);
          desktopY.set(point.y);
        }
      }
    } catch (error) {
      // Keep the page usable if an Android browser cannot animate SVG paths.
      console.warn("HowWeWork path animation skipped:", error);
    }
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
              <br className="desktop-break" />
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

          {/* =========================================================
              DESKTOP VIEW
          ========================================================== */}
          {!isMobile && (
            <div className="route-area desktop-route-area">
              <div className="map-line map-line-1" />
              <div className="map-line map-line-2" />
              <div className="map-line map-line-3" />

              <svg
                className="route-svg desktop-route-svg"
                viewBox="0 0 1600 500"
                preserveAspectRatio="none"
              >
                <path
                  className="route-glow"
                  d="M 40 390 C 180 390, 210 310, 360 350 S 560 450, 700 340 S 900 250, 1030 350 S 1240 430, 1370 320 S 1500 220, 1580 270"
                />
                <path
                  ref={desktopPathRef}
                  className="route-road"
                  d="M 40 390 C 180 390, 210 310, 360 350 S 560 450, 700 340 S 900 250, 1030 350 S 1240 430, 1370 320 S 1500 220, 1580 270"
                />
                <path
                  className="route-dashed"
                  d="M 40 390 C 180 390, 210 310, 360 350 S 560 450, 700 340 S 900 250, 1030 350 S 1240 430, 1370 320 S 1500 220, 1580 270"
                />
              </svg>

              <motion.div
                className="route-location-tag"
                style={{
                  left: desktopMarkerLeft,
                  top: desktopMarkerTop,
                }}
              >
                <div className="tag-ripple-ring" />
                <div className="tag-pin-bubble">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="tag-pin-icon">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
                  </svg>
                </div>
                <div className="tag-pointer-tip" />
              </motion.div>

              {steps.map((step, index) => {
                const center = 0.12 + index * 0.2;
                const range = 0.08;
                return (
                  <DesktopStepCard
                    key={step.number}
                    step={step}
                    index={index}
                    progress={scrollYProgress}
                    center={center}
                    range={range}
                    position={desktopCardPositions[index]}
                  />
                );
              })}
            </div>
          )}

          {/* =========================================================
              MOBILE VIEW (5 CARDS ALONG THE FULL CURVED PATH)
          ========================================================== */}
          {isMobile && (
            <div className="mobile-stage-area">
              <svg
                className="mobile-stage-svg"
                viewBox="0 0 360 850"
                preserveAspectRatio="none"
              >
                <path
                  className="mobile-road-glow"
                  d="M 180 20 C 50 120, 50 200, 180 280 S 310 400, 180 500 S 50 630, 180 720 S 260 780, 180 835"
                />
                <path
                  ref={mobilePathRef}
                  className="mobile-road-base"
                  d="M 180 20 C 50 120, 50 200, 180 280 S 310 400, 180 500 S 50 630, 180 720 S 260 780, 180 835"
                />
                <path
                  className="mobile-road-dashed"
                  d="M 180 20 C 50 120, 50 200, 180 280 S 310 400, 180 500 S 50 630, 180 720 S 260 780, 180 835"
                />
              </svg>

              {/* LIVE MOVING PIN ON MOBILE */}
              <motion.div
                className="route-location-tag mobile-pin-tag"
                style={{
                  left: mobileMarkerLeft,
                  top: mobileMarkerTop,
                }}
              >
                <div className="tag-ripple-ring" />
                <div className="tag-pin-bubble">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="tag-pin-icon">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
                  </svg>
                </div>
                <div className="tag-pointer-tip" />
              </motion.div>

              {/* 5 CARDS DISTRIBUTED THROUGHOUT THE PATH */}
              {steps.map((step, index) => {
                const center = 0.12 + index * 0.2;
                const range = 0.08;
                return (
                  <MobileStepCard
                    key={step.number}
                    step={step}
                    progress={scrollYProgress}
                    center={center}
                    range={range}
                    position={mobileCardPositions[index]}
                  />
                );
              })}
            </div>
          )}

          {/* PROGRESS BOTTOM BAR */}
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

function DesktopStepCard({ step, index, progress, center, range, position }) {
  const start = center - range;
  const peak = center;
  const end = center + range;

  const opacity = useTransform(
    progress,
    [start - 0.04, start, peak, end, end + 0.04],
    [0, 1, 1, 1, 0.35]
  );

  const scale = useTransform(progress, [start, peak, end], [0.94, 1.06, 0.96]);
  const y = useTransform(progress, [start, peak, end], [8, -12, 6]);

  const cardShadow = useTransform(
    progress,
    [start, peak, end],
    [
      "0 10px 20px rgba(62, 139, 191, 0.05)",
      "0 26px 55px rgba(19, 141, 224, 0.38), 0 0 25px rgba(19, 141, 224, 0.25)",
      "0 10px 20px rgba(62, 139, 191, 0.05)",
    ]
  );

  const borderGradient = useTransform(
    progress,
    [start, peak, end],
    [
      "rgba(255, 255, 255, 0.7)",
      "rgba(19, 141, 224, 0.95)",
      "rgba(255, 255, 255, 0.7)",
    ]
  );

  const innerGlowOpacity = useTransform(progress, [start, peak, end], [0, 1, 0]);
  const pinScale = useTransform(progress, [start, peak, end], [0.8, 1.45, 0.8]);

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

/* MOBILE CARD COMPONENT WITH SPECIFIC POSITION ON THE PATH */
function MobileStepCard({ step, progress, center, range, position }) {
  const start = center - range;
  const peak = center;
  const end = center + range;

  // Pin അരികിൽ എത്തുമ്പോൾ മാത്രം Opacity 0 -> 1 -> 0
  const opacity = useTransform(
    progress,
    [start - 0.03, start + 0.01, peak, end - 0.01, end + 0.03],
    [0, 1, 1, 1, 0]
  );

  const scale = useTransform(progress, [start, peak, end], [0.9, 1.02, 0.9]);
  const y = useTransform(progress, [start, peak, end], [12, 0, -12]);
  const pointerEvents = useTransform(progress, [start, end], ["auto", "none"]);

  return (
    <motion.article
      className="work-card mobile-step-card"
      style={{
        left: position.left,
        top: position.top,
        opacity,
        scale,
        y,
        pointerEvents,
      }}
    >
      <div className="card-number">{step.number}</div>
      <h3>{step.title}</h3>
      <p>{step.text}</p>
      <div className="card-image">
        <img src={step.image} alt={step.title} />
      </div>
    </motion.article>
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