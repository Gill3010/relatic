// src/components/RedirectToHomeButton.jsx
import { useNavigate } from 'react-router-dom';

const RedirectToHomeButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/inicio');
  };

  return (
    <button
      onClick={handleClick}
      className="mb-6 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg"
    >
      ← Volver a la página principal
    </button>
  );
};

export default RedirectToHomeButton;