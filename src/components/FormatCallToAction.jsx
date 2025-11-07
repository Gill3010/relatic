import React, { useState, useEffect } from 'react';
import { FileText, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';

const FormatCallToAction = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const componentRef = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Se activa cada vez que el componente entra en el viewport
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            // Se desactiva cuando sale del viewport para que se reactive al volver
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.1, // Se activa cuando el 10% del componente es visible
        rootMargin: '0px 0px -50px 0px' // Margen inferior para activar antes
      }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, []);

  const handleNavigate = () => {
    // Navegación a la ruta del formateador
    window.location.href = '/formato-manuscrito';
    
    // Para integrar con React Router (recomendado), usa:
    // import { useNavigate } from 'react-router-dom';
    // const navigate = useNavigate();
    // navigate('/formato-manuscrito');
  };

  const scrollToSection = () => {
    const element = document.getElementById('como-funciona');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      ref={componentRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
    >
      <div className="bg-white text-slate-700 rounded-2xl shadow-md hover:shadow-xl p-8 md:p-10 max-w-4xl mx-auto text-center my-10 border border-slate-200 transition-all duration-500"
        style={{
          animation: isVisible ? 'fadeUpIn 0.8s ease-out forwards' : 'none'
        }}
      >
        
        {/* Icono animado */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-75"></div>
            <div className="relative bg-blue-600 p-4 rounded-full shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* Título principal */}
        <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-3 leading-tight">
          ¿Quieres saber a qué revista postular según las instrucciones del autor?
        </h2>
        
        {/* Subtítulo */}
        <p className="text-slate-600 text-base md:text-lg mb-2 max-w-2xl mx-auto leading-relaxed">
          Dale formato profesional a tu artículo o manuscrito automáticamente
        </p>

        {/* Beneficios */}
        <div className="flex flex-wrap justify-center gap-4 mb-8 mt-6">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Formato automático</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Ahorra tiempo</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>100% profesional</span>
          </div>
        </div>

        {/* Botón principal */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleNavigate}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 overflow-hidden"
          >
            {/* Efecto de brillo */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <Sparkles className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'rotate-12 scale-110' : ''}`} />
            <span>Formatear mi manuscrito</span>
            <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
          </button>

          {/* Botón secundario */}
          <button
            onClick={scrollToSection}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-300 underline decoration-blue-300 hover:decoration-blue-500 underline-offset-4"
          >
            ¿Cómo funciona?
          </button>
        </div>

        {/* Información adicional */}
        <p className="text-xs text-slate-500 mt-6 italic">
          Soporta archivos .docx • Procesamiento rápido y seguro
        </p>
      </div>

      {/* Sección "Cómo funciona" */}
      <div id="como-funciona" className="max-w-4xl mx-auto mt-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              number: '1',
              title: 'Sube tus archivos',
              description: 'Carga las instrucciones de la revista y tu manuscrito en formato Word'
            },
            {
              number: '2',
              title: 'Procesamiento automático',
              description: 'El sistema analiza y aplica el formato correcto a tu documento'
            },
            {
              number: '3',
              title: 'Descarga y envía',
              description: 'Obtén tu manuscrito formateado listo para enviar a la revista'
            }
          ].map((step, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 text-center"
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.15}s forwards`,
                opacity: 0
              }}
            >
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold text-slate-700 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeUpIn {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        .animate-ping {
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default FormatCallToAction;