const Journals = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-[#68358c] to-[#2d2e77] p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
        {/* Imagen con efecto zoom */}
        <div className="flex justify-center mb-6">
          <img 
            src="/assets/Previstas.jpg" 
            alt="Portal de Revistas"
            className="w-48 h-48 object-cover rounded-full shadow-lg transform transition-transform duration-300 hover:scale-110" 
          />
        </div>

        <h2 className="text-3xl font-semibold text-center text-white mb-6">Servicios y Soluciones del Portal de Revistas</h2>
        <h3 className="text-xl font-semibold text-white mb-4">
          <strong className="text-white">¿Qué ofrecemos?</strong>
        </h3>

        <p className="text-white">
          En nuestro portal de revistas académicas y científicas, ofrecemos una plataforma integral que facilita la 
          publicación, distribución y acceso a investigaciones científicas de alta calidad. Nuestros servicios están 
          diseñados para apoyar a autores, editores y lectores a acceder a contenidos relevantes y actuales en diversas 
          áreas del conocimiento. Además, contamos con herramientas de colaboración, revisión por pares y opciones de 
          suscripción personalizadas para instituciones educativas.
        </p>
        <p className="text-white mt-4">
          Nuestro portal también ofrece soporte para la gestión de revistas académicas, optimización de procesos de 
          publicación, visibilidad internacional y un sistema de archivo eficiente para mantener el acceso a publicaciones 
          pasadas. Con un diseño amigable e intuitivo, nuestro portal es ideal tanto para novatos como para expertos en la 
          publicación académica.
        </p>
        
        <div className="mt-6 text-center">
          <a 
            href="https://www.revistasrelatic.org/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#a486ba] hover:bg-[#2d2e77] text-white px-6 py-2 rounded-lg transition duration-300"
          >
            Visita nuestro portal
          </a>
        </div>
      </div>
    </div>
  );
};

export default Journals;