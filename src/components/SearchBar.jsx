import React, { useRef } from 'react';
import { Search, X } from 'lucide-react';

/**
 * Reusable Search Bar Component
 * Demonstrates React controlled form input, useRef hook for input focusing, and event handling.
 */
export function SearchBar({ value, onChange, placeholder = "Search the cosmos..." }) {
  const inputRef = useRef(null);

  const handleClear = () => {
    onChange('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '480px',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Search
        size={18}
        style={{
          position: 'absolute',
          left: '14px',
          color: 'var(--text-muted)',
          pointerEvents: 'none'
        }}
      />

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '0.75rem 2.5rem 0.75rem 2.5rem',
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          borderRadius: 'var(--radius-full)',
          color: 'var(--text-primary)',
          fontSize: '0.95rem',
          outline: 'none',
          backdropFilter: 'blur(10px)',
          transition: 'all var(--transition-fast)'
        }}
      />

      {value && (
        <button
          onClick={handleClear}
          aria-label="Clear search"
          style={{
            position: 'absolute',
            right: '12px',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
