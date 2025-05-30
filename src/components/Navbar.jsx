import { useState, useRef } from 'react';
import { FaLinkedin, FaInstagram, FaFacebook, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { SiX } from 'react-icons/si';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showServicesSubMenu, setShowServicesSubMenu] = useState(false);
  const [showActivitiesSubMenu, setShowActivitiesSubMenu] = useState(false);
  const [showRegisterSubMenu, setShowRegisterSubMenu] = useState(false);
  const timeoutRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = (subMenuSetter) => {
    clearTimeout(timeoutRef.current);
    subMenuSetter(true);
  };

  const handleMouseLeave = (subMenuSetter) => {
    timeoutRef.current = setTimeout(() => {
      subMenuSetter(false);
    }, 100);
  };

  return (
    <nav className="bg-[linear-gradient(to_bottom,#00E5FF,#2E332B)] text-[#FFff] py-4 shadow-lg sticky top-0 z-50 border-b-4 border-[#FFFF00] font-semibold">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center space-x-3 w-full">
          <a href="https://www.relaticpanama.org/" rel="noopener noreferrer">
            <img src={logo} alt="Logo" className="w-72 h-auto object-contain" />
          </a>
        </div>

        <div className="hidden md:flex space-x-8 text-lg">
          <a href="/inicio" className="hover:text-[#FFFF00] transition-colors duration-300">Inicio</a>
          <a href="/nosotros" className="hover:text-[#FFFF00] transition-colors duration-300">Nosotros</a>

          {/* Servicios */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter(setShowServicesSubMenu)}
            onMouseLeave={() => handleMouseLeave(setShowServicesSubMenu)}
          >
            <button className="hover:text-[#FFFF00] transition-colors duration-300 focus:outline-none">
              Servicios
            </button>
            {showServicesSubMenu && (
              <div
                className="absolute left-0 mt-2 bg-[linear-gradient(to_bottom,#00E5FF,#2E332B)] text-[#FFF] py-2 w-max min-w-max rounded-lg shadow-lg"
                onMouseEnter={() => clearTimeout(timeoutRef.current)}
                onMouseLeave={() => handleMouseLeave(setShowServicesSubMenu)}
              >
                <a href="https://relaticpanama.org/_journals/" className="block px-4 py-2 hover:text-[#FFFF00] transition-colors duration-300">Portal de revistas</a>
                <a href="https://relaticpanama.org/_posters/" className="block px-4 py-2 hover:text-[#FFFF00] transition-colors duration-300">Portal de carteles</a>
                <a href="https://relaticpanama.org/_books/index.php/edrp/inicio" className="block px-4 py-2 hover:text-[#FFFF00] transition-colors duration-300">Portal de libros</a>
                <a href="https://portaldecartelescientificos.org/Cursos" className="block px-4 py-2 hover:text-[#FFFF00] transition-colors duration-300">Plataforma de aprendizaje</a>
                <a href='https://relaticpanama.org/_protect' className="block px-4 py-2 hover:text-[#FFFF00] transition-colors duration-300">Propiedad Intelectual</a>
              </div>
            )}
          </div>

          {/* Actividades */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter(setShowActivitiesSubMenu)}
            onMouseLeave={() => handleMouseLeave(setShowActivitiesSubMenu)}
          >
            <button className="hover:text-[#FFFF00] transition-colors duration-300 focus:outline-none">
              Actividades
            </button>
            {showActivitiesSubMenu && (
              <div
                className="absolute left-0 mt-2 bg-[linear-gradient(to_bottom,#00E5FF,#2E332B)] text-[#FFF] py-2 w-max min-w-max rounded-lg shadow-lg"
                onMouseEnter={() => clearTimeout(timeoutRef.current)}
                onMouseLeave={() => handleMouseLeave(setShowActivitiesSubMenu)}
              >
                <a href="/actividades/proximas" className="block px-4 py-2 hover:text-[#FFFF00] transition-colors duration-300">Actividades próximas</a>
                <a href="/actividades/anteriores" className="block px-4 py-2 hover:text-[#FFFF00] transition-colors duration-300">Actividades anteriores</a>
              </div>
            )}
          </div>

          
          <a href="/contactus" className="hover:text-[#FFFF00] transition-colors duration-300">Contacto</a>
          {/* Regístrate */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter(setShowRegisterSubMenu)}
            onMouseLeave={() => handleMouseLeave(setShowRegisterSubMenu)}
          >
            <button className="hover:text-[#FFFF00] transition-colors duration-300 focus:outline-none">
              Regístrate
            </button>
            {showRegisterSubMenu && (
              <div
                className="absolute left-0 mt-2 bg-[linear-gradient(to_bottom,#00E5FF,#2E332B)] text-[#FFF] py-2 w-max min-w-max rounded-lg shadow-lg"
                onMouseEnter={() => clearTimeout(timeoutRef.current)}
                onMouseLeave={() => handleMouseLeave(setShowRegisterSubMenu)}
              >
                <a href="/suscription" className="block px-4 py-2 hover:text-[#FFFF00] transition-colors duration-300">Subscríbete</a>
              </div>
            )}
          </div>

        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="p-2 focus:outline-none text-2xl text-[#FFFF00]">☰</button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-[#00E5FF] to-[#2E332B] text-white mt-4">
          <div className="flex flex-col items-center space-y-4 py-4">
            <a href="/inicio" className="hover:text-[#FFFF00] transition-colors duration-300" onClick={toggleMenu}>Inicio</a>
            <a href="/nosotros" className="hover:text-[#FFFF00] transition-colors duration-300" onClick={toggleMenu}>Nosotros</a>

            <div className="relative">
              <button onClick={() => setShowServicesSubMenu(!showServicesSubMenu)} className="hover:text-[#FFFF00] transition-colors duration-300 focus:outline-none">Servicios</button>
              {showServicesSubMenu && (
                <div className="absolute left-0 mt-2 bg-gradient-to-b from-[#00E5FF] to-[#2E332B] text-white py-2 w-max min-w-max rounded-lg shadow-lg z-50">
                  <a href="https://relaticpanama.org/_journals/" className="block px-4 py-2 hover:text-[#FFFF00] transition-colors duration-300">Portal de revistas</a>
                  <a href="https://relaticpanama.org/_posters/" className="block px-4 py-2 hover:text-[#FFFF00] transition-colors duration-300">Portal de carteles</a>
                  <a href="https://relaticpanama.org/_books/index.php/edrp/inicio" className="block px-4 py-2 hover:text-[#FFFF00] transition-colors duration-300">Portal de libros</a>
                  <a href="https://portaldecartelescientificos.org/Cursos" className="block px-4 py-2 hover:text-[#FFFF00] transition-colors duration-300">Plataforma de aprendizaje</a>
                  <a href='https://relaticpanama.org/_protect' className="block px-4 py-2 hover:text-[#FFFF00] transition-colors duration-300">Propiedad Intelectual</a>
                </div>
              )}
            </div>

            <div className="relative">
              <button onClick={() => setShowActivitiesSubMenu(!showActivitiesSubMenu)} className="hover:text-[#FFFF00] transition-colors duration-300 focus:outline-none">Actividades</button>
              {showActivitiesSubMenu && (
                <div className="absolute left-0 mt-2 bg-gradient-to-b from-[#00E5FF] to-[#2E332B] text-white py-2 w-max min-w-max rounded-lg shadow-lg z-50">
                  <a href="/actividades/proximas" className="block px-4 py-2 hover:text-[#FFFF00] transition-colors duration-300">Actividades próximas</a>
                  <a href="/actividades/anteriores" className="block px-4 py-2 hover:text-[#FFFF00] transition-colors duration-300">Actividades anteriores</a>
                </div>
              )}
            </div>

            

            <a href="/contactus" className="hover:text-[#FFFF00] transition-colors duration-300" onClick={toggleMenu}>Contacto</a>
            <div className="relative">
              <button onClick={() => setShowRegisterSubMenu(!showRegisterSubMenu)} className="hover:text-[#FFFF00] transition-colors duration-300 focus:outline-none">Regístrate</button>
              {showRegisterSubMenu && (
                <div className="absolute left-0 mt-2 bg-gradient-to-b from-[#00E5FF] to-[#2E332B] text-white py-2 w-max min-w-max rounded-lg shadow-lg z-50">
                  <a href="/suscription" className="block px-4 py-2 hover:text-[#FFFF00] transition-colors duration-300">Subscríbete</a>
                </div>
              )}
            </div>

            <div className="flex space-x-4 pt-4">
              <a href="https://www.linkedin.com/in/relatic-panam%C3%A1-a80b93356?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="p-2 bg-[#0077B5] rounded-full hover:opacity-80 transition duration-300">
                <FaLinkedin size={20} color="#FFFFFF" />
              </a>
              <a href="https://www.instagram.com/relatic.panama?igsh=bGFrcmMwbGZxd3Vq" target="_blank" rel="noopener noreferrer" title="Instagram" className="p-2 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-full hover:opacity-80 transition duration-300">
                <FaInstagram size={20} color="#FFFFFF" />
              </a>
              <a href="https://x.com/RelaticPanama" target="_blank" rel="noopener noreferrer" title="X (Twitter)" className="p-2 bg-black rounded-full hover:opacity-80 transition duration-300">
                <SiX size={18} color="#FFFFFF" />
              </a>
              <a href="https://www.facebook.com/share/19hGgzbge1/" target="_blank" rel="noopener noreferrer" title="Facebook" className="p-2 bg-[#1877F2] rounded-full hover:opacity-80 transition duration-300">
                <FaFacebook size={20} color="#FFFFFF" />
              </a>
              <a href="https://www.youtube.com/@RelaticPanama" target="_blank" rel="noopener noreferrer" title="YouTube" className="p-2 bg-[#FF0000] rounded-full hover:opacity-80 transition duration-300">
                <FaYoutube size={20} color="#FFFFFF" />
              </a>
              <a href="https://wa.me/50766751782" target="_blank" rel="noopener noreferrer" title="WhatsApp" className="p-2 bg-[#25D366] rounded-full hover:opacity-80 transition duration-300">
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