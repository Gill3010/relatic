const Books = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-[#68358c] to-[#2d2e77] p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
        {/* Imagen con efecto zoom */}
        <div className="flex justify-center mb-6">
          <img 
            src="/assets/Plibros.jpg" 
            alt="Portal de Libros"
            className="w-48 h-48 object-cover rounded-full shadow-lg transform transition-transform duration-300 hover:scale-110" 
          />
        </div>

        <h2 className="text-3xl font-semibold text-center text-white mb-6">Servicios y Soluciones del Portal de Libros</h2>
        <h3 className="text-xl font-semibold text-white mb-4">
          <strong className="text-white">¿Qué ofrecemos?</strong>
        </h3>

        <p className="text-white">
          En nuestro portal de libros académicos y científicos, proporcionamos una plataforma innovadora para la 
          publicación y distribución de libros de alta calidad en diversas áreas del conocimiento. Ofrecemos una variedad de 
          servicios que incluyen soporte para autores, editores y lectores, así como herramientas avanzadas de colaboración 
          y visibilidad internacional para que el conocimiento se difunda a nivel global.
        </p>
        <p className="text-white mt-4">
          Nuestro portal facilita la gestión de libros, optimización de procesos editoriales y ofrece un sistema eficiente 
          de archivo y acceso a libros pasados. Con un diseño amigable e intuitivo, nuestra plataforma es ideal para quienes 
          buscan una forma accesible y profesional para publicar y compartir libros académicos y científicos.
        </p>
        
        <div className="mt-6 text-center">
          <a 
            href="https://revistasrelatic.org" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#a486ba] hover:bg-[#2d2e77] text-white px-6 py-2 rounded-lg transition duration-300"
          >
            Visita nuestro portal de libros
          </a>
        </div>
      </div>
    </div>
  );
};

export default Books;