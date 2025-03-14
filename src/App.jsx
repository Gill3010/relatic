import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Journals from './components/Journals';
import ScientificPostersPortal from './components/ScientificPostersPortal';
import Books from './components/Books';
import LearningPlatform from './components/LearningPlatform';
import AboutUs from './components/AboutUs';
import Carousel from './components/Carousel'; // Aquí importas el componente Carousel

const App = () => {
  return (
    <div>
      <Navbar />
      <Carousel /> {/* Aquí agregas el componente Carousel */}
      <AboutUs />
      <Journals />
      <ScientificPostersPortal />
      <Books />
      <LearningPlatform />
      <Footer />
    </div>
  );
};

export default App;
