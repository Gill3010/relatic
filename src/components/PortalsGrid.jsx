import Journals from './Journals';
import ScientificPostersPortal from './ScientificPostersPortal';
import Books from './Books';
import LearningPlatform from './LearningPlatform';
import IntellectualProperty from './IntellectualProperty';

const PortalsGrid = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* Primera fila: 3 columnas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="w-full">
          <Journals />
        </div>
        <div className="w-full">
          <ScientificPostersPortal />
        </div>
        <div className="w-full">
          <Books />
        </div>
      </div>
      
      {/* Segunda fila: 2 columnas centradas */}
      <div className="flex flex-wrap justify-center gap-6">
        <div className="w-full md:w-1/2 lg:w-1/3">
          <LearningPlatform />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3">
          <IntellectualProperty />
        </div>
      </div>
      
    </div>
  );
};

export default PortalsGrid;