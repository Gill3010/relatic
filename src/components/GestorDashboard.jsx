import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, CreditCard, User, Clock, ChevronRight, Activity, Mail, Phone, Calendar, Loader, FileCheck } from 'lucide-react';
import { useAuth } from './AuthContext';

const GestorDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Estilos y animaciones
  const primaryButtonStyle = "group relative w-full bg-blue-600 text-white py-4 md:py-6 px-4 md:px-8 rounded-lg text-base md:text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 overflow-hidden";
  const secondaryButtonStyle = "group relative w-full bg-emerald-600 text-white py-4 md:py-6 px-4 md:px-8 rounded-lg text-base md:text-lg font-semibold hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 overflow-hidden";
  const tertiaryButtonStyle = "group relative w-full bg-gray-100 text-gray-800 border-2 border-gray-300 py-4 md:py-6 px-4 md:px-8 rounded-lg text-base md:text-lg font-semibold hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-200 overflow-hidden";
  
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

  useEffect(() => {
    // 1. Verificación inicial del ID desde la URL
    if (!id) {
        setError("Error: ID de usuario no proporcionado en la URL.");
        setLoading(false);
        return;
    }

    // 2. Verificación del usuario en el contexto de autenticación
    // Se usa 'parseInt' para asegurar que ambos IDs sean números y la comparación funcione
    if (!user || parseInt(user.id) !== parseInt(id)) {
        setError("Acceso no autorizado o ID de perfil incorrecto.");
        setLoading(false);
        return;
    }
    
    // 3. Si las verificaciones pasan, se procede a la carga de datos
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://relaticpanama.org/api/get-gestor-profile.php?userId=${id}`);
        
        if (!response.ok) {
          throw new Error('No se pudo encontrar el perfil del gestor.');
        }

        const data = await response.json();

        if (data.success) {
          setProfileData(data.profile);
        } else {
          setError(data.message || 'Error al obtener el perfil.');
        }
      } catch (err) {
        console.error("Error al obtener el perfil:", err);
        setError("No se pudo conectar al servidor. Inténtelo de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, user, navigate]);

  // Manejo de estados de carga y error
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader className="w-8 h-8 text-blue-600 animate-spin" />
          <p className="text-gray-700 mt-2">Cargando perfil y opciones de gestión...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      </div>
    );
  }
  
  if (!profileData) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <p className="text-gray-700">No hay datos de perfil para mostrar. Asegúrate de que el ID de usuario es correcto.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Se ha eliminado 'max-w-7xl' del contenedor para que use el ancho completo del componente padre, al igual que el componente AdminPanel. */}
      <div className="w-full space-y-6 mx-auto">
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-8 w-full space-y-6 shadow-md">
          <motion.div initial="hidden" animate="visible" variants={cardVariants}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                    Te damos la bienvenida {profileData.full_name || 'Gestor'} 
                  </h1>
                  <p className="text-sm md:text-base text-gray-600">Al sistema de generación de documentos</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-500">
                <Clock className="w-3 h-3 md:w-4 md:h-4" />
                <span>Conectado</span>
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={cardVariants} className="border-t pt-4">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Mi Perfil</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div className="flex items-center space-x-3 p-3 md:p-4 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 md:w-6 md:h-6 text-gray-500 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs md:text-sm font-medium text-gray-600">Correo Electrónico</p>
                  <p className="text-sm md:text-base text-gray-900 font-semibold truncate">{profileData.email}</p>
                </div>
              </div>
              
              {profileData.phone && (
                <div className="flex items-center space-x-3 p-3 md:p-4 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 md:w-6 md:h-6 text-gray-500 flex-shrink-0" />
                  <div>
                    <p className="text-xs md:text-sm font-medium text-gray-600">Teléfono</p>
                    <p className="text-sm md:text-base text-gray-900 font-semibold">{profileData.phone}</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-3 p-3 md:p-4 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 md:w-6 md:h-6 text-gray-500 flex-shrink-0" />
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600">Miembro desde</p>
                  <p className="text-sm md:text-base text-gray-900 font-semibold">{profileData.created_at}</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={statsVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 border-t pt-4 mt-4"
          >
            <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Certificados</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900">0</p>
                </div>
                <FileText className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Carnets</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900">0</p>
                </div>
                <CreditCard className="w-6 h-6 md:w-8 md:h-8 text-green-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Estado</p>
                  <p className="text-base md:text-lg font-semibold text-green-600 flex items-center">
                    Activo 
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-green-400 rounded-full ml-1 md:ml-2 animate-pulse"></div>
                  </p>
                </div>
                <Activity className="w-6 h-6 md:w-8 md:h-8 text-green-500" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="border-t pt-4 mt-4"
          >
            <div className="text-center mb-6 md:mb-8">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={iconVariants}
                className="w-12 h-12 md:w-16 md:h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4"
              >
                <FileText className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
              </motion.div>
              <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">
                Seleccionar Tarea
              </h2>
              <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
                Elige el tipo de documento que deseas generar
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={primaryButtonStyle}
                onClick={() => handleSelection('/generar-certificado')}
              >
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-sm md:text-base">Generar Certificado</div>
                      <div className="text-xs md:text-sm text-blue-100">Documentos oficiales</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={secondaryButtonStyle}
                onClick={() => handleSelection('/generar-carnet')}
              >
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CreditCard className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-sm md:text-base">Generar Carnet</div>
                      <div className="text-xs md:text-sm text-emerald-100">Identificaciones</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.button>
            </div>

            {/* Botón para generar cartas - Centrado y con el mismo ancho que cada botón individual de arriba */}
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="w-full md:w-1/2 md:pr-2">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={tertiaryButtonStyle}
                    onClick={() => handleSelection('/generar-carta')}
                  >
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center space-x-3 md:space-x-4">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileCheck className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-sm md:text-base">Generar Carta</div>
                          <div className="text-xs md:text-sm text-gray-500">Constancias y cartas oficiales</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform flex-shrink-0" />
                    </div>
                  </motion.button>
                </motion.div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
              <div className="flex items-start space-x-2 md:space-x-3">
                <div className="w-4 h-4 md:w-5 md:h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-900">Información importante</p>
                  <p className="text-xs md:text-sm text-gray-600 mt-1">
                    Asegúrate de tener todos los datos necesarios antes de proceder con la generación de documentos.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="border-t pt-4"
          >
            <div className="flex flex-col md:flex-row items-center justify-center text-xs md:text-sm text-gray-500 gap-2 md:gap-6">
              <span>Sistema v2.1.0</span>
              <div className="hidden md:block w-1 h-1 bg-gray-300 rounded-full"></div>
              <span>Última actualización: Hoy</span>
              <div className="hidden md:block w-1 h-1 bg-gray-300 rounded-full"></div>
              <span>Uptime: 99.9%</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GestorDashboard;