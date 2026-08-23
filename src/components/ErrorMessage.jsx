import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

/**
 * Reusable Error Message Component
 * Demonstrates error UI state handling and user retry interaction.
 */
export function ErrorMessage({ message = "An error occurred while loading data.", onRetry }) {
  return (
    <div
      className="glass-card"
      style={{
        maxWidth: '500px',
        margin: '2rem auto',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '1rem',
        borderColor: 'rgba(239, 68, 68, 0.3)',
        background: 'rgba(239, 68, 68, 0.05)'
      }}
    >
      <div style={{ color: '#ef4444' }}>
        <AlertTriangle size={36} />
      </div>
      <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Telemetry Connection Warning</h4>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-secondary" style={{ fontSize: '0.85rem' }}>
          <RefreshCw size={14} />
          <span>Retry Connection</span>
        </button>
      )}
    </div>
  );
}
