import React, { useEffect, useState } from "react";
import MovieBox from "../components/MovieBox";
import "../styles/topTv.scss";

const TopTV = () => {
  const [tvShows, setTvShows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchTopTVShows = async () => {
      // Fetching top-rated TV shows from the TMDb API
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=0646712466eeb817bc8626f04f2f9532&page=${currentPage}`
      );
      const data = await response.json();
      
      // Ensure that the titles are fetched properly
      setTvShows(data.results.map(show => ({
        ...show,
        title: show.name // Assuming the title is stored in 'name'
      }))); // Set the TV shows state with the fetched data
      setTotalPages(data.total_pages); // Set total pages from the API response
    };

    fetchTopTVShows();
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
    <div className="top-tv">
      <h1 className="page-header">Top TV Shows</h1>
      <div className="movies-list">
        {tvShows.map((show) => (
          <MovieBox key={show.id} movie={show} />
        ))}
      </div>
      <div className="pagination">
        {renderPagination()}
      </div>
    </div>
  );
};

export default TopTV;
