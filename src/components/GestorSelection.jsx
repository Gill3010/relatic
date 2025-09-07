// En src/components/GestorSelection.jsx

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const GestorSelection = () => {
  const navigate = useNavigate();

  // Estilos y animaciones reutilizables
  const buttonStyle = "w-full bg-blue-600 text-white py-4 px-6 rounded-md text-xl font-bold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors";

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const handleSelection = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg"
      >
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Panel de Gestor
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Selecciona la tarea que deseas realizar
          </p>
        </div>
        
        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={buttonStyle}
            onClick={() => handleSelection('/generar-certificado')}
          >
            Generar Certificado
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={buttonStyle}
            onClick={() => handleSelection('/generar-carnet')}
          >
            Generar Carnet
          </motion.button>
        </div>
        
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-500 text-sm font-medium"
          >
            Volver a la página Principal
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default GestorSelection;