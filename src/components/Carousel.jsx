import React, { useState, useEffect } from 'react';

const Carousel = () => {
  // Definir el estado para controlar el índice de la imagen activa
  const [currentIndex, setCurrentIndex] = useState(0);

  // Lista de las 4 imágenes del carousel (actualizadas con imágenes locales)
  const images = [
    '/assets/imagen1.webp',
    '/assets/imagen2.jpg',
    '/assets/imagen3.webp',
    '/assets/imagen4.webp',
  ];

  // Cambiar a la siguiente imagen automáticamente cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
  }, []);

  // Funciones para el control manual del carousel
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      {/* Imagen actual */}
      <div className="w-full h-auto sm:h-80 lg:h-96">
        <img
          src={images[currentIndex]}
          alt={`Imagen ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Botones de control manual */}
      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-[#68358c] hover:bg-[#2d2e77] w-14 h-14 rounded-full shadow-xl hover:scale-110 transition duration-300"
      >
        &lt;
      </button>
      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-[#68358c] hover:bg-[#2d2e77] w-14 h-14 rounded-full shadow-xl hover:scale-110 transition duration-300"
      >
        &gt;
      </button>

      {/* Indicadores de posición */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-6 h-6 rounded-full cursor-pointer transition duration-300 ${
              index === currentIndex ? 'bg-white' : 'bg-[#2d2e77]'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
