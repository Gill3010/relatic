import Cpanel from '../assets/Cpanel.webp';
import Desarrollo2 from '../assets/Desarrollo2.jpg';
import Integracion from '../assets/Integracion.jpg';
import Seo from '../assets/Seo.webp';

const Services = () => {
  return (
    <section className="bg-azulOscuro py-16">
      <div className="max-w-7xl mx-auto text-center px-4">
        <h2 className="text-3xl font-semibold mb-12 text-blancoTexto">Conoce nuestros servicios</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="service-card bg-verdeBoton text-center rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
            <img src={Desarrollo2} alt="Desarrollo de aplicaciones web" className="w-full h-48 object-cover rounded-t-xl" />
            <div className="py-6 px-4">
              <h3 className="text-xl font-medium mb-4 text-blancoTexto">Desarrollo de aplicaciones web</h3>
              <p className="text-gray-200 text-sm">Creamos aplicaciones web personalizadas que se adaptan a las necesidades de tu negocio.</p>
            </div>
          </div>
          <div className="service-card bg-verdeBoton text-center rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
            <img src={Integracion} alt="Integración de APIs" className="w-full h-48 object-cover rounded-t-xl" />
            <div className="py-6 px-4">
              <h3 className="text-xl font-medium mb-4 text-blancoTexto">Integración de APIs</h3>
              <p className="text-gray-200 text-sm">Integramos APIs de terceros para expandir las funcionalidades de tu aplicación.</p>
            </div>
          </div>
          <div className="service-card bg-verdeBoton text-center rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
            <img src={Cpanel} alt="Soporte en cPanel" className="w-full h-48 object-cover rounded-t-xl" />
            <div className="py-6 px-4">
              <h3 className="text-xl font-medium mb-4 text-blancoTexto">Soporte en cPanel</h3>
              <p className="text-gray-200 text-sm">Ofrecemos soporte y mantenimiento en cPanel para garantizar el correcto funcionamiento de tu sitio.</p>
            </div>
          </div>
          <div className="service-card bg-verdeBoton text-center rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
            <img src={Seo} alt="SEO para tu sitio web" className="w-full h-48 object-cover rounded-t-xl" />
            <div className="py-6 px-4">
              <h3 className="text-xl font-medium mb-4 text-blancoTexto">SEO para tu sitio web</h3>
              <p className="text-gray-200 text-sm">Optimización SEO para mejorar la visibilidad de tu sitio web en motores de búsqueda.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
