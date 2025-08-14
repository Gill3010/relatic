import PropTypes from 'prop-types';
import { Mail, Phone, ExternalLink } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

const colorsByLevel = {
  1: 'bg-slate-800',
  2: 'bg-blue-600',
  3: 'bg-slate-800',
};

const ContactCard = ({ contact, isDirector = false }) => {
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
        relative flex flex-col items-center space-y-4
        p-4 md:p-6 rounded-lg border border-slate-200
        w-full max-w-sm
        transform transition-all duration-300 ease-in-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        hover:scale-[1.02] hover:shadow-md
        ${isDirector ? 'border-slate-300 shadow-md' : 'border-slate-200'}
        ${colorsByLevel[contact.level]}
        text-white
      `}
    >
      {/* Imagen del perfil */}
      <div className={`relative ${isDirector ? 'mb-2' : 'mb-1'}`}>
        <img
          src={contact.image}
          alt={contact.name}
          className={`
            ${isDirector ? 'w-28 h-28 md:w-32 md:h-32' : 'w-20 h-20 md:w-24 md:h-24'} 
            rounded-full object-cover shadow-md border-2 border-white/30
          `}
        />
        {isDirector && (
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-gray-800">★</span>
          </div>
        )}
      </div>

      {/* Información personal */}
      <div className="flex flex-col items-center text-center space-y-2 w-full">
        <h3 className={`
          ${isDirector ? 'text-lg md:text-xl' : 'text-base md:text-lg'} 
          font-bold leading-tight
        `}>
          {contact.name}
        </h3>
        
        <div className="bg-white/10 px-3 py-1 rounded-full">
          <p className={`
            ${isDirector ? 'text-sm md:text-base' : 'text-xs md:text-sm'} 
            font-medium text-white/95
          `}>
            {contact.occupation}
          </p>
        </div>

        {/* Información de contacto */}
        <div className="flex flex-col items-center space-y-2 w-full text-sm pt-3">
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-2 hover:text-blue-200 transition-colors w-full justify-center px-2 text-center break-all"
            title={contact.email}
          >
            <Mail size={14} className="flex-shrink-0" />
            <span className="text-xs md:text-sm">{contact.email}</span>
          </a>
          
          <a
            href={`tel:${contact.phone}`}
            className="flex items-center gap-2 hover:text-blue-200 transition-colors"
          >
            <Phone size={14} className="flex-shrink-0" />
            <span className="text-xs md:text-sm">{contact.phone}</span>
          </a>
          
          {contact.orcid && contact.orcid !== '#' ? (
            <a
              href={contact.orcid}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-200 transition-colors"
            >
              <ExternalLink size={14} className="flex-shrink-0" />
              <span className="text-xs md:text-sm">ORCID</span>
            </a>
          ) : (
            <span className="text-white/60 text-xs">ORCID no disponible</span>
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
  isDirector: PropTypes.bool,
};

const HierarchyConnector = ({ type, className = "" }) => {
  if (type === 'vertical') {
    return (
      <div className={`w-0.5 h-8 md:h-12 bg-slate-400 mx-auto ${className}`} />
    );
  }
  
  if (type === 'horizontal') {
    return (
      <div className={`h-0.5 w-full bg-slate-400 ${className}`} 
           style={{ maxWidth: '600px' }} />
    );
  }
  
  if (type === 'branch') {
    return (
      <div className={`relative ${className}`}>
        <div className="w-0.5 h-6 bg-slate-400 mx-auto"></div>
        <div className="h-0.5 w-8 bg-slate-400 absolute top-6 left-1/2 transform -translate-x-1/2"></div>
      </div>
    );
  }
  
  return null;
};

HierarchyConnector.propTypes = {
  type: PropTypes.oneOf(['vertical', 'horizontal', 'branch']).isRequired,
  className: PropTypes.string,
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
      occupation: "Analista de sistemas",
      area: "Tecnología",
      level: 3,
    },
  ];

  const director = contacts.filter(c => c.level === 1)[0];
  const managers = contacts.filter(c => c.level === 2);
  const specialists = contacts.filter(c => c.level === 3);

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Título principal */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Organigrama RELATIC
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Red Latinoamericana de Investigaciones Cualitativas
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Estructura jerárquica */}
        <div className="flex flex-col items-center space-y-8 md:space-y-12">
          
          {/* NIVEL 1: DIRECCIÓN GENERAL */}
          <div className="flex flex-col items-center">
            <div className="bg-slate-100 px-6 py-2 rounded-full mb-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800 text-center">
                DIRECCIÓN GENERAL
              </h2>
            </div>
            <ContactCard contact={director} isDirector={true} />
          </div>

          {/* Conector vertical */}
          <HierarchyConnector type="vertical" />

          {/* NIVEL 2: GERENCIAS */}
          <div className="flex flex-col items-center w-full">
            <div className="bg-blue-100 px-6 py-2 rounded-full mb-8 border border-blue-200">
              <h2 className="text-lg font-semibold text-slate-800 text-center">
                COORDINACIONES
              </h2>
            </div>
            
            {/* Línea horizontal superior */}
            <div className="hidden md:block w-full max-w-4xl mb-6">
              <HierarchyConnector type="horizontal" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 w-full max-w-6xl justify-items-center">
              {managers.map((contact, idx) => (
                <div key={idx} className="flex flex-col items-center w-full">
                  {/* Conector vertical desde línea horizontal (solo desktop) */}
                  <div className="hidden md:block mb-4">
                    <HierarchyConnector type="vertical" />
                  </div>
                  <ContactCard contact={contact} />
                </div>
              ))}
            </div>
          </div>

          {/* Conector vertical */}
          <HierarchyConnector type="vertical" />

          {/* NIVEL 3: ESPECIALISTAS */}
          <div className="flex flex-col items-center w-full">
            <div className="bg-slate-100 px-6 py-2 rounded-full mb-8 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800 text-center">
                SERVICIOS ESPECIALIZADOS
              </h2>
            </div>
            
            {/* Línea horizontal superior */}
            <div className="hidden lg:block w-full max-w-5xl mb-6">
              <HierarchyConnector type="horizontal" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl justify-items-center">
              {specialists.map((contact, idx) => (
                <div key={idx} className="flex flex-col items-center w-full">
                  {/* Conector vertical desde línea horizontal (solo desktop) */}
                  <div className="hidden lg:block mb-4">
                    <HierarchyConnector type="vertical" />
                  </div>
                  <ContactCard contact={contact} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="mt-16 bg-slate-100 rounded-xl p-6 md:p-8 text-center border border-slate-200">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">
            Áreas de Especialización
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-slate-700">
            <div className="bg-white p-3 rounded-lg border border-slate-200">Educación</div>
            <div className="bg-white p-3 rounded-lg border border-slate-200">Producción Científica</div>
            <div className="bg-white p-3 rounded-lg border border-slate-200">Revistas Indexadas</div>
            <div className="bg-white p-3 rounded-lg border border-slate-200">Libros Digitales</div>
            <div className="bg-white p-3 rounded-lg border border-slate-200">Carteles</div>
            <div className="bg-white p-3 rounded-lg border border-slate-200">Propiedad Intelectual</div>
            <div className="bg-white p-3 rounded-lg border border-slate-200">Aprendizaje Continuo</div>
            <div className="bg-white p-3 rounded-lg border border-slate-200">Investigación Cualitativa</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;