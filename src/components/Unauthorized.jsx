// Ejemplo: en src/components/Unauthorized.jsx




const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Acceso Denegado 🔒</h1>
      <p className="text-lg text-gray-700 mb-8">
        No tienes permisos suficientes para ver esta página.
      </p>
      {/* Usa el componente aquí */}
     
    </div>
  );
};

export default Unauthorized;