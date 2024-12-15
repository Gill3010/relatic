import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-azulOscuro text-blancoTexto py-10 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center md:flex-row md:justify-between md:items-center space-y-8 md:space-y-0">
        
        {/* Sección de Bienvenida */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl sm:text-5xl font-bold flex items-center justify-center md:justify-start">
            ¡Hola! <span role="img" aria-label="hand-wave" className="ml-2">👋</span>
          </h1>
          <p className="text-md sm:text-lg mt-4 max-w-md mx-auto md:mx-0">
            En Innova Proyectos, transformamos ideas en aplicaciones potentes y adaptables, con una sólida especialización en desarrollo frontend y backend.
          </p>

          {/* Sección de Inteligencia Artificial */}
          <div className="mt-10 bg-gray-800 p-6 rounded-xl shadow-lg text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-semibold text-verdeBoton">
              Habilidades en Inteligencia Artificial
            </h2>
            <p className="text-md sm:text-lg mt-4 max-w-md mx-auto">
              Mi experiencia abarca la integración de Inteligencia Artificial (IA) en aplicaciones móviles y web, enfocándome en la automatización de procesos, la toma de decisiones inteligente, y la personalización de la experiencia de usuario. Algunas áreas clave de impacto incluyen:
            </p>
            <ul className="list-disc list-inside text-sm sm:text-base text-white mt-4">
              <li>Automatización de tareas repetitivas utilizando IA.</li>
              <li>Análisis predictivo con Python y herramientas como scikit-learn.</li>
              <li>Optimización de procesos con algoritmos de IA para mejorar la eficiencia.</li>
              <li>Desarrollo de chatbots y sistemas de recomendación inteligente.</li>
              <li>Integración de IA en interfaces web adaptativas usando React y Angular.</li>
            </ul>
          </div>

          {/* Iconos de Redes Sociales */}
          <div className="flex justify-center md:justify-start space-x-4 mt-6">
            <a href="https://www.linkedin.com/in/tu-linkedin" target="_blank" rel="noopener noreferrer" className="p-3 bg-verdeBoton rounded-full hover:bg-teal-600 transition duration-300">
              <FaLinkedin size={24} className="text-white" />
            </a>
            <a href="https://github.com/tu-github" target="_blank" rel="noopener noreferrer" className="p-3 bg-verdeBoton rounded-full hover:bg-teal-600 transition duration-300">
              <FaGithub size={24} className="text-white" />
            </a>
            <a href="https://twitter.com/tu-twitter" target="_blank" rel="noopener noreferrer" className="p-3 bg-verdeBoton rounded-full hover:bg-teal-600 transition duration-300">
              <FaTwitter size={24} className="text-white" />
            </a>
          </div>
        </div>

        {/* Imagen de uno de los Desarrolladores con tamaño ajustable */}
        <div className="mt-4 sm:mt-8 md:mt-0">
          <img src="/Israel.jpeg" alt="Israel" className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full object-cover transform -translate-y-4 sm:-translate-y-8" />
        </div>
      </div>
    </header>
  );
};

export default Header;
