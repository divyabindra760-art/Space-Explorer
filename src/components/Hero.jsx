import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Sparkles, Compass } from 'lucide-react';

/**
 * Cinematic Hero Component
 * Demonstrates Semantic HTML5 <section>, CSS Flexbox/Grid alignment, gradient text, and responsive typography.
 */
export function Hero() {
  return (
    <section className="hero-section" style={{ position: 'relative', overflow: 'hidden', padding: '5rem 0 3rem 0' }}>
      {/* Background radial glow effect */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, rgba(139, 92, 246, 0.1) 40%, rgba(0, 0, 0, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '3rem'
          }}
        >
          {/* Left Hero Text Column */}
          <div>
            <div className="badge" style={{ marginBottom: '1.25rem' }}>
              <Sparkles size={14} />
              <span>Next-Gen Space Exploration</span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: '800',
                lineHeight: 1.15,
                marginBottom: '1.5rem',
                fontFamily: 'var(--font-heading)'
              }}
            >
              Explore the universe{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-blue) 50%, var(--accent-violet) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                like never before.
              </span>
            </h1>

            <p
              style={{
                fontSize: '1.15rem',
                color: 'var(--text-secondary)',
                marginBottom: '2rem',
                maxWidth: '540px'
              }}
            >
              Real-time ISS orbital tracking, interactive solar system telemetry, NASA astronomy imagery, constellation mythologies, and daily space challenges.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <Link to="/planets" className="btn btn-primary">
                <Rocket size={18} />
                <span>Start Exploring</span>
              </Link>

              <Link to="/apod" className="btn btn-secondary">
                <Compass size={18} />
                <span>Today's Space Photo</span>
              </Link>
            </div>
          </div>

          {/* Right Hero Planet Visual */}
          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '460px',
                aspectRatio: '1',
                borderRadius: '50%',
                boxShadow: '0 0 70px rgba(59, 130, 246, 0.45), 0 0 120px rgba(6, 182, 212, 0.2)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Photorealistic Earth Asset with Orbital Rings */}
              <img
                src="/hero-earth.jpg"
                alt="Earth Planet with Orbital Satellites"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '50%'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
