import { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  ShieldCheck,
  BookOpen,
  GraduationCap,
  CheckCircle,
  Newspaper
} from 'lucide-react';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, ] = useState(true);

  const slides = [
    {
      id: 1,
      title: "Revistas Indexadas",
      subtitle: "Publicaciones científicas de calidad",
      description: "Accede y difunde artículos en revistas indexadas que promueven la investigación de excelencia.",
      icon: Newspaper,
      gradient: "from-sky-600 via-cyan-500 to-blue-500",
      textColor: "text-white",
      href: "https://relaticpanama.org/_journals/",
      bullets: ["Acceso abierto a revistas científicas", "Proceso editorial transparente", "Difusión internacional"]
    },
    {
      id: 2,
      title: "Carteles Digitales",
      subtitle: "Presenta tus trabajos en formato digital",
      description: "Expón y comparte tus investigaciones a través de carteles digitales accesibles y visuales.",
      icon: FileText,
      gradient: "from-sky-500 via-cyan-400 to-blue-400",
      textColor: "text-white",
      href: "https://relaticpanama.org/_posters/",
      bullets: ["Diseño atractivo y moderno", "Fácil visualización en línea", "Difusión en eventos académicos"]
    },
    {
      id: 3,
      title: "Libros Digitales",
      subtitle: "Publica y difunde tus libros",
      description: "Accede a una plataforma digital para la publicación de libros y documentos académicos.",
      icon: BookOpen,
      gradient: "from-teal-500 via-cyan-500 to-sky-500",
      textColor: "text-white",
      href: "https://relaticpanama.org/_books/index.php/edrp/inicio",
      bullets: ["Publicación sin costo", "ISBN y DOI disponibles", "Distribución digital global"]
    },
    {
      id: 4,
      title: "Aprendizaje Continuo",
      subtitle: "Formación y actualización constante",
      description: "Accede a cursos, talleres y recursos para seguir creciendo profesionalmente.",
      icon: GraduationCap,
      gradient: "from-teal-500 via-sky-500 to-blue-600",
      textColor: "text-white",
      href: "https://relaticpanama.org/_classroom/",
      bullets: ["Cursos asincrónicos y en vivo", "Certificados oficiales", "Expertos latinoamericanos"]
    },
    {
      id: 5,
      title: "Propiedad Intelectual",
      subtitle: "Cuidamos tus derechos desde el primer día",
      description: "Nuestro equipo te acompaña en cada paso para garantizar la seguridad de tus activos intelectuales.",
      icon: ShieldCheck,
      gradient: "from-sky-600 via-cyan-600 to-blue-700",
      textColor: "text-white",
      href: "https://relaticpanama.org/_protect/",
      bullets: ["Registro de propiedad intelectual", "Asesoría personalizada", "Cobertura regional"]
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/40 to-transparent z-10 pointer-events-none" />

      <div className="relative w-full h-full">
        {slides.map((slide, index) => {
          const IconComponent = slide.icon;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`} />
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white transform rotate-45" />
                <div className="absolute top-20 right-20 w-24 h-24 border border-white rounded-full" />
                <div className="absolute bottom-20 left-20 w-16 h-16 bg-white transform rotate-12" />
                <div className="absolute bottom-10 right-10 w-20 h-20 border-2 border-white transform -rotate-45" />
              </div>

              <div className="relative z-20 h-full flex items-center justify-center px-8">
                <div className="text-center max-w-4xl">
                  <div className={`mb-8 transform transition-all duration-1000 delay-300 ${index === currentSlide ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-90'}`}> 
                    <IconComponent size={80} className={`mx-auto ${slide.textColor} drop-shadow-lg`} />
                  </div>

                  <h1 className={`text-6xl md:text-7xl font-bold mb-4 ${slide.textColor} transition-all duration-1000 delay-500 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    {slide.title}
                  </h1>

                  <h2 className={`text-2xl md:text-3xl font-light mb-6 ${slide.textColor} opacity-90 transition-all duration-1000 delay-700 ${index === currentSlide ? 'translate-y-0 opacity-90' : 'translate-y-8 opacity-0'}`}>
                    {slide.subtitle}
                  </h2>

                  <p className={`text-lg md:text-xl ${slide.textColor} opacity-80 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-900 ${index === currentSlide ? 'translate-y-0 opacity-80' : 'translate-y-8 opacity-0'}`}>
                    {slide.description}
                  </p>

                  <ul className={`mt-4 space-y-2 text-left text-base md:text-lg max-w-xl mx-auto ${slide.textColor} transition-all duration-1000 delay-[1050ms] ${index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {slide.bullets.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle size={18} className="text-white/90" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                 <a href={slide.href} rel="noopener noreferrer">
  <button
    className={`
      mt-8 px-8 py-3 rounded-full font-semibold text-white text-lg shadow-lg transform hover:scale-105 transition-all duration-300
      bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700
      hover:from-purple-500 hover:via-blue-500 hover:to-indigo-600
      hover:shadow-purple-500/25
      ${index === currentSlide ? 'translate-y-0 opacity-100 delay-[1150ms]' : 'translate-y-8 opacity-0'}
      transition-all duration-1000
    `}
  >
    Ver más detalles ✨
  </button>
</a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button onClick={prevSlide} className="absolute left-6 top-1/2 transform -translate-y-1/2 z-30 p-3 rounded-full bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 text-white hover:bg-opacity-30 transition-all duration-300 hover:scale-110">
        <ChevronLeft size={24} />
      </button>

      <button onClick={nextSlide} className="absolute right-6 top-1/2 transform -translate-y-1/2 z-30 p-3 rounded-full bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 text-white hover:bg-opacity-30 transition-all duration-300 hover:scale-110">
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white scale-125' : 'bg-white bg-opacity-50 hover:bg-opacity-75'}`}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-white bg-opacity-20 z-30">
        <div className="h-full bg-white transition-all duration-300 ease-linear" style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }} />
      </div>
    </div>
  );
};

export default Carousel;