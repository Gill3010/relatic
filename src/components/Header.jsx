import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-azulOscuro text-blancoTexto py-20 relative">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center md:flex-row md:justify-between md:items-center">
        
        {/* Sección de Bienvenida */}
        <div className="text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-5xl font-bold flex items-center justify-center md:justify-start">
            ¡Hola! <span role="img" aria-label="hand-wave" className="ml-2">👋</span>
          </h1>
          <p className="text-lg mt-4 max-w-md mx-auto md:mx-0">
            Somos Pedro y Marciela, un equipo de desarrolladores especializados en frontend y backend.
          </p>

          {/* Iconos de Redes Sociales */}
          <div className="flex justify-center md:justify-start space-x-4 mt-6">
            <a href="https://www.linkedin.com/in/tu-linkedin" target="_blank" rel="noopener noreferrer" className="p-3 bg-verdeBoton rounded-full hover:bg-teal-600 transition duration-300">
              <FaLinkedin size={24} color="white" />
            </a>
            <a href="https://github.com/tu-github" target="_blank" rel="noopener noreferrer" className="p-3 bg-verdeBoton rounded-full hover:bg-teal-600 transition duration-300">
              <FaGithub size={24} color="white" />
            </a>
            <a href="https://twitter.com/tu-twitter" target="_blank" rel="noopener noreferrer" className="p-3 bg-verdeBoton rounded-full hover:bg-teal-600 transition duration-300">
              <FaTwitter size={24} color="white" />
            </a>
          </div>
        </div>

        {/* Imágenes de los Desarrolladores */}
        <div className="flex space-x-4 mt-8 md:mt-0">
          <img src="/Israel.jpeg" alt="Pedro" className="w-32 h-32 rounded-full object-cover transform -translate-y-8" />
          <img src="/Israel.jpeg" alt="Marciela" className="w-32 h-32 rounded-full object-cover transform translate-y-2" />
        </div>
      </div>
    </header>
  );
};

export default Header;
