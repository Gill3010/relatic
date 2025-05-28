import Journals from './Journals';
import ScientificPostersPortal from './ScientificPostersPortal';
import Books from './Books';
import LearningPlatform from './LearningPlatform';

const PortalsGrid = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Grid responsivo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        
        <div className="w-full">
          <Journals />
        </div>
        
        
        <div className="w-full">
          <ScientificPostersPortal />
        </div>
        
        
        <div className="w-full">
          <Books />
        </div>
        
       
        <div className="w-full">
          <LearningPlatform />
        </div>
      
      </div>
    </div>
  );
};

export default PortalsGrid;