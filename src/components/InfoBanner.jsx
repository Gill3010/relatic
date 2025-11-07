import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, ArrowRight, Info } from 'lucide-react';

const InfoBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      text: "Únete a la Red Latinoamericana de Investigaciones Cualitativas y accede a recursos exclusivos, publicaciones indexadas y oportunidades de networking académico.",
      highlight: "¡Forma parte de nuestra comunidad académica!"
    },
    {
      id: 2,
      text: "Obtén descuentos especiales en publicaciones, acceso prioritario a eventos y certificados académicos. Regístrate hoy y comienza a disfrutar de todos los beneficios.",
      highlight: "Promoción especial para nuevos miembros"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setIsVisible(false);
      
      // Cambiar slide después de la animación de fade out
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsVisible(true);
      }, 300); // Duración de la transición
    }, 3500); // 3.5 segundos por slide (3-4 segundos como solicitaste)

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleRegisterClick = () => {
    navigate('/registro-usuario');
  };

  return (
    <div className="relative w-full bg-gradient-to-r from-blue-50 via-slate-50 to-blue-50 border-b border-slate-200/60 pt-14 sm:pt-16">
      {/* Elementos decorativos sutiles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-4 w-1 h-full bg-blue-200/30" />
        <div className="absolute top-0 right-4 w-1 h-full bg-blue-200/30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2.5 sm:py-3 md:py-3.5">
        <div className="flex items-center justify-between gap-2 sm:gap-3 md:gap-4 lg:gap-6">
          {/* Contenido del slide */}
          <div className="flex-1 flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0">
            {/* Icono informativo */}
            <div className="flex-shrink-0 hidden sm:flex">
              <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Info className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
            </div>

            {/* Texto del slide con animación */}
            <div className="flex-1 min-w-0">
              <div
                className={`w-full transition-opacity duration-300 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {/* Texto destacado (solo en desktop) */}
                <p className="hidden md:block text-xs md:text-sm font-semibold text-blue-600 mb-0.5 truncate">
                  {slides[currentSlide].highlight}
                </p>
                
                {/* Texto principal */}
                <p className="text-xs sm:text-sm md:text-base text-slate-700 leading-tight sm:leading-snug md:leading-relaxed">
                  <span className="block sm:hidden truncate">{slides[currentSlide].text}</span>
                  <span className="hidden sm:block" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {slides[currentSlide].text}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Botón de registro */}
          <div className="flex-shrink-0">
            <button
              onClick={handleRegisterClick}
              className="group relative inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 lg:px-5 lg:py-2.5 bg-emerald-500 text-white rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm md:text-base hover:bg-emerald-600 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 whitespace-nowrap"
            >
              <UserPlus className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
              <span className="hidden sm:inline">Regístrate</span>
              <span className="sm:hidden">Registro</span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-0.5 flex-shrink-0" />
            </button>
          </div>
        </div>
      </div>

      {/* Indicadores de slide (opcional, solo en desktop) */}
      <div className="hidden md:flex absolute bottom-1.5 left-1/2 transform -translate-x-1/2 gap-1.5">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-blue-600 w-4'
                : 'bg-slate-300 w-1.5'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default InfoBanner;
