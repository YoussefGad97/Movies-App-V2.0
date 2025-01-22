import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home'; // Importing the Home component
import TopMovies from './pages/topMovies'; // Importing the Top Movies component
import TopTV from './pages/topTV'; // Importing the Top TV component
import Upcoming from './pages/upcoming'; // Importing the Upcoming component
import Favorites from './pages/favorites'; // Importing the Favorites component
import Navbar from './components/navbar'; // Import the Navbar component
// ... other imports for additional pages

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
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
