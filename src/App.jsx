import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Journals from './components/Journals';
import ScientificPostersPortal from './components/ScientificPostersPortal';
import Books from './components/Books';
import LearningPlatform from './components/LearningPlatform';
import AboutUs from './components/AboutUs';

const App = () => {
  return (
    <div>
      <Navbar />
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
