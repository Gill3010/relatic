import { motion } from 'framer-motion';

const LearningPlatform = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}  // Desplazamiento desde la derecha
      animate={{ opacity: 1, x: 0 }}   // Posición final sin desplazamiento
      transition={{ duration: 2, ease: 'easeOut' }}
      className="w-full max-w-[22cm] mx-auto px-4 py-4"
    >
      <div className="group bg-[linear-gradient(to_bottom,#00E5FF,#2E332B)] p-4 rounded-lg shadow-lg border-4 border-[#FFFF00] transform transition-all duration-300 hover:scale-[1.02] hover:bg-[linear-gradient(to_bottom,#2E332B,#00E5FF)] flex flex-col min-h-[500px]">
        
        {/* Imagen banner optimizada */}
        <a href="https://relaticpanama.org/_classroom/" target="_blank" rel="noopener noreferrer">
         <div className="relative overflow-hidden rounded-lg border-[3px] border-solid border-[#FFFF00] aspect-video">
  <div className="absolute inset-0 bg-[#1a1b59] opacity-10"></div>
  <img 
    src="/assets/4.png" 
    alt="Plataforma de Aprendizaje"
    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
  />
</div>
        </a>

        {/* Contenido textual */}
        <div className="flex flex-col gap-1 flex-grow">
          <h2 className="text-lg font-bold text-center text-[#FFFF00] group-hover:text-[#FFFF00]">
            Aulas Virtuales
          </h2>
          <h3 className="text-sm font-bold text-[#fff] group-hover:text-white">
            Aprendizaje continuo personalizado
          </h3>
          <div className="text-[#ffff] group-hover:text-white text-xs space-y-1 max-h-[150px] overflow-y-auto font-bold">
            <p>
              Plataforma flexible con cursos interactivos, recursos educativos y colaboración para múltiples áreas del conocimiento.
            </p>
            <p>
              Incluye seguimiento de progreso, evaluación continua y comunidad colaborativa. Educación personalizada y accesible.
            </p>
            <p>
              Contempla administración óptima, expansión de presencia mundial, depósito seguro y eficiente.
            </p>
          </div>
        </div>

        {/* Botón */}
        <div className="bg-gradient-to-r from-white via-[#dcdcdc] to-[#a9a9a9] p-2 mt-auto rounded-lg border-[0px] border-solid border-[#FFFF00]">
          <a
            href="https://relaticpanama.org/_classroom/"
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

export default LearningPlatform;