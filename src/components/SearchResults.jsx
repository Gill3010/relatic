import PropTypes from 'prop-types';

const SearchResults = ({ results, page, totalPages, onPageChange }) => {
  if (!results.length) return <p className="text-center text-gray-600">No se encontraron resultados.</p>;

  return (
    <div>
      <ul className="space-y-4">
        {results.map(item => (
          <li key={item.id} className="border p-4 rounded shadow hover:shadow-md transition">
            <h3 className="font-semibold text-lg">{item.tema}</h3>
            <p><strong>Tipo:</strong> {item.tipoParticipacion}</p>
            <p><strong>Nombre:</strong> {item.nombreCompleto}</p>
          </li>
        ))}
      </ul>

      <div className="flex justify-center gap-4 mt-6">
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
        >
          Anterior
        </button>
        <span className="self-center">Página {page} de {totalPages}</span>
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

SearchResults.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      tema: PropTypes.string,
      tipoParticipacion: PropTypes.string,
      nombreCompleto: PropTypes.string,
    })
  ).isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default SearchResults;