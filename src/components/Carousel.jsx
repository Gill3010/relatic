import { useState, useEffect } from 'react';
import {
  FileText,
  ShieldCheck,
  BookOpen,
  GraduationCap,
  Newspaper,
  Edit3,
  ArrowRight
} from 'lucide-react';

const MinimalistHero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      id: 1,
      title: "Revistas Indexadas",
      description: "Publicaciones científicas de calidad",
      icon: Newspaper,
      href: "/detalles-revistas",
      color: "from-blue-50 to-blue-100"
    },
    {
      id: 2,
      title: "Carteles Digitales",
      description: "Presenta tus trabajos en formato digital",
      icon: FileText,
      href: "/detalles-carteles",
      color: "from-blue-100 to-blue-200"
    },
    {
      id: 3,
      title: "Libros Digitales",
      description: "Publica y difunde tus libros",
      icon: BookOpen,
      href: "/detalles-libros",
      color: "from-blue-50 to-blue-100"
    },
    {
      id: 4,
      title: "Aprendizaje Continuo",
      description: "Formación y actualización constante",
      icon: GraduationCap,
      href: "/detalles-aprendizaje",
      color: "from-blue-100 to-blue-200"
    },
    {
      id: 5,
      title: "Propiedad Intelectual",
      description: "Protege tus derechos de autor",
      icon: ShieldCheck,
      href: "/detalles-propiedad-intelectual",
      color: "from-blue-50 to-blue-100"
    }
  ];

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      
      {/* Contenido Principal */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16 md:px-8 lg:px-12 max-w-7xl mx-auto">
        
        {/* Título Principal */}
        <div className={`text-center mb-12 md:mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-4 md:mb-6 tracking-tight">
            Servicios <span className="text-blue-600">Académicos</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
            Seis maneras de impulsar tu investigación
          </p>
        </div>

        {/* Grid de Servicios */}
        <div className="w-full mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            
            {/* Servicios Regulares */}
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <a
                  key={service.id}
                  href={service.href}
                  className={`group transition-all duration-700 delay-${index * 100} ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <div className={`relative h-full bg-gradient-to-br ${service.color} rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-slate-200/50`}>
                    
                    {/* Icono */}
                    <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500 group-hover:scale-110 transition-all duration-300 shadow-md">
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>

                    {/* Contenido */}
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Flecha de acción */}
                    <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                      <span className="text-sm font-semibold mr-2">Explorar</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </a>
              );
            })}

            {/* Card Destacado: Formateo Rápido */}
            <a
              href="/formato-manuscrito"
              className={`group transition-all duration-700 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="relative h-full bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                
                {/* Patrón decorativo de fondo */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12" />
                </div>

                {/* Badge "Destacado" */}
                <div className="absolute top-4 right-4 bg-yellow-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  ⭐ Destacado
                </div>

                {/* Icono */}
                <div className="relative w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                  <Edit3 className="w-7 h-7 text-white" />
                </div>

                {/* Contenido */}
                <h3 className="relative text-2xl font-bold text-white mb-3">
                  Formateo Rápido
                </h3>
                <p className="relative text-sm text-blue-100 leading-relaxed mb-6">
                  ¿Quieres darle formato de forma rápida a tu manuscrito?
                </p>

                {/* Botón de Acción */}
                <button className="relative w-full bg-white text-blue-600 font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:bg-blue-50 hover:shadow-lg flex items-center justify-center group">
                  <span>Comenzar ahora</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </div>
            </a>

          </div>
        </div>

        {/* Frase motivacional minimalista */}
        <div className={`text-center transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <p className="text-slate-500 text-sm font-light">
            Descubre cómo podemos ayudarte a crear impacto
          </p>
        </div>

      </div>

      {/* Elementos decorativos minimalistas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full opacity-40" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-blue-500 rounded-full opacity-30" />
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-40" />
        <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-blue-500 rounded-full opacity-50" />
      </div>
    </div>
  );
};

export default MinimalistHero;