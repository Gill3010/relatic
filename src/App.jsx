import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

// Importa el AuthProvider
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; // ✅ Importa ProtectedRoute

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
const Unauthorized = lazy(() => import('./components/Unauthorized'));
const TermsAndConditions = lazy(() => import('./components/TermsAndConditions'));
const MainDashboard = lazy(() => import('./components/MainDashboard'));
const GestorDashboard = lazy(() => import('./components/GestorDashboard'));
const StepByStepGuide = lazy(() => import('./components/StepByStepGuide'));
const ManuscriptFormatter = lazy(() => import('./components/ManuscriptFormatter'));
const FormatCallToAction = lazy(() => import('./components/FormatCallToAction'));
const InfoBanner = lazy(() => import('./components/InfoBanner'));

// Componente de envoltura reutilizable: Navbar arriba, Footer abajo en todas las páginas no-Home
const PageLayout = ({ children }) => (
  <Suspense fallback={<div className="text-center py-10">Cargando...</div>}>
    <Navbar />
    <main className="flex flex-col min-h-screen container mx-auto px-4 py-10 pt-24">
      <div className="flex justify-start mb-6">
        <RedirectToHomeButton />
      </div>
      {children}
    </main>
    <Footer />
  </Suspense>
);

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

const HomeLayout = () => (
  <Suspense fallback={<div className="text-center py-10">Cargando...</div>}>
    <Navbar />
    <InfoBanner />
    <Carousel />
    <div className="container mx-auto px-4 py-10">
      <SearchPage />
    </div>
    <FormatCallToAction />
    <Agreements />
    <Footer />
  </Suspense>
);

// ✅ ProtectedPageLayout DEFINIDO en App.jsx (NO en archivo separado)
const ProtectedPageLayout = ({ allowedRoles }) => (
  <ProtectedRoute allowedRoles={allowedRoles}>
    <PageLayout>
      <Outlet />
    </PageLayout>
  </ProtectedRoute>
);

ProtectedPageLayout.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const App = () => (
  <Router>
    <AuthProvider>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<HomeLayout />} />
        <Route path="/unauthorized" element={<PageLayout><Unauthorized /></PageLayout>} />
        <Route path="/terminos-condiciones" element={<PageLayout><TermsAndConditions /></PageLayout>} />
        <Route path="/nosotros" element={<PageLayout><AboutUs /></PageLayout>} />
        <Route path="/actividades/proximas" element={<PageLayout><UpcomingActivities /></PageLayout>} />
        <Route path="/actividades/anteriores" element={<PageLayout><PreviousActivities /></PageLayout>} />
        <Route path="/suscription" element={<PageLayout><Suscription /></PageLayout>} />
        <Route path="/crear-orcid" element={<PageLayout><CreateOrcidGguide /></PageLayout>} />
        <Route path="/registro-usuario" element={<PageLayout><UserRegistration /></PageLayout>} />
        <Route path="/login-usuario" element={<PageLayout><UserLogin /></PageLayout>} />
        <Route path="/detalles-revistas" element={<PageLayout><div className='space-y-8'><JournalsDetails /><JournalMetrics /></div></PageLayout>} />
        <Route path="/detalles-carteles" element={<PageLayout><div className='space-y-8'><PostersDetails /><PostersMetrics /></div></PageLayout>} />
        <Route path="/detalles-libros" element={<PageLayout><div className='space-y-8'><BooksDetails /><BooksMetrics /></div></PageLayout>} />
        <Route path="/detalles-aprendizaje" element={<PageLayout><div className='space-y-8'><LearningDetails /><CoursesMetrics /></div></PageLayout>} />
        <Route path="/detalles-propiedad-intelectual" element={<PageLayout><IntellectualPropertyDetails /></PageLayout>} />
        <Route path="/panel-administracion" element={<PageLayout><AdminPanel /></PageLayout>} />
        <Route path="/guia-paso-a-paso" element={<PageLayout><StepByStepGuide /></PageLayout>} />
        <Route path="/formato-manuscrito" element={<PageLayout><ManuscriptFormatter /></PageLayout>} />
        {/* ✅ Rutas Protegidas de Gestor/Admin - SIN PageLayout DUPLICADO */}
        <Route element={<ProtectedPageLayout allowedRoles={['gestor', 'admin']} />}>
          <Route path="/panel-gestor/:id" element={<GestorDashboard />} />
          <Route path="/generar-certificado" element={<MainDashboard />} />
          <Route path="/generar-carnet" element={<GenerateCarnet />} />
          <Route path="/generar-carta" element={<MainDashboard />} /> {/* ✅ Vuelve a MainDashboard */}
        </Route>

        {/* ✅ Rutas Protegidas de Miembro - SIN PageLayout DUPLICADO */}
        <Route element={<ProtectedPageLayout allowedRoles={['member']} />}>
          <Route path="/panel-miembro/:id" element={<MemberPanel />} />
        </Route>

        {/* Catch-all para rutas no encontradas */}
        <Route path="*" element={<PageLayout><div className="text-center py-10">Ruta no encontrada</div></PageLayout>} />
      </Routes>
    </AuthProvider>
  </Router>
);

export default App;