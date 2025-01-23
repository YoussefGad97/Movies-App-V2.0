import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import MovieBox from '../components/MovieBox';
import '../styles/topMovies.scss'; // Assuming you will create a CSS file for styling

const TopMovies = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchTopMovies = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=0646712466eeb817bc8626f04f2f9532&page=${currentPage}`);
      const data = await response.json();
      setMovies(data.results);
      setTotalPages(data.total_pages);
    };

    fetchTopMovies();
  }, [currentPage]);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Simplified pagination function
  const renderPagination = () => {
    return (
      <>
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </>
    );
  };

  return (
    <div className="top-movies">
      <h1 className="page-header">Top Rated Movies</h1>
      <div className="movies-list">
        {movies.map((movie) => (
          <MovieBox key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="pagination">
        {renderPagination()}
      </div>
    </div>
  );
};

export default TopMovies;
