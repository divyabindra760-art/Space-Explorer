import React, { useState, useEffect } from 'react';
import { fetchNASA_APOD } from '../services/spaceApi';
import { Loader } from '../components/Loader';
import { ErrorMessage } from '../components/ErrorMessage';
import { Modal } from '../components/Modal';
import { Calendar, Heart, Maximize2, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

/**
 * NASA APOD Page Component
 * Demonstrates Fetch API, async/await, date picker controls, local storage bookmarking, and modal image zoom.
 */
export function APOD() {
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const [favorites, setFavorites] = useLocalStorage('celestial_favorites', []);

  const loadAPOD = async (date) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchNASA_APOD(date);
      setApodData(data);
    } catch (err) {
      setError(err.message || 'Failed to retrieve NASA Astronomy Picture of the Day');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAPOD(selectedDate);
  }, [selectedDate]);

  const handlePrevDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 1);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const handleNextDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 1);
    const nextStr = d.toISOString().split('T')[0];
    if (nextStr <= todayStr) {
      setSelectedDate(nextStr);
    }
  };

  const isFavorite = apodData && favorites.some((fav) => fav.title === apodData.title && fav.type === 'apod');

  const toggleFavorite = () => {
    if (!apodData) return;
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => !(fav.title === apodData.title && fav.type === 'apod')));
    } else {
      setFavorites([
        ...favorites,
        {
          id: `apod-${apodData.date}`,
          title: apodData.title,
          image: apodData.url,
          date: apodData.date,
          explanation: apodData.explanation,
          type: 'apod',
          savedAt: new Date().toISOString()
        }
      ]);
    }
  };

  return (
    <div className="container section-padding">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="badge" style={{ marginBottom: '0.75rem' }}>NASA Official Archives</span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
          Astronomy Picture of the Day
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', margin: '0.5rem auto 0 auto' }}>
          Explore the universe through daily featured imagery, photography, and expert insights straight from NASA.
        </p>
      </div>

      {/* Control Bar: Date Selector & Day Steppers */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button onClick={handlePrevDay} className="btn btn-secondary" style={{ padding: '0.5rem 0.8rem' }}>
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-secondary)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
            <Calendar size={16} style={{ color: 'var(--accent-cyan)' }} />
            <input
              type="date"
              max={todayStr}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                outline: 'none',
                cursor: 'pointer'
              }}
            />
          </div>

          <button
            onClick={handleNextDay}
            disabled={selectedDate >= todayStr}
            className="btn btn-secondary"
            style={{ padding: '0.5rem 0.8rem', opacity: selectedDate >= todayStr ? 0.5 : 1 }}
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {apodData && (
          <button onClick={toggleFavorite} className={`btn ${isFavorite ? 'btn-primary' : 'btn-secondary'}`} style={{ fontSize: '0.85rem' }}>
            <Heart size={16} fill={isFavorite ? '#ffffff' : 'none'} />
            <span>{isFavorite ? 'Saved to Favorites' : 'Save Image'}</span>
          </button>
        )}
      </div>

      {/* Main Content Area */}
      {loading ? (
        <Loader message="Loading NASA Astronomy Picture of the Day..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={() => loadAPOD(selectedDate)} />
      ) : (
        apodData && (
          <div className="glass-card" style={{ padding: '2rem' }}>
            {/* Title & Metadata */}
            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="badge" style={{ marginBottom: '0.4rem' }}>{apodData.date}</span>
                <h2 style={{ fontSize: '1.85rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
                  {apodData.title}
                </h2>
              </div>
              {apodData.copyright && (
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  © {apodData.copyright}
                </div>
              )}
            </div>

            {/* Media Focus Container */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxHeight: '600px',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                marginBottom: '2rem',
                background: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {apodData.media_type === 'video' ? (
                <iframe
                  src={apodData.url}
                  title={apodData.title}
                  style={{ width: '100%', height: '450px', border: 'none' }}
                />
              ) : (
                <>
                  <img
                    src={apodData.url}
                    alt={apodData.title}
                    style={{ width: '100%', maxHeight: '600px', objectFit: 'contain' }}
                  />
                  <button
                    onClick={() => setIsZoomOpen(true)}
                    className="btn btn-secondary"
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      right: '16px',
                      padding: '0.5rem 0.9rem',
                      fontSize: '0.8rem',
                      background: 'rgba(7, 9, 19, 0.7)',
                      backdropFilter: 'blur(8px)'
                    }}
                  >
                    <Maximize2 size={16} />
                    <span>Zoom Image</span>
                  </button>
                </>
              )}
            </div>

            {/* Explanation Section */}
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Info size={18} style={{ color: 'var(--accent-cyan)' }} />
                <span>Scientific Explanation</span>
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7 }}>
                {apodData.explanation}
              </p>
            </div>
          </div>
        )
      )}

      {/* Fullscreen Zoom Modal */}
      {apodData && apodData.media_type !== 'video' && (
        <Modal isOpen={isZoomOpen} onClose={() => setIsZoomOpen(false)} title={apodData.title}>
          <img src={apodData.url} alt={apodData.title} style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-md)' }} />
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '1rem' }}>
            {apodData.date} — {apodData.copyright ? `© ${apodData.copyright}` : 'NASA Public Domain Archive'}
          </p>
        </Modal>
      )}
    </div>
  );
}
