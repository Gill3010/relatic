import { useEffect } from 'react';
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
  // Estilos CSS optimizados para móvil horizontal
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      /* Estilos optimizados para móvil horizontal */
      @media (max-width: 1024px) and (orientation: landscape) and (max-height: 600px) {
        .footer-mobile-landscape {
          padding: 20px 0 !important;
        }
        
        .footer-grid-mobile {
          grid-template-columns: 1fr 1fr !important;
          gap: 16px !important;
          padding: 0 16px !important;
        }
        
        .footer-brand-mobile {
          grid-column: 1 / -1 !important;
          text-align: center !important;
          margin-bottom: 16px !important;
          padding-bottom: 16px !important;
          border-bottom: 1px solid rgb(71 85 105) !important;
        }
        
        .footer-brand-title {
          font-size: 1.2rem !important;
          margin-bottom: 8px !important;
        }
        
        .footer-brand-text {
          font-size: 0.8rem !important;
          line-height: 1.3 !important;
          max-width: 80% !important;
          margin: 0 auto !important;
        }
        
        .footer-section-title {
          font-size: 0.9rem !important;
          margin-bottom: 8px !important;
          padding-bottom: 4px !important;
        }
        
        .footer-nav-list {
          gap: 6px !important;
        }
        
        .footer-nav-item {
          font-size: 0.75rem !important;
        }
        
        .footer-nav-icon {
          width: 12px !important;
          height: 12px !important;
        }
        
        .footer-contact-item {
          gap: 8px !important;
          margin-bottom: 8px !important;
        }
        
        .footer-contact-icon-wrapper {
          padding: 4px !important;
        }
        
        .footer-contact-icon {
          width: 12px !important;
          height: 12px !important;
        }
        
        .footer-contact-text {
          font-size: 0.7rem !important;
          line-height: 1.2 !important;
        }
        
        .footer-social-icons {
          gap: 8px !important;
          margin-top: 12px !important;
          justify-content: center !important;
        }
        
        .footer-social-icon {
          width: 16px !important;
          height: 16px !important;
        }
        
        .footer-bottom {
          padding: 12px 0 !important;
        }
        
        .footer-bottom-text {
          font-size: 0.7rem !important;
          margin-bottom: 4px !important;
        }
        
        .footer-bottom-small {
          font-size: 0.6rem !important;
        }
        
        .footer-contact-section {
          grid-column: 1 / -1 !important;
          text-align: center !important;
          margin-top: 16px !important;
          padding-top: 16px !important;
          border-top: 1px solid rgb(71 85 105) !important;
        }
      }
      
      /* Para dispositivos muy pequeños en horizontal (iPhone SE, etc.) */
      @media (max-width: 667px) and (orientation: landscape) and (max-height: 375px) {
        .footer-mobile-landscape {
          padding: 12px 0 !important;
        }
        
        .footer-grid-mobile {
          gap: 12px !important;
          padding: 0 12px !important;
        }
        
        .footer-brand-mobile {
          margin-bottom: 12px !important;
          padding-bottom: 12px !important;
        }
        
        .footer-brand-title {
          font-size: 1rem !important;
          margin-bottom: 6px !important;
        }
        
        .footer-brand-text {
          font-size: 0.7rem !important;
          max-width: 85% !important;
        }
        
        .footer-section-title {
          font-size: 0.8rem !important;
          margin-bottom: 6px !important;
          padding-bottom: 3px !important;
        }
        
        .footer-nav-list {
          gap: 4px !important;
        }
        
        .footer-nav-item {
          font-size: 0.7rem !important;
        }
        
        .footer-nav-icon {
          width: 10px !important;
          height: 10px !important;
        }
        
        .footer-contact-item {
          gap: 6px !important;
          margin-bottom: 6px !important;
        }
        
        .footer-contact-icon-wrapper {
          padding: 3px !important;
        }
        
        .footer-contact-icon {
          width: 10px !important;
          height: 10px !important;
        }
        
        .footer-contact-text {
          font-size: 0.65rem !important;
        }
        
        .footer-social-icons {
          gap: 6px !important;
          margin-top: 8px !important;
        }
        
        .footer-social-icon {
          width: 14px !important;
          height: 14px !important;
        }
        
        .footer-bottom {
          padding: 8px 0 !important;
        }
        
        .footer-bottom-text {
          font-size: 0.65rem !important;
        }
        
        .footer-bottom-small {
          font-size: 0.55rem !important;
        }
        
        .footer-contact-section {
          margin-top: 12px !important;
          padding-top: 12px !important;
        }
      }
      
      /* Para tablets en horizontal */
      @media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) and (max-height: 768px) {
        .footer-grid-mobile {
          grid-template-columns: repeat(4, 1fr) !important;
        }
        
        .footer-brand-mobile {
          grid-column: span 1 !important;
          text-align: left !important;
          margin-bottom: 0 !important;
          padding-bottom: 0 !important;
          border-bottom: none !important;
        }
        
        .footer-contact-section {
          grid-column: span 1 !important;
          text-align: left !important;
          margin-top: 0 !important;
          padding-top: 0 !important;
          border-top: none !important;
        }
      }
      
      /* Ajustes adicionales para mejorar la visualización */
      @media (orientation: landscape) and (max-height: 600px) {
        .footer-scroll-container {
          max-height: calc(100vh - 40px) !important;
          overflow-y: auto !important;
        }
      }
    `;
    
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <footer className="bg-slate-800 text-white relative overflow-hidden footer-mobile-landscape">
      <div className="footer-scroll-container">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 z-10 footer-grid-mobile">
          
          {/* Marca RELATIC */}
          <div className="space-y-4 footer-brand-mobile">
            <h2 className="text-2xl font-bold tracking-tight text-blue-600 footer-brand-title">
              RELATIC PANAMÁ
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed footer-brand-text">
              Relatic Panamá es una plataforma dedicada a la investigación y difusión del conocimiento científico y académico, conectando instituciones y profesionales del ámbito educativo.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 border-b border-slate-600 pb-2 text-blue-600 footer-section-title`}>
              Navegación
            </h3>
            <ul className="space-y-3 text-slate-300 text-sm footer-nav-list">
              <li className="group">
                <a href="/" className="flex items-center gap-2 hover:text-blue-200 transition-colors duration-300 footer-nav-item">
                  <FaHome size={14} className="footer-nav-icon" />
                  <span className="relative">
                    Inicio
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
              </li>
              <li className="group">
                <a href="/nosotros" className="flex items-center gap-2 hover:text-blue-200 transition-colors duration-300 footer-nav-item">
                  <FaUsers size={14} className="footer-nav-icon" />
                  <span className="relative">
                    Nosotros
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
              </li>
              <li className="group">
                <a href="https://relaticpanama.org/_blog/" className="flex items-center gap-2 hover:text-blue-200 transition-colors duration-300 footer-nav-item">
                  <FaNewspaper size={14} className="footer-nav-icon" />
                  <span className="relative">
                    Blog
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
              </li>
              <li className="group">
                <a href="/suscription" className="flex items-center gap-2 hover:text-blue-200 transition-colors duration-300 footer-nav-item">
                  <FaRocket size={14} className="footer-nav-icon" />
                  <span className="relative">
                    Afíliate
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
              </li>
              <li className="group">
                <a href="https://relaticpanama.org/_events" className="flex items-center gap-2 hover:text-blue-200 transition-colors duration-300 footer-nav-item">
                  <FaRegCalendarCheck size={14} className="footer-nav-icon" />
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
            <h3 className={`text-lg font-semibold mb-4 border-b border-slate-600 pb-2 text-blue-600 footer-section-title`}>
              Servicios
            </h3>
            <ul className="space-y-3 text-slate-300 text-sm footer-nav-list">
              <li className="group">
                <a href="https://relaticpanama.org/_journals/" className="flex items-center gap-2 hover:text-blue-200 transition-colors duration-300 footer-nav-item">
                  <Newspaper size={14} className="footer-nav-icon" />
                  <span className="relative">
                    Revistas Indexadas
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
              </li>
              <li className="group">
                <a href="https://relaticpanama.org/_posters/" className="flex items-center gap-2 hover:text-blue-200 transition-colors duration-300 footer-nav-item">
                  <FileText size={14} className="footer-nav-icon" />
                  <span className="relative">
                    Carteles Digitales
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
              </li>
              <li className="group">
                <a href="https://relaticpanama.org/_books/index.php/edrp/catalog" className="flex items-center gap-2 hover:text-blue-200 transition-colors duration-300 footer-nav-item">
                  <BookOpen size={14} className="footer-nav-icon" />
                  <span className="relative">
                    Libros Digitales
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
              </li>
              <li className="group">
                <a href="https://relaticpanama.org/_classroom/" className="flex items-center gap-2 hover:text-blue-200 transition-colors duration-300 footer-nav-item">
                  <GraduationCap size={14} className="footer-nav-icon" />
                  <span className="relative">
                    Aprendizaje Continuo
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
              </li>
              <li className="group">
                <a href="https://relaticpanama.org/_protect/" className="flex items-center gap-2 hover:text-blue-200 transition-colors duration-300 footer-nav-item">
                  <ShieldCheck size={14} className="footer-nav-icon" />
                  <span className="relative">
                    Propiedad Intelectual
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="footer-contact-section">
            <h3 className={`text-lg font-semibold mb-4 border-b border-slate-600 pb-2 text-blue-600 footer-section-title`}>
              Contáctanos
            </h3>
            <ul className="space-y-3 text-slate-300 text-sm">
              <li className="flex items-center gap-3 group footer-contact-item">
                <div className="p-1 rounded-md bg-slate-700 group-hover:bg-slate-600 transition-colors duration-300 footer-contact-icon-wrapper">
                  <Mail size={16} className="text-white footer-contact-icon" />
                </div>
                <a href="mailto:gerencia@relaticpanama.org" className="hover:text-blue-200 transition-colors duration-300 footer-contact-text">
                  gerencia@relaticpanama.org
                </a>
              </li>
              <li className="flex items-center gap-3 group footer-contact-item">
                <div className="p-1 rounded-md bg-slate-700 group-hover:bg-slate-600 transition-colors duration-300 footer-contact-icon-wrapper">
                  <Phone size={16} className="text-white footer-contact-icon" />
                </div>
                <span className="hover:text-blue-200 transition-colors duration-300 footer-contact-text">
                  +507 6645-7685 | +507 208-4689
                </span>
              </li>
              <li className="flex items-center gap-3 group footer-contact-item">
                <div className="p-1 rounded-md bg-slate-700 group-hover:bg-slate-600 transition-colors duration-300 footer-contact-icon-wrapper">
                  <MapPin size={16} className="text-white footer-contact-icon" />
                </div>
                <span className="hover:text-blue-200 transition-colors duration-300 footer-contact-text">
                  Ciudad de Panamá, Panamá
                </span>
              </li>
            </ul>

            {/* Redes sociales */}
            <div className="flex gap-3 mt-6 footer-social-icons">
              <a href="https://www.linkedin.com/in/relatic-panam%C3%A1-a80b93356" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform duration-300">
                <FaLinkedin size={20} className="text-[#0077B5] footer-social-icon" />
              </a>
              <a href="https://www.instagram.com/relatic.panama" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform duration-300">
                <FaInstagram size={20} className="text-[#E1306C] footer-social-icon" />
              </a>
              <a href="https://x.com/RelaticPanama" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform duration-300">
                <FaXTwitter size={20} className="text-white footer-social-icon" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61573905375213" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform duration-300">
                <FaFacebook size={20} className="text-[#1877F2] footer-social-icon" />
              </a>
              <a href="https://www.youtube.com/@RelaticPanama" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform duration-300">
                <FaYoutube size={20} className="text-[#FF0000] footer-social-icon" />
              </a>
              <a href="https://wa.me/50766751782" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform duration-300">
                <FaWhatsapp size={20} className="text-[#25D366] footer-social-icon" />
              </a>
            </div>
          </div>
        </div>

        {/* Pie de página final */}
        <div className="border-t border-slate-700 text-center py-4 text-sm text-slate-400 footer-bottom">
          <p className="mb-1 footer-bottom-text">
            © {new Date().getFullYear()} <span className="text-blue-600 font-semibold">Relatic Panamá</span>. Todos los derechos reservados.
          </p>
          <p className="text-xs text-slate-500 footer-bottom-small">
            Ciencia, Tecnología e Innovación.
          </p>
          <p className="text-xs text-slate-500 mt-1 footer-bottom-small">
            Powered by{' '}
            <a
              href="https://innovaproyectos.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-500 transition-colors duration-300"
            >
              Innova Proyectos
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;