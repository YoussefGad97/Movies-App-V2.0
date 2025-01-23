import React, { useState, useEffect, useRef } from "react";
import "./MovieBox.scss"; // Import the SCSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

const MovieBox = ({ movie }) => {
  const { title, poster_path, overview } = movie; // Destructure the movie object
  const [isOpen, setIsOpen] = useState(false); // State to manage modal visibility
  const modalRef = useRef(null); // Ref for the modal
  const [isFavorite, setIsFavorite] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Close modal on ESC key press
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      handleClose();
    }
  };

  // Function to handle the "Watch Now" button click
  const handleWatchNow = () => {
    const searchUrl = `https://hydrahd.me/index.php?menu=search&query=${encodeURIComponent(
      title
    )}`;
    window.open(searchUrl, "_blank"); // Open the search result in a new tab
  };

  useEffect(() => {
    // Add event listener for keydown when modal is open
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    // Check if movie is in favorites
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.some(fav => fav.id === movie.id));
  }, [movie.id]);

  const toggleFavorite = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter(fav => fav.id !== movie.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      // Add to favorites
      const updatedFavorites = [...favorites, movie];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(true);
    }
  };

  return (
    <div>
      <div className="movie-box" onClick={handleOpen}>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
        />
        <h3>{title}</h3>
        <button 
          className={`favorite-button ${isFavorite ? 'active' : ''}`}
          onClick={toggleFavorite}
        >
          <FontAwesomeIcon icon={isFavorite ? solidHeart : regularHeart} />
        </button>
        {/* Description is hidden */}
      </div>

      {isOpen && (
        <div
          className="modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div className="modal-overlay" onClick={handleClose}>
            {" "}
            {/* Overlay click to close */}
            <div className="modal-content" ref={modalRef}>
              <span className="close" onClick={handleClose}>
                &times;
              </span>{" "}
              {/* Close button */}
              <div className="modal-body">
                <div className="modal-poster">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                    alt={title}
                  />
                </div>
                <div className="modal-description">
                  <h2 id="modal-title">{title}</h2>
                  <p id="modal-description">{overview}</p>
                  <button className="watch-now" onClick={handleWatchNow}>
                    Watch Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieBox;
