import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Gallery() {
  useEffect(() => {
    AOS.init({ once: false });

    const handleScroll = () => {
      AOS.refreshHard(); // Forzar re-evaluación de posición
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const images = [
    { src: "/assets/IE1.jpg", title: "Ponencia 1", description: "Presentación sobre métodos cualitativos." },
    { src: "/assets/IE2.jpg", title: "Ponencia 2", description: "Análisis de estudios de caso en educación." },
    { src: "/assets/IE3.jpg", title: "Discusión", description: "Interacción entre investigadores y asistentes." },
    { src: "/assets/IE4.jpg", title: "Panel", description: "Expertos debatiendo enfoques cualitativos." },
    { src: "/assets/IE5.jpg", title: "Taller", description: "Aprendizaje práctico sobre técnicas de análisis." },
    { src: "/assets/IE6.jpg", title: "Participantes", description: "Investigadores compartiendo experiencias." },
    { src: "/assets/IE7.jpg", title: "Cierre del evento", description: "Conclusiones y despedida del encuentro." },
    { src: "/assets/IE8.jpg", title: "Networking", description: "Espacio de conexión entre asistentes." }
  ];

  const topSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const bottomSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div
      className="p-6 md:p-10 bg-[#0a2d4d] min-h-screen"
      data-aos="fade-up"
      data-aos-once="false"
    >
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-2 drop-shadow-md">
        I Encuentro de Investigaciones Cualitativas
      </h2>
      <p className="text-center text-[#00bcd4] text-lg mb-10">
        Ciudad de Panamá | Octubre 2022
      </p>

      {/* Carrusel superior */}
      <Slider {...topSettings} className="mb-10">
        {images.slice(0, 4).map((item, index) => (
          <div key={index} className="px-2">
            <div
              className="rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/10 shadow-lg hover:scale-[1.03] transition-all duration-500"
              data-aos="zoom-in"
              data-aos-once="false"
            >
              <div className="h-64 w-full flex items-center justify-center bg-black/10">
                <img
                  src={item.src}
                  alt={item.title}
                  className="object-cover max-h-full rounded-t-3xl"
                />
              </div>
              <div className="p-6 bg-[#00bcd4] rounded-b-3xl">
                <h3 className="text-xl font-bold text-[#0a2d4d] mb-2">{item.title}</h3>
                <p className="text-white text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Carrusel inferior */}
      <Slider {...bottomSettings}>
        {images.slice(4, 8).map((item, index) => (
          <div key={index} className="px-2">
            <div
              className="rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/10 shadow-lg hover:scale-[1.03] transition-all duration-500"
              data-aos="zoom-in"
              data-aos-once="false"
            >
              <div className="h-64 w-full flex items-center justify-center bg-black/10">
                <img
                  src={item.src}
                  alt={item.title}
                  className="object-cover max-h-full rounded-t-3xl"
                />
              </div>
              <div className="p-6 bg-[#00bcd4] rounded-b-3xl">
                <h3 className="text-xl font-bold text-[#0a2d4d] mb-2">{item.title}</h3>
                <p className="text-white text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Estilos en línea para los dots blancos */}
      <style>
        {`
          .slick-dots li button:before {
            color: white !important;
            opacity: 0.5;
            font-size: 12px;
          }
          .slick-dots li.slick-active button:before {
            color: white !important;
            opacity: 1;
          }
        `}
      </style>
    </div>
  );
}
