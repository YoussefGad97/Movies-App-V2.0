import React, { useState } from 'react';
import SearchResults from './SearchResults';
import '../components/navbar.scss'; // Import the SCSS file for styling

const Navbar = () => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  const handleSearchToggle = () => {
    setSearchVisible(!isSearchVisible);
    if (!isSearchVisible) {
      // Focus the input when search becomes visible
      setTimeout(() => {
        document.querySelector('.search-input')?.focus();
      }, 100);
    } else {
      setSearchResults(null); // Clear results when closing search
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=0646712466eeb817bc8626f04f2f9532&query=${encodeURIComponent(searchTerm)}`
        );
        const data = await response.json();
        setSearchResults(data.results);
      } catch (error) {
        console.error('Error searching movies:', error);
        setSearchResults([]);
      }
    }
    setSearchVisible(false); // Hide the search input
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">Easy Movie</div>
        <ul className="navbar-links">
          <li><a href="/">Now Playing</a></li>
          <li><a href="/top-movies">Top Movies</a></li>
          <li><a href="/top-tv">Top TV</a></li>
          <li><a href="/upcoming">Upcoming</a></li>
          <li><a href="/favorites">Favorites</a></li>
        </ul>
        <button className="search-button" onClick={handleSearchToggle}>
          <i className={`fas ${isSearchVisible ? 'fa-times' : 'fa-search'}`}></i>
        </button>
      </nav>
      {isSearchVisible && (
        <div className="search-wrapper">
          <form className="search-form" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search for movies..."
              className="search-input"
            />
          </form>
        </div>
      )}
      {searchResults && <SearchResults results={searchResults} />}
    </>
  );
};

export default Navbar;
