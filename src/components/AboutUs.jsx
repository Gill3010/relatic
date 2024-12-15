import teamImage from '../assets/Nosotros.webp';

const AboutUs = () => {
  return (
    <section className="bg-azulOscuro text-blancoTexto py-8 relative"> {/* Cambié py-16 a py-8 */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start lg:text-left text-center">
        {/* Contenido de texto */}
        <div className="lg:w-1/2 px-6 lg:px-0 mb-10 lg:mb-0">
          <h2 className="text-3xl font-semibold mb-4">
            <span className="text-verdeBoton">Sobre</span> Nosotros
          </h2>
          <p className="text-lg text-grisClaro mb-6 leading-relaxed">
  Nuestro compromiso es transformar ideas en realidades digitales que generan impacto. Con un enfoque en tecnología avanzada, trabajamos para crear soluciones que aporten valor y excedan las expectativas de nuestros clientes.
</p>


          <button className="bg-verdeBoton text-blancoTexto px-6 py-2 rounded-full font-medium hover:bg-teal-600 transition duration-300">
            ¡Conócenos!
          </button>
        </div>

        {/* Imagen decorativa */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <img src={teamImage} alt="Equipo de desarrollo" className="w-full max-w-md object-contain" />
        </div>
      </div>

      {/* Onda decorativa en la parte inferior - eliminar si no es necesaria */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-20 bg-azulOscuro" style={{ clipPath: 'polygon(0 90%, 100% 0, 100% 100%, 0 100%)' }}></div> */}
    </section>
  );
};

export default AboutUs;
