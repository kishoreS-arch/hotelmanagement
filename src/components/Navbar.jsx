import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand">
          <span className="brand-name">🏨 HotelHub</span>
        </Link>

        {/* Navigation Links */}
        <nav className="navbar-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link ${isActive ? 'nav-link-active' : ''}`
            }
          >
            Hotels
          </NavLink>

          <NavLink
            to="/add"
            className={({ isActive }) =>
              `nav-link nav-link-add ${isActive ? 'nav-link-active' : ''}`
            }
          >
            + Add Hotel
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
