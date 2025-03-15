const ScientificPostersPortal = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-lg border-4 border-[#68358c] transform transition-transform duration-300 hover:scale-105">
        
        {/* Banner con imagen */}
        <div className="relative mb-6 overflow-hidden rounded-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-[#68358c] to-[#2d2e77]"></div>
  <img 
    src="/assets/CartelIA.webp" 
    alt="Plataforma de Carteles cientificos"
    className="w-full h-96 object-contain transform transition-transform duration-300 hover:scale-110" 
  />
</div>

        <h2 className="text-3xl font-semibold text-center text-[#68358c] mb-6">Portal de Carteles científicos</h2>
        <h3 className="text-xl font-semibold text-[#68358c] mb-4">
          <strong className="text-[#68358c]">¿Qué ofrecemos como soluciones innovadoras, personalizadas y eficientes?</strong>
        </h3>

        {/* Texto con fondo blanco */}
        <div className="text-[#68358c]">
          <p>
            En nuestro Portal de Carteles Científicos, brindamos una plataforma avanzada que permite a los investigadores y académicos presentar sus proyectos de manera visualmente atractiva y profesional. Facilitamos la difusión de investigaciones científicas de forma global, garantizando que los contenidos lleguen a una audiencia amplia e internacional.
          </p>
          <p className="mt-4">
            Ofrecemos soluciones diseñadas para facilitar la carga, visualización y descarga de carteles científicos, optimizando la experiencia tanto para investigadores como para su audiencia. Además, proporcionamos herramientas de colaboración entre investigadores, retroalimentación en tiempo real y una poderosa plataforma de búsqueda para acceder rápidamente a contenido relevante en distintas áreas de la ciencia, todo ello en un entorno amigable e intuitivo.
          </p>
        </div>

        {/* Degradado en la parte inferior */}
        <div className="bg-gradient-to-r from-[#68358c] to-[#2d2e77] p-6 mt-6 rounded-lg shadow-lg">
          <div className="mt-6 text-center">
            <a 
              href="https://portaldecartelescientificos.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#2d2e77] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:bg-[#a486ba] hover:translate-y-2"
            >
              Visita nuestro portal de carteles
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScientificPostersPortal;