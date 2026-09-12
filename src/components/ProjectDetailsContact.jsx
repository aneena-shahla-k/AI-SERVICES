import React, { useState } from 'react';
import './ProjectDetailsContact.css';

export default function ProjectDetailsContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Website Development',
    timeframe: '48 Hours',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! Your project route has been initiated.');
  };

  return (
    <div className="pdc-page">
      <div className="pdc-container">
        
        <div className="pdc-header">
          <div className="pdc-eyebrow">
            <span className="pdc-dash"></span>
            Project Details & Contact
          </div>
          <h1 className="pdc-title">Take the Wheel. <em>Let’s Build Your Route.</em></h1>
          <p className="pdc-subtitle">
            Share your concept and select your development timeline. We build the technology and systems; you drive the business[cite: 1].
          </p>
        </div>

        <div className="pdc-grid">
          <div className="pdc-form-card">
            <h3 className="pdc-form-title">Start Your Project Inquiry</h3>
            
            <form onSubmit={handleSubmit} className="pdc-form">
              <div className="pdc-field-group">
                <label>Your Name</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Enter your full name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="pdc-field-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="name@company.com" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="pdc-row-group">
                <div className="pdc-field-group">
                  <label>Select Service</label>
                  <select name="service" value={formData.service} onChange={handleChange}>
                    <option value="Website Development">Website Development</option>
                    <option value="E-Commerce">E-Commerce Ecosystem</option>
                    <option value="Mobile App">Mobile App Development</option>
                    <option value="ERP & Business Systems">ERP & Business Systems</option>
                    <option value="AI Solutions">AI Solutions & Automation</option>
                  </select>
                </div>

                <div className="pdc-field-group">
                  <label>Development Time</label>
                  <select name="timeframe" value={formData.timeframe} onChange={handleChange}>
                    <option value="24 Hours">24 Hours (Rapid Build)</option>
                    <option value="48 Hours">48 Hours (Accelerated)</option>
                    <option value="72 Hours">72 Hours (Extended Sprint)</option>
                    <option value="Custom Hours">Custom Hours / Full Ecosystem</option>
                  </select>
                </div>
              </div>

              <div className="pdc-field-group">
                <label>Project Concept & Details</label>
                <textarea 
                  name="message" 
                  rows="4" 
                  placeholder="Describe your business idea, goals, or required systems..." 
                  value={formData.message} 
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="pdc-submit-btn">
                Submit Your Route →
              </button>
            </form>
          </div>

          <div className="pdc-info-column">
            <div className="pdc-info-card gps-philosophy-box">
              <span className="pdc-info-tag">Our Core Promise</span>
              <h4>We Sell the GPS. You Drive.</h4>
              <p>
                We don’t drive your business for you. We build the strategy, technology, systems, and growth roadmap[cite: 1]. Once handed over, you take the wheel.
              </p>
            </div>

            <div className="pdc-info-card">
              <span className="pdc-info-tag">Direct Contact</span>
              <ul className="pdc-contact-list">
                <li><strong>Email:</strong> support@aiconceptllc.com</li>
                <li><strong>Response Time:</strong> Within 24 Hours</li>
                <li><strong>Office Base:</strong> Global & Regional Operations</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}