const ScientificPostersPortal = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-[#68358c] to-[#2d2e77] p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
        {/* Imagen con efecto zoom */}
        <div className="flex justify-center mb-6">
          <img 
            src="/assets/Pcarteles.jpg" 
            alt="Portal de Carteles Científicos"
            className="w-48 h-48 object-cover rounded-full shadow-lg transform transition-transform duration-300 hover:scale-110" 
          />
        </div>

        <h2 className="text-3xl font-semibold text-center text-white mb-6">Portal de Carteles</h2>
        <h3 className="text-xl font-semibold text-white mb-4">
          <strong className="text-white">¿Qué ofrecemos como soluciones innovadoras, personalizadas y eficientes?</strong>
        </h3>

        <p className="text-white">
  En nuestro Portal de Carteles Científicos, brindamos una plataforma avanzada que permite a los investigadores y académicos presentar sus proyectos de manera visualmente atractiva y profesional. Facilitamos la difusión de investigaciones científicas de forma global, garantizando que los contenidos lleguen a una audiencia amplia e internacional.
</p>
<p className="text-white mt-4">
  Ofrecemos soluciones diseñadas para facilitar la carga, visualización y descarga de carteles científicos, optimizando la experiencia tanto para investigadores como para su audiencia. Además, proporcionamos herramientas de colaboración entre investigadores, retroalimentación en tiempo real y una poderosa plataforma de búsqueda para acceder rápidamente a contenido relevante en distintas áreas de la ciencia, todo ello en un entorno amigable e intuitivo.
</p>
        
        <div className="mt-6 text-center">
          <a 
            href="https://portaldecartelescientificos.org/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#a486ba] hover:bg-[#2d2e77] text-white px-6 py-2 rounded-lg transition duration-300"
          >
            Visita nuestro portal de carteles científicos
          </a>
        </div>
      </div>
    </div>
  );
};

export default ScientificPostersPortal;