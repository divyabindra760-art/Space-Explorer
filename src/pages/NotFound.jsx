import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Orbit } from 'lucide-react';

/**
 * 404 Not Found Page Component
 * Demonstrates React Router wild-card route fallback handling and custom 404 design.
 */
export function NotFound() {
  return (
    <div
      className="container section-padding"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: '60vh'
      }}
    >
      <div style={{ color: 'var(--accent-cyan)', marginBottom: '1rem', animation: 'pulse 2s infinite' }}>
        <Orbit size={80} />
      </div>

      <span className="badge badge-live" style={{ marginBottom: '1rem' }}>ERROR 404</span>

      <h1 style={{ fontSize: '3rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>
        Lost in Deep Space
      </h1>

      <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', marginBottom: '2rem', fontSize: '1.05rem' }}>
        The coordinates you entered lead to an uncharted cosmic void. No celestial body or telemetry exists at this path.
      </p>

      <Link to="/" className="btn btn-primary">
        <Rocket size={18} />
        <span>Return to Home Base</span>
      </Link>
    </div>
  );
}
