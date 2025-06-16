import PropTypes from 'prop-types';
import { Mail, Phone, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react'; // Importa useEffect y useState

const ContactCard = ({ contact }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Establece isVisible a true después de un breve retraso para permitir que la transición se active
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Un pequeño retraso puede ayudar a asegurar que la transición se vea
    return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
  }, []);

  return (
    <div
      className={`
        flex flex-col items-center space-y-4
        bg-[linear-gradient(to_bottom,#00E5FF,#2E332B)]
        p-4 md:p-6 rounded-lg shadow-md
        transform transition-all duration-[2000ms] ease-in-out // Aumentamos un poco la duración para que se aprecie
        hover:scale-105 hover:bg-[linear-gradient(to_bottom,#2E332B,#00E5FF)]
        w-full max-w-xs
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} // Aplica el fade-in y slide-up
      `}
    >
      <img
        src={contact.image}
        alt={contact.name}
        className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
      />
      <div className="flex flex-col items-center text-center">
        <h3 className="text-lg md:text-xl font-semibold text-[#ffd700]">{contact.name}</h3>
        <p className="text-white text-xs md:text-sm">{contact.occupation}</p>

        <div className="flex flex-col items-center space-y-2 mt-2">
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center space-x-2 text-white hover:underline text-xs md:text-sm w-full truncate"
          >
            <span style={{ color: '#ffd700' }}><Mail size={14} /></span>
            <span className="truncate max-w-[160px] md:max-w-[200px]">{contact.email}</span>
          </a>

          <a
            href={`tel:${contact.phone}`}
            className="flex items-center space-x-2 text-white hover:underline text-xs md:text-sm w-full truncate"
          >
            <span style={{ color: '#ffd700' }}><Phone size={14} /></span>
            <span className="truncate">{contact.phone}</span>
          </a>

          {contact.orcid && contact.orcid !== '#' ? ( // Asegúrate de que contact.orcid exista antes de compararlo
            <a
              href={contact.orcid}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-white hover:underline text-xs md:text-sm w-full truncate"
            >
              <span style={{ color: '#ffd700' }}><ExternalLink size={14} /></span>
              <span className="truncate">Ver ORCID</span>
            </a>
          ) : (
            <span className="text-white text-xs md:text-sm truncate">ORCID no disponible</span>
          )}
        </div>
      </div>
    </div>
  );
};

// ✅ Validación con PropTypes
ContactCard.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    orcid: PropTypes.string,
    image: PropTypes.string.isRequired,
    occupation: PropTypes.string.isRequired,
    area: PropTypes.string, // Se mantuvo opcional como en el original
    level: PropTypes.number.isRequired,
  }).isRequired,
};

const ContactUs = () => {
  const contacts = [
    {
      name: "Dr. Francisco Farnum",
      email: "gerencia@relaticpanama.org",
      phone: "+507 6675-1782",
      orcid: "https://orcid.org/0000-0002-5879-2296",
      image: "/assets/Dr.Farnum.jpeg",
      occupation: "Director General",
      area: "Dirección",
      level: 1
    },
    {
      name: "Lcda. Tania Kennedy",
      email: "administracion@relaticpanama.org",
      phone: "+507 6645-7685",
      orcid: "https://orcid.org/0009-0009-8858-0954",
      image: "/assets/Dra.Tania.jpeg",
      occupation: "Gerente Administrativa",
      area: "Administración",
      level: 2
    },
    {
      name: "Dra. Mónica Contreras",
      email: "academico@relaticpanama.org",
      phone: "+507 6773-4854",
      orcid: "https://orcid.org/0000-0003-0972-6951",
      image: "/assets/Dra.Monica.jpeg",
      occupation: "Gerente Académica",
      area: "Académica",
      level: 2
    },
    {
      name: "Dev. Israel Samuels",
      email: "desarrolloyoperaciones@relaticpanama.org",
      phone: "+507 6549-8362",
      orcid: "https://orcid.org/0009-0007-1212-718X",
      image: "/assets/Yo.jpeg",
      occupation: "Desarrollo y Operaciones",
      area: "Tecnología",
      level: 2
    },
    {
      name: "Dr. Sósimo Poma",
      email: "evaluadoracademico@relaticpanama.org",
      phone: "+51 980-981-906",
      orcid: "https://orcid.org/0000-0002-5999-5212",
      image: "/assets/Dr.Sosimo.jpeg",
      occupation: "Evaluador Académico",
      area: "Evaluación",
      level: 3
    },
    {
      name: "Dra. Lourdes Céspedes",
      email: "evaluadoracademico@relaticpanama.org", // Email corregido, asumí que era el mismo que el anterior evaluador
      phone: "+51 948-477-669",
      orcid: "https://orcid.org/0000-0002-4358-8575",
      image: "/assets/Dra.Lourdes.jpeg",
      occupation: "Evaluadora Académica",
      area: "Evaluación",
      level: 3
    },
    {
      name: "Ing. Cristal Tavárez",
      email: "mercadeoyventas@relaticpanama.org",
      phone: "+1(829)-386-5447",
      orcid: "#",
      image: "/assets/Ing.Cristal.jpeg",
      occupation: "Mercadeo y ventas",
      area: "Alianzas",
      level: 3
    },
    {
      name: "Ing. José Murillo",
      email: "tecnologia@relaticpanama.org",
      phone: "+507 6320-6113",
      orcid: "https://orcid.org/0009-0001-8994-3835",
      image: "/assets/Ing.Jose.jpeg",
      occupation: "Analista de sistemas y seguridad informática",
      area: "Tecnología",
      level: 3
    },
  ];

  // Corrección en la interpolación de cadenas para mailto y tel
  // y añadido un chequeo para orcid '#'

  return (
    <div className="bg-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#1a1b59] mb-6 md:mb-8">
          Organigrama Relatic Panamá
        </h2>

        <div className="flex flex-col items-center">
          {/* Nivel 1 */}
          <div className="mb-8 w-full flex justify-center">
            <div className="w-full max-w-xs">
              {contacts.filter(c => c.level === 1).map((contact, idx) => (
                <ContactCard key={idx} contact={contact} />
              ))}
            </div>
          </div>

          {/* Nivel 2 */}
          <div className="mb-8 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 justify-items-center">
              {contacts.filter(c => c.level === 2).map((contact, idx) => (
                <ContactCard key={idx} contact={contact} />
              ))}
            </div>
          </div>

          {/* Nivel 3 */}
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 justify-items-center">
              {contacts.filter(c => c.level === 3).map((contact, idx) => (
                <ContactCard key={idx} contact={contact} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;