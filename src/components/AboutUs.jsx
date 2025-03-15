const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-lg border-4 border-[#68358c] transform transition-transform duration-300 hover:scale-105"> {/* Añadí el borde y el efecto de zoom al contenedor */}
        <h2 className="text-3xl font-semibold text-center text-[#5b1a8f] mb-6">Sobre Nosotros</h2>
        <p className="text-[#1e3a8a] text-lg">
          RELATIC PANAMA se constituye como una comunidad académica y científica de alta calidad humana e investigativa, con un enfoque regional en Latinoamérica y el Caribe. Nos dedicamos a fomentar la colaboración, el intercambio de conocimiento y el avance de la ciencia, con un fuerte compromiso con la excelencia y la innovación.
        </p>

        {/* Misión, Visión y Objetivos en fila (cards) */}
        <div className="mt-6 flex flex-wrap justify-center gap-16">
          {/* Misión */}
          <div className="flex flex-col items-center bg-gradient-to-r from-[#68358c] to-[#2d2e77] p-6 rounded-lg shadow-md max-w-xs w-full sm:w-auto transform transition-transform duration-300 hover:scale-105">
            <div className="relative w-48 h-48 mb-4">
              <img 
                src="/assets/Mision.jpg" 
                alt="Misión" 
                className="w-full h-full object-cover mb-4 rounded-full shadow-md transform transition-transform duration-300 hover:scale-110"
              />
            </div>
            <h3 className="text-xl font-semibold text-white">
              <strong className="text-[#fff]">Misión</strong>
            </h3>
            <p className="text-white text-lg text-center">
              Nuestra misión es promover la participación activa de estudiantes, docentes y administrativos en el desarrollo académico, y fomentar la colaboración entre instituciones y centros de investigación. Buscamos difundir la ciencia generada en la región y formar recursos humanos para avanzar en el conocimiento científico.
            </p>
          </div>

          {/* Objetivos */}
          <div className="flex flex-col items-center bg-gradient-to-r from-[#68358c] to-[#2d2e77] p-6 rounded-lg shadow-md max-w-xs w-full sm:w-auto transform transition-transform duration-300 hover:scale-105">
            <div className="relative w-48 h-48 mb-4">
              <img 
                src="/assets/Objetivos.jpg" 
                alt="Objetivos" 
                className="w-full h-full object-cover mb-4 rounded-full shadow-md transform transition-transform duration-300 hover:scale-110"
              />
            </div>
            <h3 className="text-xl font-semibold text-white">
              <strong className="text-[#fff]">Objetivos</strong>
            </h3>
            <p className="text-white text-lg text-center">
              Queremos ofrecer un espacio de reflexión e intercambio académico sobre la publicación científica. Fomentamos la consolidación de los procesos editoriales y fortalecemos el intercambio de conocimiento entre académicos, investigadores y editores científicos para impulsar la ciencia en la región.
            </p>
          </div>

          {/* Visión */}
          <div className="flex flex-col items-center bg-gradient-to-r from-[#68358c] to-[#2d2e77] p-6 rounded-lg shadow-md max-w-xs w-full sm:w-auto transform transition-transform duration-300 hover:scale-105">
            <div className="relative w-48 h-48 mb-4">
              <img 
                src="/assets/Vision.jpg" 
                alt="Visión" 
                className="w-full h-full object-cover mb-4 rounded-full shadow-md transform transition-transform duration-300 hover:scale-110"
              />
            </div>
            <h3 className="text-xl font-semibold text-white">
              <strong className="text-[#fff]">Visión</strong>
            </h3>
            <p className="text-white text-lg text-center">
              Buscamos impulsar la producción de conocimiento científico cualitativo y fortalecer los lazos entre investigadores y universidades latinoamericanas. Promovemos la internacionalización de la investigación académica, fomentando espacios de colaboración global para generar nuevo conocimiento y avanzar en la ciencia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;