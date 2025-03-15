import { Mail, Phone, ExternalLink } from "lucide-react";

const ContactUs = () => {
  const contacts = [
    {
      name: "Dr. Francisco Farnum",
      email: "gerencia@relaticpanama.org",
      phone: "+507 6675-1782",
      orcid: "https://orcid.org/0000-0002-5879-2296",
      image: "/assets/Dr.Farnum.jpeg",
      occupation: "Director General",
    },
    {
      name: "Lcda. Tania Kennedy",
      email: "administracionypagos@relaticpanama.org",
      phone: "+507 6645-7685",
      orcid: "https://orcid.org/0009-0009-8858-0954",
      image: "/assets/Dra.Tania.jpeg",
      occupation: "Gerente Administrativa",
    },
    {
      name: "Mgtr. Mónica Contreras",
      email: "gerenteacademico@relaticpanama.org",
      phone: "+507 6773-4854",
      orcid: "https://orcid.org/0000-0003-0972-6951",
      image: "/assets/Dra.Monica.jpeg",
      occupation: "Gerente Académica",
    },
    {
      name: "Dev. Israel Samuels",
      email: "desarrolloyoperaciones@relaticpanama.org",
      phone: "+507 6549-8362",
      orcid: "https://orcid.org/0009-0005-7307-8233",
      image: "/assets/Yo.jpeg",
      occupation: "Desarrollo y Operaciones",
    },
    {
      name: "Dr. Sósimo Poma",
      email: "evaluadoracademico@relaticpanama.org",
      phone: "+51 980-981-906",
      orcid: "https://orcid.org/0000-0002-5999-5212",
      image: "/assets/Dr.Sosimo.jpeg",
      occupation: "Evaluador Académico",
    },
    {
      name: "Dra. Lourdes Céspedes",
      email: "evaluadoracademico@relaticpanama.org",
      phone: "+51 948-477-669",
      orcid: "https://orcid.org/0000-0002-4358-8575",
      image: "/assets/Dra.Lourdes.jpeg",
      occupation: "Evaluadora Académica",
    },
    {
      name: "Dra. Sandra Bedoya",
      email: "mercadeoyventas@relaticpanama.org",
      phone: "+57 316-8316-782",
      orcid: "#",
      image: "/assets/Dra.Sandra.jpeg",
      occupation: "Alianza estratégica universitaria",
    },
    {
      name: "Ing. José Murillo",
      email: "asistentedetecnologia@relaticpanama.org",
      phone: "+507 6320-6113",
      orcid: "https://orcid.org/0009-0001-8994-3835",
      image: "/assets/Ing.Jose.jpeg",
      occupation: "Analista de sistemas y seguridad informática",
    },
  ];

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-[#68358c] mb-8">
          Contáctanos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-4 bg-gradient-to-r from-[#68358c] to-[#2d2e77] p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
            >
              <img
                src={contact.image}
                alt={contact.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="flex flex-col items-center text-center">
                <h3 className="text-xl font-semibold text-white">{contact.name}</h3>
                <p className="text-white text-sm">{contact.occupation}</p>

                <div className="flex flex-col items-center space-y-2 mt-2">
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center space-x-2 text-white hover:underline text-sm"
                  >
                    <Mail size={16} />
                    <span>{contact.email}</span>
                  </a>

                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center space-x-2 text-white hover:underline text-sm"
                  >
                    <Phone size={16} />
                    <span>{contact.phone}</span>
                  </a>

                  {contact.orcid !== "#" ? (
                    <a
                      href={contact.orcid}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-white hover:underline text-sm"
                    >
                      <ExternalLink size={16} />
                      <span>Ver ORCID</span>
                    </a>
                  ) : (
                    <span className="text-white text-sm">ORCID no disponible</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;