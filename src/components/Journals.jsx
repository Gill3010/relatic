const Journals = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-[#275Bc8] mb-6">Servicios y Soluciones del Portal de Revistas</h2>
        <h3 className="text-xl font-semibold text-[#275Bc8] mb-4">¿Qué ofrecemos?</h3>
        <p className="text-[#275Bc8]">
          En nuestro portal de revistas académicas y científicas, ofrecemos una plataforma integral que facilita la 
          publicación, distribución y acceso a investigaciones científicas de alta calidad. Nuestros servicios están 
          diseñados para apoyar a autores, editores y lectores a acceder a contenidos relevantes y actuales en diversas 
          áreas del conocimiento. Además, contamos con herramientas de colaboración, revisión por pares y opciones de 
          suscripción personalizadas para instituciones educativas.
        </p>
        <p className="text-[#275Bc8] mt-4">
          Nuestro portal también ofrece soporte para la gestión de revistas académicas, optimización de procesos de 
          publicación, visibilidad internacional y un sistema de archivo eficiente para mantener el acceso a publicaciones 
          pasadas. Con un diseño amigable e intuitivo, nuestro portal es ideal tanto para novatos como para expertos en la 
          publicación académica.
        </p>
        <div className="mt-6 text-center">
          <a 
            href="https://revistasrelatic.org" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#275Bc8] text-white px-6 py-2 rounded-lg hover:bg-[#1E4A94] transition duration-300"
          >
            Visita nuestro portal
          </a>
        </div>
      </div>
    </div>
  );
};

export default Journals;