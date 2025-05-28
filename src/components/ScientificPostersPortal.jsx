import { motion } from 'framer-motion';

const ScientificPostersPortal = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2, ease: 'easeOut' }}
      className="w-full max-w-[22cm] mx-auto px-4 py-4"
    >
      <div className="group bg-[linear-gradient(to_bottom,#00E5FF,#2E332B)] p-4 rounded-lg shadow-lg border-4 border-[#FFFF00] transform transition-all duration-300 hover:scale-[1.02] hover:bg-[linear-gradient(to_bottom,#2E332B,#00E5FF)] flex flex-col min-h-[500px]">
        
        {/* Banner pequeño igual a Journals */}
        <a href="https://relaticpanama.org/_posters/" target="_blank" rel="noopener noreferrer">
         <div className="relative overflow-hidden rounded-lg border-[3px] border-solid border-[#FFFF00] aspect-video">
  <div className="absolute inset-0 bg-[#1a1b59] opacity-10"></div>
  <img 
    src="/assets/2.png" 
    alt="Portal de Carteles científicos"
    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
  />
</div>
        </a>

        {/* Contenido de texto */}
        <div className="flex flex-col gap-1 flex-grow">
          <h2 className="text-lg font-bold text-center text-[#FFFF00] group-hover:text-[#FFFF00]">
            Carteles Científicos Virtuales
          </h2>
          <h3 className="text-sm font-bold text-[#fff] group-hover:text-white">
            ¿Qué soluciones ofrecemos?
          </h3>
          <div className="text-[#ffff] group-hover:text-white text-xs space-y-1 max-h-[150px] overflow-y-auto font-bold">
            <p>
              Plataforma avanzada para presentar proyectos científicos de forma visual y profesional.
            </p>
            <p>
              Soluciones para carga, visualización y descarga de carteles científicos.
            </p>
            <p>
              Herramientas de colaboración y retroalimentación en tiempo real con buscador especializado.
            </p>
            <p>
              Instrumentos de cooperación y valoración sincrónica con motor de búsqueda específico.
            </p>
          </div>
        </div>

        {/* Botón más abajo */}
        <div className="bg-gradient-to-r from-white via-[#dcdcdc] to-[#a9a9a9] p-2 mt-auto rounded-lg border-[0px] border-solid border-[#FFFF00]">
          <a
            href="https://relaticpanama.org/_posters/"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gradient-to-r from-white via-[#dcdcdc] to-[#a9a9a9] text-[#1a1b59] px-3 py-1 rounded-lg transition-all duration-300 hover:bg-[#1a1b59] hover:text-[#39FF14] text-xs text-center font-bold"
            style={{ border: '0px solid #FFFF00' }}
          >
            Más Información
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ScientificPostersPortal;