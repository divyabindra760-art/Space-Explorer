import React, { useState, useMemo } from 'react';
import planetsData from '../data/planetsData.json';
import { PlanetCard } from '../components/PlanetCard';
import { SearchBar } from '../components/SearchBar';
import { EmptyState } from '../components/EmptyState';
import { ArrowUpDown, Sparkles, Orbit } from 'lucide-react';

/**
 * Solar System Explorer Page Component
 * Demonstrates useState, useMemo for filtered/sorted arrays, controlled inputs, and list rendering.
 */
export function Planets() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [sortBy, setSortBy] = useState('order'); // 'order', 'name', 'moons'

  // Efficient memoized filtering and sorting
  const filteredPlanets = useMemo(() => {
    return planetsData
      .filter((planet) => {
        const matchesSearch =
          planet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          planet.summary.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType === 'All' || planet.type === selectedType;
        return matchesSearch && matchesType;
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'moons') return b.moonsCount - a.moonsCount;
        return 0; // default order from Sun
      });
  }, [searchTerm, selectedType, sortBy]);

  return (
    <div>
      {/* Hero Section */}
      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="badge" style={{ marginBottom: '1rem' }}>SOLAR SYSTEM</span>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
            fontWeight: 900, 
            fontFamily: 'var(--font-heading)',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #ffffff 0%, var(--accent-cyan) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Explore Our Cosmic Neighborhood
          </h1>
          <p style={{ 
            color: 'var(--text-secondary)', 
            fontSize: '1.1rem',
            maxWidth: '700px', 
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Discover the eight planets of our Solar System — from the scorching worlds closest to the Sun to the icy giants at its edge.
          </p>
        </div>

        {/* Orbital Navigation Timeline */}
        <div className="glass-card" style={{ 
          padding: '2rem 1.5rem',
          marginBottom: '3rem',
          background: 'var(--glass-bg)',
          overflow: 'hidden'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            gap: '0.75rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem'
          }}>
            {/* Sun */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              minWidth: '60px'
            }}>
              <div style={{ 
                width: '48px', 
                height: '48px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #fbbf24 0%, #f59e0b 100%)',
                boxShadow: '0 0 30px rgba(251, 191, 36, 0.6)',
                marginBottom: '0.5rem'
              }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Sun</span>
            </div>

            {/* Planets */}
            {planetsData.map((planet, idx) => (
              <React.Fragment key={planet.id}>
                <div style={{ 
                  width: '24px', 
                  height: '2px', 
                  background: 'linear-gradient(90deg, var(--glass-border) 0%, transparent 100%)',
                  flexShrink: 0
                }} />
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  minWidth: '50px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                onClick={() => {
                  const planetCard = document.getElementById(`planet-${planet.id}`);
                  if (planetCard) planetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}>
                  <div style={{ 
                    width: idx < 4 ? '28px' : '38px',
                    height: idx < 4 ? '28px' : '38px',
                    borderRadius: '50%',
                    background: planet.color || 'var(--accent-blue)',
                    boxShadow: `0 0 20px ${planet.color || 'var(--accent-blue)'}, inset 0 0 10px rgba(0,0,0,0.3)`,
                    marginBottom: '0.5rem',
                    border: '2px solid rgba(255,255,255,0.1)'
                  }} />
                  <span style={{ 
                    fontSize: '0.7rem', 
                    color: 'var(--text-secondary)', 
                    fontWeight: 500,
                    textAlign: 'center'
                  }}>
                    {planet.name}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="container section-padding" style={{ paddingTop: 0 }}>
        {/* Control Bar: Search + Filter Tabs + Sort */}
        <div
          className="glass-card"
          style={{
            padding: '1.25rem',
            marginBottom: '2.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)'
          }}
        >
          <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search planet name or facts..." />

          {/* Planet Type Filter Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {['All', 'Terrestrial', 'Gas Giant', 'Ice Giant'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`btn ${selectedType === type ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
            <ArrowUpDown size={16} style={{ color: 'var(--text-muted)' }} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.5rem 0.9rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="order">Order from Sun</option>
              <option value="name">Name (A-Z)</option>
              <option value="moons">Most Moons</option>
            </select>
          </div>
        </div>

        {/* Planets Grid */}
        {filteredPlanets.length > 0 ? (
          <div className="grid grid-cols-4" style={{ marginBottom: '4rem' }}>
            {filteredPlanets.map((planet) => (
              <div key={planet.id} id={`planet-${planet.id}`}>
                <PlanetCard planet={planet} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No planets matched your search"
            description={`No planet matched "${searchTerm}" with filter "${selectedType}".`}
            onReset={() => {
              setSearchTerm('');
              setSelectedType('All');
            }}
          />
        )}

        {/* Beyond the Planets Section */}
        <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="badge" style={{ marginBottom: '0.75rem' }}>
              <Sparkles size={14} /> DID YOU KNOW?
            </span>
            <h2 style={{ 
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', 
              fontWeight: 800, 
              fontFamily: 'var(--font-heading)'
            }}>
              Beyond the Planets
            </h2>
          </div>

          <div className="grid" style={{ 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            <div className="glass-card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
              <div style={{ 
                fontSize: '2.5rem', 
                marginBottom: '0.75rem'
              }}>🌌</div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                The Solar System formed about <strong style={{ color: 'var(--accent-cyan)' }}>4.6 billion years ago</strong> from a giant rotating cloud of gas and dust.
              </p>
            </div>

            <div className="glass-card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
              <div style={{ 
                fontSize: '2.5rem', 
                marginBottom: '0.75rem'
              }}>☀️</div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                The Sun contains <strong style={{ color: 'var(--accent-cyan)' }}>99.86% of all mass</strong> in the Solar System, making it the gravitational anchor of everything.
              </p>
            </div>

            <div className="glass-card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
              <div style={{ 
                fontSize: '2.5rem', 
                marginBottom: '0.75rem'
              }}>🪐</div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                The distance between planets is <strong style={{ color: 'var(--accent-cyan)' }}>enormous</strong> compared to their sizes — space truly lives up to its name.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
