
const PreviousActivities = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-[#275Bc8] mb-8">Actividades Anteriores</h2>

        <div className="space-y-6">
          <div className="bg-[#f4f4f4] p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-[#275Bc8]">Actividad 1</h3>
            <p className="text-gray-700">Descripción de la actividad 1 que ya se ha realizado.</p>
            <span className="block mt-4 text-sm text-gray-500">Fecha: 15 de Febrero 2025</span>
          </div>

          <div className="bg-[#f4f4f4] p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-[#275Bc8]">Actividad 2</h3>
            <p className="text-gray-700">Descripción de la actividad 2 que ya se ha realizado.</p>
            <span className="block mt-4 text-sm text-gray-500">Fecha: 20 de Enero 2025</span>
          </div>

          <div className="bg-[#f4f4f4] p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-[#275Bc8]">Actividad 3</h3>
            <p className="text-gray-700">Descripción de la actividad 3 que ya se ha realizado.</p>
            <span className="block mt-4 text-sm text-gray-500">Fecha: 10 de Diciembre 2024</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviousActivities;