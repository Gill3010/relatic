const LearningPlatform = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="group bg-white p-6 rounded-lg shadow-lg border-4 border-[#FFD700] transform transition-transform duration-300 hover:scale-105 hover:bg-[#1a1b59]">
        
        {/* Banner con imagen */}
        <a href="https://portaldecartelescientificos.org/Cursos" target="" rel="noopener noreferrer">
          <div className="relative mb-6 overflow-hidden rounded-lg border-[3px] border-[#FFD700]">
          <div className="absolute inset-0 bg-[#1a1b59]"></div>
            <img 
              src="/assets/4.png" 
              alt="Plataforma de Aprendizaje"
              className="w-full h-auto max-h-96 object-contain transform transition-transform duration-300 hover:scale-110" 
            />
          </div>
        </a>

        {/* Títulos con cambio de color al pasar el cursor sobre el div */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-[#1a1b59] mb-6 group-hover:text-white">
          Plataforma Integral de Aprendizaje Continuo
        </h2>
        <h3 className="text-lg sm:text-xl font-semibold text-[#1a1b59] mb-4 group-hover:text-white">
          <strong className="text-[#1a1b59] group-hover:text-white">
            ¿Cómo transformamos el aprendizaje continuo con soluciones personalizadas, interactivas y accesibles para todos los niveles de conocimiento?
          </strong>
        </h3>

        {/* Texto con fondo blanco */}
        <div className="text-[#1a1b59] group-hover:text-white text-sm sm:text-base">
          <p>
            Transformamos el aprendizaje continuo ofreciendo una plataforma flexible y accesible que apoya a estudiantes, profesionales y académicos en su desarrollo constante. Proporcionamos una amplia variedad de cursos, recursos educativos interactivos y herramientas de colaboración para facilitar el aprendizaje en múltiples áreas del conocimiento.
          </p>
          <p className="mt-4">
            Además, ofrecemos sistemas avanzados de seguimiento del progreso, evaluación continua y la oportunidad de integrarse en una comunidad activa que promueve el aprendizaje colaborativo. Esta plataforma está diseñada para quienes buscan una solución educativa que se ajuste a sus intereses, con una experiencia de aprendizaje personalizada y accesible.
          </p>
        </div>

        {/* Degradado en la parte inferior con borde blanco */}
        <div className="bg-[#1a1b59] p-6 mt-6 rounded-lg shadow-lg border-[3px] border-[#FFD700]">
          <div className="mt-6 text-center">
          <a
  href="https://portaldecartelescientificos.org/Cursos"
  target=""
  rel="noopener noreferrer"
  className="bg-[#FFD700] text-[#1a1b59] px-4 sm:px-6 py-2 rounded-lg transition-all duration-300 hover:bg-[#1a1b59] hover:text-white hover:translate-y-2 text-xs sm:text-sm md:text-base lg:text-lg"
  style={{ border: '3px solid #ffd700' }}
>
  Descubre nuestros servicios
</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPlatform;
