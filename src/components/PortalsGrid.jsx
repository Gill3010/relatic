const PortalsGrid = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* Primera fila: 3 columnas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Aquí puedes agregar otros componentes si lo deseas */}
      </div>
      
      {/* Segunda fila: 2 columnas centradas */}
      <div className="flex flex-wrap justify-center gap-6">
        {/* Aquí puedes agregar otros componentes si lo deseas */}
      </div>
      
    </div>
  );
};

export default PortalsGrid;