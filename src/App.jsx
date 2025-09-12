import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

// Importa el AuthProvider desde la carpeta de componentes
import { AuthProvider } from './components/AuthContext';

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
const GenerateCarnet = lazy(() => import('./components/GenerateCarnet'));
const UserRegistration = lazy(() => import('./components/UserRegistration'));
const AdminPanel = lazy(() => import('./components/AdminPanel'));
const MemberPanel = lazy(() => import('./components/MemberPanel'));
const UserLogin = lazy(() => import('./components/UserLogin'));
const GestorSelection = lazy(() => import('./components/GestorSelection'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));
const Unauthorized = lazy(() => import('./components/Unauthorized'));
const TermsAndConditions = lazy(() => import('./components/TermsAndConditions'));
// const UploadPhoto = lazy(() => import('./components/UploadPhoto'));


// Importación del nuevo componente dashboard que contiene a los otros
const MainDashboard = lazy(() => import('./components/MainDashboard'));


// Componente de envoltura para páginas que no son el Home, incluye el botón
const PageLayout = ({ children }) => (
  <Suspense fallback={<div className="text-center py-10">Cargando...</div>}>
    <main className="flex flex-col min-h-screen container mx-auto px-4 py-10">
      <div className="flex justify-start mb-6">
        <RedirectToHomeButton />
      </div>
      {children}
    </main>
  </Suspense>
);

// Agrega la validación de propTypes aquí
PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

const HomeLayout = () => (
  <Suspense fallback={<div className="text-center py-10">Cargando...</div>}>
    <Navbar />
    <Carousel />
    <div className="container mx-auto px-4 py-10">
      <SearchPage />
    </div>
    <Agreements />
    <Footer />
  </Suspense>
);

const App = () => (
  <Router>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomeLayout />} />

        {/* Rutas con el layout de PageLayout */}
        <Route path="/nosotros" element={<PageLayout><AboutUs /></PageLayout>} />
        <Route path="/actividades/proximas" element={<PageLayout><UpcomingActivities /></PageLayout>} />
        <Route path="/actividades/anteriores" element={<PageLayout><PreviousActivities /></PageLayout>} />
        <Route path="/suscription" element={<PageLayout><Suscription /></PageLayout>} />
        <Route path="/crear-orcid" element={<PageLayout><CreateOrcidGguide /></PageLayout>} />
        <Route path="/registro-usuario" element={<PageLayout><UserRegistration /></PageLayout>} />
        <Route path="/login-usuario" element={<PageLayout><UserLogin /></PageLayout>} />
        <Route path="/panel-administracion" element={<PageLayout><AdminPanel /></PageLayout>} />
        
        {/*
          Nueva ruta protegida para el panel de miembro.
          Verifica si el usuario tiene el rol 'miembro' o 'admin'.
        */}
        <Route 
          path="/panel-miembro" 
          element={
            <PageLayout>
              <ProtectedRoute requiredRoles={['member', 'admin']}>
                <MemberPanel />
              </ProtectedRoute>
            </PageLayout>
          } 
        />
        
        {/* Ruta protegida para la selección de tareas */}
        <Route
          path="/panel-gestor"
          element={
            <PageLayout>
              <ProtectedRoute requiredRoles={['gestor', 'admin']}>
                <GestorSelection />
              </ProtectedRoute>
            </PageLayout>
          }
        />
        
        <Route path="/unauthorized" element={<PageLayout><Unauthorized /></PageLayout>} />
        <Route path="/terminos-condiciones" element={<PageLayout><TermsAndConditions /></PageLayout>} />

        {/* Rutas con detalles y métricas que usan el mismo PageLayout */}
        <Route
          path="/detalles-revistas"
          element={<PageLayout><div className='space-y-8'><JournalMetrics /><JournalsDetails /></div></PageLayout>}
        />
        <Route
          path="/detalles-carteles"
          element={<PageLayout><div className='space-y-8'><PostersMetrics /><PostersDetails /></div></PageLayout>}
        />
        <Route
          path="/detalles-libros"
          element={<PageLayout><div className='space-y-8'><BooksMetrics /><BooksDetails /></div></PageLayout>}
        />
        <Route
          path="/detalles-aprendizaje"
          element={<PageLayout><div className='space-y-8'><CoursesMetrics /><LearningDetails /></div></PageLayout>}
        />
        <Route path="/detalles-propiedad-intelectual" element={<PageLayout><IntellectualPropertyDetails /></PageLayout>} />
        <Route path='terminos-condiciones' element={<PageLayout><TermsAndConditions /></PageLayout>} />

        {/* Ruta protegida para generar certificados.
          Ahora solo se renderiza el MainDashboard que contiene el resto de componentes.
        */}
        <Route
          path="/generar-certificado"
          element={
            <PageLayout>
              <ProtectedRoute requiredRoles={['gestor', 'admin']}>
                <div className='space-y-8'>
                  <MainDashboard />
                  
                </div>
              </ProtectedRoute>
            </PageLayout>
          }
        />
        
        <Route
          path="/generar-carnet"
          element={
            <PageLayout>
              <ProtectedRoute requiredRoles={['gestor', 'admin']}>
                <GenerateCarnet />
                {/* <UploadPhoto /> */}
              </ProtectedRoute>
            </PageLayout>
          }
        />
      </Routes>
    </AuthProvider>
  </Router>
);

export default App;