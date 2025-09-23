import { useEffect, useState } from 'react';
import { Shield, Home, LogOut, AlertTriangle, Mail, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState('');
  const [showRetry, setShowRetry] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Acceso Denegado - Sistema RelaTIC';
    // Animación de entrada con zoom in
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Función para limpiar datos locales de forma segura
  const clearLocalData = () => {
    try {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userData');
      localStorage.removeItem('userRole');
      sessionStorage.clear();
    } catch (error) {
      console.warn('Error al limpiar datos locales:', error);
    }
  };

  // Función para cerrar sesión completamente mejorada
  const handleLogout = async () => {
    setLoading(true);
    setLogoutMessage('Cerrando sesión...');
    setShowRetry(false);
    
    try {
      const baseUrl = 'https://relaticpanama.org/api/logout.php';
      
      const response = await fetch(baseUrl, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        // Timeout para evitar esperas indefinidas
        signal: AbortSignal.timeout(10000) // 10 segundos
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      await response.json();
      setLogoutMessage('Sesión cerrada correctamente. Redirigiendo...');
      
      // Limpiar datos locales siempre
      clearLocalData();
      
      // Redirigir después de un breve delay para mostrar el mensaje
      setTimeout(() => {
        navigate('/login-usuario', { replace: true });
      }, 1500);

    } catch (error) {
      console.error('Error cerrando sesión:', error);
      
      // Si hay error en el servidor, igualmente limpiar datos locales
      clearLocalData();
      
      if (error.name === 'TimeoutError') {
        setLogoutMessage('Tiempo de espera agotado. Sesión limpiada localmente.');
      } else {
        setLogoutMessage('Error en el servidor. Sesión limpiada localmente.');
      }
      
      setShowRetry(true);
      
      // Auto-redirigir después de 3 segundos incluso si hay error
      setTimeout(() => {
        navigate('/login-usuario', { replace: true });
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  // Función para volver al inicio usando navigate
  const handleGoHome = () => {
    navigate('/', { replace: true });
  };

  // Función para reintentar el logout
  const handleRetryLogout = () => {
    setLogoutMessage('');
    setShowRetry(false);
    handleLogout();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div
        className={`text-center bg-white rounded-xl shadow-xl border border-gray-200 max-w-md w-full overflow-hidden transform transition-all duration-700 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-8 scale-75'
        }`}
        role="main"
        aria-live="polite"
      >
        {/* Header decorativo con animación zoom in */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 px-8 pt-8 pb-6">
          <div
            className={`w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg transform transition-all duration-600 delay-300 ${
              isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 rotate-45'
            }`}
            aria-hidden="true"
          >
            <Shield className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Acceso Denegado
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-red-400 to-orange-400 rounded-full mx-auto"></div>
        </div>

        {/* Contenido principal */}
        <div className="px-8 py-6">
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            No tienes los permisos necesarios para acceder a esta página.
          </p>

          {/* Mensaje de estado dinámico */}
          {logoutMessage && (
            <div 
              className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
              aria-live="assertive"
              role="status"
            >
              <div className="flex items-center space-x-2">
                {loading ? (
                  <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
                ) : (
                  <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                )}
                <p className="text-sm text-blue-800 font-medium">
                  {logoutMessage}
                </p>
              </div>
            </div>
          )}

          {/* Sugerencias útiles */}
          <div className="space-y-4 mb-8">
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-sm font-medium text-yellow-800">
                    ¿Necesitas acceder con otra cuenta?
                  </p>
                  <p className="text-sm text-yellow-700 mt-1">
                    Intenta cerrar sesión e ingresar con una cuenta que tenga los permisos adecuados.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-sm font-medium text-blue-800">
                    ¿Necesitas permisos adicionales?
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    Contacta al administrador del sistema para solicitar acceso a esta funcionalidad.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div
            className={`space-y-4 transform transition-all duration-500 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            {/* Botón para volver al inicio */}
            <button
              onClick={handleGoHome}
              className="group relative w-full px-6 py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:scale-105 overflow-hidden"
              aria-label="Volver a la página principal"
            >
              <div className="flex items-center justify-center space-x-2 relative z-10">
                <Home className="w-4 h-4" />
                <span>Volver al inicio</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>

            {/* Botón para cerrar sesión */}
            <button
              onClick={handleLogout}
              disabled={loading}
              className="group relative w-full px-6 py-3 rounded-lg font-semibold text-blue-600 border-2 border-blue-600 hover:bg-blue-50 hover:border-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              aria-label={loading ? 'Cerrando sesión, por favor espera' : 'Cerrar sesión actual'}
            >
              <div className="flex items-center justify-center space-x-2">
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <LogOut className="w-4 h-4" />
                )}
                <span>
                  {loading ? 'Cerrando sesión...' : 'Cerrar sesión'}
                </span>
              </div>
            </button>

            {/* Botón de reintentar (solo se muestra si hay error) */}
            {showRetry && (
              <button
                onClick={handleRetryLogout}
                className="group relative w-full px-6 py-3 rounded-lg font-semibold text-orange-600 border-2 border-orange-600 hover:bg-orange-50 hover:border-orange-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transform hover:scale-105"
                aria-label="Reintentar cerrar sesión"
              >
                <div className="flex items-center justify-center space-x-2">
                  <RefreshCw className="w-4 h-4" />
                  <span>Reintentar logout</span>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Footer con información adicional */}
        <div className="bg-gray-50 px-8 py-4 text-center">
          <p className="text-xs text-gray-500">
            Sistema RelaTIC • Código de Error: 403 - Acceso Prohibido
          </p>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;