import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import MovieBox from '../components/MovieBox';
import '../styles/home.scss'; // Assuming you will create a CSS file for styling

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const moviesPerPage = 20; // Number of movies per page

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=0646712466eeb817bc8626f04f2f9532&page=${currentPage}`);
      const data = await response.json();
      setMovies(data.results); // Set the movies state with the fetched data
      setTotalPages(data.total_pages); // Set total pages from the API response
    };

    fetchMovies();
  }, [currentPage]);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Generate pagination numbers
  const renderPagination = () => {
    const paginationNumbers = [];
    const startPage = Math.floor((currentPage - 1) / 10) * 10 + 1; // Calculate the start page for the current set of 10
    const endPage = Math.min(startPage + 9, totalPages); // Calculate the end page

    for (let i = startPage; i <= endPage; i++) {
      paginationNumbers.push(
        <button
          key={i}
          className={`pagination-button ${i === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return paginationNumbers;
  };

  return (
    <div>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieBox key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="pagination">
        {renderPagination()}
        {currentPage < totalPages && (
          <button className="pagination-button" onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
