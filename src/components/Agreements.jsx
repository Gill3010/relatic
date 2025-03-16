import React, { useState, useEffect } from 'react';

const Agreements = () => {
  // Lista de 10 imágenes para las instituciones
  const images = [
    { src: '/assets/Aiu.jpeg', alt: 'AIU' },
    { src: '/assets/Centrolatinoamericano.jpeg', alt: 'Centrolatinoamericano' },
    { src: '/assets/Crupo.jpeg', alt: 'CRUPO' },
    { src: '/assets/Investigadores.jpeg', alt: 'Investigadores' },
    { src: '/assets/Redipai.jpeg', alt: 'REDIPAI' },
    { src: '/assets/Relatic.jpeg', alt: 'RELATIC' },
    { src: '/assets/Santander.jpeg', alt: 'Santander' },
    { src: '/assets/Udellpa.jpeg', alt: 'UDELLPA' },
    { src: '/assets/Uea.jpeg', alt: 'UEA' },
    { src: '/assets/Unihossana.jpeg', alt: 'Unihossana' },
  ];

  // Duplicar las imágenes para crear un efecto de carrusel infinito
  const infiniteImages = [...images, ...images];

  const [currentIndex, setCurrentIndex] = useState(0);
  const imagesPerSlide = 5; // Mostrar 5 imágenes por carrusel

  // Función para mover al siguiente grupo de imágenes (5 en 5)
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % infiniteImages.length);
  };

  // Función para mover al grupo anterior de imágenes
  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + infiniteImages.length) % infiniteImages.length
    );
  };

  // Cambiar de imagen cada 3 segundos (auto)
  useEffect(() => {
    const interval = setInterval(nextImage, 3000);
    return () => clearInterval(interval); // Limpiar intervalo al desmontar el componente
  }, []);

  return (
    <div className="relative w-full bg-white p-4 rounded-lg shadow-lg border-4 border-[#68358c] mb-6 overflow-hidden"> 
      {/* Título */}
      <h2 className="text-center text-2xl font-semibold text-[#68358c] mb-4">
        Instituciones en convenio
      </h2>

      {/* Carrusel de imágenes */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${(currentIndex % images.length) * (100 / imagesPerSlide)}%)`,
        }}
      >
        {infiniteImages.map((image, index) => (
          <div key={index} className="flex-shrink-0 w-full sm:w-1/5 mx-2">
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-32 object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#68358c] to-[#2d2e77] p-2">
                <p className="text-white text-center font-semibold">{image.alt}</p>
              </div>
            </div>
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