import React, { useState, useEffect } from 'react';
import MovieBox from '../components/MovieBox';
import '../styles/favorites.scss';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  return (
    <div className="favorites">
      <h1 className="page-header">My Favorites</h1>
      {favorites.length === 0 ? (
        <div className="no-favorites">
          <p>You haven't added any favorites yet.</p>
        </div>
      ) : (
        <div className="movies-list">
          {favorites.map((movie) => (
            <MovieBox 
              key={movie.id} 
              movie={movie} 
              isFavorite={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
