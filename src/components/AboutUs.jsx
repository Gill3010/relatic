const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-[#275Bc8] mb-6">Sobre Nosotros</h2>
        <p className="text-[#275Bc8] text-lg">
          RELATIC PANAMA se constituye como una comunidad académica y científica de alta calidad humana e investigativa, con un enfoque regional en Latinoamérica y el Caribe. Nos dedicamos a fomentar la colaboración, el intercambio de conocimiento y el avance de la ciencia, con un fuerte compromiso con la excelencia y la innovación.
        </p>

        <h3 className="text-xl font-semibold text-[#275Bc8] mt-6">Objetivos</h3>
        <ul className="list-disc pl-6 text-[#275Bc8]">
          <li>Aportar espacios de reflexión e intercambio académico sobre la publicación científica.</li>
          <li>Fomentar la consolidación de los procesos editoriales en el campo científico.</li>
          <li>Fortalecer el intercambio de conocimiento y las relaciones entre académicos, investigadores y editores científicos de la región latinoamericana.</li>
        </ul>

        <h3 className="text-xl font-semibold text-[#275Bc8] mt-6">Misión</h3>
        <p className="text-[#275Bc8] text-lg">
          Tenemos como misión promover la participación activa de estudiantes, docentes y administrativos en el desarrollo académico de Latinoamérica y el Caribe. A través de la colaboración regional, buscamos interconectar instituciones académicas y centros de investigación para difundir la ciencia generada en la región, formar recursos humanos y avanzar en el conocimiento científico cualitativo.
        </p>
        <p className="text-[#275Bc8] text-lg mt-4">
          Nuestra filosofía se sustenta en las misiones de las universidades asociadas y en la generación de conocimiento científico de calidad. Fomentamos el uso de herramientas investigativas que promuevan una comunicación efectiva entre investigadores, y la reflexión crítica y constructiva sobre las problemáticas que enfrentan en sus respectivos campos de estudio.
        </p>

        <h3 className="text-xl font-semibold text-[#275Bc8] mt-6">Visión</h3>
        <p className="text-[#275Bc8] text-lg">
          La visión de RELATIC PANAMA es impulsar la producción de conocimiento científico cualitativo, fortalecer los lazos entre investigadores y universidades latinoamericanas y caribeñas, y promover la internacionalización de la investigación académica. A través de nuestra red, buscamos difundir el pensamiento cualitativo y fomentar un espacio de colaboración global en el ámbito científico.
        </p>

        <div className="mt-6 text-center">
          <a 
            href="https://portaldecartelescientificos.org/#servicios" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#275Bc8] text-white px-6 py-2 rounded-lg hover:bg-[#1B3D82] transition duration-300"
          >
            Conoce nuestros servicios
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
