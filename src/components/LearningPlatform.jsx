const LearningPlatform = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-lg border-4 border-[#68358c] transform transition-transform duration-300 hover:scale-105">
        {/* Banner con imagen */}
        <div className="relative mb-6 overflow-hidden rounded-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-[#68358c] to-[#2d2e77]"></div>
  <img 
    src="/assets/Aprendizaje.jpg" 
    alt="Plataforma de Aprendizaje"
    className="w-full h-96 object-contain transform transition-transform duration-300 hover:scale-110" 
  />
</div>

        <h2 className="text-3xl font-semibold text-center text-[#68358c] mb-6">Plataforma Integral de Aprendizaje Continuo</h2>
        <h3 className="text-xl font-semibold text-[#68358c] mb-4">
          <strong className="text-[#68358c]">¿Cómo transformamos el aprendizaje continuo con soluciones personalizadas, interactivas y accesibles para todos los niveles de conocimiento?</strong>
        </h3>

        {/* Texto con fondo blanco */}
        <div className="text-[#68358c]">
          <p>
            Transformamos el aprendizaje continuo ofreciendo una plataforma flexible y accesible que apoya a estudiantes, profesionales y académicos en su desarrollo constante. Proporcionamos una amplia variedad de cursos, recursos educativos interactivos y herramientas de colaboración para facilitar el aprendizaje en múltiples áreas del conocimiento. Con un enfoque en la calidad educativa, nuestra plataforma permite a los usuarios aprender a su propio ritmo, desde cualquier lugar y en cualquier momento, adaptándose a sus necesidades y metas personales.
          </p>
          <p className="mt-4">
            Además, ofrecemos sistemas avanzados de seguimiento del progreso, evaluación continua y la oportunidad de integrarse en una comunidad activa que promueve el aprendizaje colaborativo. Esta plataforma está diseñada para quienes buscan una solución educativa que se ajuste a sus intereses, con una experiencia de aprendizaje personalizada y accesible.
          </p>
        </div>

        {/* Degradado en la parte inferior */}
        <div className="bg-gradient-to-r from-[#68358c] to-[#2d2e77] p-6 mt-6 rounded-lg shadow-lg">
  <div className="mt-6 text-center">
    <a 
      href="https://portaldecartelescientificos.org/Cursos" 
      target="_blank" 
      rel="noopener noreferrer"
      className="bg-[#2d2e77] text-white px-6 py-2 rounded-lg transition-all duration-300 hover:bg-[#a486ba] hover:translate-y-2 text-sm sm:text-base md:text-lg"
    >
      Descubre nuestros servicios
    </a>
  </div>
</div>
      </div>
    </div>
  );
};

export default LearningPlatform;