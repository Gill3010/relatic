import Navbar from './components/Navbar';
import Header from './components/Header';
import AboutUs from './components/AboutUs';
import Skills from './components/Skills';
import Services from './components/Services';
import TeamMember from './components/TeamMember';
import Contact from './components/Contact';
import Clients from  './components/Clients';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="bg-azulOscuro text-blancoTexto">
      <Navbar />
      <Header />

      <section id="nosotros" className="py-16 bg-azulOscuro text-blancoTexto">
        <div className="max-w-7xl mx-auto text-center">
          <AboutUs />
        </div>
      </section>

      <section id="equipo" className="py-16 bg-azulOscuro text-blancoTexto">
        <div className="max-w-7xl mx-auto text-center">
          <TeamMember />
        </div>
      </section>

      <section id="habilidades" className="py-16 bg-azulOscuro text-blancoTexto">
        <div className="max-w-7xl mx-auto text-center">
          <Skills />
        </div>
      </section>

      {/* Sección de servicios sin el encabezado extra */}
      <section id="servicios" className="py-16 bg-azulOscuro text-blancoTexto">
        <div className="max-w-7xl mx-auto text-center">
          <Services />
        </div>
      </section>

      <section id="contacto" className="py-16 bg-azulOscuro text-blancoTexto">
        <div className="max-w-7xl mx-auto text-center">
          <Clients />
        </div>
      </section>

      <section id="contacto" className="py-16 bg-azulOscuro text-blancoTexto">
        <div className="max-w-7xl mx-auto text-center">
          <Contact />
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default App;