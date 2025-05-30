import { FaLinkedin, FaRegEnvelope, FaPhone, FaMapMarkerAlt, FaInstagram, FaFacebook, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { SiX } from 'react-icons/si';

const Footer = () => {
  return (
    <footer className="bg-[linear-gradient(to_bottom,#2E332B,#00E5FF)] text-white font-bold py-8 shadow-md overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

          {/* Sección Relatic Panamá */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-xl font-bold text-[#FFFF00] mb-2">Relatic Panamá</h2>
            <div className="relative w-24 h-1 overflow-hidden mb-3">
  <div className="absolute top-0 left-0 w-1/2 h-full bg-[#FFFF00] animate-slide-horizontal"></div>
</div>

            <p className="text-sm mt-0">Relatic Panamá es una plataforma dedicada a la investigación y difusión del conocimiento científico y académico, conectando instituciones y profesionales del ámbito educativo.</p>
          </div>

          {/* Sección Síguenos */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-2 text-[#FFFF00]">Síguenos</h3>
            <div className="relative w-24 h-1 overflow-hidden mb-3">
  <div className="absolute top-0 left-0 w-1/2 h-full bg-[#FFFF00] animate-slide-horizontal"></div>
</div>

            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4 w-full max-w-xs mx-auto md:mx-0">
              {/* Redes sociales */}
              <a href="https://www.linkedin.com/in/relatic-panam%C3%A1-a80b93356/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#2d2e77] transition duration-300" style={{ backgroundColor: '#0A66C2' }} title="LinkedIn">
                <FaLinkedin size={18} className="text-white" />
              </a>
              <a href="https://www.instagram.com/relatic.panama?igsh=bGFrcmMwbGZxd3Vq" target="_blank" rel="noopener noreferrer" title="Instagram" className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 hover:opacity-80 transition duration-300">
                <FaInstagram size={18} color="#FFFFFF" />
              </a>
              <a href="https://x.com/RelaticPanama" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#2d2e77] transition duration-300" style={{ backgroundColor: '#000000' }} title="X">
                <SiX size={16} color="#FFFFFF" />
              </a>
              <a href="https://www.facebook.com/share/19hGgzbge1/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#2d2e77] transition duration-300" style={{ backgroundColor: '#1877F2' }} title="Facebook">
                <FaFacebook size={18} className="text-white" />
              </a>
              <a href="https://www.youtube.com/@RelaticPanama" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#2d2e77] transition duration-300" style={{ backgroundColor: '#FF0000' }} title="YouTube">
                <FaYoutube size={18} className="text-white" />
              </a>
              <a href="https://wa.me/50766751782" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#2d2e77] transition duration-300" style={{ backgroundColor: '#25D366' }} title="WhatsApp">
                <FaWhatsapp size={18} className="text-white" />
              </a>
            </div>

            <div className="md:items-start w-full text-center md:text-left">
              <a href="https://www.relaticpanama.org/" target="_blank" rel="noopener noreferrer" title="Sitio web de Relatic Panamá">
                <img src="/logo.png" alt="Relatic Panamá Logo" className="w-48 h-auto mb-2 object-contain mx-auto md:mx-0" />
              </a>
            </div>
          </div>

          {/* Sección Contáctenos */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-2 text-[#FFFF00]">Contáctenos</h3>
            <div className="relative w-24 h-1 overflow-hidden mb-3">
  <div className="absolute top-0 left-0 w-full h-full bg-[#FFFF00] animate-slide-horizontal"></div>
</div>

            <p className="flex flex-col md:flex-row items-center md:items-start mb-1 text-center md:text-left">
              <span className="inline-flex items-center"><FaMapMarkerAlt size={18} className="text-[#FFFF00] mr-1" />Mirador del Pacífico Local 70, Panamá</span>
            </p>
            <p className="flex items-center justify-center md:justify-start space-x-2 mb-1">
              <FaPhone size={18} className="text-[#FFFF00]" />
              <span>
                <a href="tel:+50766457685" className="hover:underline">+507 6645-7685</a> | <a href="tel:+5072084689" className="hover:underline">+507 208-4689</a>
              </span>
            </p>
            <p className="flex flex-col md:flex-row items-center md:items-start mb-1 text-center md:text-left">
              <span className="inline-flex items-center">
                <FaRegEnvelope size={18} className="text-[#FFFF00] mr-1" />
                <a href="mailto:administracion@relaticpanama.org" className="hover:underline">administracion@relaticpanama.org</a>
              </span>
            </p>
            <p className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
              <span className="inline-flex items-center">
                <FaRegEnvelope size={18} className="text-[#FFFF00] mr-1" />
                <a href="mailto:mercadeoyventas@relaticpanama.org" className="hover:underline">mercadeoyventas@relaticpanama.org</a>
              </span>
            </p>
          </div>
        </div>

        {/* Línea horizontal general */}
        <hr className="border-t border-[#FFFF00] my-6 mx-auto w-4/5" style={{ borderWidth: '2px' }} />

        {/* Derechos reservados */}
        <p className="text-center text-sm mt-2">©2025 Relatic Panamá. Todos los derechos reservados.</p>
        <p className="text-center text-sm mt-2">
          Desarrollado por{" "}
          <a href="https://innovaproyectos.org/" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "#FFFF00", fontWeight: "bold" }}>
            Innova Proyectos
          </a>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
