import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * Reusable Platform Feature Card Component
 * Demonstrates component composition, props, hover states, and React Router integration.
 */
export function FeatureCard({ title, description, route, image, icon: Icon, badgeText, accentColor = 'var(--accent-blue)' }) {
  return (
    <div className="glass-card" style={{ padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Thumbnail Header Image */}
      <div style={{ position: 'relative', width: '100%', height: '180px', overflow: 'hidden' }}>
        <img
          src={image}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1.0)')}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, var(--bg-primary) 0%, rgba(7, 9, 19, 0.2) 100%)'
          }}
        />

        {badgeText && (
          <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
            <span className="badge">{badgeText}</span>
          </div>
        )}

        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '16px',
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--glass-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: accentColor
          }}
        >
          {Icon && <Icon size={22} />}
        </div>
      </div>

      {/* Body Content */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            fontFamily: 'var(--font-heading)',
            marginBottom: '0.6rem',
            color: 'var(--text-primary)'
          }}
        >
          {title}
        </h3>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1 }}>
          {description}
        </p>

        <Link
          to={route}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 600,
            fontSize: '0.9rem',
            color: accentColor,
            marginTop: 'auto'
          }}
        >
          <span>Explore Feature</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
