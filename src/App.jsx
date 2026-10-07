import React from 'react';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

/**
 * Main App Root Component
 * Houses the persistent Navbar, main routed view area, and footer
 */
function App() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-main-content">
        <AppRoutes />
      </main>
      <footer className="app-footer">
        <div className="footer-container">
          <div className="footer-brand-info">
            <span className="footer-logo">HotelHub</span>
            <p className="footer-tagline">
              Professional Hotel Directory & Property Management Portal.
            </p>
          </div>
          <div className="footer-meta">
            <span>Frontend Architecture: React + Redux Toolkit + Vite</span>
            <span className="footer-dot">•</span>
            <span>REST API Backend Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
