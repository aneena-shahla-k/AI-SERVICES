import React, { useEffect, useState } from "react";
import "./TimeModel.css";

const timeOptions = [
  {
    id: 1,
    hours: 24,
    title: "Rapid Route",
    description: "For urgent needs and MVPs.",
    subtext: "Get to market, fast.",
  },
  {
    id: 2,
    hours: 48,
    title: "Accelerated Route",
    description: "For complex features and",
    subtext: "business-critical solutions.",
  },
  {
    id: 3,
    hours: 72,
    title: "Extended Route",
    description: "For large-scale projects and",
    subtext: "multi-system integrations.",
  },
  {
    id: 4,
    hours: null,
    title: "Your Route",
    description: "Tailored to your goals,",
    subtext: "timeline and complexity.",
  },
];

const stats = [
  { number: "6", label: "Core Systems", icon: "◉" },
  { number: "100+", label: "Projects Delivered", icon: "▦" },
  { number: "50+", label: "Happy Clients", icon: "♧" },
  { number: "98%", label: "Client Satisfaction", icon: "☆" },
];

function TimeModel() {
  const [selectedHours, setSelectedHours] = useState(24);
  const [hourlyRate, setHourlyRate] = useState(50);
  const [customHours, setCustomHours] = useState(24);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((previous) => {
        let { hours, minutes, seconds } = previous;

        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            hours = hours > 0 ? hours - 1 : 23;
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const activeHours = selectedHours === "custom" ? customHours : selectedHours;
  const estimatedValue = hourlyRate * activeHours;
  const formatTime = (value) => String(value).padStart(2, "0");

  const getCarProgressOffset = () => {
    if (selectedHours === 24) return "8%";
    if (selectedHours === 48) return "36%";
    if (selectedHours === 72) return "64%";
    return "90%";
  };

  return (
    <section className="tm-section" id="time-model">
      <div className="tm-container">

        {/* Section heading */}
        <div className="tm-heading-wrapper">
          <div className="tm-eyebrow">
            <span>04</span>
            <i />
            <span>TIME MODEL</span>
          </div>

          <div className="tm-heading-top-row">
            <div className="tm-heading-content">
              <h2>
                Choose your
                <br />
                <em>development</em> time.
              </h2>
              <p className="tm-heading-subtitle">
                Your route. Your hours. Your build.
              </p>
            </div>

            <div className="tm-heading-note">
              <p>Flexible development time, built around your goals.</p>
              <p>
                Choose the pace that fits your business needs —
                <br />
                and let's turn your idea into a real solution.
              </p>
            </div>

            <div className="tm-heading-badge">
              <span className="tm-target-icon">◎</span>
              <div>
                <strong>FASTER EXECUTION.</strong>
                <strong>BIGGER POSSIBILITIES.</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Time selection cards */}
        <div className="tm-options-grid">
          {timeOptions.map((option) => {
            const isCustom = option.hours === null;
            const isActive = selectedHours === option.hours || (isCustom && selectedHours === "custom");

            return (
              <button
                type="button"
                key={option.id}
                className={`tm-option-card ${isActive ? "active" : ""}`}
                onClick={() => {
                  setSelectedHours(isCustom ? "custom" : option.hours);
                  if (isCustom && selectedHours !== "custom") setCustomHours(96);
                }}
              >
                <div className="tm-option-top">
                  <span>0{option.id}</span>
                  <span className="tm-option-radio">
                    {isActive && <span />}
                  </span>
                </div>

                <div className="tm-option-hours">
                  {isCustom ? (
                    <span className="tm-custom-label">CUSTOM</span>
                  ) : (
                    <>
                      <strong>{option.hours}</strong>
                      <span>HOURS</span>
                    </>
                  )}
                </div>

                {isCustom && <small className="tm-custom-hours">HOURS</small>}

                <h3>{option.title}</h3>
                <p>{option.description}</p>
                <p>{option.subtext}</p>

                <span className="tm-option-arrow">→</span>
              </button>
            );
          })}
        </div>

        {/* Main route and calculator */}
        <div className="tm-route-layout">

          {/* Countdown card */}
          <div className="tm-countdown-card">
            <span className="tm-countdown-label">DEVELOPMENT STARTS IN</span>

            <div className="tm-countdown-time">
              {formatTime(timeLeft.hours)}:
              {formatTime(timeLeft.minutes)}:
              {formatTime(timeLeft.seconds)}
            </div>

            <div className="tm-countdown-units">
              <span>HOURS</span>
              <span>MINUTES</span>
              <span>SECONDS</span>
            </div>

            <div className="tm-active-route-label">
              <span className="tm-green-dot" />
              {selectedHours === "custom" ? "CUSTOM" : selectedHours}-HOUR ROUTE ACTIVE
            </div>

            <div className="tm-countdown-divider" />

            <div className="tm-progress-layout">
              <div
                className="tm-progress-circle"
                style={{
                  "--progress": `${Math.min((3 / activeHours) * 100, 100)}%`,
                }}
              >
                <span>{Math.round((3 / activeHours) * 100)}%</span>
              </div>

              <div className="tm-progress-details">
                <span>Route Progress</span>
                <strong>
                  3 <small>/ {activeHours} hours</small>
                </strong>

                <div className="tm-progress-bar">
                  <span
                    style={{
                      width: `${Math.min((3 / activeHours) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Route visualization */}
          <div className="tm-route-map-wrapper">
            <div className="tm-route-map-label">
              <span className="tm-eyebrow">
                <span>LIVE ROUTE</span>
                <i />
              </span>
            </div>

            <div className="tm-route-map-background">
              <div className="tm-map-grid-lines" />
              <div className="tm-map-topographic-overlay" />

              <svg
                className="tm-route-svg"
                viewBox="0 0 700 270"
                preserveAspectRatio="none"
              >
                <path
                  className="tm-route-line-path"
                  d="M 40 130 C 130 130, 150 170, 230 145
                     S 340 120, 410 155
                     S 520 170, 590 135
                     S 650 120, 675 120"
                />
              </svg>

              <div className={`tm-route-node tm-node-1 ${selectedHours === 24 ? "highlight-node" : ""}`} onClick={() => setSelectedHours(24)}>
                <div className="tm-node-hour">24</div>
                <span>HOURS</span>
                <small>Rapid Route</small>
                <div className={`tm-node-circle ${selectedHours === 24 ? "active-node" : ""}`}>●</div>
                <label>Your Idea</label>
              </div>

              <div className={`tm-route-node tm-node-2 ${selectedHours === 48 ? "highlight-node" : ""}`} onClick={() => setSelectedHours(48)}>
                <div className="tm-node-hour">48</div>
                <span>HOURS</span>
                <small>Accelerated<br />Route</small>
                <div className={`tm-node-circle ${selectedHours === 48 ? "active-node" : ""}`}>●</div>
              </div>

              <div className={`tm-route-node tm-node-3 ${selectedHours === 72 ? "highlight-node" : ""}`} onClick={() => setSelectedHours(72)}>
                <div className="tm-node-hour">72</div>
                <span>HOURS</span>
                <small>Extended<br />Route</small>
                <div className={`tm-node-circle ${selectedHours === 72 ? "active-node" : ""}`}>●</div>
              </div>

              <div className={`tm-route-node tm-node-4 ${selectedHours === "custom" ? "highlight-node" : ""}`} onClick={() => setSelectedHours("custom")}>
                <div className="tm-node-hour">CUSTOM</div>
                <span>HOURS</span>
                <small>Your<br />Route</small>
                <div className={`tm-node-circle ${selectedHours === "custom" ? "active-node" : ""}`}>●</div>
              </div>

              <div 
                className="tm-route-car-dynamic" 
                style={{ left: getCarProgressOffset() }}
                aria-hidden="true"
              >
                <div className="tm-car-body">
                  <span className="tm-car-window" />
                  <span className="tm-car-wheel tm-wheel-left" />
                  <span className="tm-car-wheel tm-wheel-right" />
                </div>
              </div>

              <div className="tm-route-bottom-note">
                <span className="tm-target-icon">◎</span>
                <p>From idea<br />to impact. Fast.</p>
              </div>

              <div className="tm-gps-coordinates">
                <span />
                <div>
                  GPS ROUTE ACTIVE
                  <br />
                  <small>8.5241° N&nbsp;&nbsp; 76.9366° E</small>
                </div>
              </div>
            </div>
          </div>

          {/* Calculator */}
          <div className="tm-calculator-card">
            <span className="tm-calculator-title">
              DEVELOPMENT HOURS CALCULATOR
            </span>

            <label htmlFor="tm-hourly-rate">Hourly Rate ⓘ</label>
            <select
              id="tm-hourly-rate"
              value={hourlyRate}
              onChange={(event) => setHourlyRate(Number(event.target.value))}
            >
              <option value={25}>$ 25 / hour</option>
              <option value={50}>$ 50 / hour</option>
              <option value={75}>$ 75 / hour</option>
              <option value={100}>$ 100 / hour</option>
            </select>

            <label htmlFor="tm-development-time">Development Time ⓘ</label>
            <select
              id="tm-development-time"
              value={selectedHours}
              onChange={(event) => {
                const value = event.target.value;
                setSelectedHours(value === "custom" ? "custom" : Number(value));
              }}
            >
              <option value={24}>24 hours</option>
              <option value={48}>48 hours</option>
              <option value={72}>72 hours</option>
              <option value="custom">Custom hours</option>
            </select>

            {selectedHours === "custom" && (
              <div className="tm-custom-hours-input">
                <label htmlFor="tm-custom-hours">Custom hours</label>
                <input
                  id="tm-custom-hours"
                  type="number"
                  min="1"
                  max="1000"
                  value={customHours}
                  onChange={(event) =>
                    setCustomHours(Math.max(1, Number(event.target.value)))
                  }
                />
              </div>
            )}

            <div className="tm-calculator-divider" />

            <div className="tm-estimated-value">
              <span>Estimated Service Value</span>
              <strong>${estimatedValue.toLocaleString("en-US")}</strong>
              <small>(Excl. taxes)</small>
            </div>

            <button
              type="button"
              className="tm-start-route-button"
              onClick={() => {
                document
                  .getElementById("time-model")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Start This Route <span>→</span>
            </button>
          </div>
        </div>

        {/* Bottom statistics */}
        <div className="tm-model-footer">
          <div className="tm-footer-intro">
            <span className="tm-footer-clock">◷</span>
            <div>
              <strong>Development is scoped in hours</strong>
              <p>Final delivery time depends on project scope.</p>
            </div>
          </div>

          {stats.map((stat) => (
            <div className="tm-footer-stat" key={stat.label}>
              <span className="tm-stat-icon">{stat.icon}</span>
              <div>
                <strong>{stat.number}</strong>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}

          <div className="tm-footer-cta">
            <p>Your idea. Our route.</p>
            <strong>Let's build it.</strong>
            <span>→</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TimeModel;