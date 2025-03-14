const LearningPlatform = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-[#68358c] mb-6">Plataforma Integral de Aprendizaje Continuo</h2>
        <h3 className="text-xl font-semibold text-[#275Bc8] mb-4">¿Qué ofrecemos?</h3>
        <p className="text-[#275Bc8]">
          Nuestra plataforma integral de aprendizaje continuo está diseñada para apoyar a estudiantes, profesionales y 
          académicos en su desarrollo y actualización constante. Ofrecemos una amplia gama de cursos, recursos educativos y 
          herramientas de colaboración que facilitan el aprendizaje en diversas áreas del conocimiento. Con un enfoque en la 
          calidad educativa, nuestro portal está pensado para ser accesible y flexible, permitiendo a los usuarios aprender a 
          su propio ritmo y desde cualquier lugar.
        </p>
        <p className="text-[#275Bc8] mt-4">
          Además, contamos con sistemas de seguimiento del progreso de los estudiantes, evaluación continua, y una comunidad 
          activa que fomenta el aprendizaje colaborativo y la interacción entre miembros de diversas disciplinas. Nuestra 
          plataforma es ideal para quienes buscan una solución de aprendizaje adaptada a sus necesidades y objetivos educativos.
        </p>
        <div className="mt-6 text-center">
          <a 
            href="https://portaldecartelescientificos.org/#servicios" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#68358c] text-white px-6 py-2 rounded-lg hover:bg-[#1A4F89] transition duration-300"
          >
            Descubre nuestros servicios
          </a>
        </div>
      </div>
    </div>
  );
};

export default LearningPlatform;
