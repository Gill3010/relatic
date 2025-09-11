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
  className="px-4 py-2 w-96 text-white rounded-lg transition-all duration-300 shadow-lg text-base font-medium"
  style={{
    backgroundColor: "#2563EBE6"
  }}
  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#1E4FCC"}
  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#2563EBE6"}
>
  ← Volver a la página principal
</button>

    </div>
  );
};

export default RedirectToHomeButton;