import { useState } from 'react';
import { FaLinkedin, FaInstagram, FaFacebook, FaYoutube, FaWhatsapp } from 'react-icons/fa';  
import logo from '../assets/logo2.png';
import { X as XIcon } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false); 
  const [isActivitiesSubMenuOpen, setIsActivitiesSubMenuOpen] = useState(false); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen); 
  };

  const toggleActivitiesSubMenu = () => {
    setIsActivitiesSubMenuOpen(!isActivitiesSubMenuOpen); 
  };

  return (
    <nav className="bg-gradient-to-r from-[#1a1b59] via-[#1a3aa0] to-[#1a8fe3] text-[#FFD700] py-4 shadow-lg sticky top-0 z-50 border-b-4 border-[#FFD700]">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo y Nombre de la Marca */}
        <div className="flex items-center space-x-3 w-full">
          <a href="https://www.relaticpanama.org/" rel="noopener noreferrer">
            <img src={logo} alt="Logo" className="w-72 h-auto object-contain" />
          </a>
          <span className="text-4xl font-bold text-[#FFD700] tracking-wide hover:text-[#FFC107] transition-colors duration-300"></span>
        </div>

        {/* Menú de Navegación */}
        <div className="hidden md:flex space-x-8 text-lg">
          <a href="/inicio" className="hover:text-[#fff] transition-colors duration-300">Inicio</a>
          <a href="/nosotros" className="hover:text-[#fff] transition-colors duration-300">Nosotros</a>

          {/* Servicios */}
          <div className="relative">
            <button onClick={toggleSubMenu} className="hover:text-[#fff] transition-colors duration-300 focus:outline-none">
              Servicios
            </button>
            {isSubMenuOpen && (
              <div className="absolute left-0 mt-2 bg-[#68358c] text-[#FFD700] py-2 w-max min-w-max rounded-lg shadow-lg">
                <a href="https://relaticpanama.org/_journals/" className="block px-4 py-2 hover:text-[#fff] transition-colors duration-300">Portal de revistas</a>
                <a href="https://portaldecartelescientificos.org/" className="block px-4 py-2 hover:text-[#fff] transition-colors duration-300">Portal de carteles</a>
                <a href="https://relaticpanama.org/_posters/" className="block px-4 py-2 hover:text-[#fff] transition-colors duration-300">Portal de libros</a>
                <a href="https://portaldecartelescientificos.org/Cursos" className="block px-4 py-2 hover:text-[#fff] transition-colors duration-300">Plataforma de aprendizaje</a>
              </div>
            )}
          </div>

          {/* Actividades */}
          <div className="relative">
            <button onClick={toggleActivitiesSubMenu} className="hover:text-[#fff] transition-colors duration-300 focus:outline-none">
              Actividades
            </button>
            {isActivitiesSubMenuOpen && (
              <div className="absolute left-0 mt-2 bg-[#68358c] text-[#FFD700] py-2 w-max min-w-max rounded-lg shadow-lg">
                <a href="/actividades/proximas" className="block px-4 py-2 hover:text-[#fff] transition-colors duration-300">Actividades próximas</a>
                <a href="/actividades/anteriores" className="block px-4 py-2 hover:text-[#fff] transition-colors duration-300">Actividades anteriores</a>
              </div>
            )}
          </div>

          <a href="/contactus" className="hover:text-[#fff] transition-colors duration-300">Contacto</a>
        </div>

        {/* Menú móvil */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="p-2 focus:outline-none text-2xl text-[#FFD700]">&#9776;</button>
        </div>
      </div>

      {/* Menú desplegable móvil */}
      {isOpen && (
        <div className="md:hidden bg-[#2d2e77] text-[#FFD700] mt-4">
          <div className="flex flex-col items-center space-y-4 py-4">
            <a href="/inicio" className="hover:text-[#fff] transition-colors duration-300" onClick={toggleMenu}>Inicio</a>
            <a href="/nosotros" className="hover:text-[#fff] transition-colors duration-300" onClick={toggleMenu}>Nosotros</a>

            <div className="relative">
              <button onClick={toggleSubMenu} className="hover:text-[#fff] transition-colors duration-300 focus:outline-none">Servicios</button>
              {isSubMenuOpen && (
                <div className="absolute left-0 mt-2 bg-[#68358c] text-[#FFD700] py-2 w-max min-w-max rounded-lg shadow-lg z-50">
                  <a href="https://relaticpanama.org/_journals/" className="block px-4 py-2 hover:text-[#fff] transition-colors duration-300">Portal de revistas</a>
                  <a href="https://portaldecartelescientificos.org/" className="block px-4 py-2 hover:text-[#fff] transition-colors duration-300">Portal de carteles</a>
                  <a href="https://relaticpanama.org/_posters/" className="block px-4 py-2 hover:text-[#fff] transition-colors duration-300">Portal de libros</a>
                  <a href="https://portaldecartelescientificos.org/Cursos" className="block px-4 py-2 hover:text-[#fff] transition-colors duration-300">Plataforma de aprendizaje</a>
                </div>
              )}
            </div>

            <div className="relative">
              <button onClick={toggleActivitiesSubMenu} className="hover:text-[#fff] transition-colors duration-300 focus:outline-none">Actividades</button>
              {isActivitiesSubMenuOpen && (
                <div className="absolute left-0 mt-2 bg-[#68358c] text-[#FFD700] py-2 w-max min-w-max rounded-lg shadow-lg z-50">
                  <a href="/actividades/proximas" className="block px-4 py-2 hover:text-[#fff] transition-colors duration-300">Actividades próximas</a>
                  <a href="/actividades/anteriores" className="block px-4 py-2 hover:text-[#fff] transition-colors duration-300">Actividades anteriores</a>
                </div>
              )}
            </div>

            <a href="/contactus" className="hover:text-[#fff] transition-colors duration-300" onClick={toggleMenu}>Contacto</a>

            {/* Redes sociales */}
            <div className="flex space-x-4 pt-4">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/relatic-panam%C3%A1-a80b93356?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="p-2 bg-[#0077B5] rounded-full hover:opacity-80 transition duration-300"
              >
                <FaLinkedin size={20} color="#FFFFFF" />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/relatic.panama?igsh=bGFrcmMwbGZxd3Vq"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="p-2 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-full hover:opacity-80 transition duration-300"
              >
                <FaInstagram size={20} color="#FFFFFF" />
              </a>

              {/* Twitter/X */}
              <a
                href="https://x.com/RelaticPanama"
                target="_blank"
                rel="noopener noreferrer"
                title="X (Twitter)"
                className="p-2 bg-black rounded-full hover:opacity-80 transition duration-300"
              >
                <XIcon size={20} color="#FFFFFF" />
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/19hGgzbge1/"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="p-2 bg-[#1877F2] rounded-full hover:opacity-80 transition duration-300"
              >
                <FaFacebook size={20} color="#FFFFFF" />
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@relaticpanama"
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube"
                className="p-2 bg-[#FF0000] rounded-full hover:opacity-80 transition duration-300"
              >
                <FaYoutube size={20} color="#FFFFFF" />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/50766751782"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
                className="p-2 bg-[#25D366] rounded-full hover:opacity-80 transition duration-300"
              >
                <FaWhatsapp size={20} color="#FFFFFF" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;