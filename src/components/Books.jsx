const Books = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="group bg-white p-6 rounded-lg shadow-lg border-4 border-[#FFD700] transform transition-transform duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-[#1a1b59] hover:via-[#1a3aa0] hover:to-[#1a8fe3]">
        
        {/* Imagen de banner */}
        <a href="https://relaticpanama.org/_posters/" target="_blank" rel="noopener noreferrer">
          <div className="relative mb-6 overflow-hidden rounded-lg border-[3px] border-solid border-[#FFD700]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1b59] via-[#1a3aa0] to-[#1a8fe3] z-0"></div>
            <img 
              src="/assets/3.png" 
              alt="Plataforma de Libros"
              className="relative w-full max-h-96 object-contain z-10" 
            />
          </div>
        </a>

        {/* Títulos con cambio de color al pasar el cursor sobre el div */}
        <h2 className="text-3xl font-semibold text-center text-[#2d2e77] mb-6 group-hover:text-white">Portal de Libros</h2>
        <h3 className="text-xl font-semibold text-[2d2e77] mb-4 group-hover:text-white">
          <strong className="text-[#2d2e77] group-hover:text-white">
            ¿Cómo facilitamos el acceso, la difusión y la gestión de libros académicos y científicos con soluciones avanzadas y adaptadas a las necesidades del sector?
          </strong>
        </h3>

        {/* Texto con fondo blanco */}
        <div className="text-[#2d2e77] group-hover:text-white text-sm sm:text-base md:text-lg">
          <p>
            En nuestro portal de libros académicos y científicos, ofrecemos una plataforma avanzada que facilita la publicación y distribución de libros de alta calidad en diversas áreas del conocimiento. Brindamos una variedad de servicios diseñados para autores, editores y lectores, incluyendo herramientas de colaboración, visibilidad internacional y soporte personalizado, asegurando que el conocimiento llegue a una audiencia global.
          </p>
          <p className="mt-4">
            Nuestro portal optimiza la gestión editorial, agiliza los procesos de publicación y ofrece un sistema eficiente de archivo para mantener el acceso continuo a libros pasados. Con un diseño intuitivo y fácil de usar, nuestra plataforma está pensada para quienes buscan una solución accesible, profesional y efectiva para publicar y compartir libros académicos y científicos.
          </p>
        </div>
        
        {/* Degradado inferior con borde blanco */}
        <div className="bg-gradient-to-r from-[#1a1b59] via-[#1a3aa0] to-[#1a8fe3] p-6 mt-6 rounded-lg shadow-lg border-[3px] border-solid border-[#FFD700]">
          <div className="text-center">
            <a 
              href="https://relaticpanama.org/_posters/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#ffd700] text-[#1a1b59] px-4 py-2 rounded-lg transition-all duration-300 hover:bg-[#1a1b59] hover:text-white hover:translate-y-2 text-xs sm:text-sm md:text-base lg:text-lg"
            >
              Visita nuestro portal de libros
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Books;