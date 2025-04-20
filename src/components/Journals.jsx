const Journals = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="group bg-white p-6 rounded-lg shadow-lg border-4 border-[#FFD700] transform transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-[#1a1b59] hover:via-[#1a3aa0] hover:to-[#1a8fe3]">
        
        {/* Banner con imagen */}
        <a href="https://relaticpanama.org/_journals/" target="_blank" rel="noopener noreferrer">
        <div className="relative mb-6 overflow-hidden rounded-lg border-[3px] border-solid border-[#FFD700]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1b59] via-[#1a3aa0] to-[#1a8fe3]"></div>
            <img 
              src="/assets/1.png" 
              alt="Portal de Revistas"
              className="w-full h-auto max-h-96 object-contain transform transition-transform duration-300 hover:scale-110"
            />
          </div>
        </a>

        {/* Títulos con cambio de color al pasar el cursor sobre el div */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-[#2d2e77] mb-6 group-hover:text-white">
          Portal de Revistas científicas
        </h2>
        <h3 className="text-lg sm:text-xl font-semibold text-[#2d2e77] mb-4 group-hover:text-white">
          <strong className="text-[#2d2e77] group-hover:text-white">¿Qué servicios y soluciones ofrecemos?</strong>
        </h3>

        {/* Texto con fondo blanco */}
        <div className="text-[#2d2e77] group-hover:text-white text-sm sm:text-base">
          <p>
            En nuestro portal de revistas académicas y científicas, ofrecemos soluciones integrales para la publicación, distribución y acceso a investigaciones científicas de alta calidad. Nuestros servicios están diseñados para optimizar los procesos de publicación de autores, editores y lectores, asegurando un acceso fácil y rápido a contenidos relevantes y actuales en diversas áreas del conocimiento. 
          </p>
          <p className="mt-4">
            También ofrecemos soluciones para la gestión eficiente de revistas académicas, optimización de los flujos de trabajo de publicación, aumento de la visibilidad internacional y un sistema robusto de archivo para garantizar el acceso continuo a publicaciones anteriores.
          </p>
        </div>

        {/* Degradado en la parte inferior */}
        <div className="bg-gradient-to-r from-[#1a1b59] via-[#1a3aa0] to-[#1a8fe3] p-6 mt-6 rounded-lg shadow-lg border-[3px] border-solid border-[#FFD700]">
          <div className="mt-6 text-center">
            <a 
              href="https://relaticpanama.org/_journals/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#ffd700] text-[#1a1b59] px-4 sm:px-6 py-2 rounded-lg transition-all duration-300 hover:bg-[#1a1b59] hover:text-white hover:translate-y-2 text-xs sm:text-sm md:text-base lg:text-lg"
            >
              Visita nuestro portal de revistas
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Journals;