import React, { useState, useEffect, useRef } from 'react';
import { fetchISSPosition } from '../services/spaceApi';
import { OrbitRadar } from '../components/OrbitRadar';
import { Loader } from '../components/Loader';
import { ErrorMessage } from '../components/ErrorMessage';
import { Satellite, Compass, Gauge, Clock, RefreshCw, Play, Pause, AlertCircle } from 'lucide-react';

/**
 * ISS Live Tracker Page Component
 * Demonstrates useState, useEffect polling interval, useRef for timer references, canvas radar rendering, and live API fetch.
 */
export function ISS() {
  const [telemetry, setTelemetry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAutoPolling, setIsAutoPolling] = useState(true);
  const intervalRef = useRef(null);

  const loadISSTelemetry = async () => {
    try {
      setError(null);
      const data = await fetchISSPosition();
      setTelemetry(data);
    } catch (err) {
      setError(err.message || 'Failed to connect to ISS orbital tracker API');
    } finally {
      setLoading(false);
    }
  };

  // Effect for initial fetch and polling interval
  useEffect(() => {
    loadISSTelemetry();

    if (isAutoPolling) {
      intervalRef.current = setInterval(() => {
        loadISSTelemetry();
      }, 5000); // poll every 5s
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPolling]);

  const togglePolling = () => {
    setIsAutoPolling((prev) => !prev);
  };

  return (
    <div className="container section-padding">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="badge badge-live">LIVE ISS TRACKER</span>
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginTop: '0.5rem' }}>
          International Space Station Tracker
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', margin: '0.5rem auto 0 auto' }}>
          Track the real-time orbital trajectory of the ISS as it orbits Earth at 27,600 km/h (17,500 mph).
        </p>
      </div>

      {/* Control Toolbar */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button onClick={loadISSTelemetry} className="btn btn-primary" style={{ fontSize: '0.85rem' }}>
            <RefreshCw size={16} />
            <span>Fetch Latest Telemetry</span>
          </button>

          <button onClick={togglePolling} className="btn btn-secondary" style={{ fontSize: '0.85rem' }}>
            {isAutoPolling ? <Pause size={16} /> : <Play size={16} />}
            <span>{isAutoPolling ? 'Pause Auto-Poll (5s)' : 'Resume Auto-Poll'}</span>
          </button>
        </div>

        {telemetry && (
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={16} />
            <span>Last Updated: {new Date(telemetry.timestamp * 1000).toLocaleTimeString()}</span>
          </div>
        )}
      </div>

      {/* Loading or Error States */}
      {loading && !telemetry ? (
        <Loader message="Receiving satellite telemetry signal..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={loadISSTelemetry} />
      ) : (
        telemetry && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Live Telemetry Metric Cards */}
            <div className="grid grid-cols-4">
              <div className="glass-card">
                <div style={{ color: 'var(--accent-cyan)', marginBottom: '0.2rem' }}><Compass size={24} /></div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>LATITUDE</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
                  {telemetry.latitude}°
                </div>
              </div>

              <div className="glass-card">
                <div style={{ color: 'var(--accent-blue)', marginBottom: '0.2rem' }}><Compass size={24} /></div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>LONGITUDE</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
                  {telemetry.longitude}°
                </div>
              </div>

              <div className="glass-card">
                <div style={{ color: 'var(--accent-violet)', marginBottom: '0.2rem' }}><Satellite size={24} /></div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>ALTITUDE</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
                  {telemetry.altitude} km
                </div>
              </div>

              <div className="glass-card">
                <div style={{ color: '#ef4444', marginBottom: '0.2rem' }}><Gauge size={24} /></div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>ORBITAL SPEED</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
                  {telemetry.velocity.toLocaleString()} km/h
                </div>
              </div>
            </div>

            {/* Offline Simulation Banner if offline */}
            {telemetry.note && (
              <div style={{ background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#f59e0b' }}>
                <AlertCircle size={16} />
                <span>{telemetry.note}</span>
              </div>
            )}

            {/* Canvas Orbital Radar Visualization */}
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>
                Live Orbital Crosshair Radar
              </h2>
              <OrbitRadar
                latitude={telemetry.latitude}
                longitude={telemetry.longitude}
                altitude={telemetry.altitude}
              />
            </div>
          </div>
        )
      )}
    </div>
  );
}
