import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import planetsData from '../data/planetsData.json';
import { ArrowLeft, Heart, Globe, Thermometer, Orbit, Moon, Compass, Sparkles, Scale } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

/**
 * Planet Detail Page Component
 * Demonstrates React Router useParams(), useNavigate(), conditional rendering, and local storage state persistence.
 */
export function PlanetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useLocalStorage('celestial_favorites', []);

  const planet = planetsData.find((p) => p.id === id);

  if (!planet) {
    return (
      <div className="container section-padding" style={{ textAlign: 'center' }}>
        <h2>Planet Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', margin: '1rem 0' }}>
          No planet with ID "{id}" exists in our solar system dataset.
        </p>
        <button onClick={() => navigate('/planets')} className="btn btn-primary">
          <ArrowLeft size={16} />
          <span>Back to Solar System</span>
        </button>
      </div>
    );
  }

  const isFavorite = favorites.some((fav) => fav.id === planet.id && fav.type === 'planet');

  const toggleFavorite = () => {
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => !(fav.id === planet.id && fav.type === 'planet')));
    } else {
      setFavorites([...favorites, { ...planet, type: 'planet', savedAt: new Date().toISOString() }]);
    }
  };

  return (
    <div className="container section-padding">
      {/* Top Back Nav & Favorite Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <button onClick={() => navigate('/planets')} className="btn btn-secondary" style={{ fontSize: '0.85rem' }}>
          <ArrowLeft size={16} />
          <span>Back to Solar System</span>
        </button>

        <button onClick={toggleFavorite} className={`btn ${isFavorite ? 'btn-primary' : 'btn-secondary'}`}>
          <Heart size={18} fill={isFavorite ? '#ffffff' : 'none'} />
          <span>{isFavorite ? 'Saved to Favorites' : 'Add to Favorites'}</span>
        </button>
      </div>

      {/* Main Detail Header Grid */}
      <div
        className="glass-card"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
          marginBottom: '2.5rem'
        }}
      >
        {/* Planet Image Display */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              width: '280px',
              height: '280px',
              borderRadius: '50%',
              background: `radial-gradient(circle at 30% 30%, ${planet.color || 'var(--accent-blue)'} 0%, #070913 80%)`,
              boxShadow: `0 0 50px ${planet.color || 'var(--accent-blue)'}`,
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img
              src={planet.image}
              alt={planet.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Planet Summary Text */}
        <div>
          <span className="badge" style={{ marginBottom: '0.75rem' }}>{planet.type} Planet</span>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>
            {planet.name}
          </h1>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--accent-cyan)', fontWeight: 500, marginBottom: '1.25rem' }}>
            {planet.tagline}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7 }}>
            {planet.summary}
          </p>
        </div>
      </div>

      {/* Scientific Telemetry Grid */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-heading)', marginBottom: '1.25rem' }}>
          Planetary Characteristics
        </h2>

        <div className="grid grid-cols-4">
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ color: 'var(--accent-cyan)', marginBottom: '0.4rem' }}><Globe size={22} /></div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Distance from Sun</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{planet.distanceFromSun}</div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ color: 'var(--accent-blue)', marginBottom: '0.4rem' }}><Scale size={22} /></div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Surface Gravity</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{planet.gravity}</div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ color: 'var(--accent-violet)', marginBottom: '0.4rem' }}><Thermometer size={22} /></div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Average Temperature</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{planet.avgTemp}</div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ color: 'var(--accent-pink)', marginBottom: '0.4rem' }}><Moon size={22} /></div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Known Moons</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{planet.moonsCount} Moons</div>
          </div>
        </div>
      </div>

      {/* Earth Comparison & Interesting Facts Section */}
      <div className="grid grid-cols-2" style={{ gap: '2rem' }}>
        {/* Earth Comparison Card */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Compass size={20} style={{ color: 'var(--accent-cyan)' }} />
            <span>Earth Comparison</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                <span>Diameter Ratio (vs Earth = 1.0)</span>
                <strong>{planet.earthComparison.diameterRatio}x</strong>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${Math.min(planet.earthComparison.diameterRatio * 20, 100)}%`, height: '100%', background: 'var(--accent-cyan)' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                <span>Gravity Ratio (vs Earth = 1.0)</span>
                <strong>{planet.earthComparison.gravityRatio}x</strong>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${Math.min(planet.earthComparison.gravityRatio * 50, 100)}%`, height: '100%', background: 'var(--accent-blue)' }} />
              </div>
            </div>

            <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--glass-border)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Temperature Delta:</span>{' '}
              <strong>{planet.earthComparison.tempDiff}</strong>
            </div>
          </div>
        </div>

        {/* Interesting Facts Card */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={20} style={{ color: 'var(--accent-violet)' }} />
            <span>Astronomical Facts</span>
          </h3>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            {planet.interestingFacts.map((fact, index) => (
              <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>•</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
