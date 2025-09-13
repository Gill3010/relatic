import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, Settings, Clock, ChevronRight, Home, Activity, User, UserCheck } from 'lucide-react';
import { useAuth } from './AuthContext';
import { useEffect } from 'react';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // DEBUG: Verificar que el usuario se carga correctamente
  useEffect(() => {
    console.log('AdminPanel - User context:', user);
  }, [user]);

  const primaryButtonStyle = "group relative w-full bg-blue-600 text-white py-4 px-4 sm:py-6 sm:px-8 rounded-lg text-base sm:text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 overflow-hidden";
  
  const secondaryButtonStyle = "group relative w-full bg-gray-100 text-gray-800 border-2 border-gray-300 py-4 px-4 sm:py-6 sm:px-8 rounded-lg text-base sm:text-lg font-semibold hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-200 overflow-hidden";

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const iconVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, delay: 0.3 } }
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.4 } }
  };
  
  // Función para manejar la navegación a los paneles - VERSIÓN CORREGIDA
  const handlePanelNavigation = (targetRole) => {
    console.log('Navegando a:', targetRole, 'Usuario actual:', user);
    
    // Si no hay un usuario logueado, redirige a la página de login.
    if (!user) {
        navigate('/login-usuario');
        return;
    }
    
    // ✅ USA EL ID REAL DEL USUARIO, NO UN NÚMERO HARCODEADO
    if ((user.role === 'gestor' || user.role === 'admin') && targetRole === 'gestor') {
        navigate(`/panel-gestor/${user.id}`); // ← ID REAL del usuario
    } 
    // Si el usuario es un miembro y el botón presionado es para miembros
    else if (user.role === 'member' && targetRole === 'member') {
        navigate('/panel-miembro');
    } 
    // Si el rol no coincide con el botón, muestra un error o lo redirige a una página de no autorizado.
    else {
        console.error("Acceso no autorizado para este tipo de perfil.");
        navigate('/unauthorized');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-2 sm:px-6 lg:px-8">
      <div className="w-full space-y-4 sm:space-y-6">
        
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-8 w-full space-y-4 sm:space-y-6">
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Panel de Administración</h1>
                  <p className="text-xs sm:text-sm text-gray-600">Sistema de gestión institucional</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 mt-2 sm:mt-0">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Conectado</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={statsVariants}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4"
          >
            <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Gestores</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">1</p>
                </div>
                <UserCheck className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Miembros</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">32</p>
                </div>
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Sistema</p>
                  <p className="text-base sm:text-lg font-semibold text-green-600">Operativo</p>
                </div>
                <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <div className="text-center mb-4 sm:mb-8">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={iconVariants}
                className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4"
              >
                <Settings className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </motion.div>
              <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                Acceso a Paneles
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Selecciona el panel al que deseas acceder
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-8">
              {/* Botón Primario - Panel de Gestor */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={primaryButtonStyle}
                onClick={() => handlePanelNavigation('gestor')}
              >
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-sm sm:text-base">Panel de Gestor</div>
                      <div className="text-xs sm:text-sm text-blue-100">Administración de documentos</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.button>

              {/* Botón Secundario - Panel de Miembro */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={secondaryButtonStyle}
                onClick={() => handlePanelNavigation('member')}
              >
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-sm sm:text-base">Panel de Miembro</div>
                      <div className="text-xs sm:text-sm text-gray-500">Gestión de perfil y datos</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Información importante</p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
                    Solo puedes acceder a los paneles asociados con tu tipo de cuenta.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center space-x-2 text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Volver a la página Principal</span>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <div className="flex flex-wrap justify-center text-xs sm:text-sm text-gray-500 space-x-2 md:space-x-6">
              <span>Admin Panel v3.2.1</span>
              <div className="w-1 h-1 bg-gray-300 rounded-full mt-2 sm:mt-0"></div>
              <span>Última actualización: Hoy</span>
              <div className="w-1 h-1 bg-gray-300 rounded-full mt-2 sm:mt-0"></div>
              <span>Uptime: 99.9%</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;