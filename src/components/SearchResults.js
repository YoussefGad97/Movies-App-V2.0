import React from 'react';
import MovieBox from './MovieBox';
import '../styles/SearchResults.scss';

const SearchResults = ({ results }) => {
  if (!results || results.length === 0) {
    return (
      <div className="search-results">
        <h1 className="page-header">Search Results</h1>
        <div className="no-results">No movies found</div>
      </div>
    );
  }

  return (
    <div className="search-results">
      <h1 className="page-header">Search Results</h1>
      <div className="movies-list">
        {results.map((movie) => (
          <MovieBox key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults; 