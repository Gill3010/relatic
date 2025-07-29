import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false); // 🔸 Nuevo estado

  const fetchResults = async (q, t, p) => {
    if (!q && !t) return; // 🔸 No buscar si no hay query ni type

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (q) params.append('q', q);
      if (t) params.append('type', t);
      if (p) params.append('page', p);

      const res = await fetch(`/_events/api/search.php?${params.toString()}`);
      if (!res.ok) throw new Error('Error al obtener datos');
      const data = await res.json();

      setResults(data.results || []);
      setTotalPages(data.totalPages || 1);
      setPage(data.currentPage || 1);
      setHasSearched(true); // 🔸 Marcar que ya se hizo búsqueda
    } catch (err) {
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Solo buscar si el usuario escribe algo o elige un tipo
  useEffect(() => {
    if (query || type) {
      fetchResults(query, type, page);
    }
  }, [query, type, page]);

  // Reiniciar página al cambiar query o type
  useEffect(() => {
    setPage(1);
  }, [query, type]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div 
        data-aos="fade-down" 
        data-aos-duration="800" 
        data-aos-easing="ease-out-cubic"
        data-aos-anchor-placement="top-bottom"
        data-aos-mirror="true"
      >
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          type={type}
          onTypeChange={setType}
        />
      </div>

      {loading && (
        <div 
          data-aos="zoom-in" 
          data-aos-duration="400" 
          data-aos-easing="ease-out-back"
          data-aos-anchor-placement="top-bottom"
          data-aos-mirror="true"
        >
          <p className="text-center my-4">Cargando resultados...</p>
        </div>
      )}
      
      {error && (
        <div 
          data-aos="fade-in" 
          data-aos-duration="500" 
          data-aos-easing="ease-out-quart"
          data-aos-anchor-placement="top-bottom"
          data-aos-mirror="true"
        >
          <p className="text-red-600 text-center my-4">{error}</p>
        </div>
      )}

      {!hasSearched && !loading && (
        <div 
          data-aos="fade-up" 
          data-aos-duration="700" 
          data-aos-delay="200"
          data-aos-easing="ease-out-cubic"
          data-aos-anchor-placement="top-bottom"
          data-aos-mirror="true"
        >
          <p className="text-center text-gray-500 mt-6">Escribe una búsqueda o selecciona un tipo para ver resultados.</p>
        </div>
      )}

      {hasSearched && !loading && results.length === 0 && (
        <div 
          data-aos="fade-up" 
          data-aos-duration="600" 
          data-aos-easing="ease-out-cubic"
          data-aos-anchor-placement="top-bottom"
          data-aos-mirror="true"
        >
          <p className="text-center text-gray-500 mt-6">No se encontraron resultados.</p>
        </div>
      )}

      {results.length > 0 && (
        <>
          {/* Indicador de resultados */}
          <div 
            data-aos="fade-right" 
            data-aos-duration="600" 
            data-aos-delay="50"
            data-aos-easing="ease-out-cubic"
            data-aos-anchor-placement="top-bottom"
            data-aos-mirror="true"
            className="flex justify-between items-center mb-6 mt-6"
          >
            <div className="text-gray-600">
              <span role="img" aria-label="sparkles">✨</span> <span className="font-medium">{results.length}</span> resultados 
              {query && (
                <span> para &quot;<span className="font-semibold text-gray-800">{query}</span>&quot;</span>
              )}
              {type && <span> en <span className="font-semibold text-blue-600">{type}</span></span>}
            </div>
            
            <button
              onClick={() => {
                setQuery('');
                setType('');
                setResults([]);
                setHasSearched(false);
                setPage(1);
              }}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 flex items-center gap-2"
              data-aos="fade-left" 
              data-aos-duration="600" 
              data-aos-delay="100"
              data-aos-easing="ease-out-cubic"
              data-aos-anchor-placement="top-bottom"
              data-aos-mirror="true"
            >
              🔄 Nueva búsqueda
            </button>
          </div>

          <div 
            data-aos="fade-up" 
            data-aos-duration="800" 
            data-aos-delay="150"
            data-aos-easing="ease-out-cubic"
            data-aos-anchor-placement="top-bottom"
            data-aos-mirror="true"
          >
            <SearchResults
              results={results}
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SearchPage;