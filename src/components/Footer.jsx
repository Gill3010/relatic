import { Mail, Phone, MapPin, BookOpen, FileText, GraduationCap, ShieldCheck, Newspaper, } from 'lucide-react';
import {
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaWhatsapp,
  FaXTwitter,
  FaUsers,
  FaRocket,
  FaNewspaper,
  FaRegCalendarCheck,
} from 'react-icons/fa6';

import { FaHome } from 'react-icons/fa'; 
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className="bg-[#0a2d4d] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 z-10">
        
        {/* Marca RELATIC */}
        <div className="space-y-4">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#00bcd4] drop-shadow-xl">
            RELATIC PANAMÁ
          </h2>
          <p className="text-sm text-gray-100 leading-relaxed">
            Relatic Panamá es una plataforma dedicada a la investigación y difusión del conocimiento científico y académico, conectando instituciones y profesionales del ámbito educativo.
          </p>
        </div>

        {/* Navegación */}
       <div>
  <h3 className={`text-lg font-semibold mb-4 border-b border-white/20 pb-1 text-[#00bcd4] transition-colors duration-300 ${styles.animatedBorder}`}>
    Navegación
  </h3>
  <ul className="space-y-2 text-gray-100 text-sm">
    <li className="flex items-center gap-2">
      <FaHome size={14} />
      <a href="/" className="hover:text-cyan-300 transition duration-300 hover:translate-x-1">Inicio</a>
    </li>
    <li className="flex items-center gap-2">
      <FaUsers size={14} />
      <a href="/nosotros" className="hover:text-cyan-300 transition duration-300 hover:translate-x-1">Nosotros</a>
    </li>
    <li className="flex items-center gap-2">
      <FaNewspaper size={14} />
      <a href="https://relaticpanama.org/_blog/" className="hover:text-cyan-300 transition duration-300 hover:translate-x-1">Blog</a>
    </li>
    <li className="flex items-center gap-2">
      <FaRocket size={14} />
      <a href="/suscription" className="hover:text-cyan-300 transition duration-300 hover:translate-x-1">Afíliate</a>
    </li>
    <li className="flex items-center gap-2">
      <FaRegCalendarCheck size={14} />
      <a href="https://relaticpanama.org/_events/" className="hover:text-cyan-300 transition duration-300 hover:translate-x-1">III Congreso IC</a>
    </li>
  </ul>
</div>

        {/* Servicios */}
        <div>
          <h3 className={`text-lg font-semibold mb-4 border-b border-white/20 pb-1 text-[#00bcd4] transition-colors duration-300 ${styles.animatedBorder}`}>
            Servicios
          </h3>
          <ul className="space-y-2 text-gray-100 text-sm">
            <li className="flex items-center gap-2">
              <Newspaper size={14} />
              <a href="https://relaticpanama.org/_journals/" className="hover:text-cyan-300 transition duration-300 hover:translate-x-1">Revistas Indexadas</a>
            </li>
            <li className="flex items-center gap-2">
              <FileText size={14} />
              <a href="https://relaticpanama.org/_posters/" className="hover:text-cyan-300 transition duration-300 hover:translate-x-1">Carteles Digitales</a>
            </li>
            <li className="flex items-center gap-2">
              <BookOpen size={14} />
              <a href="https://relaticpanama.org/_books/index.php/edrp/inicio" className="hover:text-cyan-300 transition duration-300 hover:translate-x-1">Libros Digitales</a>
            </li>
            <li className="flex items-center gap-2">
              <GraduationCap size={14} />
              <a href="https://relaticpanama.org/_classroom/" className="hover:text-cyan-300 transition duration-300 hover:translate-x-1">Aprendizaje Continuo</a>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck size={14} />
              <a href="https://relaticpanama.org/_protect/" className="hover:text-cyan-300 transition duration-300 hover:translate-x-1">Propiedad Intelectual</a>
            </li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h3 className={`text-lg font-semibold mb-4 border-b border-white/20 pb-1 text-[#00bcd4] transition-colors duration-300 ${styles.animatedBorder}`}>
            Contáctanos
          </h3>
          <ul className="space-y-3 text-gray-100 text-sm">
            <li className="flex items-center gap-3 hover:text-cyan-300 transition duration-300">
              <div className="p-1 rounded bg-white/10 border border-white/20">
                <Mail size={16} className="text-white" />
              </div>
              <a href="mailto:gerencia@relaticpanama.org" className="hover:underline">
                gerencia@relaticpanama.org
              </a>
            </li>
            <li className="flex items-center gap-3 hover:text-cyan-300 transition duration-300">
              <div className="p-1 rounded bg-white/10 border border-white/20">
                <Phone size={16} className="text-white" />
              </div>
              <span>+507 6645-7685 | +507 208-4689</span>
            </li>
            <li className="flex items-center gap-3 hover:text-cyan-300 transition duration-300">
              <div className="p-1 rounded bg-white/10 border border-white/20">
                <MapPin size={16} className="text-white" />
              </div>
              <span>Ciudad de Panamá, Panamá</span>
            </li>
          </ul>

          {/* Redes sociales */}
          <div className="flex gap-4 mt-4">
            <a href="https://www.linkedin.com/in/relatic-panam%C3%A1-a80b93356" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={22} className="text-[#0077B5] hover:scale-110 transition-transform" />
            </a>
            <a href="https://www.instagram.com/relatic.panama" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={22} className="text-[#E1306C] hover:scale-110 transition-transform" />
            </a>
            <a href="https://x.com/RelaticPanama" target="_blank" rel="noopener noreferrer">
              <FaXTwitter size={22} className="text-white hover:scale-110 transition-transform" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61573905375213" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={22} className="text-[#1877F2] hover:scale-110 transition-transform" />
            </a>
            <a href="https://www.youtube.com/@RelaticPanama" target="_blank" rel="noopener noreferrer">
              <FaYoutube size={22} className="text-[#FF0000] hover:scale-110 transition-transform" />
            </a>
            <a href="https://wa.me/50766751782" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp size={22} className="text-[#25D366] hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Pie de página final */}
     <div className={`border-t border-white/10 text-center py-6 text-sm text-gray-300 bg-[#0a2d4d] ${styles.animatedBorder}`}>
        <p className="mb-2">
          © {new Date().getFullYear()} <span className="text-cyan-300 font-semibold">Relatic Panamá</span>. Todos los derechos reservados.
        </p>
        <p className="text-xs text-gray-400">
          Ciencia, Tecnología e Innovación.
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Powered by{' '}
          <a
            href="https://www.innovaproyectos.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-300 font-semibold hover:underline transition-colors duration-300"
          >
            Innova Proyectos
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;