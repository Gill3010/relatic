const ScientificPostersPortal = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-[#68358c] mb-6">Servicios y Soluciones del Portal de Carteles Científicos</h2>
        <h3 className="text-xl font-semibold text-[#275Bc8] mb-4">¿Qué ofrecemos?</h3>
        <p className="text-[#275Bc8]">
          En nuestro Portal de Carteles Científicos, proporcionamos una plataforma innovadora que permite a los investigadores, 
          académicos y profesionales presentar sus proyectos de investigación de forma visual y atractiva mediante carteles 
          científicos. Este portal facilita el acceso y la difusión de investigaciones de manera eficiente, permitiendo 
          interactuar con audiencias globales.
        </p>
        <p className="text-[#275Bc8] mt-4">
          Nuestro portal está diseñado para proporcionar una experiencia amigable para la carga, visualización y descarga de carteles 
          científicos, ayudando a que los investigadores presenten sus hallazgos de manera impactante y profesional. Además, 
          ofrecemos opciones de colaboración entre investigadores, retroalimentación en tiempo real y una plataforma de búsqueda 
          avanzada para acceder rápidamente a contenido relevante en diversas áreas de la ciencia.
        </p>
        <div className="mt-6 text-center">
          <a 
            href="https://revistasrelatic.org" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#68358c] text-white px-6 py-2 rounded-lg hover:bg-[#1A4F89] transition duration-300"
          >
            Visita nuestro portal de carteles científicos
          </a>
        </div>
      </div>
    </div>
  );
};

export default ScientificPostersPortal;
