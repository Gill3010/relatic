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

        <h2 className="text-3xl font-semibold text-center text-white mb-6">Portal de Libros</h2>
        <h3 className="text-xl font-semibold text-white mb-4">
          <strong className="text-white">¿Cómo facilitamos el acceso, la difusión y la gestión de libros académicos y científicos con soluciones avanzadas y adaptadas a las necesidades del sector?</strong>
        </h3>

        <p className="text-white">
  En nuestro portal de libros académicos y científicos, ofrecemos una plataforma avanzada que facilita la publicación y distribución de libros de alta calidad en diversas áreas del conocimiento. Brindamos una variedad de servicios diseñados para autores, editores y lectores, incluyendo herramientas de colaboración, visibilidad internacional y soporte personalizado, asegurando que el conocimiento llegue a una audiencia global.
</p>
<p className="text-white mt-4">
  Nuestro portal optimiza la gestión editorial, agiliza los procesos de publicación y ofrece un sistema eficiente de archivo para mantener el acceso continuo a libros pasados. Con un diseño intuitivo y fácil de usar, nuestra plataforma está pensada para quienes buscan una solución accesible, profesional y efectiva para publicar y compartir libros académicos y científicos.
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