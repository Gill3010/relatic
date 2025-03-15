import React, { useState, useEffect } from 'react';

const Agreements = () => {
  // Lista de 10 imágenes para el carrusel
  const images = [
    '/assets/Aiu.jpeg',
    '/assets/Centrolatinoamericano.jpeg',
    '/assets/Crupo.jpeg',
    '/assets/Investigadores.jpeg',
    '/assets/Redipai.jpeg',
    '/assets/Relatic.jpeg',
    '/assets/Santander.jpeg',
    '/assets/Udellpa.jpeg',
    '/assets//Uea.jpeg',
    '/assets/Unihossana.jpeg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const imagesPerSlide = 5; // Mostrar 5 imágenes a la vez

  // Función para mover al siguiente grupo de imágenes (5 en 5)
  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + imagesPerSlide) % images.length
    );
  };

  // Función para mover al grupo anterior de imágenes
  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - imagesPerSlide + images.length) % images.length
    );
  };

  // Cambiar de imagen cada 3 segundos (auto)
  useEffect(() => {
    const interval = setInterval(nextImage, 3000);
    return () => clearInterval(interval); // Limpiar intervalo al desmontar el componente
  }, []);

  return (
    <div className="relative w-full overflow-hidden mb-10 bg-white p-4 rounded-lg shadow-lg border-4 border-[#68358c]">
      {/* Título */}
      <h2 className="text-center text-2xl font-semibold text-[#68358c] mb-4">
        Instituciones en convenio
      </h2>

      <div
        className="flex transition-all duration-500 ease-in-out"
        style={{
          transform: `translateX(-${(currentIndex % images.length) * (100 / imagesPerSlide)}%)`,
        }}
      >
        {images.map((image, index) => (
          <div key={index} className="flex-shrink-0 w-full sm:w-1/5">
            <img
              src={image}
              alt={`Agreement ${index + 1}`}
              className="w-auto h-32 mx-auto object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Botones de control */}
      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-gradient-to-r from-[#68358c] to-[#2d2e77] hover:bg-[#275Bc8] w-14 h-14 rounded-full shadow-xl hover:scale-110 transition duration-300 flex items-center justify-center"
      >
        &#8249;
      </button>
      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-gradient-to-r from-[#68358c] to-[#2d2e77] hover:bg-[#275Bc8] w-14 h-14 rounded-full shadow-xl hover:scale-110 transition duration-300 flex items-center justify-center"
      >
        &#8250;
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full ${index === currentIndex ? 'bg-[#275Bc8]' : 'bg-gray-500'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Agreements;
