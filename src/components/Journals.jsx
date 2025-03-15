const Journals = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-lg border-4 border-[#68358c] transform transition-transform duration-300 hover:scale-105">
        
        {/* Banner con imagen */}
        <div className="relative mb-6 overflow-hidden rounded-lg">
  <div className="absolute inset-0 bg-gradient-to-r from-[#68358c] to-[#2d2e77]"></div>
  <img 
    src="/assets/RevistaIA.webp" 
    alt="Portal de Revistas"
    className="w-full h-96 object-contain transform transition-transform duration-300 hover:scale-110"
  />
</div>

        <h2 className="text-3xl font-semibold text-center text-[#68358c] mb-6">Portal de Revistas científicas</h2>
        <h3 className="text-xl font-semibold text-[#68358c] mb-4">
          <strong className="text-[#68358c]">¿Qué servicios y soluciones ofrecemos?</strong>
        </h3>

        {/* Texto con fondo blanco */}
        <div className="text-[#68358c]">
          <p>
            En nuestro portal de revistas académicas y científicas, ofrecemos soluciones integrales para la publicación, distribución y acceso a investigaciones científicas de alta calidad. Nuestros servicios están diseñados para optimizar los procesos de publicación de autores, editores y lectores, asegurando un acceso fácil y rápido a contenidos relevantes y actuales en diversas áreas del conocimiento. Además, proporcionamos herramientas avanzadas de colaboración, revisión por pares y opciones de suscripción personalizadas para instituciones educativas.
          </p>
          <p className="mt-4">
            También ofrecemos soluciones para la gestión eficiente de revistas académicas, optimización de los flujos de trabajo de publicación, aumento de la visibilidad internacional y un sistema robusto de archivo para garantizar el acceso continuo a publicaciones anteriores. Con un diseño intuitivo y amigable, nuestro portal es la solución perfecta tanto para novatos como para expertos en la publicación académica, brindando un soporte completo en todo el ciclo de vida de las publicaciones científicas.
          </p>
        </div>

        {/* Degradado en la parte inferior */}
        <div className="bg-gradient-to-r from-[#68358c] to-[#2d2e77] p-6 mt-6 rounded-lg shadow-lg">
          <div className="mt-6 text-center">
          <a 
  href="https://www.revistasrelatic.org/" 
  target="_blank" 
  rel="noopener noreferrer"
  className="bg-[#2d2e77] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:bg-[#a486ba] hover:translate-y-2"
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