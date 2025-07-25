import PropTypes from 'prop-types';
import { Mail, Phone, ExternalLink } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

const colorsByLevel = {
  1: '#0a2d4d',
  2: '#00bcd4',
  3: '#0a2d4d',
};

const ContactCard = ({ contact }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, []);

  return (
    <div
      ref={ref}
      className={`
        flex flex-col items-center space-y-4
        p-6 md:p-8 rounded-2xl shadow-2xl border border-white/10
        w-full max-w-xs bg-opacity-90
        transform transition-all duration-700 ease-in-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        hover:scale-[1.03]
        backdrop-blur-sm
      `}
      style={{ backgroundColor: colorsByLevel[contact.level], color: 'white' }}
    >
      <img
        src={contact.image}
        alt={contact.name}
        className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover shadow-md border-2 border-white/20"
      />
      <div className="flex flex-col items-center text-center">
        <h3 className="text-xl font-semibold mb-1">{contact.name}</h3>
        <p className="text-sm text-white/90 mb-3">{contact.occupation}</p>
        <div className="flex flex-col items-center space-y-2 w-full text-sm">
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center space-x-2 hover:underline w-full truncate"
          >
            <Mail size={14} />
            <span className="truncate max-w-[200px]">{contact.email}</span>
          </a>
          <a
            href={`tel:${contact.phone}`}
            className="flex items-center space-x-2 hover:underline w-full truncate"
          >
            <Phone size={14} />
            <span className="truncate">{contact.phone}</span>
          </a>
          {contact.orcid && contact.orcid !== '#' ? (
            <a
              href={contact.orcid}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:underline w-full truncate"
            >
              <ExternalLink size={14} />
              <span className="truncate">Ver ORCID</span>
            </a>
          ) : (
            <span className="truncate text-white/70">ORCID no disponible</span>
          )}
        </div>
      </div>
    </div>
  );
};

ContactCard.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    orcid: PropTypes.string,
    image: PropTypes.string.isRequired,
    occupation: PropTypes.string.isRequired,
    area: PropTypes.string,
    level: PropTypes.number.isRequired,
  }).isRequired,
};

const AboutUs = () => {
  const contacts = [
    {
      name: "Dr. Francisco Farnum",
      email: "gerencia@relaticpanama.org",
      phone: "+507 6675-1782",
      orcid: "https://orcid.org/0000-0002-5879-2296",
      image: "/assets/Dr.Farnum.jpeg",
      occupation: "Director General",
      area: "Dirección",
      level: 1,
    },
    {
      name: "Lcda. Tania Kennedy",
      email: "administracion@relaticpanama.org",
      phone: "+507 6645-7685",
      orcid: "https://orcid.org/0009-0009-8858-0954",
      image: "/assets/Dra.Tania.jpeg",
      occupation: "Gerente Administrativa",
      area: "Administración",
      level: 2,
    },
    {
      name: "Dra. Mónica Contreras",
      email: "academico@relaticpanama.org",
      phone: "+507 6773-4854",
      orcid: "https://orcid.org/0000-0003-0972-6951",
      image: "/assets/Dra.Monica.jpeg",
      occupation: "Gerente Académica",
      area: "Académica",
      level: 2,
    },
    {
      name: "Dev. Israel Samuels",
      email: "desarrolloyoperaciones@relaticpanama.org",
      phone: "+507 6549-8362",
      orcid: "https://orcid.org/0009-0007-1212-718X",
      image: "/assets/Yo.jpeg",
      occupation: "Desarrollo y Operaciones",
      area: "Tecnología",
      level: 2,
    },
    {
      name: "Dr. Sósimo Poma",
      email: "evaluadoracademico@relaticpanama.org",
      phone: "+51 980-981-906",
      orcid: "https://orcid.org/0000-0002-5999-5212",
      image: "/assets/Dr.Sosimo.jpeg",
      occupation: "Evaluador Académico",
      area: "Evaluación",
      level: 3,
    },
    {
      name: "Dra. Lourdes Céspedes",
      email: "evaluadoracademico@relaticpanama.org",
      phone: "+51 948-477-669",
      orcid: "https://orcid.org/0000-0002-4358-8575",
      image: "/assets/Dra.Lourdes.jpeg",
      occupation: "Evaluadora Académica",
      area: "Evaluación",
      level: 3,
    },
    {
      name: "Dra. Isabel Menacho",
      email: "mercadeoyventas@relaticpanama.org",
      phone: "+51 999 193 952",
      orcid: "https://orcid.org/0000-0001-6246-4618",
      image: "/assets/Isabel.jpeg",
      occupation: "Mercadeo y ventas",
      area: "Alianzas",
      level: 3,
    },
    {
      name: "Ing. José Murillo",
      email: "tecnologia@relaticpanama.org",
      phone: "+507 6320-6113",
      orcid: "https://orcid.org/0009-0001-8994-3835",
      image: "/assets/Ing.Jose.jpeg",
      occupation: "Analista de sistemas y seguridad informática",
      area: "Tecnología",
      level: 3,
    },
  ];

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#0a2d4d] mb-10">
          Conoce a Nuestro Equipo
        </h2>

        <div className="flex flex-col items-center space-y-12">
          {/* Nivel 1 */}
          <div className="w-full flex justify-center">
            <div className="w-full max-w-xs">
              {contacts
                .filter((c) => c.level === 1)
                .map((contact, idx) => (
                  <ContactCard key={idx} contact={contact} />
                ))}
            </div>
          </div>

          {/* Nivel 2 */}
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center">
              {contacts
                .filter((c) => c.level === 2)
                .map((contact, idx) => (
                  <ContactCard key={idx} contact={contact} />
                ))}
            </div>
          </div>

          {/* Nivel 3 */}
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center">
              {contacts
                .filter((c) => c.level === 3)
                .map((contact, idx) => (
                  <ContactCard key={idx} contact={contact} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;