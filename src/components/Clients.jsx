import React from 'react';

const Clients = () => {
  const clientLogos = [
    { logo: '/assets/Metxi.jpeg', url: 'https://www.metxi.net/Metxi/', label: 'Grupo Metxi' },
    { logo: '/assets/Relatic.jpeg', url: 'https://relatic.org/', label: 'Relatic' },
    { logo: '/assets/logo30.png', url: 'https://www.galeria-virtual.org/Index.html', label: 'Galería Virtual' },
    { logo: '/assets/UniversidadPanama.jpg', url: 'https://www.up.ac.pa/', label: 'Universidad de Panamá' },
    { logo: '/assets/Logo4.png', url: 'https://portaldecartelescientificos.org/', label: 'Portal de Carteles Científicos' },
    { logo: '/assets/Metxi.jpeg', url: 'https://www.metxi.net/Metxi/', label: 'Grupo Metxi' },
    { logo: '/assets/Relatic.jpeg', url: 'https://relatic.org/', label: 'Relatic' },
    { logo: '/assets/logo30.png', url: 'https://www.galeria-virtual.org/Index.html', label: 'Galería Virtual' },
    { logo: '/assets/UniversidadPanama.jpg', url: 'https://www.up.ac.pa/', label: 'Universidad de Panamá' },
    { logo: '/assets/Logo4.png', url: 'https://portaldecartelescientificos.org/', label: 'Portal de Carteles Científicos' },
  ];

  // Duplicamos los logotipos para lograr el efecto de carrusel infinito
  const infiniteLogos = [...clientLogos, ...clientLogos];

  return (
    <section className="bg-azulOscuro text-blancoTexto py-16">
      <div className="max-w-7xl mx-auto text-center px-4">
        <h2 className="text-4xl font-semibold mb-12">Nuestros Clientes</h2>
        <div className="overflow-hidden relative">
          <div className="flex animate-marquee">
            {infiniteLogos.map((client, index) => (
              <a
                key={index}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center flex-shrink-0 mx-6 transition-transform transform hover:scale-105"
                aria-label={`Visitar sitio de ${client.label}`}
              >
                <img
                  src={client.logo}
                  alt={client.label}
                  className="w-32 h-20 object-contain transition duration-300"
                />
                <span className="text-sm text-gray-400 mt-2">{client.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      {/* Estilos para la animación de desplazamiento */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          display: flex;
          width: 200%; /* Doble del ancho para hacer el bucle infinito */
          animation: marquee 20s linear infinite;
        }

        /* Asegurar que los elementos no se envuelvan */
        .flex {
          flex-wrap: nowrap;
        }

        /* Pausar la animación al pasar el cursor */
        .flex:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Clients;
