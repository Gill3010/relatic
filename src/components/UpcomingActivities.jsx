
const UpcomingActivies = () => {
  const actividades = [
    { id: 1, nombre: 'Conferencia Internacional de Investigación', fecha: '2025-04-15', descripcion: 'Explorando avances en la investigación científica a nivel mundial.' },
    { id: 2, nombre: 'Seminario sobre Innovación Educativa', fecha: '2025-05-20', descripcion: 'Tendencias y mejores prácticas en el ámbito educativo.' },
    { id: 3, nombre: 'Taller de Desarrollo Tecnológico', fecha: '2025-06-10', descripcion: 'Conoce las últimas tecnologías para el desarrollo de aplicaciones web.' },
  ];

  return (
    <div className="bg-white py-8 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-[#275Bc8] mb-6 text-center">Actividades Próximas</h2>
      <div className="space-y-6">
        {actividades.map((actividad) => (
          <div key={actividad.id} className="p-6 border border-[#E0E0E0] rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-[#275Bc8]">{actividad.nombre}</h3>
            <p className="text-sm text-[#757575]">{actividad.fecha}</p>
            <p className="mt-2 text-base text-[#333]">{actividad.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingActivies;