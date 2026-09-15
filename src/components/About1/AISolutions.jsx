import React, { useState } from "react";
import {
  Cpu,
  MessageSquare,
  Bot,
  Headphones,
  TrendingUp,
  Workflow,
  Sparkles,
  FileText,
  BarChart3,
  PenTool,
  GitBranch,
  LayoutGrid,
  Plug,
  Brain,
  Code2,
  ArrowRight,
  X,
} from "lucide-react";

import "./AISolutions.css";

// IMPORTANT:
// Change this path if your robot image is stored somewhere else.
import robotImg from "../../assets/images/about/ai-robot.png";

const SERVICES = [
  {
    label: "AI-powered business software",
    icon: Cpu,
    top: 8,
    left: 28,
    desc: "Tailored software that embeds AI into your core operations.",
  },
  {
    label: "AI chatbots",
    icon: MessageSquare,
    top: 5,
    left: 54,
    desc: "Conversational assistants that answer questions and guide users instantly.",
  },
  {
    label: "AI agents",
    icon: Bot,
    top: 14,
    left: 80,
    desc: "Autonomous agents that complete multi-step tasks on their own.",
  },
  {
    label: "AI customer support",
    icon: Headphones,
    top: 27,
    left: 12,
    desc: "AI that resolves support tickets and queries around the clock.",
  },
  {
    label: "AI sales assistants",
    icon: TrendingUp,
    top: 30,
    left: 90,
    desc: "Smart assistants that qualify leads and support your sales team.",
  },
  {
    label: "AI automation",
    icon: Workflow,
    top: 39,
    left: 34,
    desc: "Automate repetitive workflows so your team can focus on what matters.",
  },
  {
    label: "AI recommendation systems",
    icon: Sparkles,
    top: 41,
    left: 60,
    desc: "Personalized recommendations that boost engagement and revenue.",
  },
  {
    label: "AI document processing",
    icon: FileText,
    top: 49,
    left: 84,
    desc: "Extract, classify, and process documents automatically.",
  },
  {
    label: "AI analytics",
    icon: BarChart3,
    top: 54,
    left: 18,
    desc: "Turn raw data into clear, actionable business insights.",
  },
  {
    label: "AI content systems",
    icon: PenTool,
    top: 59,
    left: 47,
    desc: "Generate and manage content at scale with AI.",
  },
  {
    label: "AI workflow automation",
    icon: GitBranch,
    top: 63,
    left: 71,
    desc: "Connect tools and automate multi-step business processes.",
  },
  {
    label: "Custom AI platforms",
    icon: LayoutGrid,
    top: 71,
    left: 90,
    desc: "Purpose-built AI platforms designed around your business.",
  },
  {
    label: "AI integrations",
    icon: Plug,
    top: 77,
    left: 30,
    desc: "Connect AI capabilities into your existing tools and systems.",
  },
  {
    label: "Machine learning solutions",
    icon: Brain,
    top: 84,
    left: 56,
    desc: "Predictive models trained on your unique business data.",
  },
  {
    label: "AI Development",
    icon: Code2,
    top: 90,
    left: 78,
    desc: "End-to-end AI development from prototype to production.",
  },
];

export default function AISolutionsSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const active =
    activeIndex !== null ? SERVICES[activeIndex] : null;

  const toggle = (index) => {
    setActiveIndex((current) =>
      current === index ? null : index
    );
  };

  return (
    <section className="ai-section">
      <div className="ai-inner">

        {/* =========================
            LEFT CONTENT
        ========================== */}
        <div className="copy-col">

          <div className="eyebrow">
            <span className="eyebrow-dot" />
            AI-POWERED SOLUTIONS
          </div>

          <h2>
            AI Solutions
            <span className="heading-gradient"> built for business.</span>
          </h2>

          <p className="lede">
            We don&apos;t just add AI. We build AI into the business.
          </p>

          <div className="subblock">
            <div className="subblock-line" />

            <div>
              <h3>AI Software Development</h3>

              <p>
                Custom AI systems designed around your business data,
                workflows, customers, and operations.
              </p>
            </div>
          </div>

          <button className="cta" type="button">
            <span>Explore AI Solutions</span>

            <span className="cta-icon">
              <ArrowRight size={16} />
            </span>
          </button>

          <div className="service-count">
            <span>15+</span>
            AI capabilities
          </div>
        </div>


        {/* =========================
            RIGHT AI STAGE
        ========================== */}
        <div
          className={`stage ${
            active ? "has-active" : ""
          }`}
        >

          {/* Soft decorative background */}
          <div className="stage-glow stage-glow-one" />
          <div className="stage-glow stage-glow-two" />

          {/* Grid */}
          <div className="stage-grid" />

          {/* Robot */}
          <img
            src={robotImg}
            alt="AI Robot representing AI solutions"
            className="robot-image"
          />

          {/* Floating light */}
          <div className="robot-light" />

          {/* Service chips */}
          {SERVICES.map((service, index) => {
            const Icon = service.icon;

            const isActive =
              index === activeIndex;

            return (
              <button
                key={service.label}
                type="button"
                className={`chip ${
                  isActive ? "active" : ""
                }`}
                style={{
                  top: `${service.top}%`,
                  left: `${service.left}%`,
                  "--delay": `${index * 0.12}s`,
                }}
                onClick={() => toggle(index)}
                aria-pressed={isActive}
              >
                <span className="icon-dot">
                  <Icon size={12} strokeWidth={2.2} />
                </span>

                <span className="chip-label">
                  {service.label}
                </span>

                <span className="chip-arrow">
                  <ArrowRight size={11} />
                </span>
              </button>
            );
          })}


          {/* Hint */}
          {!active && (
            <div className="hint">
              <span className="hint-pulse" />
              Click any capability to explore
            </div>
          )}


          {/* =========================
              ACTIVE DETAIL CARD
          ========================== */}
          {active && (
            <div
              className="detail"
              role="dialog"
              aria-label={active.label}
            >

              <div className="detail-icon">
                {React.createElement(active.icon, {
                  size: 19,
                  strokeWidth: 2,
                })}
              </div>

              <div className="detail-body">
                <div className="detail-tag">
                  AI CAPABILITY
                </div>

                <h4>{active.label}</h4>

                <p>{active.desc}</p>
              </div>

              <button
                className="detail-close"
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}