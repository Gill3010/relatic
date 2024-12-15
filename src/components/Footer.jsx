import { FaLinkedin, FaGithub, FaRegEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-azulOscuro text-blancoTexto py-8">
      <div className="max-w-7xl mx-auto text-center flex flex-col sm:flex-row justify-between items-center px-4">
        {/* Redes sociales */}
        <div className="flex space-x-6 mb-4 sm:mb-0">
          <a
            href="https://www.linkedin.com/in/tu-linkedin"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-verdeBoton rounded-full hover:bg-teal-600 transition duration-300"
          >
            <FaLinkedin size={20} className="text-blancoTexto" />
          </a>
          <a
            href="https://github.com/tu-github"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-verdeBoton rounded-full hover:bg-teal-600 transition duration-300"
          >
            <FaGithub size={20} className="text-blancoTexto" />
          </a>
          <a
            href="mailto:tu-email@ejemplo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-verdeBoton rounded-full hover:bg-teal-600 transition duration-300"
          >
            <FaRegEnvelope size={20} className="text-blancoTexto" />
          </a>
        </div>

        {/* Texto de derechos reservados */}
        <p className="text-grisClaro text-sm">
          ©2024 Innova Proyectos. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
