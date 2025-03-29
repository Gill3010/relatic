import { FaLinkedin, FaRegEnvelope, FaPhone, FaMapMarkerAlt, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#68358c] to-[#2d2e77] text-white py-6 shadow-md">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        
        {/* Sección central con información sobre Relatic Panamá */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold">Relatic Panamá</h2>
          <p className="text-sm mt-2 text-center">Relatic Panamá es una plataforma dedicada a la investigación y difusión del conocimiento científico y académico, conectando instituciones y profesionales del ámbito educativo.</p>
        </div>

        {/* Sección de redes sociales */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Síguenos</h3>
          <div className="flex justify-center space-x-6">
            <a href=" https://www.linkedin.com/in/relatic-panam%C3%A1-a80b93356/" target="_blank" rel="noopener noreferrer" className="p-3 bg-verdeBoton rounded-full hover:bg-[#2d2e77] transition duration-300">
              <FaLinkedin size={20} className="text-white" />
            </a>
            {/* Agregando los iconos de Instagram, Twitter y Facebook */}
            <a href="https://www.instagram.com/relatic.panama/" target="_blank" rel="noopener noreferrer" className="p-3 bg-verdeBoton rounded-full hover:bg-[#2d2e77] transition duration-300">
              <FaInstagram size={20} className="text-white" />
            </a>
            <a href="https://x.com/RelaticPanama" target="_blank" rel="noopener noreferrer" className="p-3 bg-verdeBoton rounded-full hover:bg-[#2d2e77] transition duration-300">
              <FaTwitter size={20} className="text-white" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61573905375213" target="_blank" rel="noopener noreferrer" className="p-3 bg-verdeBoton rounded-full hover:bg-[#2d2e77] transition duration-300">
              <FaFacebook size={20} className="text-white" />
            </a>
          </div>
         {/* Centrado del logo */}
<div className="flex justify-center mt-4">
  <a href="https://www.relaticpanama.org/" target="" rel="noopener noreferrer">
    <img 
      src="/logo2.png" 
      alt="Relatic Panamá Logo" 
      className="w-52 h-auto mb-2 object-contain" 
    />
  </a>
</div>
        </div>

        {/* Sección de contacto */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contáctenos</h3>
          <p className="flex items-center justify-center space-x-2"><FaMapMarkerAlt /><span>Mirador del Pacífico, San Miguelito, Local 70 Ciudad de Panamá, Panamá</span></p>
          <p className="flex items-center justify-center space-x-2"><FaPhone /><span>+507 6645-7685 | +507 208-4689</span></p>
          <p className="flex items-center justify-center space-x-2"><FaRegEnvelope /><span>administracionypagos@relaticpanama.org</span></p>
          <p className="flex items-center justify-center space-x-2"><FaRegEnvelope /><span>mercadeoyventas@relaticpanama.org</span></p>
        </div>
      </div>
      
      {/* Línea horizontal */}
      <hr className="border-t border-white my-4 mx-auto w-4/5" />

      {/* Derechos reservados */}
      <p className="text-center text-sm mt-2">©2025 Relatic Panamá. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;
