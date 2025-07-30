import PropTypes from 'prop-types';

const SearchResults = ({ results, page, totalPages, onPageChange, type }) => {
  if (!results.length) return <p className="text-center text-gray-600">No se encontraron resultados.</p>;

  if (type === 'Revistas Indexadas' || type === 'Carteles Digitales') {
    return (
      <div>
        <ul className="space-y-6">
          {results.map(item => (
            <li key={item.submission_id} className="border p-4 rounded shadow hover:shadow-md transition">
              <h3 className="font-semibold text-lg text-green-700 hover:underline">
                <a href={item.article_url} target="_blank" rel="noopener noreferrer">{item.title}</a>
              </h3>
              <p><strong>Autores:</strong> {item.authors || 'No disponible'}</p>
              <p><strong>Evento / Revista:</strong> {item.journal_title || 'No disponible'}</p>
              <p><strong>Publicado:</strong> {item.date_published ? new Date(item.date_published).toLocaleDateString() : 'No disponible'}</p>
              <p className="mt-2 text-gray-700" dangerouslySetInnerHTML={{ __html: item.abstract || 'Sin resumen' }} />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (type === 'Libros Digitales') {
    return (
      <div>
        <ul className="space-y-6">
          {results.map(item => (
            <li key={item.submission_id || item.id} className="border p-4 rounded shadow hover:shadow-md transition">
              <h3 className="font-semibold text-lg text-green-700 hover:underline">
                <a href={item.book_url} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
              </h3>
              <p><strong>Autor(es):</strong> {item.authors || 'No disponible'}</p>
              <p><strong>Publicado:</strong> {item.date_published ? new Date(item.date_published).toLocaleDateString() : 'No disponible'}</p>
              <p className="mt-2 text-gray-700" dangerouslySetInnerHTML={{ __html: item.abstract || 'Sin resumen' }} />
            </li>
          ))}
        </ul>

        {/* Paginación */}
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
  }

  if (type === 'Cursos') {
    return (
      <div>
        <ul className="space-y-6">
          {results.map(course => (
            <li key={course.course_id} className="border p-4 rounded shadow hover:shadow-md transition">
              <h3 className="font-semibold text-lg text-green-700 hover:underline">
                <a href={course.course_url} target="_blank" rel="noopener noreferrer">{course.course_name}</a>
              </h3>
              <p><strong>Categoría:</strong> {course.category || 'No disponible'}</p>
              <p><strong>Profesor(es):</strong> {course.teacher_name || 'No disponible'}</p>
              <div
                className="mt-2 text-gray-700"
                dangerouslySetInnerHTML={{ __html: course.course_description || 'Sin descripción' }}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Otros tipos de participación
  return (
    <div>
      <ul className="space-y-4">
        {results.map(item => (
          <li key={item.id} className="border p-4 rounded shadow hover:shadow-md transition">
            <h3 className="font-semibold text-lg text-green-700">{item.tema || 'Sin tema'}</h3>
            <p><strong>Tipo:</strong> {item.tipoParticipacion || 'No especificado'}</p>
            <p><strong>Nombre:</strong> {item.nombreCompleto || 'Sin nombre'}</p>
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
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      tema: PropTypes.string,
      tipoParticipacion: PropTypes.string,
      nombreCompleto: PropTypes.string,
      submission_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
      authors: PropTypes.string,
      journal_title: PropTypes.string,
      date_published: PropTypes.string,
      article_url: PropTypes.string,
      abstract: PropTypes.string,
      book_url: PropTypes.string,
      course_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      course_name: PropTypes.string,
      course_description: PropTypes.string,
      category: PropTypes.string,
      teacher_name: PropTypes.string,
      course_url: PropTypes.string,
    })
  ).isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default SearchResults;