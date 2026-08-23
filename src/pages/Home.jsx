import React from 'react';
import { Hero } from '../components/Hero';
import { StatCard } from '../components/StatCard';
import { FeatureCard } from '../components/FeatureCard';
import { Globe, Satellite, Image, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { fetchISSPosition } from '../services/spaceApi';

/**
 * Homepage Component
 * Demonstrates component composition, hero layout, live telemetry integration, and responsive grid system.
 */
export function Home() {
  const { data: issData } = useFetch(fetchISSPosition, true);

  const issAltitude = issData ? `${issData.altitude} km` : '418 km';

  return (
    <div>
      {/* Cinematic Hero */}
      <Hero />

      {/* Statistics Section */}
      <section className="section-padding" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <div className="grid grid-cols-4">
            <StatCard
              label="Planets"
              value="08"
              subtext="Solar System Worlds"
              icon={Globe}
              color="var(--accent-blue)"
            />
            <StatCard
              label="ISS Altitude"
              value={issAltitude}
              subtext="Orbiting at 27,600 km/h"
              icon={Satellite}
              isLive={true}
              color="#ef4444"
            />
            <StatCard
              label="Constellations"
              value="88"
              subtext="Official Sky Regions"
              icon={Sparkles}
              color="var(--accent-violet)"
            />
            <StatCard
              label="NASA Data"
              value="LIVE"
              subtext="Daily Space Photography"
              icon={Image}
              isLive={true}
              color="var(--accent-cyan)"
            />
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="badge" style={{ marginBottom: '0.75rem' }}>Interactive Features</span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
              Explore The Platform
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '560px', margin: '0.5rem auto 0 auto' }}>
              Choose an exploration module below to begin discovering real astronomical telemetry, imagery, and interactive space knowledge.
            </p>
          </div>

          <div className="grid grid-cols-3">
            <FeatureCard
              title="Solar System Explorer"
              description="Discover detailed scientific data, gravitational metrics, atmospheric conditions, and moon counts of our 8 neighbor planets."
              route="/planets"
              image="https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=800&auto=format&fit=crop"
              icon={Globe}
              badgeText="Solar System"
              accentColor="var(--accent-blue)"
            />

            <FeatureCard
              title="ISS Live Tracker"
              description="Track the International Space Station's real-time position over Earth with live latitude, longitude, altitude, and radar map visualization."
              route="/iss"
              image="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=800&auto=format&fit=crop"
              icon={Satellite}
              badgeText="Real-Time API"
              accentColor="#ef4444"
            />

            <FeatureCard
              title="NASA Photo of the Day"
              description="View stunning daily astronomical imagery from NASA's archives with full cosmic explanations and high-res viewing options."
              route="/apod"
              image="https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=800&auto=format&fit=crop"
              icon={Image}
              badgeText="NASA APOD"
              accentColor="var(--accent-cyan)"
            />

            <FeatureCard
              title="Constellation Explorer"
              description="Explore ancient star maps, mythological tales, brightest stars, and best viewing seasons across Northern and Southern hemispheres."
              route="/constellations"
              image="https://images.unsplash.com/photo-1502134249126-9f3755a50d78?q=80&w=800&auto=format&fit=crop"
              icon={Sparkles}
              badgeText="Star Maps"
              accentColor="var(--accent-violet)"
            />

            <FeatureCard
              title="Daily Space Quiz"
              description="Challenge your cosmic knowledge with 10 questions, track your score, get detailed explanations, and save high scores in Local Storage."
              route="/quiz"
              image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
              icon={HelpCircle}
              badgeText="10 Questions"
              accentColor="var(--accent-pink)"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
