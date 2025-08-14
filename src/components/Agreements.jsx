import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Agreements = () => {
  const images = [
    { src: '/assets/Aiu.jpeg', alt: 'AIU', href: "" },
    { src: '/assets/Centrolatinoamericano.jpeg', alt: 'Centro Latinoamericano', href: "https://cespecorporativa.org/" },
    { src: '/assets/Crupo.jpeg', alt: 'Grupo Panamá Oeste', href: "https://crupanamaoeste.up.ac.pa/" },
    { src: '/assets/Investigadores.jpeg', alt: 'Red de Investigadores', href: "https://www.facebook.com/edgardo.reedergonzalez.5" },
    { src: '/assets/Redipai.jpeg', alt: 'REDIPAI', href: "" },
    { src: '/assets/Santander.jpeg', alt: 'Universidad Santander', href: "https://usantander.edu.pa/" },
    { src: '/assets/Udellpa.jpeg', alt: 'UDEL', href: "https://udellpa.edu.pa/" },
    { src: '/assets/Uea.jpeg', alt: 'UEA', href: "" },
    { src: '/assets/Unihossana.jpeg', alt: 'Unihossana', href: "https://uh.ac.pa/" },
    { src: '/assets/Metxi.jpeg', alt: 'Metxi', href: "https://www.metxi.net/Metxi/" },
  ];

  const infiniteImages = [...images, ...images];
  const [currentIndex, setCurrentIndex] = useState(0);
  const imagesPerSlide = 5;

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + infiniteImages.length) % infiniteImages.length);
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
    AOS.refresh();

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % infiniteImages.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const containerStyle = {
    transform: `translateX(-${(currentIndex % infiniteImages.length) * (100 / imagesPerSlide)}%)`,
    transition: 'transform 0.5s ease-in-out',
  };

  return (
    <section
      className="relative w-full p-6 rounded-3xl bg-white shadow-xl border border-[#2563EBE6]/50 overflow-hidden"
      data-aos="fade-up"
      data-aos-once="false"
    >
      <h2 className="text-center text-2xl font-extrabold text-[#0a2d4d] drop-shadow-sm mb-6">
        Instituciones en convenio
      </h2>

      <div className="flex" style={containerStyle}>
        {infiniteImages.map((image, index) => (
          <div key={index} className="flex-shrink-0 w-full sm:w-1/5 px-2">
            <div className="relative bg-white border border-[#2563EBE6] rounded-xl shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <a
                href={image.href}
                target={image.href ? '_blank' : '_self'}
                rel={image.href ? 'noopener noreferrer' : ''}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-32 object-contain p-2"
                />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Botón izquierdo */}
      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#0a2d4d] hover:bg-[#00bcd4] transition duration-300 w-10 h-10 rounded-full shadow-md flex items-center justify-center"
      >
        <span className="text-white text-xl select-none">&#8249;</span>
      </button>

      {/* Botón derecho */}
      <button
        onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % infiniteImages.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#0a2d4d] hover:bg-[#00bcd4] transition duration-300 w-10 h-10 rounded-full shadow-md flex items-center justify-center"
      >
        <span className="text-white text-xl select-none">&#8250;</span>
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === currentIndex % images.length
                ? 'bg-[#0a2d4d] shadow-md scale-125'
                : 'bg-[#e0f7fa]'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Agreements;