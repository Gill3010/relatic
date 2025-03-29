import React, { useState, useEffect } from 'react';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const images = [
    { src: '/assets/bannerevento.jpeg', link: 'https://relaticpanama.org/actividades' },
    { src: '/assets/1.png', link: 'https://ejemplo.com/2' },
    { src: '/assets/3.png', link: 'https://ejemplo.com/3' },
    { src: '/assets/6.png', link: 'https://ejemplo.com/4' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsFading(false);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setIsFading(false);
    }, 500);
  };

  const prevImage = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      setIsFading(false);
    }, 500);
  };

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      <div className="w-full h-auto max-h-[500px] relative">
        <img
          src={images[currentIndex].src}
          alt={`Imagen ${currentIndex + 1}`}
          className={`w-full h-full object-contain transition-opacity duration-500 ${
            isFading ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <a
          href={images[currentIndex].link}
          target="" 
          rel="noopener noreferrer"
          className="absolute bottom-5 left-4 sm:left-10 transform -translate-x-0 bg-gradient-to-r from-[#68358c] to-[#2d2e77] text-white py-2 px-6 rounded-full shadow-md hover:bg-gradient-to-r hover:from-[#2d2e77] hover:to-[#2d2e77] transition duration-300"
        >
          Ver más
        </a>
      </div>

      <button
        onClick={prevImage}
        className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 text-white bg-gradient-to-r from-[#68358c] to-[#2d2e77] hover:bg-gradient-to-r hover:from-[#2d2e77] hover:to-[#2d2e77] w-20 h-20 rounded-full shadow-xl hover:scale-110 transition duration-300"
      >
        &lt;
      </button>
      <button
        onClick={nextImage}
        className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 text-white bg-gradient-to-r from-[#68358c] to-[#2d2e77] hover:bg-gradient-to-r hover:from-[#2d2e77] hover:to-[#2d2e77] w-20 h-20 rounded-full shadow-xl hover:scale-110 transition duration-300"
      >
        &gt;
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-6 h-6 rounded-full cursor-pointer transition duration-300 ${
              index === currentIndex ? 'bg-white' : 'bg-gradient-to-r from-[#68358c] to-[#2d2e77]'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;