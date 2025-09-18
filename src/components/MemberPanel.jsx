import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Download,
  CreditCard,
  Award,
  User,
  Calendar,
  Clock,
  FileText,
  Loader,
  Edit3,
  Save,
  X,
  Mail,
  Phone,
  MessageSquare
} from 'lucide-react';
import { useAuth } from './AuthContext';

const MemberDashboard = () => {
  const { id } = useParams();
  const { user } = useAuth();

  // Estados del dashboard
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [error, setError] = useState(null);

  // Estados del perfil de usuario
  const [profileData, setProfileData] = useState(null);
  const [cedulaInput, setCedulaInput] = useState('');
  const [isEditingCedula, setIsEditingCedula] = useState(false);
  const [tempCedula, setTempCedula] = useState('');

  // Estilos y animaciones
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const iconVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, delay: 0.3 } },
  };
  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.4 } },
  };

  // Obtener el perfil del usuario
  useEffect(() => {
    if (!id) {
      setError('Error: ID de usuario no proporcionado en la URL.');
      setLoading(false);
      return;
    }

    if (!user || parseInt(user.id) !== parseInt(id)) {
      setError('Acceso no autorizado o ID de perfil incorrecto.');
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `https://relaticpanama.org/api/get-member-profile.php?userId=${id}`
        );
        if (!response.ok) {
          throw new Error('No se pudo encontrar el perfil del miembro.');
        }

        const data = await response.json();
        if (data.success) {
          setProfileData(data.profile);
          // Prellenar campos con la cédula existente
          if (data.profile?.cedula_dni) {
            setSearchTerm(data.profile.cedula_dni);
            setCedulaInput(data.profile.cedula_dni);
            setTempCedula(data.profile.cedula_dni);
          }
        } else {
          setError(data.message || 'Error al obtener el perfil.');
        }
      } catch (err) {
        console.error('Error al obtener el perfil:', err);
        setError('No se pudo conectar al servidor. Inténtelo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, user]);

  // Función para buscar documentos por cédula
  const searchByCedula = async (cedula) => {
    if (!cedula) {
      setStatus({ type: 'error', message: 'Por favor, introduce tu Cédula o ID de Estudiante.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });
    setSearchResults(null);

    try {
      const response = await fetch('https://relaticpanama.org/api/member_search.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cedula_dni: cedula }),
      });

      const data = await response.json();

      if (data.success) {
        setSearchResults(data);
        const totalDocuments = (data.carnets?.length || 0) + (data.certificates?.length || 0) + (data.letters?.length || 0);
        if (totalDocuments === 0) {
          setStatus({ type: 'info', message: 'No se encontraron documentos para la búsqueda.' });
        } else {
          setStatus({ type: 'success', message: 'Documentos encontrados.' });
        }
      } else {
        setStatus({ type: 'error', message: data.message || 'Error al realizar la búsqueda.' });
      }
    } catch (error) {
      console.error('Error searching for documents:', error);
      setStatus({ type: 'error', message: 'Error de conexión. Inténtalo de nuevo.' });
    } finally {
      setLoading(false);
    }
  };

  // Buscar documentos
  const handleSearch = async () => {
    const cedulaToSearch = profileData?.cedula_dni || searchTerm;
    await searchByCedula(cedulaToSearch);
  };

  // Registrar/actualizar cédula (para usuarios sin cédula registrada)
  const handleRegisterCedula = async () => {
    if (!cedulaInput.trim()) {
      setStatus({ type: 'error', message: 'Por favor, introduce tu número de cédula.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('https://relaticpanama.org/api/update-member-cedula.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ userId: Number(id), cedula: cedulaInput.trim() }),
      });
      

      const data = await response.json();

      if (data.success) {
        setProfileData((prev) => ({
          ...(prev || {}),
          cedula_dni: cedulaInput.trim(),
        }));

        setSearchTerm(cedulaInput.trim());
        setTempCedula(cedulaInput.trim());
        setStatus({ type: 'success', message: 'Cédula registrada correctamente.' });

        // Buscar automáticamente
        await searchByCedula(cedulaInput.trim());
      } else {
        setStatus({ type: 'error', message: data.message || 'No se pudo registrar la cédula.' });
      }
    } catch (error) {
      console.error('Error registrando cédula:', error);
      setStatus({ type: 'error', message: 'Error de conexión con el servidor.' });
    } finally {
      setLoading(false);
    }
  };

  // Actualizar cédula existente
  const handleUpdateCedula = async () => {
    if (!tempCedula.trim()) {
      setStatus({ type: 'error', message: 'Por favor, introduce un número de cédula válido.' });
      return;
    }

    if (tempCedula.trim() === profileData?.cedula_dni) {
      setIsEditingCedula(false);
      setStatus({ type: 'info', message: 'No hay cambios que guardar.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('https://relaticpanama.org/api/update-member-cedula.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ userId: Number(id), cedula: tempCedula.trim() }),
      });

      const data = await response.json();

      if (data.success) {
        setProfileData((prev) => ({
          ...(prev || {}),
          cedula_dni: tempCedula.trim(),
        }));

        setSearchTerm(tempCedula.trim());
        setCedulaInput(tempCedula.trim());
        setIsEditingCedula(false);
        setStatus({ type: 'success', message: 'Cédula actualizada correctamente.' });

        // Buscar automáticamente con la nueva cédula
        await searchByCedula(tempCedula.trim());
      } else {
        setStatus({ type: 'error', message: data.message || 'No se pudo actualizar la cédula.' });
        setTempCedula(profileData?.cedula_dni || ''); // Revertir cambios
      }
    } catch (error) {
      console.error('Error actualizando cédula:', error);
      setStatus({ type: 'error', message: 'Error de conexión con el servidor.' });
      setTempCedula(profileData?.cedula_dni || ''); // Revertir cambios
    } finally {
      setLoading(false);
    }
  };

  // Cancelar edición
  const handleCancelEdit = () => {
    setTempCedula(profileData?.cedula_dni || '');
    setIsEditingCedula(false);
    setStatus({ type: '', message: '' });
  };

  // Descargar documento
  const downloadDocument = (documentId, documentType) => {
    setLoading(true);
    let downloadUrl = '';

    if (documentType === 'carnet') {
      downloadUrl = `https://relaticpanama.org/verify_carnet.php?id=${documentId}`;
    } else if (documentType === 'certificado') {
      downloadUrl = `https://relaticpanama.org/verify_certificate.php?id=${documentId}`;
    } else if (documentType === 'carta') {
      downloadUrl = `https://relaticpanama.org/verify_letter.php?id=${documentId}`;
    } else {
      setStatus({ type: 'error', message: 'Tipo de documento no válido.' });
      setLoading(false);
      return;
    }

    try {
      window.open(downloadUrl, '_blank');
      setStatus({ type: 'info', message: 'La descarga debería comenzar en una nueva pestaña.' });
    } catch (error) {
      console.error('Error al iniciar la descarga:', error);
      setStatus({ type: 'error', message: 'Error al iniciar la descarga del documento.' });
    } finally {
      setLoading(false);
    }
  };

  // Loading inicial
  if (loading && !profileData) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader className="w-8 h-8 text-blue-600 animate-spin" />
          <p className="text-gray-700 mt-2">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full space-y-6 mx-auto">
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-8 w-full space-y-6 shadow-md">
          {/* Sección de Bienvenida */}
          <motion.div initial="hidden" animate="visible" variants={cardVariants}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                    Te damos la bienvenida {profileData?.full_name || 'Miembro'}
                  </h1>
                  <p className="text-sm md:text-base text-gray-600">
                    Al sistema de gestión de documentos
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-500">
                <Clock className="w-3 h-3 md:w-4 md:h-4" />
                <span>Conectado</span>
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </motion.div>

          {/* Nueva Sección de Perfil - Solo se muestra si hay datos de perfil */}
          {profileData && (profileData.email || profileData.created_at) && (
            <motion.div initial="hidden" animate="visible" variants={cardVariants} className="border-t pt-4">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Mi Perfil</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {profileData.email && (
                  <div className="flex items-center space-x-3 p-3 md:p-4 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 md:w-6 md:h-6 text-gray-500 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs md:text-sm font-medium text-gray-600">Correo Electrónico</p>
                      <p className="text-sm md:text-base text-gray-900 font-semibold truncate">{profileData.email}</p>
                    </div>
                  </div>
                )}
                
                {profileData.phone && (
                  <div className="flex items-center space-x-3 p-3 md:p-4 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 md:w-6 md:h-6 text-gray-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs md:text-sm font-medium text-gray-600">Teléfono</p>
                      <p className="text-sm md:text-base text-gray-900 font-semibold">{profileData.phone}</p>
                    </div>
                  </div>
                )}
                
                {profileData.created_at && (
                  <div className="flex items-center space-x-3 p-3 md:p-4 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 md:w-6 md:h-6 text-gray-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs md:text-sm font-medium text-gray-600">Miembro desde</p>
                      <p className="text-sm md:text-base text-gray-900 font-semibold">{profileData.created_at}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Registro inicial de cédula (solo si no tiene cédula) */}
          {!profileData?.cedula_dni ? (
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
        <CreditCard className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
      </motion.div>
      <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">Registrar Cédula</h2>
      <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
        Ingresa tu número de cédula para vincularlo a tu perfil. Esto solo debes hacerlo una vez.
      </p>
    </div>

    <div className="max-w-2xl mx-auto mb-6 md:mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            value={cedulaInput}
            onChange={(e) => setCedulaInput(e.target.value)}
            placeholder='Ej. 8-123-456'
            className="w-full p-3 md:p-4 text-base md:text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            disabled={loading}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleRegisterCedula}
          disabled={loading || !cedulaInput.trim()}
          className="bg-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all font-semibold text-base md:text-lg flex items-center justify-center min-w-[140px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center">
              <Loader className="w-4 h-4 md:w-5 md:h-5 animate-spin mr-2" />
              Guardando...
            </div>
          ) : (
            <>
              <CreditCard className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Guardar
            </>
          )}
        </motion.button>
      </div>
    </div>

    {status.message && (
      <div className={`p-4 rounded-lg text-center font-medium my-4 ${
        status.type === 'success' ? 'bg-green-100 text-green-700' :
        status.type === 'error' ? 'bg-red-100 text-red-700' :
        'bg-gray-100 text-gray-700'
      }`}>
        {status.message}
      </div>
    )}

    <div className="bg-gray-50 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
      <div className="flex items-start space-x-2 md:space-x-3">
        <div className="w-4 h-4 md:w-5 md:h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-600 rounded-full"></div>
        </div>
        <div>
          <p className="text-xs md:text-sm font-medium text-gray-900">Información importante</p>
          <p className="text-xs md:text-sm text-gray-600 mt-1">
            Asegúrate de introducir correctamente tu número de cédula para que solo tú puedas acceder a tus documentos.
          </p>
        </div>
      </div>
    </div>
  </motion.div>
) : (
            /* Sección de búsqueda de documentos (cuando ya tiene cédula) */
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
                  <Search className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                </motion.div>
                <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">Búsqueda de Documentos</h2>
                <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
                  Busca todos tus documentos disponibles con tu número de cédula registrado
                </p>
              </div>

              <div className="max-w-2xl mx-auto mb-6 md:mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <input
                        type="text"
                        value={isEditingCedula ? tempCedula : (profileData?.cedula_dni || '')}
                        onChange={(e) => {
                          if (isEditingCedula) {
                            setTempCedula(e.target.value);
                          }
                        }}
                        placeholder="Ej. 8-123-456"
                        className="w-full p-3 md:p-4 text-base md:text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors pr-12"
                        disabled={loading || !isEditingCedula}
                      />
                      {!isEditingCedula && (
                        <button
                          onClick={() => {
                            setIsEditingCedula(true);
                            setTempCedula(profileData?.cedula_dni || '');
                          }}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Editar cédula"
                        >
                          <Edit3 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    
                    {/* Botones de edición */}
                    {isEditingCedula && (
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={handleUpdateCedula}
                          disabled={loading}
                          className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium disabled:opacity-50"
                        >
                          <Save className="w-4 h-4 mr-1" />
                          Guardar
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          disabled={loading}
                          className="flex items-center px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium disabled:opacity-50"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Cancelar
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {!isEditingCedula && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSearch}
                      disabled={loading}
                      className="bg-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all font-semibold text-base md:text-lg flex items-center justify-center min-w-[140px]"
                    >
                      {loading ? (
                        <div className="flex items-center">
                          <Loader className="w-4 h-4 md:w-5 md:h-5 animate-spin mr-2" />
                          Buscando...
                        </div>
                      ) : (
                        <>
                          <Search className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                          Buscar
                        </>
                      )}
                    </motion.button>
                  )}
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
  Tu cédula está registrada. Puedes editarla haciendo clic en el ícono de lápiz y buscar documentos con el botón &#39;Buscar&#39;.
</p>

                  </div>
                </div>
              </div>

              {/* Resultados de búsqueda */}
              {searchResults && (
                <>
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={statsVariants}
                    className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 border-t pt-4 mt-4"
                  >
                    <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs md:text-sm text-gray-600">Total Documentos</p>
                          <p className="text-xl md:text-2xl font-bold text-gray-900">
                            {(searchResults.carnets?.length || 0) + (searchResults.certificates?.length || 0) + (searchResults.letters?.length || 0)}
                          </p>
                        </div>
                        <FileText className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />
                      </div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs md:text-sm text-gray-600">Carnets</p>
                          <p className="text-xl md:text-2xl font-bold text-gray-900">
                            {searchResults.carnets?.length || 0}
                          </p>
                        </div>
                        <CreditCard className="w-6 h-6 md:w-8 md:h-8 text-green-500" />
                      </div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs md:text-sm text-gray-600">Certificados</p>
                          <p className="text-xl md:text-2xl font-bold text-gray-900">
                            {searchResults.certificates?.length || 0}
                          </p>
                        </div>
                        <Award className="w-6 h-6 md:w-8 md:h-8 text-purple-500" />
                      </div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs md:text-sm text-gray-600">Cartas</p>
                          <p className="text-xl md:text-2xl font-bold text-gray-900">
                            {searchResults.letters?.length || 0}
                          </p>
                        </div>
                        <MessageSquare className="w-6 h-6 md:w-8 md:h-8 text-orange-500" />
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div initial="hidden" animate="visible" variants={cardVariants} className="border-t pt-4 mt-4">
                    <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Documentos Disponibles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                      {/* Carnets */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <CreditCard className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                          </div>
                          <h3 className="text-lg md:text-xl font-bold text-gray-900">Carnets Disponibles</h3>
                        </div>
                        {searchResults.carnets?.length > 0 ? (
                          <div className="space-y-3 md:space-y-4">
                            {searchResults.carnets.map((card, index) => (
                              <motion.div
                                key={card.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                                className="bg-gray-50 rounded-lg p-4 md:p-6"
                              >
                                <div className="flex items-start justify-between mb-4">
                                  <div className="flex-1">
                                    <div className="flex items-center mb-2">
                                      <User className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" />
                                      <p className="font-semibold text-sm md:text-base text-gray-900">
                                        {card.nombre_completo}
                                      </p>
                                    </div>
                                    <p className="text-xs md:text-sm text-gray-600">Cédula: {card.cedula_dni}</p>
                                  </div>
                                </div>
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => downloadDocument(card.id, 'carnet')}
                                  disabled={loading}
                                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all font-medium flex items-center justify-center text-sm md:text-base"
                                >
                                  <Download className="w-4 h-4 mr-2" />
                                  Descargar Carnet
                                </motion.button>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 md:py-12">
                            <div className="bg-gray-100 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 md:mb-4">
                              <CreditCard className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
                            </div>
                            <p className="text-gray-500 text-sm md:text-base">No hay carnets disponibles</p>
                          </div>
                        )}
                      </div>
                      
                      {/* Certificados */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <Award className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                          </div>
                          <h3 className="text-lg md:text-xl font-bold text-gray-900">Certificados Disponibles</h3>
                        </div>
                        {searchResults.certificates?.length > 0 ? (
                          <div className="space-y-3 md:space-y-4">
                            {searchResults.certificates.map((cert, index) => (
                              <motion.div
                                key={cert.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                                className="bg-gray-50 rounded-lg p-4 md:p-6"
                              >
                                <div className="mb-4">
                                  <p className="font-semibold text-sm md:text-base text-gray-900 mb-2">
                                    {cert.concepto}
                                  </p>
                                  <div className="flex flex-col sm:flex-row sm:items-center text-xs md:text-sm text-gray-600 gap-1 sm:gap-4">
                                    <div className="flex items-center">
                                      <Calendar className="w-3 h-3 md:w-4 md:h-4 text-gray-500 mr-1" />
                                      <span>Fecha: {cert.fecha_emision || 'No disponible'}</span>
                                    </div>
                                  </div>
                                </div>
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => downloadDocument(cert.id, 'certificado')}
                                  disabled={loading}
                                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all font-medium flex items-center justify-center text-sm md:text-base"
                                >
                                  <Download className="w-4 h-4 mr-2" />
                                  Descargar Certificado
                                </motion.button>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 md:py-12">
                            <div className="bg-gray-100 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 md:mb-4">
                              <Award className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
                            </div>
                            <p className="text-gray-500 text-sm md:text-base">No hay certificados disponibles</p>
                          </div>
                        )}
                      </div>
                      
                      {/* Cartas */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                            <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-orange-600" />
                          </div>
                          <h3 className="text-lg md:text-xl font-bold text-gray-900">Cartas Disponibles</h3>
                        </div>
                        {searchResults.letters?.length > 0 ? (
                          <div className="space-y-3 md:space-y-4">
                            {searchResults.letters.map((letter, index) => (
                              <motion.div
                                key={letter.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                className="bg-gray-50 rounded-lg p-4 md:p-6"
                              >
                                <div className="flex items-start justify-between mb-4">
                                  <div className="flex-1">
                                    <div className="flex items-center mb-2">
                                      <User className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" />
                                      <p className="font-semibold text-sm md:text-base text-gray-900">
                                        {letter.nombre_completo}
                                      </p>
                                    </div>
                                    <p className="text-xs md:text-sm text-gray-600">Cédula: {letter.dni_cedula || 'No disponible'}</p>
                                    <p className="text-xs md:text-sm text-gray-600">Fecha: {letter.fecha_expedicion || 'No disponible'}</p>
                                  </div>
                                </div>
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => downloadDocument(letter.id, 'carta')}
                                  disabled={loading}
                                  className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all font-medium flex items-center justify-center text-sm md:text-base"
                                >
                                  <Download className="w-4 h-4 mr-2" />
                                  Descargar Carta
                                </motion.button>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 md:py-12">
                            <div className="bg-gray-100 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 md:mb-4">
                              <MessageSquare className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
                            </div>
                            <p className="text-gray-500 text-sm md:text-base">No hay cartas disponibles</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;