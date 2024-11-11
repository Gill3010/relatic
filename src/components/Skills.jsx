import { FaReact, FaNodeJs, FaCss3Alt, FaHtml5, FaJava, FaPhp, FaAngular } from 'react-icons/fa';
import { SiTypescript } from 'react-icons/si';

const Skills = () => {
  return (
    <section className="bg-azulOscuro text-blancoTexto py-16">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-12">Habilidades</h2>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-12">
          <div className="skill-card bg-verdeBoton rounded-lg p-6 shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
            <FaReact className="mx-auto mb-6 w-16 h-16 text-tealHover" />
            <h3 className="text-xl font-medium">React</h3>
          </div>
          <div className="skill-card bg-verdeBoton rounded-lg p-6 shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
            <FaNodeJs className="mx-auto mb-6 w-16 h-16 text-green-500" />
            <h3 className="text-xl font-medium">Node.js</h3>
          </div>
          <div className="skill-card bg-verdeBoton rounded-lg p-6 shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
            <FaCss3Alt className="mx-auto mb-6 w-16 h-16 text-blue-400" />
            <h3 className="text-xl font-medium">CSS3</h3>
          </div>
          <div className="skill-card bg-verdeBoton rounded-lg p-6 shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
            <FaHtml5 className="mx-auto mb-6 w-16 h-16 text-orange-500" />
            <h3 className="text-xl font-medium">HTML5</h3>
          </div>
          <div className="skill-card bg-verdeBoton rounded-lg p-6 shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
            <FaJava className="mx-auto mb-6 w-16 h-16 text-red-600" />
            <h3 className="text-xl font-medium">Java</h3>
          </div>
          <div className="skill-card bg-verdeBoton rounded-lg p-6 shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
            <FaPhp className="mx-auto mb-6 w-16 h-16 text-indigo-500" />
            <h3 className="text-xl font-medium">PHP</h3>
          </div>
          <div className="skill-card bg-verdeBoton rounded-lg p-6 shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
            <FaAngular className="mx-auto mb-6 w-16 h-16 text-red-500" />
            <h3 className="text-xl font-medium">Angular</h3>
          </div>
          <div className="skill-card bg-verdeBoton rounded-lg p-6 shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
            <SiTypescript className="mx-auto mb-6 w-16 h-16 text-blue-500" />
            <h3 className="text-xl font-medium">TypeScript</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
