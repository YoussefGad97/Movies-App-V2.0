import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for API calls
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home'; // Importing the Home component
import TopMovies from './pages/topMovies'; // Importing the Top Movies component
import TopTV from './pages/topTV'; // Importing the Top TV component
import Upcoming from './pages/upcoming'; // Importing the Upcoming component
import Favorites from './pages/favorites'; // Importing the Favorites component
import Navbar from './components/navbar'; // Import the Navbar component
import MovieBox from './components/MovieBox'; // Assuming you have a MovieBox component
import './styles/home.scss'; // Your existing styles
// ... other imports for additional pages

function App() {
  const [movies, setMovies] = useState([]); // State to hold movie data
  const [searchPerformed, setSearchPerformed] = useState(false); // State to track if a search has been performed

  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: '0646712466eeb817bc8626f04f2f9532', // Replace with your TMDb API key
          query: searchTerm,
        },
      });
      setMovies(response.data.results); // Update the movies state with the search results
      setSearchPerformed(true); // Set searchPerformed to true after a search
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar onSearch={handleSearch} />
        <div className="movie-container">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <MovieBox key={movie.id} movie={movie} />
            ))
          ) : (
            searchPerformed && <p className="no-results">No movies found. Please try a different search.</p>
          )}
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/top-movies" element={<TopMovies />} />
          <Route path="/top-tv" element={<TopTV />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
