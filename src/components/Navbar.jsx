import { useState } from 'react';
import { FaLinkedin, FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';  // Agregar los iconos necesarios
import logo from '../assets/logo2.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false); // Estado para el submenú de Servicios
  const [isActivitiesSubMenuOpen, setIsActivitiesSubMenuOpen] = useState(false); // Estado para el submenú de Actividades

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen); // Alternar visibilidad del submenú de Servicios
  };

  const toggleActivitiesSubMenu = () => {
    setIsActivitiesSubMenuOpen(!isActivitiesSubMenuOpen); // Alternar visibilidad del submenú de Actividades
  };

  return (
    <nav className="bg-gradient-to-r from-[#68358c] to-[#2d2e77] text-white py-4 shadow-lg sticky top-0 z-50 border-b-4 border-white">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo y Nombre de la Marca */}
        <div className="flex items-center space-x-3 w-full">
          <a href="https://www.relaticpanama.org/" rel="noopener noreferrer">
            <img src={logo} alt="Logo" className="w-72 h-auto object-contain" />
          </a>
          <span className="text-4xl font-bold text-white tracking-wide hover:text-[#FFC107] transition-colors duration-300"></span>
        </div>

        {/* Menú de Navegación */}
        <div className="hidden md:flex space-x-8 text-lg">
          <a href="/inicio" className="hover:text-[#865ea3] transition-colors duration-300">Inicio</a>
          <a href="/nosotros" className="hover:text-[#865ea3] transition-colors duration-300">Nosotros</a>

          {/* Menú de Servicios con Submenú */}
          <div className="relative">
            <button 
              onClick={toggleSubMenu} 
              className="hover:text-[#865ea3] transition-colors duration-300 focus:outline-none"
            >
              Servicios
            </button>
            {isSubMenuOpen && (
              <div className="absolute left-0 mt-2 bg-[#68358c] text-white py-2 w-max min-w-max rounded-lg shadow-lg">
                <a href="https://relaticpanama.org/_journals/" className="block px-4 py-2 hover:text-[#865ea3] transition-colors duration-300">
                  Portal de revistas
                </a>
                <a href="https://portaldecartelescientificos.org/" className="block px-4 py-2 hover:text-[#865ea3] transition-colors duration-300">
                  Portal de carteles
                </a>
                <a href="https://relaticpanama.org/books/" className="block px-4 py-2 hover:text-[#865ea3] transition-colors duration-300">
                  Portal de libros
                </a>
                <a href="https://portaldecartelescientificos.org/Cursos" className="block px-4 py-2 hover:text-[#865ea3] transition-colors duration-300">
                  Plataforma de aprendizaje
                </a>
              </div>
            )}
          </div>

          {/* Menú de Actividades con Submenú */}
          <div className="relative">
            <button 
              onClick={toggleActivitiesSubMenu} 
              className="hover:text-[#865ea3] transition-colors duration-300 focus:outline-none"
            >
              Actividades
            </button>
            {isActivitiesSubMenuOpen && (
              <div className="absolute left-0 mt-2 bg-[#68358c] text-white py-2 w-max min-w-max rounded-lg shadow-lg">
                <a href="/actividades/proximas" className="block px-4 py-2 hover:text-[#865ea3] transition-colors duration-300">
                  Actividades próximas
                </a>
                <a href="/actividades/anteriores" className="block px-4 py-2 hover:text-[#865ea3] transition-colors duration-300">
                  Actividades anteriores
                </a>
              </div>
            )}
          </div>

          <a href="/contactus" className="hover:text-[#865ea3] transition-colors duration-300">Contacto</a>
        </div>

        {/* Botón de Menú para Móvil */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="p-2 focus:outline-none text-2xl text-[#FFF]">&#9776;</button>
        </div>
      </div>

      {/* Menú desplegable en Móvil */}
      {isOpen && (
        <div className="md:hidden bg-[#2d2e77] text-white mt-4">
          <div className="flex flex-col items-center space-y-4 py-4">
            <a href="/inicio" className="hover:text-[#865ea3] transition-colors duration-300" onClick={toggleMenu}>Inicio</a>
            <a href="/nosotros" className="hover:text-[#865ea3] transition-colors duration-300" onClick={toggleMenu}>Nosotros</a>
            
            {/* Menú de Servicios en Móvil */}
            <div className="relative">
              <button
                onClick={toggleSubMenu}
                className="hover:text-[#865ea3] transition-colors duration-300 focus:outline-none"
              >
                Servicios
              </button>
              {isSubMenuOpen && (
                <div className="absolute left-0 mt-2 bg-[#68358c] text-white py-2 w-max min-w-max rounded-lg shadow-lg z-50">
                  <a href="https://relaticpanama.org/_journals/" className="block px-4 py-2 hover:text-[#865ea3] transition-colors duration-300">
                    Portal de revistas
                  </a>
                  <a href="https://portaldecartelescientificos.org/" className="block px-4 py-2 hover:text-[#865ea3] transition-colors duration-300">
                    Portal de carteles
                  </a>
                  <a href="https://relaticpanama.org/books/" className="block px-4 py-2 hover:text-[#865ea3] transition-colors duration-300">
                    Portal de libros
                  </a>
                  <a href="https://portaldecartelescientificos.org/Cursos" className="block px-4 py-2 hover:text-[#865ea3] transition-colors duration-300">
                    Plataforma de aprendizaje
                  </a>
                </div>
              )}
            </div>

            {/* Menú de Actividades en Móvil */}
            <div className="relative">
              <button 
                onClick={toggleActivitiesSubMenu} 
                className="hover:text-[#865ea3] transition-colors duration-300 focus:outline-none"
              >
                Actividades
              </button>
              {isActivitiesSubMenuOpen && (
                <div className="absolute left-0 mt-2 bg-[#68358c] text-white py-2 w-max min-w-max rounded-lg shadow-lg z-50">
                  <a href="/actividades/proximas" className="block px-4 py-2 hover:text-[#865ea3] transition-colors duration-300">
                    Actividades próximas
                  </a>
                  <a href="/actividades/anteriores" className="block px-4 py-2 hover:text-[#865ea3] transition-colors duration-300">
                    Actividades anteriores
                  </a>
                </div>
              )}
            </div>

            <a href="/contactus" className="hover:text-[#865ea3] transition-colors duration-300" onClick={toggleMenu}>Contacto</a>

            {/* Iconos de Redes Sociales en Móvil */}
            <div className="flex space-x-4 pt-4">
              <a href=" https://www.linkedin.com/in/relatic-panam%C3%A1-a80b93356/" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#68358c] rounded-full hover:bg-[#865ea3] transition duration-300">
                <FaLinkedin size={20} color="white" />
              </a>
              <a href="https://www.instagram.com/relatic.panama/" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#68358c] rounded-full hover:bg-[#865ea3] transition duration-300">
                <FaInstagram size={20} color="white" />
              </a>
              <a href="https://x.com/RelaticPanama" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#68358c] rounded-full hover:bg-[#865ea3] transition duration-300">
                <FaTwitter size={20} color="white" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61573905375213" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#68358c] rounded-full hover:bg-[#865ea3] transition duration-300">
                <FaFacebook size={20} color="white" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
