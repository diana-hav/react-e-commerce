import { useState } from "react";
import "./Carousel.css";
import Product from "../Product/Product";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Carousel = ({ title, products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  const handleNext = () => {
    if (currentIndex + itemsPerPage < products.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(Math.max(0, currentIndex - itemsPerPage));
    }
  };

  const visibleProducts = products.slice(currentIndex, currentIndex + itemsPerPage);
  const canGoNext = currentIndex + itemsPerPage < products.length;
  const canGoPrev = currentIndex > 0;

  return (
    <div className="carousel-container">
      <div className="carousel-header">
        <h2>{title}</h2>
        <div className="carousel-controls">
          <button 
            className="carousel-btn prev" 
            onClick={handlePrev}
            disabled={!canGoPrev}
            aria-label="Previous"
          >
            <FaChevronLeft />
          </button>
          <span className="carousel-counter">
            {currentIndex + 1}-{Math.min(currentIndex + itemsPerPage, products.length)} из {products.length}
          </span>
          <button 
            className="carousel-btn next" 
            onClick={handleNext}
            disabled={!canGoNext}
            aria-label="Next"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="carousel-content">
        <div className="carousel-track">
          {visibleProducts.map((product) => (
            <div key={product._id} className="carousel-item">
              <Product product={product} />
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-dots">
        {Array.from({ length: Math.ceil(products.length / itemsPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              className={`dot ${
                Math.floor(currentIndex / itemsPerPage) === index ? "active" : ""
              }`}
              onClick={() => setCurrentIndex(index * itemsPerPage)}
              aria-label={`Go to page ${index + 1}`}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Carousel;
