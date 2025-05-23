import React, { useState, useEffect } from 'react';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const images = [
    { src: '/assets/Bienvenida.jpg', link: 'https://portaldecartelescientificos.org/Cursos' },
    { src: '/assets/Img.jpeg', link: 'https://portaldecartelescientificos.org/' },
    { src: '/assets/Img2.jpg', link: 'https://relaticpanama.org/_posters/' },
    { src: '/assets/Img3.jpg', link: 'https://relaticpanama.org/_journals/' },
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
  className="absolute bottom-5 left-4 sm:left-10 transform -translate-x-0 bg-[#1a1b59] text-white py-2 px-6 rounded-full shadow-md hover:bg-[rgba(0,0,0,0.7)] transition duration-300"
>
  Ver más
</a>
      </div>

      <button
  onClick={prevImage}
  className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 text-white bg-[#1a1b59] hover:bg-[rgba(0,0,0,0.7)] w-20 h-20 rounded-full shadow-xl hover:scale-110 transition duration-300"
>
  &lt;
</button>
<button
  onClick={nextImage}
  className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 text-white bg-[#1a1b59] hover:bg-[rgba(0,0,0,0.7)] w-20 h-20 rounded-full shadow-xl hover:scale-110 transition duration-300"
>
  &gt;
</button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-6 h-6 rounded-full cursor-pointer transition duration-300 ${
              index === currentIndex ? 'bg-[#FFFF]' : 'bg-[#1a1b59]'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;