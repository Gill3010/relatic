import CristalImage from '../assets/Israel.jpeg';  // Importar la imagen de Cristal
import IsraelImage from '../assets/Israel.jpeg';  // Importar la imagen de Israel

// Este es el componente individual de cada miembro del equipo
const TeamMember = ({ name, role, description, image, cvLink, isBottom }) => {
  return (
    <div className="bg-azulOscuro text-blancoTexto p-8 rounded-2xl shadow-lg flex flex-col lg:flex-row items-center lg:items-start lg:text-left">
      {/* Imagen en la parte superior izquierda o inferior derecha */}
      <div className={`mb-6 lg:mb-0 lg:mr-6 lg:flex-shrink-0 ${isBottom ? 'lg:order-last' : ''}`}>
        <div className="relative w-48 h-48 bg-verdeBoton rounded-full flex items-center justify-center overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
      </div>
      {/* Contenido de texto */}
      <div className={`text-center lg:text-left lg:flex-1 ${isBottom ? 'lg:order-first' : ''}`}>
        <h3 className="text-2xl font-semibold text-verdeBoton mb-2">{name}</h3>
        <p className="text-xl text-grisClaro font-medium mb-4">{role}</p>
        <p className="text-md text-grisClaro mb-6 leading-relaxed">{description}</p>
        <a href={cvLink} target="_blank" rel="noopener noreferrer" className="inline-block bg-verdeBoton text-blancoTexto px-6 py-2 rounded-full font-medium hover:bg-teal-600 transition duration-300">
          Descargar CV
        </a>
      </div>
    </div>
  );
};

// Este es el componente de la sección completa del equipo
const TeamSection = () => {
  return (
    <section className="bg-azulOscuro text-blancoTexto py-16">
      <div className="max-w-7xl mx-auto text-center mb-10">
      </div>
      <div className="space-y-10">
        {/* Miembro Cristal (Imagen arriba izquierda) */}
        <TeamMember
          name="Cristal Tavárez"
          role="Desarrolladora Frontend"
          description="Apasionada desarrolladora de software con experiencia en la creación de aplicaciones web modernas y eficientes..."
          image={CristalImage}  // Imagen de Cristal
          cvLink="/assets/cristal-cv.pdf"  // Asegúrate de que este archivo esté en la carpeta pública
          isBottom={false}  // Indicando que esta imagen debe estar arriba
        />
        {/* Miembro Israel (Imagen abajo derecha) */}
        <TeamMember
          name="Israel Samuels"
          role="Desarrollador Backend"
          description="Soy un desarrollador backend especializado en crear soluciones robustas y escalables que alimentan aplicaciones web modernas..."
          image={IsraelImage}  // Imagen de Israel
          cvLink="/assets/israel-cv.pdf"  // Asegúrate de que este archivo esté en la carpeta pública
          isBottom={true}  // Indicando que esta imagen debe estar abajo
        />
      </div>
    </section>
  );
};

export default TeamSection;
