import { FiArrowRight } from 'react-icons/fi';

const DiscoverTitle = () => (
  <h1 className="text-3xl md:text-4xl font-bold text-center text-[#1a1b59] mb-8 mt-6 px-4">
    <span className="flex items-center justify-center gap-2">
      Explora ahora <FiArrowRight className="text-[#4f46e5] animate-pulse" />
    </span>
    <span className="block mt-2 text-lg font-medium">Servicios que marcan la diferencia</span>
  </h1>
);

export default DiscoverTitle;