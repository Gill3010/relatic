import { Mail, Phone, MapPin, BookOpen, FileText, GraduationCap, ShieldCheck, Newspaper } from 'lucide-react';
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


const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 z-10">
        
        {/* Marca RELATIC */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-blue-600">
            RELATIC PANAMÁ
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Relatic Panamá es una plataforma dedicada a la investigación y difusión del conocimiento científico y académico, conectando instituciones y profesionales del ámbito educativo.
          </p>
        </div>

        {/* Navegación */}
        <div>
          <h3 className={`text-lg font-semibold mb-4 border-b border-slate-600 pb-2 text-blue-600`}>
            Navegación
          </h3>
          <ul className="space-y-3 text-slate-300 text-sm">
            <li className="group">
              <a href="/" className="flex items-center gap-2 hover:text-blue-200 transition-colors duration-300">
                <FaHome size={14} />
                <span className="relative">
                  Inicio
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>
            </li>
            <li className="group">
              <a href="/nosotros" className="flex items-center gap-2 hover:text-blue-200 transition-colors duration-300">
                <FaUsers size={14} />
                <span className="relative">
                  Nosotros
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>
            </li>
            <li className="group">
              <a href="https://relaticpanama.org/_blog/" className="flex items-center gap-2 hover:text-blue-200 transition-colors duration-300">
                <FaNewspaper size={14} />
                <span className="relative">
                  Blog
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>
            </li>
            <li className="group">
              <a href="/suscription" className="flex items-center gap-2 hover:text-blue-200 transition-colors duration-300">
                <FaRocket size={14} />
                <span className="relative">
                  Afíliate
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>
            </li>
            <li className="group">
              <a href="https://relaticpanama.org/_events/" className="flex items-center gap-2 hover:text-blue-200 transition-colors duration-300">
                <FaRegCalendarCheck size={14} />
                <span className="relative">
                  III Congreso IC
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>
            </li>
          </ul>
        </div>

        {/* Servicios */}
        <div>
          <h3 className={`text-lg font-semibold mb-4 border-b border-slate-600 pb-2 text-blue-600`}>
            Servicios
          </h3>
          <ul className="space-y-3 text-slate-300 text-sm">
            <li className="group">
              <a href="https://relaticpanama.org/_journals/" className="flex items-center gap-2 hover:text-blue-200 transition-colors duration-300">
                <Newspaper size={14} />
                <span className="relative">
                  Revistas Indexadas
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>
            </li>
            <li className="group">
              <a href="https://relaticpanama.org/_posters/" className="flex items-center gap-2 hover:text-blue-200 transition-colors duration-300">
                <FileText size={14} />
                <span className="relative">
                  Carteles Digitales
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>
            </li>
            <li className="group">
              <a href="https://relaticpanama.org/_books/index.php/edrp/catalog" className="flex items-center gap-2 hover:text-blue-200 transition-colors duration-300">
                <BookOpen size={14} />
                <span className="relative">
                  Libros Digitales
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>
            </li>
            <li className="group">
              <a href="https://relaticpanama.org/_classroom/" className="flex items-center gap-2 hover:text-blue-200 transition-colors duration-300">
                <GraduationCap size={14} />
                <span className="relative">
                  Aprendizaje Continuo
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>
            </li>
            <li className="group">
              <a href="https://relaticpanama.org/_protect/" className="flex items-center gap-2 hover:text-blue-200 transition-colors duration-300">
                <ShieldCheck size={14} />
                <span className="relative">
                  Propiedad Intelectual
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>
            </li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h3 className={`text-lg font-semibold mb-4 border-b border-slate-600 pb-2 text-blue-600`}>
            Contáctanos
          </h3>
          <ul className="space-y-3 text-slate-300 text-sm">
            <li className="flex items-center gap-3 group">
              <div className="p-1 rounded-md bg-slate-700 group-hover:bg-slate-600 transition-colors duration-300">
                <Mail size={16} className="text-white" />
              </div>
              <a href="mailto:gerencia@relaticpanama.org" className="hover:text-blue-200 transition-colors duration-300">
                gerencia@relaticpanama.org
              </a>
            </li>
            <li className="flex items-center gap-3 group">
              <div className="p-1 rounded-md bg-slate-700 group-hover:bg-slate-600 transition-colors duration-300">
                <Phone size={16} className="text-white" />
              </div>
              <span className="hover:text-blue-200 transition-colors duration-300">
                +507 6645-7685 | +507 208-4689
              </span>
            </li>
            <li className="flex items-center gap-3 group">
              <div className="p-1 rounded-md bg-slate-700 group-hover:bg-slate-600 transition-colors duration-300">
                <MapPin size={16} className="text-white" />
              </div>
              <span className="hover:text-blue-200 transition-colors duration-300">
                Ciudad de Panamá, Panamá
              </span>
            </li>
          </ul>

          {/* Redes sociales */}
          <div className="flex gap-3 mt-6">
            <a href="https://www.linkedin.com/in/relatic-panam%C3%A1-a80b93356" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform duration-300">
              <FaLinkedin size={20} className="text-[#0077B5]" />
            </a>
            <a href="https://www.instagram.com/relatic.panama" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform duration-300">
              <FaInstagram size={20} className="text-[#E1306C]" />
            </a>
            <a href="https://x.com/RelaticPanama" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform duration-300">
              <FaXTwitter size={20} className="text-white" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61573905375213" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform duration-300">
              <FaFacebook size={20} className="text-[#1877F2]" />
            </a>
            <a href="https://www.youtube.com/@RelaticPanama" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform duration-300">
              <FaYoutube size={20} className="text-[#FF0000]" />
            </a>
            <a href="https://wa.me/50766751782" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform duration-300">
              <FaWhatsapp size={20} className="text-[#25D366]" />
            </a>
          </div>
        </div>
      </div>

      {/* Pie de página final */}
      <div className="border-t border-slate-700 text-center py-4 text-sm text-slate-400">
        <p className="mb-1">
          © {new Date().getFullYear()} <span className="text-blue-600 font-semibold">Relatic Panamá</span>. Todos los derechos reservados.
        </p>
        <p className="text-xs text-slate-500">
          Ciencia, Tecnología e Innovación.
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Powered by{' '}
          <a
            href="https://www.innovaproyectos.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-500 transition-colors duration-300"
          >
            Innova Proyectos
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;