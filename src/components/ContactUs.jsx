

const ContactUs = () => {
  const contacts = [
    {
      name: 'Francisco Farnum',
      email: 'gerencia@relaticpanama.org',
      orcid: 'https://orcid.org/0000-0002-5879-2296',
      image: '/assets/Dr.Farnum.jpeg'
    },
    {
      name: 'Tania Kennedy',
      email: 'administracionypagos@relaticpanama.org',
      orcid: 'https://orcid.org/0009-0009-8858-0954',
      image: '/assets/Dra.Tania.jpeg'
    },
    {
      name: 'Monica Contreras',
      email: 'gerenteacademico@relaticpanama.org',
      orcid: 'https://orcid.org/0000-0003-0972-6951',
      image: '/assets/Dra.Monica.jpeg'
    },
    {
      name: 'Sosimo Poma',
      email: 'evaluadoracademico@relaticpanama.org',
      orcid: 'https://orcid.org/0000-0002-5999-5212',
      image: '/assets/Dr.Sosimo.jpeg'
    },
    {
      name: 'Lourdes Céspedes',
      email: 'evaluadoracademico@relaticpanama.org',
      orcid: 'https://orcid.org/0000-0002-4358-8575',
      image: '/assets/Dr.Farnum.jpeg'
    },
    {
      name: 'Sandra Bedoya',
      email: 'mercadeoyventas@relaticpanama.org',
      orcid: '#',
      image: '/assets/Dr.Farnum.jpeg'
    },
    {
      name: 'Israel Samuels',
      email: 'desarrolloyoperaciones@relaticpanama.org',
      orcid: 'https://orcid.org/0009-0005-7307-8233',
      image: '/assets/Yo.jpeg'
    },
    {
      name: 'José Murillo',
      email: 'asistentedetecnologia@relaticpanama.org',
      orcid: 'https://orcid.org/0009-0001-8994-3835',
      image: '/assets/Dr.Farnum.jpeg'
    }
  ];

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-[#275Bc8] mb-8">Contáctanos</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact, index) => (
            <div key={index} className="flex flex-col items-center space-y-4 bg-[#f9f9f9] p-6 rounded-lg shadow-md">
              <img src={contact.image} alt={contact.name} className="w-20 h-20 rounded-full object-cover" />
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-semibold text-[#275Bc8] text-center">{contact.name}</h3>
                <p className="text-gray-700 text-center w-full truncate">{contact.email}</p>
                {contact.orcid !== '#' ? (
                  <a href={contact.orcid} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-[#275Bc8] hover:underline text-sm">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/ORCID_iD_icon_2018.svg" alt="ORCID" className="w-4 h-4" />
                    <span></span>
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;