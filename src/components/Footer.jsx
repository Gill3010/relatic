import { FaLinkedin, FaGithub, FaRegEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#071C37] text-white py-8">
      <div className="max-w-7xl mx-auto text-center flex justify-between items-center">
        {/* Redes sociales */}
        <div className="flex space-x-6 mb-4">
          <a
            href="https://www.linkedin.com/in/tu-linkedin"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-[#00E6D2] rounded-full hover:bg-teal-600 transition duration-300"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://github.com/tu-github"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-[#00E6D2] rounded-full hover:bg-teal-600 transition duration-300"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://twitter.com/tu-twitter"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-[#00E6D2] rounded-full hover:bg-teal-600 transition duration-300"
          >
            <FaRegEnvelope size={20} />
          </a>
        </div>

        {/* Texto de derechos reservados */}
        <p className="text-gray-400 text-sm">
          ©2024 Innova Proyectos. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
