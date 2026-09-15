import React, { useState, useEffect } from 'react';
import './TimeBasedService.css';

export default function TimeBasedService() {
  const [selectedTime, setSelectedTime] = useState('24h');
  const [hourlyRate, setHourlyRate] = useState(50);

  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const routeData = {
    '24h': { hours: 24, progress: '15%' },
    '48h': { hours: 48, progress: '42%' },
    '72h': { hours: 72, progress: '70%' },
    'custom': { hours: 96, progress: '92%' }
  };

  const currentRoute = routeData[selectedTime];
  const estimatedValue = currentRoute.hours * hourlyRate;

  return (
    <section className="tm-tbs-section">
      <div className="tm-tbs-container">
        
        {/* Top Header Section */}
        <div className="tm-tbs-top-header">
          <div className="tm-tbs-header-left">
            <span className="tm-tbs-sub-tag">04 / TIME MODEL</span>
            <h2 className="tm-tbs-title">Choose your<br /><i>development time.</i></h2>
            <p className="tm-tbs-subtitle">Your route. Your hours. Your build.</p>
          </div>
          <div className="tm-tbs-header-right">
            <p>Flexible development time, built around your goals. Choose the pace that fits your business needs — and let's turn your idea into a real solution.</p>
            <div className="tm-tbs-badge-right">
              <span className="tm-tbs-target-icon">◎</span>
              <span>FASTER EXECUTION.<br />BIGGER POSSIBILITIES.</span>
            </div>
          </div>
        </div>

        {/* 4 Cards Row */}
        <div className="tm-tbs-cards-row">
          {[
            { id: '24h', num: '01', title: '24 HOURS', name: 'Rapid Route', desc: 'For urgent needs and MVPs. Get to market, fast.' },
            { id: '48h', num: '02', title: '48 HOURS', name: 'Accelerated Route', desc: 'For complex features and business-critical solutions.' },
            { id: '72h', num: '03', title: '72 HOURS', name: 'Extended Route', desc: 'For large-scale projects and multi-system integrations.' },
            { id: 'custom', num: '04', title: 'CUSTOM HOURS', name: 'Your Route', desc: 'Tailored to your goals, timeline and complexity.' }
          ].map((card) => (
            <div 
              key={card.id}
              className={`tm-tbs-plan-card ${selectedTime === card.id ? 'active' : ''}`}
              onClick={() => setSelectedTime(card.id)}
            >
              <div className="tm-tbs-card-top">
                <span className="tm-tbs-card-num">{card.num}</span>
                <span className="tm-tbs-radio-dot">
                  {selectedTime === card.id && <span className="tm-tbs-radio-inner"></span>}
                </span>
              </div>
              <h3 className="tm-tbs-card-time">{card.title}</h3>
              <h4 className="tm-tbs-card-name">{card.name}</h4>
              <p className="tm-tbs-card-desc">{card.desc}</p>
              <div className="tm-tbs-card-arrow">→</div>
            </div>
          ))}
        </div>

        {/* Middle Interactive Grid */}
        <div className="tm-tbs-interactive-grid">
          
          {/* Countdown Panel */}
          <div className="tm-tbs-countdown-panel">
            <span className="tm-tbs-panel-tag">LIVE ROUTE</span>
            <span className="tm-tbs-panel-title">DEVELOPMENT STARTS IN</span>
            
            <div className="tm-tbs-timer-digits">
              {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div className="tm-tbs-timer-labels">
              <span>HOURS</span><span>MINUTES</span><span>SECONDS</span>
            </div>

            <div className="tm-tbs-route-status">
              <span className="tm-tbs-lime-dot"></span>
              <span>24-HOUR ROUTE ACTIVE</span>
            </div>

            <div className="tm-tbs-progress-footer">
              <div className="tm-tbs-progress-text">
                <span>Route Progress</span>
                <strong>3 / 24 hours</strong>
              </div>
              <div className="tm-tbs-progress-bar-bg">
                <div className="tm-tbs-progress-bar-fill" style={{ width: '12%' }}></div>
              </div>
              <span className="tm-tbs-perc">12%</span>
            </div>
          </div>

          {/* Map Route Panel */}
          <div className="tm-tbs-map-panel-clean">
            <div className="tm-tbs-map-top-label">LIVE ROUTE</div>
            
            <div className="tm-tbs-curved-route-container">
              <svg className="tm-tbs-svg-path" viewBox="0 0 600 150" preserveAspectRatio="none">
                <path 
                  d="M 50,90 Q 150,10 260,85 T 550,75" 
                  fill="none" 
                  stroke="#0284c7" 
                  strokeWidth="3.5"
                />
              </svg>

              <div className={`tm-tbs-map-node tm-node-24 ${selectedTime === '24h' ? 'active-glow' : ''}`} onClick={() => setSelectedTime('24h')}>
                <div className="tm-node-info">
                  <span className="tm-node-val">24</span>
                  <span className="tm-node-lbl">HOURS</span>
                  <small>Rapid Route</small>
                </div>
                <div className="tm-node-dot-outer">
                  <div className="tm-node-dot-inner"></div>
                </div>
                <span className="tm-node-idea">Your idea</span>
              </div>

              <div className={`tm-tbs-map-node tm-node-48 ${selectedTime === '48h' ? 'active-glow' : ''}`} onClick={() => setSelectedTime('48h')}>
                <div className="tm-node-info">
                  <span className="tm-node-val">48</span>
                  <span className="tm-node-lbl">HOURS</span>
                  <small>Accelerated Route</small>
                </div>
                <div className="tm-node-dot-outer">
                  <div className="tm-node-dot-inner"></div>
                </div>
              </div>

              <div className={`tm-tbs-map-node tm-node-72 ${selectedTime === '72h' ? 'active-glow' : ''}`} onClick={() => setSelectedTime('72h')}>
                <div className="tm-node-info">
                  <span className="tm-node-val">72</span>
                  <span className="tm-node-lbl">HOURS</span>
                  <small>Extended Route</small>
                </div>
                <div className="tm-node-dot-outer">
                  <div className="tm-node-dot-inner"></div>
                </div>
              </div>

              <div className={`tm-tbs-map-node tm-node-custom ${selectedTime === 'custom' ? 'active-glow' : ''}`} onClick={() => setSelectedTime('custom')}>
                <div className="tm-node-info">
                  <span className="tm-node-val">CUSTOM</span>
                  <span className="tm-node-lbl">HOURS</span>
                  <small>Your Route</small>
                </div>
                <div className="tm-node-dot-outer">
                  <div className="tm-node-dot-inner"></div>
                </div>
              </div>

              <div className="tm-tbs-moving-car-wrapper" style={{ left: currentRoute.progress }}>
                <div className="tm-tbs-realistic-car">
                  <div className="tm-car-roof"></div>
                  <div className="tm-car-windshield-front"></div>
                  <div className="tm-car-windshield-rear"></div>
                </div>
              </div>
            </div>
            
            <div className="tm-tbs-map-footer">
              <div className="tm-tbs-idea-badge">
                <span className="tm-tbs-target-icon-sm">◎</span>
                <span className="tm-tbs-idea-text">From idea<br />to impact. Fast.</span>
              </div>
              <div className="tm-tbs-gps-text">
                <span className="tm-tbs-lime-dot-sm"></span> <strong>GPS ROUTE ACTIVE</strong><br />
                <small>8.5241° N &nbsp; 76.9366° E</small>
              </div>
            </div>
          </div>

          {/* Calculator Panel */}
          <div className="tm-tbs-calculator-panel">
            <span className="tm-tbs-calc-header-tag">DEVELOPMENT HOURS CALCULATOR</span>
            
            <div className="tm-tbs-input-group">
              <label>Hourly Rate ⓘ</label>
              <select value={hourlyRate} onChange={(e) => setHourlyRate(Number(e.target.value))}>
                <option value={50}>$ 50 / hour</option>
                <option value={75}>$ 75 / hour</option>
                <option value={100}>$ 100 / hour</option>
              </select>
            </div>

            <div className="tm-tbs-input-group">
              <label>Development Time ⓘ</label>
              <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
                <option value="24h">24 hours</option>
                <option value="48h">48 hours</option>
                <option value="72h">72 hours</option>
                <option value="custom">Custom hours</option>
              </select>
            </div>

            <div className="tm-tbs-value-box">
              <span>Estimated Service Value</span>
              <strong>${estimatedValue.toLocaleString()} <small>(Excl. taxes)</small></strong>
            </div>

            <button className="tm-tbs-start-route-btn" onClick={() => alert(`Starting route for ${currentRoute.hours} hours!`)}>
              Start This Route →
            </button>
          </div>

        </div>

        {/* Bottom Metrics Bar */}
        <div className="tm-tbs-bottom-metrics">
          <div className="tm-tbs-bm-item">
            <span className="tm-tbs-bm-icon">⏱️</span>
            <div>
              <strong>Development is scoped in hours</strong>
              <p>Final delivery time depends on project scope.</p>
            </div>
          </div>
          <div className="tm-tbs-bm-stat">
            <strong>6</strong>
            <span>Core Systems</span>
          </div>
          <div className="tm-tbs-bm-stat">
            <strong>100+</strong>
            <span>Projects Delivered</span>
          </div>
          <div className="tm-tbs-bm-stat">
            <strong>50+</strong>
            <span>Happy Clients</span>
          </div>
          <div className="tm-tbs-bm-stat">
            <strong>98%</strong>
            <span>Client Satisfaction</span>
          </div>
        </div>

      </div>
    </section>
  );
}
