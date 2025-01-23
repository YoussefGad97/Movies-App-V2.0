import React, { useEffect, useState } from 'react';
import MovieBox from '../components/MovieBox'; // Assuming you have a MovieBox component
import '../styles/upcoming.scss';

const UpcomingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchUpcomingMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=0646712466eeb817bc8626f04f2f9532&page=${currentPage}`
    );
    const data = await response.json();
    setMovies(data.results);
    setTotalPages(data.total_pages); // Set total pages for pagination
  };

  useEffect(() => {
    fetchUpcomingMovies();
  }, [currentPage]);

  return (
    <div className="upcoming-movies">
      <h1>Upcoming Movies</h1>
      <div className="movies-list">
        {movies.map(movie => (
          <MovieBox key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="pagination">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UpcomingMovies;
