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

        <h2 className="text-3xl font-semibold text-center text-white mb-6">Servicios y Soluciones del Portal de Carteles Científicos</h2>
        <h3 className="text-xl font-semibold text-white mb-4">
          <strong className="text-white">¿Qué ofrecemos?</strong>
        </h3>

        <p className="text-white">
          En nuestro Portal de Carteles Científicos, proporcionamos una plataforma innovadora que permite a los investigadores, 
          académicos y profesionales presentar sus proyectos de investigación de forma visual y atractiva mediante carteles 
          científicos. Este portal facilita el acceso y la difusión de investigaciones de manera eficiente, permitiendo 
          interactuar con audiencias globales.
        </p>
        <p className="text-white mt-4">
          Nuestro portal está diseñado para proporcionar una experiencia amigable para la carga, visualización y descarga de carteles 
          científicos, ayudando a que los investigadores presenten sus hallazgos de manera impactante y profesional. Además, 
          ofrecemos opciones de colaboración entre investigadores, retroalimentación en tiempo real y una plataforma de búsqueda 
          avanzada para acceder rápidamente a contenido relevante en diversas áreas de la ciencia.
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