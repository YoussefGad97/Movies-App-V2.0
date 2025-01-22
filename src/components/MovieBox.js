import React, { useState, useEffect, useRef } from "react";
import "./MovieBox.scss"; // Import the SCSS file for styling

const MovieBox = ({ movie }) => {
  const { title, poster_path, overview } = movie; // Destructure the movie object
  const [isOpen, setIsOpen] = useState(false); // State to manage modal visibility
  const modalRef = useRef(null); // Ref for the modal

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

  return (
    <div>
      <div className="movie-box" onClick={handleOpen}>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
        />
        <h3>{title}</h3>
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
