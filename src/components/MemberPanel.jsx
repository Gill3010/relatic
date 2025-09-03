import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MemberPanel = () => {
  const [userData, setUserData] = useState(null);
  const [documents, setDocuments] = useState({ idCards: [], certificates: [] });
  const [loading, setLoading] = useState(true);

  const buttonStyle = "bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors";
  const cardStyle = "bg-white p-8 rounded-xl shadow-lg";

  // Obtener datos del usuario y documentos
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        // Obtener ID del usuario desde la autenticación (en producción)
        const userId = 1; // Esto vendría de tu sistema de auth
        
        const response = await fetch('https://relaticpanama.org/api/get-user-documents.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: userId })
        });

        const data = await response.json();
        
        if (data.success) {
          setUserData(data.user);
          setDocuments(data.documents);
        } else {
          // Error message can be handled here if needed
          // setStatus({ type: 'error', message: data.message });
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        // setStatus({ type: 'error', message: 'Error de conexión' });
        // Error message can be handled here if needed
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const downloadDocument = async (documentId) => {
    setLoading(true);
    try {
      const response = await fetch('https://relaticpanama.org/api/download-document.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId: userData.id, 
          documentId: documentId 
        })
      });

      const data = await response.json();
      
      if (data.success) {
        // Aquí implementarías la descarga real del archivo
        console.log('Descargando:', data.downloadUrl);
      } else {
        // Error message can be handled here if needed
        // setStatus({ type: 'error', message: 'Error al descargar' });
      }
    } catch (error) {
      console.error('Error downloading document:', error);
      // setStatus({ type: 'error', message: 'Error al descargar' });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Cargando información...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header e información del usuario (igual que antes) */}

        {/* Documentos dinámicos */}
        <div className={cardStyle}>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Mis Documentos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Carnets */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                </svg>
              </div>
              
              <h3 className="font-medium text-gray-900 mb-2 text-center">Carnets de Miembro</h3>
              
              {documents.idCards.length > 0 ? (
                <div className="space-y-3">
                  {documents.idCards.map((card) => (
                    <div key={card.id} className="bg-gray-50 p-3 rounded-md">
                      <p className="text-sm font-medium">{card.document_name}</p>
                      <p className="text-xs text-gray-600">
                        Emitido: {new Date(card.issue_date).toLocaleDateString()}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => downloadDocument(card.id, 'carnet')}
                        disabled={loading}
                        className={`${buttonStyle} w-full mt-2 text-sm py-2`}
                      >
                        Descargar
                      </motion.button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 text-sm">No hay carnets disponibles</p>
              )}
            </motion.div>

            {/* Certificados */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              
              <h3 className="font-medium text-gray-900 mb-2 text-center">Certificados</h3>
              
              {documents.certificates.length > 0 ? (
                <div className="space-y-3">
                  {documents.certificates.map((cert) => (
                    <div key={cert.id} className="bg-gray-50 p-3 rounded-md">
                      <p className="text-sm font-medium">{cert.document_name}</p>
                      <p className="text-xs text-gray-600">
                        {cert.certificate_type} • {new Date(cert.issue_date).toLocaleDateString()}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => downloadDocument(cert.id, 'certificado')}
                        disabled={loading}
                        className={`${buttonStyle} bg-green-600 hover:bg-green-700 w-full mt-2 text-sm py-2`}
                      >
                        Descargar
                      </motion.button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 text-sm">No hay certificados disponibles</p>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MemberPanel;