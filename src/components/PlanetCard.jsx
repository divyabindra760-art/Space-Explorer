import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Compass, Moon, MoveRight, Ruler } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

/**
 * Planet Card Component
 * Demonstrates props, conditional rendering, local storage favorites sync, and dynamic routing navigation.
 */
export function PlanetCard({ planet }) {
  const [favorites, setFavorites] = useLocalStorage('celestial_favorites', []);
  const [isHovered, setIsHovered] = React.useState(false);

  const isFavorite = favorites.some(fav => fav.id === planet.id && fav.type === 'planet');

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      setFavorites(favorites.filter(fav => !(fav.id === planet.id && fav.type === 'planet')));
    } else {
      setFavorites([...favorites, { ...planet, type: 'planet', savedAt: new Date().toISOString() }]);
    }
  };

  return (
    <div 
      className="glass-card" 
      style={{ 
        padding: 0, 
        display: 'flex', 
        flexDirection: 'column', 
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered ? `0 12px 40px ${planet.color}40` : 'var(--glass-shadow)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header Visual */}
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        height: '200px', 
        background: 'radial-gradient(circle at center, rgba(15,23,42,0.8) 0%, rgba(7,9,19,1) 100%)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Subtle orbit ring */}
        <div style={{
          position: 'absolute',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          border: `1px solid ${planet.color}20`,
          animation: isHovered ? 'spin 20s linear infinite' : 'none'
        }} />
        
        <img
          src={planet.image}
          alt={planet.name}
          onError={(e) => {
            // Fallback: create colored circle if image fails to load
            e.target.style.display = 'none';
            const parent = e.target.parentElement;
            if (!parent.querySelector('.planet-fallback')) {
              const fallback = document.createElement('div');
              fallback.className = 'planet-fallback';
              fallback.style.cssText = `
                width: 140px;
                height: 140px;
                border-radius: 50%;
                background: radial-gradient(circle at 30% 30%, ${planet.color}dd 0%, ${planet.color}88 50%, ${planet.color}44 100%);
                box-shadow: 0 0 ${isHovered ? '40px' : '30px'} ${planet.color}, inset 0 0 30px rgba(0,0,0,0.5);
                transition: all 0.3s ease;
                transform: ${isHovered ? 'scale(1.08)' : 'scale(1)'};
                border: 2px solid ${planet.color}40;
              `;
              parent.appendChild(fallback);
            }
          }}
          style={{
            width: '140px',
            height: '140px',
            objectFit: 'cover',
            borderRadius: '50%',
            boxShadow: `0 0 ${isHovered ? '40px' : '30px'} ${planet.color || 'var(--accent-blue)'}`,
            transition: 'all 0.3s ease',
            transform: isHovered ? 'scale(1.08)' : 'scale(1)',
            border: `2px solid ${planet.color}40`
          }}
        />

        {/* Favorite Heart Button */}
        <button
          onClick={toggleFavorite}
          aria-label={`Favorite ${planet.name}`}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(7, 9, 19, 0.8)',
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--glass-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isFavorite ? '#ef4444' : 'var(--text-secondary)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            zIndex: 2
          }}
        >
          <Heart size={18} fill={isFavorite ? '#ef4444' : 'none'} />
        </button>

        {/* Planet Type Badge */}
        <span
          className="badge"
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            fontSize: '0.7rem',
            background: `${planet.color}20`,
            color: planet.color,
            border: `1px solid ${planet.color}40`
          }}
        >
          {planet.type}
        </span>
      </div>

      {/* Planet Info */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ 
          fontSize: '1.4rem', 
          fontWeight: 800, 
          fontFamily: 'var(--font-heading)', 
          marginBottom: '0.4rem',
          color: 'var(--text-primary)'
        }}>
          {planet.name}
        </h3>

        <p style={{ 
          fontSize: '0.85rem', 
          color: 'var(--text-secondary)', 
          marginBottom: '1.25rem', 
          lineClamp: 2, 
          display: '-webkit-box', 
          WebkitLineClamp: 2, 
          WebkitBoxOrient: 'vertical', 
          overflow: 'hidden',
          lineHeight: 1.5
        }}>
          {planet.tagline}
        </p>

        {/* Quick Stats Grid */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '0.65rem', 
          marginBottom: '1.25rem', 
          fontSize: '0.85rem'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            color: 'var(--text-secondary)'
          }}>
            <Compass size={16} style={{ color: planet.color }} />
            <span><strong style={{ color: 'var(--text-primary)' }}>Gravity:</strong> {planet.gravity}</span>
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            color: 'var(--text-secondary)'
          }}>
            <Moon size={16} style={{ color: planet.color }} />
            <span><strong style={{ color: 'var(--text-primary)' }}>Moons:</strong> {planet.moonsCount}</span>
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            color: 'var(--text-secondary)'
          }}>
            <Ruler size={16} style={{ color: planet.color }} />
            <span><strong style={{ color: 'var(--text-primary)' }}>Distance:</strong> {planet.distanceFromSun}</span>
          </div>
        </div>

        <Link 
          to={`/planet/${planet.id}`} 
          className="btn btn-secondary" 
          style={{ 
            width: '100%', 
            fontSize: '0.85rem',
            background: isHovered ? 'var(--glass-bg-hover)' : 'var(--glass-bg)',
            borderColor: isHovered ? planet.color : 'var(--glass-border)',
            color: isHovered ? planet.color : 'var(--text-primary)'
          }}
        >
          <span>View Planet Details</span>
          <MoveRight size={16} />
        </Link>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
