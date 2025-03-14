import { FaLinkedin, FaGithub, FaRegEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#275Bc8] text-white py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto text-center flex flex-col sm:flex-row justify-between items-center px-4">
        {/* Redes sociales */}
        <div className="flex space-x-6 mb-4 sm:mb-0">
          <a
            href="https://www.linkedin.com/in/tu-linkedin"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-verdeBoton rounded-full hover:bg-[#00E5FF] transition duration-300"
          >
            <FaLinkedin size={20} className="text-white" />
          </a>
          <a
            href="https://github.com/tu-github"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-verdeBoton rounded-full hover:bg-[#00E5FF] transition duration-300"
          >
            <FaGithub size={20} className="text-white" />
          </a>
          <a
  href="mailto:tu-email@ejemplo.com"
  target="_blank"
  rel="noopener noreferrer"
  className="p-3 bg-verdeBoton rounded-full hover:bg-[#00E5FF] transition duration-300"
>
  <FaRegEnvelope size={20} className="text-white" />
</a>

        </div>

        {/* Texto de derechos reservados */}
        <p className="text-white text-sm">
          ©2025 Relatic Panamá. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
