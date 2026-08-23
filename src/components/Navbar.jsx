import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Compass, Orbit, Satellite, Image, Sparkles, HelpCircle, Bookmark, Menu, X, Info } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useLocalStorage } from '../hooks/useLocalStorage';

/**
 * Main Application Navigation Bar Component
 * Demonstrates React useState, React Router NavLink, responsive hamburger menu, and Local Storage integration.
 */
export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [favorites] = useLocalStorage('celestial_favorites', []);

  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const favoritesCount = favorites ? favorites.length : 0;

  return (
    <header className="site-header">
      <div className="container nav-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" onClick={closeMobileMenu}>
          <Orbit size={28} style={{ color: 'var(--accent-cyan)' }} />
          <span>Space Explorer</span>
        </Link>

        {/* Desktop & Mobile Navigation Links */}
        <nav aria-label="Main Navigation">
          <ul className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
            <li>
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/planets" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
                Solar System
              </NavLink>
            </li>
            <li>
              <NavLink to="/iss" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
                ISS Tracker
              </NavLink>
            </li>
            <li>
              <NavLink to="/apod" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
                NASA APOD
              </NavLink>
            </li>
            <li>
              <NavLink to="/constellations" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
                Constellations
              </NavLink>
            </li>
            <li>
              <NavLink to="/quiz" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
                Space Quiz
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
                About
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Navigation Action Buttons */}
        <div className="nav-actions">
          <Link to="/favorites" className="icon-btn" aria-label="Saved Favorites" title="Saved Favorites" onClick={closeMobileMenu}>
            <Bookmark size={20} />
            {favoritesCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: 'var(--accent-pink)',
                  color: '#fff',
                  fontSize: '0.7rem',
                  fontWeight: 'bold',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {favoritesCount}
              </span>
            )}
          </Link>

          <ThemeToggle />

          <button
            className="icon-btn nav-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
