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
      className="w-full px-6 py-16 md:py-24 bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-400 text-white rounded-3xl shadow-xl"
      data-aos="zoom-in"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="bg-white/15 backdrop-blur-sm p-4 rounded-2xl">
              <FileText size={56} className="text-white" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Carteles Digitales
          </h2>
          
          <p className="text-2xl md:text-3xl mb-6 font-light text-blue-50">
            Presenta tus trabajos en formato digital
          </p>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl leading-relaxed text-blue-50/90 font-light">
              Expón y comparte tus investigaciones a través de carteles digitales accesibles y visuales.
            </p>
          </div>
        </div>

        {/* Key Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16" data-aos="fade-up" data-aos-delay="200">
          <div className="bg-white/15 backdrop-blur-lg p-6 rounded-2xl text-center border border-white/20 hover:bg-white/20 transition-all duration-300">
            <Palette size={40} className="text-pink-300 mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">Diseño Atractivo</h4>
            <p className="text-blue-50/80">Moderno y visualmente impactante</p>
          </div>
          
          <div className="bg-white/15 backdrop-blur-lg p-6 rounded-2xl text-center border border-white/20 hover:bg-white/20 transition-all duration-300">
            <Eye size={40} className="text-yellow-300 mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">Fácil Visualización</h4>
            <p className="text-blue-50/80">Accesible en línea desde cualquier dispositivo</p>
          </div>
          
          <div className="bg-white/15 backdrop-blur-lg p-6 rounded-2xl text-center border border-white/20 hover:bg-white/20 transition-all duration-300">
            <Globe size={40} className="text-green-300 mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">Difusión Académica</h4>
            <p className="text-blue-50/80">Exposición en eventos científicos</p>
          </div>
        </div>

        {/* Membership Benefits Section */}
        <div
          className="bg-white/12 backdrop-blur-lg p-8 md:p-10 rounded-3xl border border-white/20 shadow-2xl"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Múltiples beneficios de membresía
            </h3>
            <p className="text-xl text-blue-50/90 font-medium">con RELATIC PANAMÁ</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-5">
              <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl border border-white/10 hover:bg-white/15 transition-all duration-300">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                  <Award size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold">Carné de miembro</p>
                  <p className="text-blue-50/70 text-sm">Identificación oficial</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl border border-white/10 hover:bg-white/15 transition-all duration-300">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg">
                  <Users size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold">Apoyo para perfil científico</p>
                  <p className="text-blue-50/70 text-sm">En redes sociales</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl border border-white/10 hover:bg-white/15 transition-all duration-300">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg">
                  <Star size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold">Descuentos en eventos</p>
                  <p className="text-blue-50/70 text-sm">Todas las actividades</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl border border-white/10 hover:bg-white/15 transition-all duration-300">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
                  <BookOpen size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold">Asesorías especializadas</p>
                  <p className="text-blue-50/70 text-sm">Investigaciones y publicaciones</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-5">
              <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl border border-white/10 hover:bg-white/15 transition-all duration-300">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-2 rounded-lg">
                  <Award size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold">Certificados académicos</p>
                  <p className="text-blue-50/70 text-sm">En actividades educativas</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl border border-white/10 hover:bg-white/15 transition-all duration-300">
                <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-2 rounded-lg">
                  <FileText size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold">Facilidades de publicación</p>
                  <p className="text-blue-50/70 text-sm">En portales aliados</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl border border-white/10 hover:bg-white/15 transition-all duration-300">
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-2 rounded-lg">
                  <Mail size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold">Cartas de referencia</p>
                  <p className="text-blue-50/70 text-sm">Academia y profesionales</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl border border-white/10 hover:bg-white/15 transition-all duration-300">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-2 rounded-lg">
                  <DollarSign size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold">Incentivos económicos</p>
                  <p className="text-blue-50/70 text-sm">Por organizar actividades</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8" data-aos="fade-up" data-aos-delay="600">
          <a
            href="https://relaticpanama.org/_posters/"
            rel="noopener noreferrer"
            className="group px-10 py-4 rounded-2xl font-semibold text-white text-xl shadow-2xl transform hover:scale-105 transition-all duration-300
             bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700
             hover:from-purple-500 hover:via-blue-500 hover:to-indigo-600
             hover:shadow-purple-500/25 border border-white/20"
          >
            <span className="flex items-center space-x-3">
              <FileText size={24} />
              <span>Ir al portal de carteles</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </span>
          </a>
          
          <a
            href="/suscription"
            rel="noopener noreferrer"
            className="group px-10 py-4 rounded-2xl font-semibold text-white text-xl shadow-2xl transform hover:scale-105 transition-all duration-300
             bg-gradient-to-r from-lime-500 via-green-400 to-cyan-400
             hover:from-lime-400 hover:via-green-300 hover:to-cyan-300
             hover:shadow-green-500/25 border border-white/20"
          >
            <span className="flex items-center space-x-3">
              <span className="text-2xl">🚀</span>
              <span>¡AFÍLIATE YA!</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}