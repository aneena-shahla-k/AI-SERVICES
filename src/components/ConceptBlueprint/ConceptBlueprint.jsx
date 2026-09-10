import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ConceptBlueprint.css";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    id: "concept",
    number: "01",
    tag: "DISCOVERY LAYER",
    title: "Your Concept.",
    sub: "You identify the opportunity.",
    desc: "Every enterprise transformation starts with a raw business model, market opportunity, or friction point waiting to be solved.",
    status: "STATUS // IDEA MAPPED",
    metrics: "LATENCY: ~20ms",
    badge: "IDEA",
    specs: ["Market Strategy", "Product Architecture", "Revenue Vectors"]
  },
  {
    id: "blueprint",
    number: "02",
    tag: "ENGINEERING ROUTE",
    title: "Our Blueprint.",
    sub: "We design the connected systems.",
    desc: "We turn raw ideas into an integrated infrastructure roadmap: API topologies, data pipelines, automated CRM, and scalable cloud networks.",
    status: "STATUS // SYSTEMS CONNECTED",
    metrics: "INTEGRITY: 99.98%",
    badge: "SCHEMATIC",
    specs: ["Microservices", "Data Contracts", "Event Automation"]
  },
  {
    id: "execution",
    number: "03",
    tag: "DEPLOYMENT CORE",
    title: "Your Execution.",
    sub: "You drive. We build the engine.",
    desc: "We deliver the high-velocity software, AI automation pipelines, and analytics telemetry so you can operate and capture the market.",
    status: "STATUS // PRODUCTION READY",
    metrics: "THROUGHPUT: REALTIME",
    badge: "RUNTIME",
    specs: ["Autonomous Agents", "ERP Pipelines", "Growth Telemetry"]
  }
];

export default function ConceptBlueprint() {
  const [activeStage, setActiveStage] = useState(0);
  const containerRef = useRef(null);
  const routeLineRef = useRef(null);
  const glowDotRef = useRef(null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    const route = routeLineRef.current;
    const dot = glowDotRef.current;
    if (!el || !route || !dot) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth <= 860;
      const totalLen = route.getTotalLength();

      gsap.set(route, {
        strokeDasharray: totalLen,
        strokeDashoffset: totalLen
      });

      if (!isMobile) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=2200",
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            onUpdate: (self) => {
              const p = self.progress;
              const idx = Math.min(Math.floor(p * 3), 2);
              setActiveStage(idx);

              const point = route.getPointAtLength(totalLen * p);
              gsap.set(dot, {
                attr: { cx: point.x, cy: point.y },
                opacity: 1
              });
            }
          }
        });

        tl.to(route, { strokeDashoffset: 0, ease: "none", duration: 1 });
      } else {
        // Mobile simple path draw
        gsap.to(route, {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            end: "bottom 80%",
            scrub: 1
          }
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="cb-container" id="blueprint">
      {/* Background Ambience & Tech Grid */}
      <div className="cb-grid-bg" />
      <div className="cb-glow-radial" />

      {/* Top Meta Bar */}
      <div className="cb-topbar">
        <div className="cb-meta-tag">
          <span className="cb-status-beacon" />
          <span className="font-mono">INFRASTRUCTURE ROUTE SPECIFICATION</span>
        </div>
        <div className="cb-meta-actions">
          <span className="font-mono text-subText">COORD // 11.2588° N, 75.7804° E</span>
        </div>
      </div>

      {/* Main Section Header */}
      <div className="cb-header">
        <span className="cb-eyebrow">BLUEPRINT ARCHITECTURE</span>
        <h2 className="cb-title">
          Your Concept. <br />
          <span className="text-gradient">Our Blueprint.</span>
        </h2>
      </div>

      {/* Interactive Schematic Board */}
      <div className="cb-board">
        {/* SVG Route Circuit Line */}
        <svg
          className="cb-circuit-svg"
          viewBox="0 0 1200 450"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="routeGlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3A82FF" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#3A82FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#5C9DFF" stopOpacity="1" />
            </linearGradient>
            <filter id="neonFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Static structural trace */}
          <path
            className="cb-trace-base"
            d="M 120,330 C 260,330 310,120 540,120 C 760,120 830,340 1080,240"
          />

          {/* Secondary parallel fiber trace */}
          <path
            className="cb-trace-secondary"
            d="M 120,345 C 270,345 320,135 540,135 C 750,135 840,355 1080,255"
          />

          {/* Active Animated Glow Path */}
          <path
            ref={routeLineRef}
            className="cb-trace-active"
            d="M 120,330 C 260,330 310,120 540,120 C 760,120 830,340 1080,240"
            filter="url(#neonFilter)"
          />

          {/* Moving GPS Waypoint Dot */}
          <circle
            ref={glowDotRef}
            cx="120"
            cy="330"
            r="8"
            className="cb-glow-marker"
          />
        </svg>

        {/* 3 Hardware Milestone Nodes */}
        <div className="cb-nodes-layer">
          {stages.map((stage, idx) => {
            const isActive = activeStage === idx;
            return (
              <div
                key={stage.id}
                onClick={() => setActiveStage(idx)}
                className={`cb-node-card cb-node-${idx + 1} ${isActive ? "active" : ""}`}
              >
                {/* Micro Node Terminal Badge */}
                <div className="cb-node-telemetry">
                  <span className="cb-node-badge">{stage.badge}</span>
                  <span className="cb-node-metrics">{stage.metrics}</span>
                </div>

                {/* Center Node Core */}
                <div className="cb-node-core">
                  <div className="cb-core-outer">
                    <div className="cb-core-inner">
                      <span className="cb-core-idx">{stage.number}</span>
                    </div>
                  </div>
                  <div className="cb-node-heading">
                    <span className="cb-node-tag">{stage.tag}</span>
                    <h3 className="cb-node-title">{stage.title}</h3>
                  </div>
                </div>

                {/* Sub specs */}
                <div className="cb-node-specs">
                  {stage.specs.map((item, i) => (
                    <span key={i} className="cb-spec-pill">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="cb-node-status">
                  <span className="cb-status-dot" />
                  <span>{stage.status}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>      
    </section>
  );
}