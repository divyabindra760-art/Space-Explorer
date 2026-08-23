import React from 'react';
import { SearchX } from 'lucide-react';

/**
 * Reusable Empty State Component
 * Displays helpful feedback when searches or list filters return zero matches.
 */
export function EmptyState({ title = "No celestial objects found", description = "Try adjusting your search keywords or active filters.", onReset }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1rem',
        textAlign: 'center',
        gap: '1rem',
        color: 'var(--text-muted)'
      }}
    >
      <SearchX size={48} />
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{title}</h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '400px' }}>{description}</p>
      {onReset && (
        <button onClick={onReset} className="btn btn-secondary" style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
          Reset Filters
        </button>
      )}
    </div>
  );
}
