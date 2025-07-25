import { BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import Agreements from './components/Agreements';
import RedirectToHomeButton from './components/RedirectToHomeButton';
import Carousel from './components/Carousel';
import UpcomingActivities from './components/UpcomingActivities';
import PreviousActivities from './components/PreviousActivities';
import Suscription from './components/Suscription';
import CreateOrcidGguide from './components/CreateOrcidGuide';

const AppContent = () => {
  const location = useLocation();

  const minimalRoutes = [
    '/nosotros',
    '/actividades/proximas',
    '/actividades/anteriores',
    '/suscription',
    '/crear-orcid',
  ];

  if (minimalRoutes.includes(location.pathname)) {
    return (
      <main className="flex flex-col min-h-screen container mx-auto px-4 py-10">
        <RedirectToHomeButton />

        {location.pathname === '/nosotros' && <AboutUs />}
        {location.pathname === '/actividades/proximas' && <UpcomingActivities />}
        {location.pathname === '/actividades/anteriores' && <PreviousActivities />}
        {location.pathname === '/suscription' && <Suscription />}
        {location.pathname === '/crear-orcid' && <CreateOrcidGguide />}
      </main>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Carousel />
      <main className="flex-grow">
        <Routes>{/* Aquí puedes agregar rutas si lo necesitas más adelante */}</Routes>
      </main>
      <Agreements />
      <Footer />
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;