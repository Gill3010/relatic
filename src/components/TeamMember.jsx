import IsraelImage from '../assets/Israel.jpeg';  // Importar la imagen de Israel

// Este es el componente individual de cada miembro del equipo
const TeamMember = ({ name, role, description, image, cvLink, isBottom }) => {
  return (
    <div className="bg-azulOscuro text-blancoTexto p-6 sm:p-8 rounded-2xl shadow-lg flex flex-col lg:flex-row items-center lg:items-start lg:text-left space-y-6 lg:space-y-0">
      {/* Imagen en la parte superior izquierda o inferior derecha */}
      <div className={`mb-6 lg:mb-0 lg:mr-6 lg:flex-shrink-0 ${isBottom ? 'lg:order-last' : ''}`}>
        <div className="relative sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-verdeBoton rounded-full flex items-center justify-center overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
      </div>
      {/* Contenido de texto */}
      <div className={`text-center lg:text-left lg:flex-1 ${isBottom ? 'lg:order-first' : ''}`}>
        <h3 className="text-2xl sm:text-3xl font-semibold text-verdeBoton mb-3">{name}</h3>
        <p className="text-xl sm:text-2xl text-grisClaro font-medium mb-5">{role}</p>
        <p className="text-md sm:text-lg text-grisClaro mb-6 leading-relaxed">{description}</p>
        
        {/* Descripción sobre la inteligencia artificial */}
        <p className="text-md sm:text-lg text-grisClaro mb-6 leading-relaxed">
          En mis proyectos, la integración de la <strong>Inteligencia Artificial</strong> ha sido clave para optimizar procesos y ofrecer soluciones más eficientes. He utilizado IA para la automatización de tareas repetitivas, la predicción de tendencias y la personalización de la experiencia del usuario. También he desarrollado chatbots utilizando procesamiento de lenguaje natural (NLP) y sistemas de recomendación basados en algoritmos de aprendizaje automático.
        </p>
        
        <a href={cvLink} target="_blank" rel="noopener noreferrer" className="inline-block bg-verdeBoton text-blancoTexto px-6 sm:px-8 py-3 rounded-full font-medium hover:bg-teal-600 transition duration-300">
          Descargar CV
        </a>
      </div>
    </div>
  );
};

// Este es el componente de la sección completa del equipo
const TeamSection = () => {
  return (
    <section className="bg-azulOscuro text-blancoTexto py-12 sm:py-16">
      <div className="max-w-7xl mx-auto text-center mb-10 px-4 sm:px-8">
        <h2 className="text-4xl sm:text-5xl font-semibold">Nuestro Equipo</h2>
      </div>
      <div className="space-y-10 px-4 sm:px-8">
        {/* Miembro Israel (Imagen abajo derecha) */}
        <TeamMember
          name="Israel Samuels"
          role="Full Stack Developer"
          description="Soy un desarrollador enfocado en crear soluciones web y móviles escalables y de alto rendimiento. Con experiencia en React, Node.js, PHP, Angular, TypeScript, Java, HTML, y consumo de APIs, desarrollo aplicaciones que optimizan la experiencia del usuario y mejoran la eficiencia. También tengo un sólido manejo de herramientas de administración como cPanel, lo que me permite gestionar implementaciones de manera efectiva. Mi interés en la innovación y la educación me impulsa a explorar tecnologías como Vite y Tailwind CSS para crear herramientas que transformen el aprendizaje y el acceso a la información."
          image={IsraelImage}  // Imagen de Israel
          cvLink="/assets/CurriculumVitaeActualizado.pdf"  // Asegúrate de que este archivo esté en la carpeta pública
          isBottom={true}  // Indicando que esta imagen debe estar abajo
        />
      </div>
    </section>
  );
};

export default TeamSection;
