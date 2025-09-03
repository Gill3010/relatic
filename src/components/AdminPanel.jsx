import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [searchTerm, setSearchTerm] = useState('');

  // Estilos consistentes con el diseño existente
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";
  const inputStyle = "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors";
  const buttonStyle = "bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors";
  const cardStyle = "bg-white p-6 rounded-xl shadow-lg";

  // Simular carga de usuarios
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // En producción, esto sería una llamada a tu API
        const mockUsers = [
          { id: 1, firstName: 'María', lastName: 'González', email: 'maria@email.com', role: 'member', status: 'active' },
          { id: 2, firstName: 'Carlos', lastName: 'Rodríguez', email: 'carlos@email.com', role: 'member', status: 'active' },
          { id: 3, firstName: 'Ana', lastName: 'Martínez', email: 'ana@email.com', role: 'member', status: 'pending' }
        ];
        setUsers(mockUsers);
    } catch {
        setStatus({ type: 'error', message: 'Error al cargar usuarios' });
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const generateIDCard = async (userId) => {
    setLoading(true);
    try {
      // Simular generación de carnet
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus({ type: 'success', message: 'Carnet generado exitosamente' });
      console.log('Generando carnet para usuario ID:', userId);
    } catch {
      setStatus({ type: 'error', message: 'Error al generar carnet' });
    }
    setLoading(false);
  };

  const generateCertificate = async (userId, type) => {
    setLoading(true);
    try {
      // Simular generación de certificado
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus({ type: 'success', message: `Certificado ${type} generado exitosamente` });
      console.log('Generando certificado', type, 'para usuario ID:', userId);
    } catch {
      setStatus({ type: 'error', message: 'Error al generar certificado' });
    }
    setLoading(false);
  };

  const filteredUsers = users.filter(user =>
    `${user.firstName} ${user.lastName} ${user.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Panel de Administración
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Gestiona carnets y certificados de miembros
          </p>
        </div>

        {/* Búsqueda */}
        <div className={cardStyle + " mb-6"}>
          <label htmlFor="search" className={labelStyle}>
            Buscar miembros
          </label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={inputStyle}
            placeholder="Buscar por nombre, apellido o email..."
          />
        </div>

        {/* Lista de usuarios */}
        <div className={cardStyle}>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Lista de Miembros ({filteredUsers.length})
          </h2>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Cargando miembros...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user.status === 'active' ? 'Activo' : 'Pendiente'}
                      </span>
                    </div>

                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => generateIDCard(user.id)}
                        disabled={loading}
                        className={`${buttonStyle} text-sm ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        Generar Carnet
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => generateCertificate(user.id, 'afiliación')}
                        disabled={loading}
                        className={`${buttonStyle} bg-green-600 hover:bg-green-700 text-sm ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        Cert. Afiliación
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => generateCertificate(user.id, 'participación')}
                        disabled={loading}
                        className={`${buttonStyle} bg-purple-600 hover:bg-purple-700 text-sm ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        Cert. Participación
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}

              {filteredUsers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No se encontraron miembros
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mensajes de estado */}
        {status.message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`fixed top-4 right-4 rounded-md p-4 ${
              status.type === 'success' 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            <p className="text-sm">{status.message}</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminPanel;