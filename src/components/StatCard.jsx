import React from 'react';

/**
 * Reusable Space Statistics Card Component
 * Demonstrates React props, functional components, and responsive CSS styling.
 */
export function StatCard({ label, value, subtext, icon: Icon, isLive = false, color = 'var(--accent-blue)' }) {
  return (
    <div
      className="glass-card"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.25rem',
        padding: '1.25rem 1.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Icon Container */}
      <div
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '14px',
          background: `rgba(255, 255, 255, 0.05)`,
          border: `1px solid rgba(255, 255, 255, 0.1)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: color,
          flexShrink: 0
        }}
      >
        {Icon && <Icon size={26} />}
      </div>

      {/* Value & Label */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
            {label}
          </span>
          {isLive && <span className="badge badge-live" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>LIVE</span>}
        </div>
        <div style={{ fontSize: '1.65rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
          {value}
        </div>
        {subtext && <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{subtext}</div>}
      </div>
    </div>
  );
}
