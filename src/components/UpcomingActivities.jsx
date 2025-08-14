import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function UpcomingActivities() {
  useEffect(() => {
    AOS.init({ once: false });

    const handleScroll = () => {
      AOS.refreshHard(); // fuerza a AOS a reanalizar la posición
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const images = [
    {
      src: "/assets/AP1.jpeg",
      title: "Bienvenida Oficial",
      description: "Inicio del evento con discurso de apertura.",
    },
    {
      src: "/assets/AP2.jpeg",
      title: "Exposición Central",
      description: "Presentación de innovaciones en el campo.",
    },
    {
      src: "/assets/AP3.jpeg",
      title: "Debate Abierto",
      description: "Intercambio de ideas entre panelistas y público.",
    },
    {
      src: "/assets/AP4.jpeg",
      title: "Foro de Expertos",
      description: "Discusión profunda sobre temas de actualidad.",
    },
    {
      src: "/assets/AP5.jpeg",
      title: "Sesión Interactiva",
      description: "Demostración práctica de técnicas y herramientas.",
    },
    {
      src: "/assets/AP6.jpeg",
      title: "Conexión Profesional",
      description: "Oportunidad para establecer contactos clave.",
    },
    {
      src: "/assets/AP7.jpeg",
      title: "Cierre Solemne",
      description: "Resumen de logros y palabras de despedida.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div
      className="p-6 md:p-10 bg-slate-800 min-h-screen"
      data-aos="fade-up"
      data-aos-once="false"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-2">
        III Congreso de Investigaciones Cualitativas
      </h2>
      <p className="text-center text-slate-300 text-lg mb-10">
        🏛️ Lima - Perú | 25, 26 y 27 de Septiembre 2025
      </p>

      {/* Banner */}
      <a href="https://relaticpanama.org/_events/" rel="noopener noreferrer">
        <div className="rounded-lg overflow-hidden mb-4 border border-slate-200 hover:scale-[1.01] transition-transform duration-300">
          <img
            src="/assets/IIICongreso.jpg"
            alt="Banner del evento"
            className="w-full h-auto object-cover"
          />
        </div>
      </a>

      {/* Botón debajo del banner */}
      <div
        className="text-center mb-10 px-4"
        data-aos="fade-up"
        data-aos-once="false"
      >
        <a
          href="https://relaticpanama.org/_events/"
          rel="noopener noreferrer"
          className="px-6 py-3 w-full max-w-xs md:max-w-md lg:w-96 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 text-base font-medium inline-block hover:scale-105"
        >
          Ir al Congreso →
        </a>
      </div>

      {/* Carrusel */}
      <Slider {...settings}>
        {images.map((item, index) => (
          <div key={index} className="px-2">
            <div
              className="rounded-lg overflow-hidden bg-white border border-slate-200 hover:scale-[1.03] transition-all duration-300"
              data-aos="zoom-in"
              data-aos-once="false"
            >
              <div className="h-64 w-full flex items-center justify-center bg-slate-100">
                <img
                  src={item.src}
                  alt={item.title}
                  className="object-cover max-h-full rounded-t-lg"
                />
              </div>
              <div className="p-6 bg-white rounded-b-lg">
                <h3 className="text-xl font-bold text-slate-700 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Estilo en línea para los dots */}
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