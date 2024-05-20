import React, { useState, useEffect } from 'react';
import "../App.css"
const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    'https://www.spcdn.org/blog/wp-content/uploads/2022/10/dreamworks.png',
    'https://www.spcdn.org/blog/wp-content/uploads/2022/10/dreamworks.png',
    'https://www.spcdn.org/blog/wp-content/uploads/2022/10/dreamworks.png',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  return (
    <div className="relative mx-5 ">
      <div className="carousel w-full rounded-md">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-slide ${
              index === currentSlide ? 'active' : ''
            } transition-opacity duration-1000 ease-in-out`}
          >
            <img src={slide} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <button
        className="carousel-control prev absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 hover:bg-gray-300 focus:outline-none"
        onClick={prevSlide}
      >
        <svg
          className="h-6 w-6 text-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        className="carousel-control next absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 hover:bg-gray-300 focus:outline-none"
        onClick={nextSlide}
      >
        <svg
          className="h-6 w-6 text-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default Carousel;