import React, { useState } from 'react';
import './SolutionsPage.css';

export default function SolutionsPage() {
  const [activeCategory, setActiveCategory] = useState('erp');

  const categories = {
    websites: {
      title: 'Websites & Digital Platforms',
      subtitle: 'High-performance digital experiences built for brand authority and user conversion.',
      items: [
        'Corporate websites',
        'Business websites',
        'Landing pages',
        'Customer portals',
        'Membership platforms',
        'Web applications',
        'Custom dashboards'
      ]
    },
    ecommerce: {
      title: 'E-Commerce Ecosystems',
      subtitle: 'Scalable storefronts and multi-vendor marketplaces engineered for seamless transactions.',
      items: [
        'Online stores',
        'Multi-vendor marketplaces',
        'Product management',
        'Inventory integration',
        'Payment systems',
        'Order management',
        'Customer management',
        'Automated marketing'
      ]
    },
    mobile: {
      title: 'Mobile App Development',
      subtitle: 'Native and cross-platform mobile solutions built for high user engagement and operations.',
      items: [
        'iOS apps',
        'Android apps',
        'Cross-platform applications',
        'Customer apps',
        'Business management apps',
        'Delivery/service apps',
        'Internal workforce apps'
      ]
    },
    booking: {
      title: 'Booking & Reservation Systems',
      subtitle: 'Automated scheduling and reservation platforms designed to maximize capacity and revenue.',
      items: [
        'Appointment booking',
        'Hotel/resort booking',
        'Service booking',
        'Event booking',
        'Doctor/clinic booking',
        'Scheduling',
        'Automated reminders',
        'Online payments'
      ]
    },
    erp: {
      title: 'ERP & Business Management',
      subtitle: 'Our flagship category: robust enterprise architecture uniting all core internal operations.',
      highlight: true,
      items: [
        'CRM',
        'HR management',
        'Payroll',
        'Accounting',
        'Inventory',
        'Procurement',
        'Sales',
        'Customer & Employee management',
        'Reporting & Business intelligence'
      ]
    },
    custom: {
      title: 'Custom Software & Systems',
      subtitle: 'Tailored backend systems and enterprise infrastructure built around unique workflows.',
      items: [
        'Workflow automation',
        'Internal business systems',
        'API integrations',
        'Cloud systems',
        'SaaS platforms',
        'Enterprise applications',
        'Data systems',
        'Custom dashboards'
      ]
    },
    ai: {
      title: 'AI Solutions & Architecture',
      subtitle: 'We don’t just add AI. We build intelligence directly into your core business operations.',
      isAi: true,
      items: [
        'AI-powered business software & Custom platforms',
        'AI chatbots, agents & customer support',
        'AI sales assistants & automated workflows',
        'AI recommendation & document processing systems',
        'AI analytics & content generation systems',
        'Machine learning solutions & deep API integrations'
      ]
    }
  };

  const current = categories[activeCategory];

  return (
    <section className="sol-section">
      <div className="sol-ambient-glow"></div>
      
      <div className="sol-container">
        
        {/* Header */}
        <div className="sol-header">
          <div className="sol-eyebrow">
            <span className="sol-dash"></span>
            Connected Business Systems
            <span className="sol-dash"></span>
          </div>
          <h2 className="sol-title">Architected for Scale, Not Just Services</h2>
          <p className="sol-subtitle">Organized as interconnected business ecosystems designed to power your entire enterprise.</p>
        </div>

        {/* Category Selector Nav */}
        <div className="sol-nav-grid">
          {Object.entries(categories).map(([key, cat]) => (
            <button
              key={key}
              className={`sol-nav-card ${activeCategory === key ? 'active' : ''} ${cat.highlight ? 'featured-nav' : ''} ${cat.isAi ? 'ai-nav' : ''}`}
              onClick={() => setActiveCategory(key)}
            >
              <div className="sol-nav-indicator"></div>
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Display Content Card */}
        <div className="sol-display-card fade-in">
          <div className="sol-card-header">
            <div>
              <span className="sol-card-tag">{current.isAi ? 'Artificial Intelligence' : current.highlight ? 'Flagship Architecture' : 'Core Infrastructure'}</span>
              <h3 className="sol-card-title">{current.title}</h3>
              <p className="sol-card-subtitle">{current.subtitle}</p>
            </div>
            <div className="sol-total-badge">
              <strong>{current.items.length}</strong>
              <span>Modules Available</span>
            </div>
          </div>

          <div className="sol-divider"></div>

          <div className="sol-items-grid">
            {current.items.map((item, idx) => (
              <div className="sol-item-box" key={idx}>
                <div className="sol-check-icon">✓</div>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="sol-card-footer">
            <p>Need a custom combination of these systems? We map your infrastructure directly.</p>
            <button className="sol-explore-btn" onClick={() => alert(`Consulting on ${current.title}`)}>
              <span>Architect This System</span>
              <span>→</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}