import React from 'react';
import { Link } from 'react-router-dom';
import { Orbit, Heart, Code2 } from 'lucide-react';

/**
 * Site Footer Component
 * Demonstrates Semantic HTML5 <footer>, Flexbox/Grid layouts, and navigation structure.
 */
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <Link to="/" className="brand-logo">
              <Orbit size={24} style={{ color: 'var(--accent-cyan)' }} />
              <span>Space Explorer</span>
            </Link>
            <p>
              An interactive space exploration platform bringing the universe closer through real-time data, NASA-powered discoveries and engaging experiences.
            </p>
          </div>

          <div className="footer-column">
            <h4>Exploration</h4>
            <ul className="footer-links">
              <li><Link to="/planets">Solar System Explorer</Link></li>
              <li><Link to="/iss">ISS Live Tracker</Link></li>
              <li><Link to="/apod">NASA APOD</Link></li>
              <li><Link to="/constellations">Constellation Guide</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Features</h4>
            <ul className="footer-links">
              <li><Link to="/quiz">Daily Space Quiz</Link></li>
              <li><Link to="/favorites">Saved Favorites</Link></li>
              <li><Link to="/about">About Platform</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Technology</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              <strong>Built with:</strong> React 19
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              <strong>Powered by:</strong> NASA API
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <strong>Stack:</strong> Vite, CSS3, ES6+
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Space Explorer. Explore the universe through interactive experiences.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>Crafted with React & Modern Web Standards</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
