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
  const [isAutoPlaying] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasMounted(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const slides = [
    {
      id: 1,
      title: "Revistas Indexadas",
      subtitle: "Publicaciones científicas de calidad",
      description: "Accede y difunde artículos en revistas indexadas que promueven la investigación de excelencia.",
      icon: Newspaper,
      bgImage: "https://images.pexels.com/photos/3143813/pexels-photo-3143813.jpeg",
      textColor: "text-white",
      href: "/detalles-revistas",
      bullets: ["Acceso abierto a revistas científicas", "Proceso editorial transparente", "Difusión internacional"]
    },
    {
      id: 2,
      title: "Carteles Digitales",
      subtitle: "Presenta tus trabajos en formato digital",
      description: "Expón y comparte tus investigaciones a través de carteles digitales accesibles y visuales.",
      icon: FileText,
      bgImage: "https://media.istockphoto.com/id/1177502660/es/foto/joven-leyendo-las-noticias-en-una-tableta-moderna-mientras-se-sienta-en-su-sala-de-estar.webp?a=1&b=1&s=612x612&w=0&k=20&c=gWUU0e1SHmdTKO0vyaowOk7x2QIi4eiTdreoSSk_8hg=",
      textColor: "text-white",
      href: "/detalles-carteles",
      bullets: ["Diseño atractivo y moderno", "Fácil visualización en línea", "Difusión en eventos académicos"]
    },
    {
      id: 3,
      title: "Libros Digitales",
      subtitle: "Publica y difunde tus libros",
      description: "Accede a una plataforma digital para la publicación de libros y documentos académicos.",
      icon: BookOpen,
      bgImage: "https://images.pexels.com/photos/8199596/pexels-photo-8199596.jpeg",
      textColor: "text-white",
      href: "/detalles-libros",
      bullets: ["Publicación sin costo", "ISBN y DOI disponibles", "Distribución digital global"]
    },
    {
      id: 4,
      title: "Aprendizaje Continuo",
      subtitle: "Formación y actualización constante",
      description: "Accede a cursos, talleres y recursos para seguir creciendo profesionalmente.",
      icon: GraduationCap,
      bgImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dW5pdmVyc2lkYWR8ZW58MHx8MHx8fDA%3D",
      textColor: "text-white",
      href: "/detalles-aprendizaje",
      bullets: ["Cursos asincrónicos y en vivo", "Certificados oficiales", "Expertos latinoamericanos"]
    },
    {
      id: 5,
      title: "Propiedad Intelectual",
      subtitle: "Cuidamos tus derechos desde el primer día",
      description: "Nuestro equipo te acompaña en cada paso para garantizar la seguridad de tus activos intelectuales.",
      icon: ShieldCheck,
      bgImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZG9jdW1lbnRvcyUyMGxlZ2FsZXN8ZW58MHx8MHx8fDA%3D",
      textColor: "text-white",
      href: "/detalles-propiedad-intelectual",
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
      {/* Overlay superior simplificado */}
      <div className="absolute top-0 left-0 w-full h-32 bg-slate-900/10 z-10 pointer-events-none" />

      <div className="relative w-full h-full">
        {slides.map((slide, index) => {
          const IconComponent = slide.icon;
          const isActive = index === currentSlide && hasMounted;

          return (
            <div
              key={slide.id}
              className={`
                absolute inset-0 transition-opacity duration-1000 ease-in-out
                ${index === currentSlide ? 'opacity-100' : 'opacity-0'}
              `}
            >
              {/* Imagen de fondo */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.bgImage})` }}
              />
              
              {/* Overlay institucional para legibilidad */}
              <div className="absolute inset-0 bg-slate-900/60" />
              
              {/* Elementos decorativos geométricos sutiles */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white transform rotate-45" />
                <div className="absolute top-20 right-20 w-24 h-24 border border-white rounded-full" />
                <div className="absolute bottom-20 left-20 w-16 h-16 bg-white transform rotate-12" />
                <div className="absolute bottom-10 right-10 w-20 h-20 border-2 border-white transform -rotate-45" />
              </div>

              <div className="relative z-20 h-full flex items-center justify-center px-8">
                <div className="text-center max-w-4xl">
                  {/* Icono académico con fondo semitransparente */}
                  <div className={`mb-8 transform transition-all duration-1000 delay-300 ${isActive ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-90'}`}>
                    <div className="w-20 h-20 mx-auto bg-blue-600/90 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20">
                      <IconComponent size={40} className="text-white" />
                    </div>
                  </div>

                 {/* Título principal */}
<h1 className={`text-6xl md:text-7xl font-bold mb-4 ${slide.textColor} transition-all duration-1000 delay-500
  ${isActive ? 'translate-y-0 opacity-100 animate-zoom-in' : 'translate-y-8 opacity-0'}`}
  style={{ color: '#2563EBE6' }}>
  {slide.title}
</h1>

                  {/* Subtítulo */}
                  <h2 className={`text-2xl md:text-3xl font-light mb-6 text-white/90 transition-all duration-1000 delay-700
                    ${isActive ? 'translate-y-0 opacity-90 animate-zoom-in' : 'translate-y-8 opacity-0'}`}>
                    {slide.subtitle}
                  </h2>

                  {/* Descripción */}
                  <p className={`text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-900
                    ${isActive ? 'translate-y-0 opacity-80 animate-zoom-in' : 'translate-y-8 opacity-0'}`}>
                    {slide.description}
                  </p>

                  {/* Lista de características */}
                  <ul className={`mt-4 space-y-2 text-left text-base md:text-lg max-w-xl mx-auto text-white/85 transition-all duration-1000 delay-[1050ms] ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {slide.bullets.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle size={18} className="text-white/90" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Botón CTA académico */}
                  <a href={slide.href} rel="noopener noreferrer">
                    <button
                      className={`
                        mt-8 px-8 py-3 rounded-lg font-semibold text-white text-lg transform hover:scale-105 transition-all duration-300
                        bg-blue-600/90 backdrop-blur-sm hover:bg-blue-700/90 border border-white/20
                        ${isActive ? 'translate-y-0 opacity-100 delay-[1150ms] animate-zoom-in' : 'translate-y-8 opacity-0'}
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

      {/* Botones de navegación con diseño institucional */}
      <button 
        onClick={prevSlide} 
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-30 p-3 rounded-lg bg-white/90 border border-slate-200 text-slate-700 hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft size={24} />
      </button>

      <button 
        onClick={nextSlide} 
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-30 p-3 rounded-lg bg-white/90 border border-slate-200 text-slate-700 hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-110"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicadores de slides institucionales */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-blue-600 scale-125' 
                : 'bg-slate-400 hover:bg-slate-500'
            }`}
          />
        ))}
      </div>

      {/* Barra de progreso institucional */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-300 z-30">
        <div 
          className="h-full bg-blue-600 transition-all duration-300 ease-linear" 
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }} 
        />
      </div>
    </div>
  );
};

export default Carousel;