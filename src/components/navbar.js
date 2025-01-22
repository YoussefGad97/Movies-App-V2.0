import React from 'react';
import '../components/navbar.scss'; // Import the CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">My Movie App</div>
      <ul className="navbar-links">
        <li><a href="/">Now Playing</a></li>
        <li><a href="/top-movies">Top Movies</a></li>
        <li><a href="/top-tv">Top TV</a></li>
        <li><a href="/upcoming">Upcoming</a></li>
        <li><a href="/favorites">Favorites</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
