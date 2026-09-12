import React from 'react';
import './HowWeWorkDetailed.css';

export default function HowWeWorkDetailed() {
  const steps = [
    {
      num: "01",
      title: "Discover",
      subtitle: "Research & Analysis",
      desc: "Understand the idea, business, market, customers, and objectives."
    },
    {
      num: "02",
      title: "Design the Route",
      subtitle: "Strategic Blueprint",
      desc: "Create the Growth Plan, business model, technology strategy, and marketing roadmap."
    },
    {
      num: "03",
      title: "Build",
      subtitle: "Technology Development",
      desc: "Develop the website, app, e-commerce, booking system, ERP, AI, integrations, and other technology."
    },
    {
      num: "04",
      title: "Connect",
      subtitle: "Ecosystem Integration",
      desc: "Connect the systems into one business ecosystem."
    },
    {
      num: "05",
      title: "Hand Over",
      subtitle: "Execution & Launch",
      desc: "You receive the roadmap, technology, systems, and operating structure. You drive the business."
    }
  ];

  return (
    <section className="hww-detailed-section">
      <div className="hww-detailed-container">
        
        <div className="hww-detailed-header">
          <div className="hww-detailed-eyebrow">
            <span className="hww-detailed-dash"></span>
            Our Methodology
          </div>
          <h2 className="hww-detailed-title">How We Work</h2>
          <p className="hww-detailed-subtitle">
            A clean 5-step process taking you from concept to execution. We build the route, you drive.
          </p>
        </div>

        <div className="hww-steps-grid">
          {steps.map((item, idx) => (
            <div className="hww-step-card" key={idx}>
              <div className="hww-card-top-row">
                <span className="hww-step-num">{item.num}</span>
                <span className="hww-step-badge">{item.subtitle}</span>
              </div>
              <h3 className="hww-step-title">{item.title}</h3>
              <p className="hww-step-desc">{item.desc}</p>
              <div className="hww-card-footer-line"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}