// src/components/RedirectToHomeButton.jsx
import { useNavigate } from 'react-router-dom';

const RedirectToHomeButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className="w-full flex justify-start mb-6">
      <button
        onClick={handleClick}
        className="px-4 py-2 w-96 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg text-base font-medium"
      >
        ← Volver a la página principal
      </button>
    </div>
  );
};

export default RedirectToHomeButton;
