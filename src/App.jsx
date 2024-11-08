import { useState, useEffect } from 'react';
import { data } from './data';

const Gallery = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Function to handle image click
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // Function to handle closing the modal when clicking outside the image or on the "X" button
  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedImage(null);
    }
  };

  // Dynamically calculate column count based on window size
  const columnCount = windowSize.width < 600 ? 2 : 4;
  const rowHeight = 300;

  return (
    <>
      <div>
        <h1>Weylons Drawings</h1>
      </div>

      {/* Gallery with CSS Grid */}
      <div className="gallery">
        {data.map((image, index) => (
          <div key={index} className="image-container">
            <img
              src={image}
              alt={`Image ${index}`}
              className="gallery-image"
              onClick={() => handleImageClick(image)} // Open modal on click
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content">
            {/* Close button (X) */}
            <button className="close-modal" onClick={() => setSelectedImage(null)}>
              &times;
            </button>
            <img src={selectedImage} alt="Selected" className="modal-image" />
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
