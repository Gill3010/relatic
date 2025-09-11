import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FileText, CreditCard, User, Clock, ChevronRight, Home, Activity } from 'lucide-react';

const GestorSelection = () => {
  const navigate = useNavigate();

  // Estilos mejorados con diferenciación visual
  const primaryButtonStyle = "group relative w-full bg-blue-600 text-white py-6 px-8 rounded-lg text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 overflow-hidden";
  
  const secondaryButtonStyle = "group relative w-full bg-gray-100 text-gray-800 border-2 border-gray-300 py-6 px-8 rounded-lg text-lg font-semibold hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-200 overflow-hidden";

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

  const handleSelection = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full space-y-6">
        
        {/* Contenedor principal del panel con los estilos de la tarjeta */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 w-full space-y-6">
          
          {/* Header del Panel */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Panel de Gestión</h1>
                  <p className="text-gray-600">Sistema de generación de documentos</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>Conectado</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </motion.div>

          {/* Estadísticas Rápidas */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={statsVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Certificados</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
                <FileText className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Carnets</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
                <CreditCard className="w-8 h-8 text-green-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Estado</p>
                  <p className="text-lg font-semibold text-green-600">Activo</p>
                </div>
                <Activity className="w-8 h-8 text-green-500" />
              </div>
            </div>
          </motion.div>

          {/* Panel Principal de Selección */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <div className="text-center mb-8">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={iconVariants}
                className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <FileText className="w-8 h-8 text-blue-600" />
              </motion.div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Seleccionar Tarea
              </h2>
              <p className="text-gray-600">
                Elige el tipo de documento que deseas generar
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Botón Primario - Generar Certificado */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={primaryButtonStyle}
                onClick={() => handleSelection('/generar-certificado')}
              >
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">Generar Certificado</div>
                      <div className="text-sm text-blue-100">Documentos oficiales</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.button>

              {/* Botón Secundario - Generar Carnet */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={secondaryButtonStyle}
                onClick={() => handleSelection('/generar-carnet')}
              >
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">Generar Carnet</div>
                      <div className="text-sm text-gray-500">Identificaciones</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>
            </div>

            {/* Información Adicional */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Información importante</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Asegúrate de tener todos los datos necesarios antes de proceder con la generación de documentos.
                  </p>
                </div>
              </div>
            </div>

            {/* Botón de navegación a la página principal */}
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

          {/* Footer del Panel */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <div className="flex items-center justify-center text-sm text-gray-500 space-x-2 md:space-x-6">
              <span>Sistema v2.1.0</span>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <span>Última actualización: Hoy</span>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <span>Uptime: 99.9%</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GestorSelection;