import React, { useState, useMemo } from 'react';
import constellationsData from '../data/constellationsData.json';
import { ConstellationCard } from '../components/ConstellationCard';
import { SearchBar } from '../components/SearchBar';
import { EmptyState } from '../components/EmptyState';
import { Modal } from '../components/Modal';
import { Sparkles, BookOpen, Star, Compass } from 'lucide-react';

/**
 * Constellation Explorer Page Component
 * Demonstrates useState, useMemo filtering, modal dialogs, and JSON data integration.
 */
export function Constellations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [hemisphereFilter, setHemisphereFilter] = useState('All');
  const [seasonFilter, setSeasonFilter] = useState('All');
  const [selectedConstellation, setSelectedConstellation] = useState(null);

  const filteredConstellations = useMemo(() => {
    return constellationsData.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.englishMeaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesHemisphere = hemisphereFilter === 'All' || item.hemisphere === hemisphereFilter;
      const matchesSeason = seasonFilter === 'All' || item.bestSeason === seasonFilter;

      return matchesSearch && matchesHemisphere && matchesSeason;
    });
  }, [searchTerm, hemisphereFilter, seasonFilter]);

  return (
    <div className="container section-padding">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="badge" style={{ marginBottom: '0.75rem' }}>Ancient Celestial Maps</span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
          Constellation Explorer
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', margin: '0.5rem auto 0 auto' }}>
          Uncover ancient star alignments, bright navigational stars, viewing seasons, and classical mythologies.
        </p>
      </div>

      {/* Control Bar: Search + Hemisphere Filter + Season Filter */}
      <div
        className="glass-card"
        style={{
          padding: '1.25rem',
          marginBottom: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}
      >
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search constellation or myth..." />

        {/* Hemisphere Filter Tabs */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', alignSelf: 'center', marginRight: '0.2rem' }}>Hemisphere:</span>
          {['All', 'Northern', 'Southern', 'Both'].map((hemi) => (
            <button
              key={hemi}
              onClick={() => setHemisphereFilter(hemi)}
              className={`btn ${hemisphereFilter === hemi ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
            >
              {hemi}
            </button>
          ))}
        </div>

        {/* Season Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Season:</span>
          <select
            value={seasonFilter}
            onChange={(e) => setSeasonFilter(e.target.value)}
            style={{
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.4rem 0.8rem',
              outline: 'none'
            }}
          >
            <option value="All">All Seasons</option>
            <option value="Winter">Winter</option>
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
            <option value="Autumn">Autumn</option>
          </select>
        </div>
      </div>

      {/* Grid Display */}
      {filteredConstellations.length > 0 ? (
        <div className="grid grid-cols-4">
          {filteredConstellations.map((constellation) => (
            <ConstellationCard
              key={constellation.id}
              constellation={constellation}
              onSelect={setSelectedConstellation}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No constellations found"
          description={`No constellations matched "${searchTerm}" for ${hemisphereFilter} hemisphere.`}
          onReset={() => {
            setSearchTerm('');
            setHemisphereFilter('All');
            setSeasonFilter('All');
          }}
        />
      )}

      {/* Detail Modal */}
      {selectedConstellation && (
        <Modal
          isOpen={!!selectedConstellation}
          onClose={() => setSelectedConstellation(null)}
          title={`${selectedConstellation.name} (${selectedConstellation.latinName})`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span className="badge">{selectedConstellation.hemisphere} Hemisphere</span>
              <span className="badge" style={{ background: 'rgba(139, 92, 246, 0.15)', color: 'var(--accent-violet)', borderColor: 'rgba(139, 92, 246, 0.3)' }}>
                Best in {selectedConstellation.bestSeason}
              </span>
            </div>

            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
              {selectedConstellation.description}
            </p>

            {/* Brightest Stars List */}
            <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Star size={16} style={{ color: 'var(--accent-cyan)' }} />
                <span>Brightest Stars</span>
              </h4>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {selectedConstellation.brightestStarsList.map((star, idx) => (
                  <li key={idx}>{star}</li>
                ))}
              </ul>
            </div>

            {/* Mythology Story Section */}
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <BookOpen size={16} style={{ color: 'var(--accent-violet)' }} />
                <span>Mythology & Legend</span>
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {selectedConstellation.mythology}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
