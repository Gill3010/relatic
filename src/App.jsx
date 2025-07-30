import  { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';

// Lazy imports para todos los componentes
const Navbar = lazy(() => import('./components/Navbar'));
const Footer = lazy(() => import('./components/Footer'));
const AboutUs = lazy(() => import('./components/AboutUs'));
const Agreements = lazy(() => import('./components/Agreements'));
const RedirectToHomeButton = lazy(() => import('./components/RedirectToHomeButton'));
const Carousel = lazy(() => import('./components/Carousel'));
const UpcomingActivities = lazy(() => import('./components/UpcomingActivities'));
const PreviousActivities = lazy(() => import('./components/PreviousActivities'));
const Suscription = lazy(() => import('./components/Suscription'));
const CreateOrcidGguide = lazy(() => import('./components/CreateOrcidGuide'));
const JournalsDetails = lazy(() => import('./components/JournalsDetails'));
const PostersDetails = lazy(() => import('./components/PostersDetails'));
const BooksDetails = lazy(() => import('./components/BooksDetails'));
const LearningDetails = lazy(() => import('./components/LearningDetails'));
const IntellectualPropertyDetails = lazy(() => import('./components/IntellectualPropertyDetails'));
const SearchPage = lazy(() => import('./components/SearchPage'));
const JournalMetrics = lazy(() => import('./components/JournalMetrics'));
const PostersMetrics = lazy(() => import('./components/PostersMetrics'));
const BooksMetrics = lazy(() => import('./components/BooksMetrics'));
const CoursesMetrics = lazy(() => import('./components/CoursesMetrics'));

const AppContent = () => {
  const location = useLocation();

  const minimalRoutes = [
    '/nosotros',
    '/actividades/proximas',
    '/actividades/anteriores',
    '/suscription',
    '/crear-orcid',
    '/detalles-revistas',
    '/detalles-carteles',
    '/detalles-libros',
    '/detalles-aprendizaje',
    '/detalles-propiedad-intelectual'
  ];

  if (minimalRoutes.includes(location.pathname)) {
    return (
      <Suspense fallback={<div className="text-center py-10">Cargando...</div>}>
        <main className="flex flex-col min-h-screen container mx-auto px-4 py-10">
          <RedirectToHomeButton />

          {location.pathname === '/nosotros' && <AboutUs />}
          {location.pathname === '/actividades/proximas' && <UpcomingActivities />}
          {location.pathname === '/actividades/anteriores' && <PreviousActivities />}
          {location.pathname === '/suscription' && <Suscription />}
          {location.pathname === '/crear-orcid' && <CreateOrcidGguide />}
          {location.pathname === '/detalles-revistas' && <JournalsDetails />}
          {location.pathname === '/detalles-carteles' && <PostersDetails />}
          {location.pathname === '/detalles-libros' && <BooksDetails />}
          {location.pathname === '/detalles-aprendizaje' && <LearningDetails />}
          {location.pathname === '/detalles-propiedad-intelectual' && <IntellectualPropertyDetails />}
        </main>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<div className="text-center py-10">Cargando...</div>}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Carousel />

        {/* 🔍 Buscador insertado directamente en el Home */}
        <div className="container mx-auto px-4 py-10">
          <SearchPage />
        </div>
        <JournalMetrics />
        <PostersMetrics />
        <BooksMetrics />
        <CoursesMetrics />

        <main className="flex-grow">
          <Routes>{/* tus rutas actuales sin cambios */}</Routes>
        </main>

        <Agreements />
        <Footer />
      </div>
    </Suspense>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;