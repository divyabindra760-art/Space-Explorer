import React from 'react';
import { Orbit } from 'lucide-react';

/**
 * Reusable Cosmic Loading Component
 * Demonstrates clean UI feedback during async data fetching.
 */
export function Loader({ message = "Scanning space telemetry..." }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1rem',
        gap: '1.25rem',
        color: 'var(--accent-cyan)'
      }}
    >
      <div style={{ animation: 'spin 3s linear infinite' }}>
        <Orbit size={48} />
      </div>
      <p style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
        {message}
      </p>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
