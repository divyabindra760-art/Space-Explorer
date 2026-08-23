import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { Home } from './pages/Home';
import { Planets } from './pages/Planets';
import { PlanetDetail } from './pages/PlanetDetail';
import { ISS } from './pages/ISS';
import { APOD } from './pages/APOD';
import { Constellations } from './pages/Constellations';
import { Quiz } from './pages/Quiz';
import { Favorites } from './pages/Favorites';
import { About } from './pages/About';
import { NotFound } from './pages/NotFound';

/**
 * Master Application Component
 * Configures React Router routes, layout wrappers (Navbar, Footer), and global container structure.
 */
function App() {
  return (
    <BrowserRouter>
      <div className="cosmic-bg" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/planets" element={<Planets />} />
            <Route path="/planet/:id" element={<PlanetDetail />} />
            <Route path="/iss" element={<ISS />} />
            <Route path="/apod" element={<APOD />} />
            <Route path="/constellations" element={<Constellations />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;