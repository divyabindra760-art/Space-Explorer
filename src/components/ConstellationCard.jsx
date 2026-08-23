import React from 'react';
import { Sparkles, Eye, Compass } from 'lucide-react';

/**
 * Constellation Card Component
 * Demonstrates SVG rendering, prop rendering, and layout styling.
 */
export function ConstellationCard({ constellation, onSelect }) {
  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', cursor: 'pointer' }} onClick={() => onSelect(constellation)}>
      {/* Visual Header Star Map Canvas preview */}
      <div
        style={{
          width: '100%',
          height: '140px',
          borderRadius: 'var(--radius-md)',
          background: 'radial-gradient(circle at 50% 50%, #0d1124 0%, #070913 100%)',
          border: '1px solid var(--glass-border)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        {/* SVG Decorative Constellation Nodes */}
        <svg width="100%" height="100%" viewBox="0 0 200 120" style={{ position: 'absolute', inset: 0 }}>
          <circle cx="40" cy="30" r="3" fill="var(--accent-cyan)" />
          <circle cx="90" cy="45" r="4" fill="#ffffff" />
          <circle cx="150" cy="25" r="3" fill="var(--accent-violet)" />
          <circle cx="120" cy="85" r="4" fill="var(--accent-cyan)" />
          <circle cx="60" cy="95" r="3" fill="#ffffff" />

          <line x1="40" y1="30" x2="90" y2="45" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="90" y1="45" x2="150" y2="25" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="90" y1="45" x2="120" y2="85" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="120" y1="85" x2="60" y2="95" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 3" />
        </svg>

        <span className="badge" style={{ position: 'absolute', top: '8px', right: '8px', fontSize: '0.65rem' }}>
          {constellation.hemisphere}
        </span>
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
            {constellation.name}
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontStyle: 'italic' }}>
            "{constellation.englishMeaning}"
          </span>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.4rem', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {constellation.description}
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--glass-border)', paddingTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        <span><strong>Brightest:</strong> {constellation.brightestStar.split(' ')[0]}</span>
        <span><strong>Season:</strong> {constellation.bestSeason}</span>
      </div>
    </div>
  );
}
