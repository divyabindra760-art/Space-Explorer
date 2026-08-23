import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { PlanetCard } from '../components/PlanetCard';
import { EmptyState } from '../components/EmptyState';
import { Bookmark, Trash2, Globe, Image, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Saved Favorites Page Component
 * Demonstrates Local Storage reading & deletion, array filter methods, conditional rendering, and reusable cards.
 */
export function Favorites() {
  const [favorites, setFavorites] = useLocalStorage('celestial_favorites', []);
  const [filterType, setFilterType] = useState('All');

  const handleRemoveFavorite = (id, type) => {
    setFavorites(favorites.filter((item) => !(item.id === id && item.type === type)));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all saved favorites?')) {
      setFavorites([]);
    }
  };

  const filteredItems = favorites.filter((item) => {
    if (filterType === 'Planets') return item.type === 'planet';
    if (filterType === 'APOD') return item.type === 'apod';
    return true;
  });

  return (
    <div className="container section-padding">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="badge" style={{ marginBottom: '0.75rem' }}>Personal Collection</span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
          My Saved Cosmos
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', margin: '0.5rem auto 0 auto' }}>
          Your bookmarked planets, astronomical photography, and favorite space discoveries stored in Browser Local Storage.
        </p>
      </div>

      {/* Toolbar Controls */}
      {favorites.length > 0 && (
        <div
          className="glass-card"
          style={{
            padding: '1rem 1.5rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['All', 'Planets', 'APOD'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`btn ${filterType === type ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
              >
                {type} ({type === 'All' ? favorites.length : favorites.filter((f) => f.type === (type === 'Planets' ? 'planet' : 'apod')).length})
              </button>
            ))}
          </div>

          <button onClick={handleClearAll} className="btn btn-secondary" style={{ fontSize: '0.8rem', color: '#ef4444' }}>
            <Trash2 size={14} />
            <span>Clear All Favorites</span>
          </button>
        </div>
      )}

      {/* Favorites Display */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-3">
          {filteredItems.map((item) => (
            <div key={`${item.type}-${item.id}`} className="glass-card" style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
              <button
                onClick={() => handleRemoveFavorite(item.id, item.type)}
                aria-label="Remove favorite"
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  zIndex: 10,
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(239, 68, 68, 0.2)',
                  color: '#ef4444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <Trash2 size={14} />
              </button>

              {item.type === 'planet' ? (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
                    <Globe size={18} style={{ color: 'var(--accent-blue)' }} />
                    <span className="badge">Planet</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.4rem' }}>{item.name}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>{item.tagline}</p>
                  <Link to={`/planet/${item.id}`} className="btn btn-secondary" style={{ width: '100%', fontSize: '0.85rem' }}>
                    <span>View Planet</span>
                    <ExternalLink size={14} />
                  </Link>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
                    <Image size={18} style={{ color: 'var(--accent-cyan)' }} />
                    <span className="badge">{item.date}</span>
                  </div>
                  <img src={item.image} alt={item.title} style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '0.8rem' }} />
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>{item.title}</h3>
                  <Link to="/apod" className="btn btn-secondary" style={{ width: '100%', fontSize: '0.85rem' }}>
                    <span>View NASA APOD</span>
                    <ExternalLink size={14} />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No favorites saved yet"
          description="Explore planets or NASA APOD images and click the heart bookmark icon to save them to your personal cosmos."
        />
      )}
    </div>
  );
}
