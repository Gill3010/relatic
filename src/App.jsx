 import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Journals from './components/Journals';
import ScientificPostersPortal from './components/ScientificPostersPortal';
import Books from './components/Books';
import LearningPlatform from './components/LearningPlatform';
import AboutUs from './components/AboutUs';
import Carousel from './components/Carousel';
import UpcomingActivities from './components/UpcomingActivities';
import PreviousActivities from './components/PreviousActivities';
import ContactUs from './components/ContactUs';
import Agreements from './components/Agreements'; 
import DiscoverTitle from './components/DiscoverTitle';
import Suscription from './components/Suscription';
import CreateOrcidGuide from './components/CreateOrcidGuide';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Carousel />

        <main className="flex-grow">
          <Routes>
            <Route path="/inicio" element={
              <div className="container mx-auto px-4 py-8">
                <div>
                  <DiscoverTitle />
                </div>
                {/* Grid de 4 columnas en pantallas grandes (lg) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="w-full">
                    <Journals />
                  </div>
                  <div className="w-full">
                    <ScientificPostersPortal />
                  </div>
                  <div className="w-full">
                    <Books />
                  </div>
                  <div className="w-full">
                    <LearningPlatform />
                  </div>
                </div>
              </div>
            } />
            <Route path="/nosotros" element={<AboutUs />} />
            <Route path="/journals" element={<Journals />} />
            <Route path="/scientificpostersportal" element={<ScientificPostersPortal />} />
            <Route path="/books" element={<Books />} />
            <Route path="/learningplatform" element={<LearningPlatform />} />
            <Route path="/actividades/proximas" element={<UpcomingActivities />} />
            <Route path="/actividades/anteriores" element={<PreviousActivities />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/suscription" element={<Suscription />} />
            <Route path="/create-orcid-guide" element={<CreateOrcidGuide />} />
          </Routes>
        </main>

        <Agreements />
        <Footer />
      </div>
    </Router>
  );
};

export default App;