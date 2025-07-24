import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2, ease: "easeOut" }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg border-4 border-[#FFF] transform transition-transform duration-300 hover:scale-105 hover:bg-[#FFF] group">
        <h2 className="text-3xl font-semibold text-center text-[#1a1b59] mb-6 group-hover:text-[#1a1b59] transition-colors duration-300 relative after:content-[''] after:block after:w-full after:h-[3px] after:bg-[#FFFF] after:mx-auto after:mt-2 group-hover:after:bg-[#FFF]">
          Sobre Nosotros
        </h2>
        <p className="text-[#1a1b59] text-lg group-hover:text-[#1a1b59] transition-colors duration-300">
          RELATIC PANAMA se constituye como una comunidad académica y científica de alta calidad humana e investigativa, con un enfoque regional en Latinoamérica y el Caribe. Nos dedicamos a fomentar la colaboración, el intercambio de conocimiento y el avance de la ciencia, con un fuerte compromiso con la excelencia y la innovación.
        </p>

        {/* Misión, Visión y Objetivos en fila */}
        <div className="mt-6 flex flex-wrap justify-center gap-16">
          {/* Tarjeta Misión */}
          <div className="flex flex-col items-center 
              bg-[linear-gradient(to_bottom,#00E5FF,#2E332B)] 
              hover:bg-[linear-gradient(to_top,#00E5FF,#2E332B)] 
              p-6 rounded-lg shadow-md 
              max-w-xs w-full sm:w-auto 
              transform transition-transform duration-300 
              hover:scale-105 
              border-4 border-[#FFFF00]">
            <div className="relative w-52 h-52 mb-4">
              <img
                src="/assets/Mision.jpg"
                alt="Misión"
                className="w-full h-full object-cover mb-4 rounded-full shadow-md border-4 border-[#FFFF00] transform transition-transform duration-300 hover:scale-110"
              />
            </div>
            <h3 className="text-xl font-semibold text-white">
              <strong className="text-[#FFFF00]">Misión</strong>
            </h3>
            <p className="text-white text-lg text-center">
              Nuestra misión es promover la participación activa de estudiantes, docentes y administrativos en el desarrollo académico, y fomentar la colaboración entre instituciones y centros de investigación. Buscamos difundir la ciencia generada en la región y formar recursos humanos para avanzar en el conocimiento científico.
            </p>
          </div>

          {/* Tarjeta Objetivos */}
          <div className="flex flex-col items-center 
              bg-[linear-gradient(to_bottom,#00E5FF,#2E332B)] 
              hover:bg-[linear-gradient(to_top,#00E5FF,#2E332B)] 
              p-6 rounded-lg shadow-md 
              max-w-xs w-full sm:w-auto 
              transform transition-transform duration-300 
              hover:scale-105 
              border-4 border-[#FFFF00]">
            <div className="relative w-52 h-52 mb-4">
              <img
                src="/assets/Objetivos2.jpg"
                alt="Objetivos"
                className="w-full h-full object-cover mb-4 rounded-full shadow-md border-4 border-[#FFFF00] transform transition-transform duration-300 hover:scale-110"
              />
            </div>
            <h3 className="text-xl font-semibold text-white">
              <strong className="text-[#FFFF00]">Objetivos</strong>
            </h3>
            <p className="text-white text-lg text-center">
              Queremos ofrecer un espacio de reflexión e intercambio académico sobre la publicación científica. Fomentamos la consolidación de los procesos editoriales y fortalecemos el intercambio de conocimiento entre académicos, investigadores y editores científicos para impulsar la ciencia en la región.
            </p>
          </div>

          {/* Tarjeta Visión */}
          <div className="flex flex-col items-center 
              bg-[linear-gradient(to_bottom,#00E5FF,#2E332B)] 
              hover:bg-[linear-gradient(to_top,#00E5FF,#2E332B)] 
              p-6 rounded-lg shadow-md 
              max-w-xs w-full sm:w-auto 
              transform transition-transform duration-300 
              hover:scale-105 
              border-4 border-[#FFFF00]">
            <div className="relative w-52 h-52 mb-4">
              <img
                src="/assets/Vision1.jpg"
                alt="Visión"
                className="w-full h-full object-cover mb-4 rounded-full shadow-md border-4 border-[#FFFF00] transform transition-transform duration-300 hover:scale-110"
              />
            </div>
            <h3 className="text-xl font-semibold text-white">
              <strong className="text-[#FFFF00]">Visión</strong>
            </h3>
            <p className="text-white text-lg text-center">
              Buscamos impulsar la producción de conocimiento científico cualitativo y fortalecer los lazos entre investigadores y universidades latinoamericanas. Promovemos la internacionalización de la investigación académica, fomentando espacios de colaboración global para generar nuevo conocimiento y avanzar en la ciencia.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutUs;