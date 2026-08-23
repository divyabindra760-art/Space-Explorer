import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  Satellite, 
  Image, 
  Sparkles, 
  HelpCircle, 
  Rocket,
  ChevronDown,
  Target,
  Compass,
  Telescope,
  ArrowRight
} from 'lucide-react';

/**
 * About Page - Space Explorer Mission & Platform Overview
 * Redesigned as a premium showcase of the interactive space exploration platform
 */
export function About() {
  return (
    <div>
      {/* Hero Section */}
      <section style={{ 
        position: 'relative', 
        minHeight: '85vh', 
        display: 'flex', 
        alignItems: 'center',
        background: 'linear-gradient(180deg, rgba(7, 9, 19, 0.4) 0%, var(--bg-primary) 100%)',
        overflow: 'hidden'
      }}>
        {/* Background Earth Image */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=2000&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
          zIndex: -1
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <span className="badge" style={{ marginBottom: '1.5rem', fontSize: '0.85rem' }}>
            INTERACTIVE SPACE EXPLORATION
          </span>
          
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
            fontWeight: 900, 
            fontFamily: 'var(--font-heading)',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #ffffff 0%, var(--accent-cyan) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Explore Beyond<br />the Horizon.
          </h1>

          <p style={{ 
            fontSize: '1.25rem', 
            color: 'var(--text-secondary)', 
            maxWidth: '720px', 
            margin: '0 auto 2.5rem auto',
            lineHeight: 1.6
          }}>
            Space Explorer brings the universe closer through interactive experiences, real-time data and NASA-powered discoveries.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" className="btn btn-primary" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>
              Start Exploring <Rocket size={18} />
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div style={{ 
            position: 'absolute', 
            bottom: '2rem', 
            left: '50%', 
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--text-muted)',
            fontSize: '0.85rem',
            animation: 'float 3s ease-in-out infinite'
          }}>
            <span>Begin the journey</span>
            <ChevronDown size={20} />
          </div>
        </div>
      </section>

      {/* What Can You Explore Section */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="badge" style={{ marginBottom: '0.75rem' }}>Platform Features</span>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 4vw, 3rem)', 
              fontWeight: 800, 
              fontFamily: 'var(--font-heading)',
              marginBottom: '1rem'
            }}>
              What Can You Explore?
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '620px', margin: '0 auto' }}>
              Five interactive modules designed to make space exploration visual, engaging and accessible.
            </p>
          </div>

          <div className="grid" style={{ 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '2rem' 
          }}>
            <FeatureBox 
              icon={Globe}
              title="Solar System"
              description="Explore planets, distances and fascinating astronomical information."
              color="var(--accent-blue)"
            />
            <FeatureBox 
              icon={Satellite}
              title="ISS Tracker"
              description="Follow the International Space Station and discover where it is above Earth."
              color="#ef4444"
            />
            <FeatureBox 
              icon={Image}
              title="NASA APOD"
              description="Discover a new perspective of the universe through NASA's Astronomy Picture of the Day."
              color="var(--accent-cyan)"
            />
            <FeatureBox 
              icon={Sparkles}
              title="Constellations"
              description="Look beyond individual stars and discover the patterns that have fascinated humanity for centuries."
              color="var(--accent-violet)"
            />
            <FeatureBox 
              icon={HelpCircle}
              title="Space Quiz"
              description="Put your space knowledge to the test through an interactive quiz."
              color="var(--accent-pink)"
            />
          </div>
        </div>
      </section>

      {/* The Universe in Numbers */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="badge" style={{ marginBottom: '0.75rem' }}>Cosmic Scale</span>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 4vw, 3rem)', 
              fontWeight: 800, 
              fontFamily: 'var(--font-heading)'
            }}>
              The Universe in Numbers
            </h2>
          </div>

          <div className="grid" style={{ 
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
            gap: '2rem' 
          }}>
            <StatBox value="8" label="Planets in our Solar System" />
            <StatBox value="~384,400 km" label="Average Earth–Moon distance" />
            <StatBox value="~8 min 20 sec" label="Time sunlight takes to reach Earth" />
            <StatBox value="~28,000 km/h" label="Approximate ISS orbital speed" />
          </div>
        </div>
      </section>

      {/* Why Space Explorer - Split Layout */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            alignItems: 'center'
          }}>
            {/* Left: Image */}
            <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <img 
                src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?q=80&w=1200&auto=format&fit=crop"
                alt="Earth from space"
                style={{ 
                  width: '100%', 
                  height: 'auto',
                  display: 'block',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(45deg, rgba(6, 182, 212, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
                mixBlendMode: 'overlay'
              }} />
            </div>

            {/* Right: Content */}
            <div>
              <h2 style={{ 
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', 
                fontWeight: 800, 
                fontFamily: 'var(--font-heading)',
                marginBottom: '1.25rem'
              }}>
                More Than Information.<br />An Experience.
              </h2>
              
              <p style={{ 
                color: 'var(--text-secondary)', 
                fontSize: '1.05rem', 
                marginBottom: '2.5rem',
                lineHeight: 1.7
              }}>
                Space Explorer combines learning, exploration and interaction in one web experience. Built with live API-powered information and interactive UI, it transforms static space facts into engaging visual journeys.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <HighlightItem 
                  icon={Target}
                  title="Explore"
                  description="Navigate through planets, constellations and cosmic phenomena."
                />
                <HighlightItem 
                  icon={Compass}
                  title="Track"
                  description="Monitor the ISS in real-time with live telemetry data."
                />
                <HighlightItem 
                  icon={Telescope}
                  title="Discover"
                  description="Experience daily NASA imagery and test your space knowledge."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Built With Technology */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="badge" style={{ marginBottom: '0.75rem' }}>Technology Stack</span>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 4vw, 2.75rem)', 
              fontWeight: 800, 
              fontFamily: 'var(--font-heading)'
            }}>
              Built With
            </h2>
          </div>

          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '1rem', 
            justifyContent: 'center',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <TechPill name="React 19" />
            <TechPill name="JavaScript ES6+" />
            <TechPill name="Vite" />
            <TechPill name="React Router" />
            <TechPill name="CSS3" />
            <TechPill name="NASA API" />
            <TechPill name="REST APIs" />
            <TechPill name="LocalStorage" />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ 
        position: 'relative',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(180deg, var(--bg-primary) 0%, rgba(7, 9, 19, 0.8) 100%)',
        overflow: 'hidden'
      }}>
        {/* Background Galaxy */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.2,
          zIndex: -1
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: 900, 
            fontFamily: 'var(--font-heading)',
            marginBottom: '1.25rem',
            background: 'linear-gradient(135deg, #ffffff 0%, var(--accent-blue) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            The universe is waiting.
          </h2>

          <p style={{ 
            fontSize: '1.35rem', 
            color: 'var(--text-secondary)', 
            marginBottom: '2.5rem',
            maxWidth: '600px',
            margin: '0 auto 2.5rem auto'
          }}>
            Choose a destination. Start exploring.
          </p>

          <Link 
            to="/" 
            className="btn btn-primary" 
            style={{ 
              fontSize: '1.1rem', 
              padding: '1.25rem 2.5rem',
              boxShadow: '0 10px 40px rgba(59, 130, 246, 0.4)'
            }}
          >
            Start Exploring <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-10px); }
        }
      `}</style>
    </div>
  );
}

// Helper Components
function FeatureBox({ icon: Icon, title, description, color }) {
  return (
    <div className="glass-card" style={{ 
      textAlign: 'center',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'default'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = `0 12px 40px rgba(59, 130, 246, 0.25)`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'var(--glass-shadow)';
    }}>
      <div style={{ 
        width: '64px', 
        height: '64px',
        margin: '0 auto 1.25rem auto',
        borderRadius: 'var(--radius-md)',
        background: `rgba(255, 255, 255, 0.05)`,
        border: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: color
      }}>
        <Icon size={32} />
      </div>
      <h3 style={{ 
        fontSize: '1.35rem', 
        fontWeight: 700, 
        fontFamily: 'var(--font-heading)',
        marginBottom: '0.75rem'
      }}>
        {title}
      </h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
        {description}
      </p>
    </div>
  );
}

function StatBox({ value, label }) {
  return (
    <div className="glass-card" style={{ 
      textAlign: 'center',
      background: 'var(--glass-bg)',
      border: '1px solid var(--glass-border)'
    }}>
      <div style={{ 
        fontSize: 'clamp(2rem, 4vw, 3rem)', 
        fontWeight: 900, 
        fontFamily: 'var(--font-heading)',
        color: 'var(--accent-cyan)',
        marginBottom: '0.5rem'
      }}>
        {value}
      </div>
      <div style={{ 
        fontSize: '0.9rem', 
        color: 'var(--text-secondary)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        fontWeight: 600
      }}>
        {label}
      </div>
    </div>
  );
}

function HighlightItem({ icon: Icon, title, description }) {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
      <div style={{ 
        width: '48px', 
        height: '48px',
        borderRadius: 'var(--radius-md)',
        background: 'rgba(6, 182, 212, 0.1)',
        border: '1px solid rgba(6, 182, 212, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--accent-cyan)',
        flexShrink: 0
      }}>
        <Icon size={24} />
      </div>
      <div>
        <h4 style={{ 
          fontSize: '1.15rem', 
          fontWeight: 700, 
          fontFamily: 'var(--font-heading)',
          marginBottom: '0.25rem'
        }}>
          {title}
        </h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          {description}
        </p>
      </div>
    </div>
  );
}

function TechPill({ name }) {
  return (
    <div style={{
      padding: '0.65rem 1.25rem',
      borderRadius: 'var(--radius-full)',
      background: 'var(--glass-bg)',
      border: '1px solid var(--glass-border)',
      fontSize: '0.9rem',
      fontWeight: 600,
      color: 'var(--text-primary)',
      transition: 'all 0.2s ease',
      cursor: 'default'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = 'var(--accent-cyan)';
      e.currentTarget.style.color = 'var(--accent-cyan)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = 'var(--glass-border)';
      e.currentTarget.style.color = 'var(--text-primary)';
    }}>
      {name}
    </div>
  );
}
