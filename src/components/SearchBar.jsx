import PropTypes from 'prop-types';

const tipos = ['', 'Ponencia', 'Conferencia', 'Panelista', 'Facilitador de Taller', 'Revistas Indexadas', 'Carteles Digitales', 'Libros Digitales', 'Cursos'];

const SearchBar = ({ query, onQueryChange, type, onTypeChange }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <input
        type="search"
        className="flex-grow rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border"
        style={{ borderColor: '#00bcd4' }}
        placeholder="Buscar por autor o título..."
        value={query}
        onChange={e => onQueryChange(e.target.value)}
      />
      <select
        className="rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border"
        style={{ borderColor: '#00bcd4' }}
        value={type}
        onChange={e => onTypeChange(e.target.value)}
      >
        {tipos.map((t, i) => (
          <option key={i} value={t}>{t || 'Todos los tipos'}</option>
        ))}
      </select>
    </div>
  );
};

SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  onQueryChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  onTypeChange: PropTypes.func.isRequired,
};

export default SearchBar;