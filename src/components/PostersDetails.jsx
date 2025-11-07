import { useEffect } from 'react';
import { FileText, Star, Users, BookOpen, Award, Mail, DollarSign, Eye, Palette, Globe } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function PostersDetails() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <div
      className="w-full px-6 py-16 md:py-24 bg-slate-800 text-white rounded-lg"
      data-aos="zoom-in"
    >
      <div className="max-w-6xl mx-auto">
        {/* Call to Action Buttons (moved to top) */}
        <div className="mb-16 flex flex-col md:flex-row items-center justify-center gap-8" data-aos="fade-up" data-aos-delay="200">
          <a
            href="https://relaticpanama.org/_posters/"
            rel="noopener noreferrer"
            className="group px-10 py-4 rounded-lg font-semibold text-white text-xl transform hover:scale-105 transition-all duration-300
             bg-blue-600 hover:bg-blue-700 border border-slate-200"
          >
            <span className="flex items-center space-x-3">
              <FileText size={24} />
              <span>Ir al portal de carteles</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </span>
          </a>
          
          {/* <a
            href="/suscription"
            rel="noopener noreferrer"
            className="group px-10 py-4 rounded-lg font-semibold text-white text-xl transform hover:scale-105 transition-all duration-300
             bg-blue-600 hover:bg-blue-700 border border-slate-200"
          >
            <span className="flex items-center space-x-3">
              <span className="text-2xl">🎓</span>
              <span>¡AFÍLIATE YA!</span>
            </span>
          </a> */}
        </div>

        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="bg-blue-600 p-4 rounded-lg">
              <FileText size={56} className="text-white" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Carteles Digitales
          </h2>
          
          <p className="text-2xl md:text-3xl mb-6 font-light text-slate-300">
            Presenta tus trabajos en formato digital
          </p>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl leading-relaxed text-slate-300 font-light">
              Expón y comparte tus investigaciones a través de carteles digitales accesibles y visuales.
            </p>
          </div>
        </div>

        {/* Key Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16" data-aos="fade-up" data-aos-delay="200">
          <div className="bg-white p-6 rounded-lg text-center border border-slate-200 hover:bg-slate-50 transition-all duration-300">
            <Palette size={40} className="text-blue-600 mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2 text-slate-700">Diseño Atractivo</h4>
            <p className="text-slate-500">Moderno y visualmente impactante</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg text-center border border-slate-200 hover:bg-slate-50 transition-all duration-300">
            <Eye size={40} className="text-blue-600 mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2 text-slate-700">Fácil Visualización</h4>
            <p className="text-slate-500">Accesible en línea desde cualquier dispositivo</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg text-center border border-slate-200 hover:bg-slate-50 transition-all duration-300">
            <Globe size={40} className="text-blue-600 mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2 text-slate-700">Difusión Académica</h4>
            <p className="text-slate-500">Exposición en eventos científicos</p>
          </div>
        </div>

        {/* Membership Benefits Section */}
        <div
          className="bg-white p-8 md:p-10 rounded-lg border border-slate-200"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-700 mb-4">
              Múltiples beneficios de membresía
            </h3>
            <p className="text-xl text-slate-500 font-medium">con RELATIC PANAMÁ</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-5">
              <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-white transition-all duration-300">
                <div className="bg-blue-600 p-2 rounded-md">
                  <Award size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-700">Carné de miembro</p>
                  <p className="text-slate-500 text-sm">Identificación oficial</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-white transition-all duration-300">
                <div className="bg-blue-600 p-2 rounded-md">
                  <Users size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-700">Apoyo para perfil científico</p>
                  <p className="text-slate-500 text-sm">En redes sociales</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-white transition-all duration-300">
                <div className="bg-blue-600 p-2 rounded-md">
                  <Star size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-700">Descuentos en eventos</p>
                  <p className="text-slate-500 text-sm">Todas las actividades</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-white transition-all duration-300">
                <div className="bg-blue-600 p-2 rounded-md">
                  <BookOpen size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-700">Asesorías especializadas</p>
                  <p className="text-slate-500 text-sm">Investigaciones y publicaciones</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-5">
              <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-white transition-all duration-300">
                <div className="bg-blue-600 p-2 rounded-md">
                  <Award size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-700">Certificados académicos</p>
                  <p className="text-slate-500 text-sm">En actividades educativas</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-white transition-all duration-300">
                <div className="bg-blue-600 p-2 rounded-md">
                  <FileText size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-700">Facilidades de publicación</p>
                  <p className="text-slate-500 text-sm">En portales aliados</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-white transition-all duration-300">
                <div className="bg-blue-600 p-2 rounded-md">
                  <Mail size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-700">Cartas de referencia</p>
                  <p className="text-slate-500 text-sm">Academia y profesionales</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-white transition-all duration-300">
                <div className="bg-blue-600 p-2 rounded-md">
                  <DollarSign size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-700">Incentivos económicos</p>
                  <p className="text-slate-500 text-sm">Por organizar actividades</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}