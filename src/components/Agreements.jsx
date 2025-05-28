import { useState, useEffect } from 'react';

const Agreements = () => {
  const images = [
    { src: '/assets/Aiu.jpeg', alt: '', href: "" },
    { src: '/assets/Centrolatinoamericano.jpeg', alt: '', href: "https://cespecorporativa.org/" },
    { src: '/assets/Crupo.jpeg', alt: '', href: "https://crupanamaoeste.up.ac.pa/" },
    { src: '/assets/Investigadores.jpeg', alt: '', href: "https://www.facebook.com/edgardo.reedergonzalez.5" },
    { src: '/assets/Redipai.jpeg', alt: '', href: "" },
    { src: '/assets/Santander.jpeg', alt: '', href: "https://usantander.edu.pa/" },
    { src: '/assets/Udellpa.jpeg', alt: '', href: "https://udellpa.edu.pa/" },
    { src: '/assets/Uea.jpeg', alt: '', href: "" },
    { src: '/assets/Unihossana.jpeg', alt: '', href: "https://uh.ac.pa/" },
    { src: '/assets/Metxi.jpeg', alt: '', href: "https://www.metxi.net/Metxi/" },
  ];

  const infiniteImages = [...images, ...images];

  const [currentIndex, setCurrentIndex] = useState(0);
  const imagesPerSlide = 5;

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + infiniteImages.length) % infiniteImages.length);
  };

  useEffect(() => {
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
    <div className="relative w-full bg-white p-4 rounded-lg shadow-lg border-4 border-[#FFFF00] mb-6 overflow-hidden">
      <h2 className="text-center text-2xl font-semibold text-[#1a1b59] mb-4">
        Instituciones en convenio
      </h2>

      <div className="flex" style={containerStyle}>
        {infiniteImages.map((image, index) => (
          <div key={index} className="flex-shrink-0 w-full sm:w-1/5 mx-2">
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <a href={image.href} target={image.href ? '_blank' : '_self'} rel={image.href ? 'noopener noreferrer' : ''}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-32 object-contain"
                />
              </a>
              <div className="absolute bottom-0 left-0 right-0 p-2">
                <p className="text-white text-center font-semibold">{image.alt}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
  onClick={prevImage}
  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-gradient-to-b from-[#00E5FF] to-[#2E332B] hover:bg-[rgba(0,0,0,0.7)] hover:bg-blend-overlay w-14 h-14 rounded-full shadow-xl hover:scale-110 transition duration-300 flex items-center justify-center"
>
  &#8249;
</button>

<button
  onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % infiniteImages.length)}
  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-gradient-to-b from-[#00E5FF] to-[#2E332B] hover:bg-[rgba(0,0,0,0.7)] hover:bg-blend-overlay w-14 h-14 rounded-full shadow-xl hover:scale-110 transition duration-300 flex items-center justify-center"
>
  &#8250;
</button>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <span
  key={index}
  className={`h-2 w-2 rounded-full ${index === currentIndex % images.length ? 'bg-gradient-to-b from-[#00E5FF] to-[#2E332B]' : 'bg-gray-500'}`}
/>
        ))}
      </div>
    </div>
  );
};

export default Agreements;