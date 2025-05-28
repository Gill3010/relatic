import { useState, useEffect } from 'react';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [typedText, setTypedText] = useState('');

  const images = [
    { 
      src: '/assets/Bienvenida.jpg', 
      link: 'https://portaldecartelescientificos.org/Cursos', 
      text: 'Bienvenido al Portal Relatic Panamá' 
    },
    { 
      src: '/assets/Img.jpeg', 
      link: 'https://relaticpanama.org/_posters/', 
      text: 'Carteles Académicos y Científicos' 
    },
    { 
      src: '/assets/Img2.jpg', 
      link: 'https://relaticpanama.org/_books/index.php/edrp/inicio', 
      text: 'Libros Académicos y Científicos' 
    },
    { 
      src: '/assets/Img3.jpg', 
      link: 'https://relaticpanama.org/_journals/', 
      text: 'Revistas  Académicas y Científicas' 
    },
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
  }, [images.length]);

  useEffect(() => {
    const fullText = images[currentIndex].text;
    let i = 0;
    setTypedText('');

    const typeInterval = setInterval(() => {
      setTypedText(() => {
        const nextText = fullText.slice(0, i + 1);
        i++;
        if (i >= fullText.length) clearInterval(typeInterval);
        return nextText;
      });
    }, 50);

    return () => clearInterval(typeInterval);
  }, [currentIndex]);

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
    <div className="relative w-full mx-auto overflow-hidden" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="w-full h-[450px] sm:h-[500px] relative">
        <img
          src={images[currentIndex].src}
          alt={`Slide ${currentIndex + 1}`}
          className={`w-full h-full object-cover transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}
        />

        {/* Texto con efecto de escritura y fuente Poppins */}
        <div className="absolute inset-0 flex items-center justify-center text-white text-2xl sm:text-4xl font-semibold bg-black bg-opacity-50 px-4 py-2 rounded-lg text-center">
          {typedText}
        </div>

        <a
          href={images[currentIndex].link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-5 left-4 sm:left-10 transform -translate-x-0 bg-gradient-to-b from-[#00E5FF] to-[#2E332B] text-white py-2 px-6 rounded-full shadow-md hover:bg-[rgba(0,0,0,0.7)] hover:bg-blend-overlay transition duration-300"
        >
          Ver más
        </a>
      </div>

      {/* Botones con fuente Poppins también */}
      <button
        onClick={prevImage}
        className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 text-white text-xl font-bold bg-gradient-to-b from-[#00E5FF] to-[#2E332B] hover:bg-[rgba(0,0,0,0.7)] hover:bg-blend-overlay w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-xl hover:scale-110 transition duration-300"
      >
        &lt;
      </button>
      <button
        onClick={nextImage}
        className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 text-white text-xl font-bold bg-gradient-to-b from-[#00E5FF] to-[#2E332B] hover:bg-[rgba(0,0,0,0.7)] hover:bg-blend-overlay w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-xl hover:scale-110 transition duration-300"
      >
        &gt;
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-4 h-4 sm:w-6 sm:h-6 rounded-full cursor-pointer transition duration-300 ${index === currentIndex ? 'bg-gradient-to-b from-[#00E5FF] to-[#2E332B]' : 'bg-[#ffff]'}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;