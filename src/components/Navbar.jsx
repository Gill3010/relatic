import { useState } from 'react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import logo from '../assets/Logo.webp';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#275Bc8] text-white py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo y Nombre de la Marca */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-12 h-12" />
          <span className="text-2xl font-bold text-[#fff]">Relatic Panamá</span>
        </div>

        {/* Menú de Navegación */}
        <div className="hidden md:flex space-x-8 text-lg">
          <a href="#inicio" className="hover:text-[#00E5FF] transition-colors duration-300">Inicio</a>
          <a href="#nosotros" className="hover:text-[#00E5FF] transition-colors duration-300">Nosotros</a>
          <a href="#servicios" className="hover:text-[#00E5FF] transition-colors duration-300">Servicios</a>
          <a href="#contacto" className="hover:text-[#00E5FF] transition-colors duration-300">Contacto</a>
        </div>

        {/* Botón de Menú para Móvil */}
        <div className="md:hidden">
        <button onClick={toggleMenu} className="p-2 focus:outline-none text-2xl text-[#00E5FF]">&#9776;</button>
        </div>
      </div>

      {/* Menú desplegable en Móvil */}
{isOpen && (
  <div className="md:hidden bg-[#275Bc8] text-white mt-4">
    <div className="flex flex-col items-center space-y-4 py-4">
      <a href="#inicio" className="hover:text-[#007BFF] transition-colors duration-300" onClick={toggleMenu}>Inicio</a>
      <a href="#nosotros" className="hover:text-[#007BFF] transition-colors duration-300" onClick={toggleMenu}>Nosotros</a>
      <a href="#servicios" className="hover:text-[#007BFF] transition-colors duration-300" onClick={toggleMenu}>Servicios</a>
      <a href="#contacto" className="hover:text-[#007BFF] transition-colors duration-300" onClick={toggleMenu}>Contacto</a>

      {/* Iconos de Redes Sociales en Móvil */}
      <div className="flex space-x-4 pt-4">
        <a href="https://www.linkedin.com/in/tu-linkedin" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#00E5FF] rounded-full hover:bg-[#007BFF] transition duration-300">
          <FaLinkedin size={20} color="white" />
        </a>
        <a href="https://github.com/tu-github" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#00E5FF] rounded-full hover:bg-[#007BFF] transition duration-300">
          <FaGithub size={20} color="white" />
        </a>
        <a href="https://twitter.com/tu-twitter" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#00E5FF] rounded-full hover:bg-[#007BFF] transition duration-300">
          <FaTwitter size={20} color="white" />
        </a>
      </div>
    </div>
  </div>
)}


    </nav>
  );
};

export default Navbar;
