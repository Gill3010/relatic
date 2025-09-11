import { useEffect, useState } from 'react';
import { Shield, Home, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Acceso Denegado';
    setIsVisible(true);
  }, []);

  // Función para cerrar sesión completamente
  const handleLogout = async () => {
    setLoading(true);
    try {
      // Definir la URL correcta para logout
      const baseUrl = 'https://relaticpanama.org/api/logout.php';

      const response = await fetch(baseUrl, {
        method: 'POST',
        credentials: 'include', // necesario si usas cookies de sesión
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('No se pudo cerrar sesión en el servidor');
      }

      // Limpiar cualquier dato de sesión en frontend
      localStorage.removeItem('userToken');
      sessionStorage.clear();

      // Redirigir al login
      navigate('/login-usuario');
    } catch (error) {
      console.error('Error cerrando sesión:', error);
      alert('Error al cerrar sesión. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div
        className={`text-center bg-white rounded-xl shadow-xl border border-gray-200 max-w-md w-full overflow-hidden transform transition-all duration-600 ${
          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
        }`}
      >
        {/* Header decorativo */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 px-8 pt-8 pb-6">
          <div
            className={`w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg transform transition-all duration-500 delay-200 ${
              isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-12'
            }`}
          >
            <Shield className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Acceso Denegado</h1>
          <div className="w-16 h-1 bg-gradient-to-r from-red-400 to-orange-400 rounded-full mx-auto"></div>
        </div>

        {/* Contenido principal */}
        <div className="px-8 py-6">
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            No tienes permisos suficientes para ver esta página.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-8">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">¿Necesitas acceso?</p>
                <p className="text-sm text-gray-600 mt-1">
                  Contacta con el administrador del sistema para solicitar los permisos necesarios.
                </p>
              </div>
            </div>
          </div>

          <div
            className={`space-y-4 transform transition-all duration-400 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            {/* Botón para volver al inicio */}
            <button
              onClick={() => window.location.href = '/'}
              className="group relative w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:scale-105 overflow-hidden"
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
              className="group relative w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-blue-600 border-2 border-blue-600 hover:bg-blue-50 hover:border-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-center space-x-2">
                <LogOut className="w-4 h-4" />
                <span>{loading ? 'Cerrando sesión...' : 'Cerrar sesión'}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 text-center">
          <p className="text-xs text-gray-500">Sistema de Seguridad • Código de Error: 403</p>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
