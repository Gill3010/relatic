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

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Carousel /> 

        <Routes>
          <Route path="/inicio" element={
            <div>
              <AboutUs />
              <Journals />
              <ScientificPostersPortal />
              <Books />
              <LearningPlatform />
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
        </Routes>

        
        <Agreements /> 

        <Footer />
      </div>
    </Router>
  );
};

export default App;