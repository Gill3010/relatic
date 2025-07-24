import { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Monitor, 
  BookOpen, 
  Award, 
  Target, 
  Gift, 
  CreditCard, 
  FileText, 
  Phone,
  User,
  Sparkles,
  ArrowRight,
  Brain,
  Users
} from 'lucide-react';

const CourseCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div 
        className="relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-700 hover:scale-[1.02] hover:shadow-3xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: isHovered 
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
            : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #43e97b 100%)'
        }}
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-20">
          <div className={`absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-xl transform transition-all duration-1000 ${isHovered ? 'translate-x-96 translate-y-96' : 'translate-x-0 translate-y-0'}`}></div>
          <div className={`absolute top-1/2 right-0 w-24 h-24 bg-yellow-300 rounded-full blur-lg transform transition-all duration-1000 delay-200 ${isHovered ? '-translate-x-96 -translate-y-32' : 'translate-x-0 translate-y-0'}`}></div>
          <div className={`absolute bottom-0 left-1/3 w-20 h-20 bg-pink-300 rounded-full blur-lg transform transition-all duration-1000 delay-400 ${isHovered ? 'translate-x-64 -translate-y-64' : 'translate-x-0 translate-y-0'}`}></div>
        </div>

        <div className="relative z-10 p-8">
          {/* Header con iconos animados */}
          <div className="text-center mb-8 relative">
            <div className="flex justify-center items-center gap-4 mb-4">
              <div className={`p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 transform transition-all duration-500 ${isHovered ? 'rotate-12 scale-110' : 'rotate-0 scale-100'}`}>
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div className={`p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 transform transition-all duration-500 delay-100 ${isHovered ? '-rotate-12 scale-110' : 'rotate-0 scale-100'}`}>
                <Sparkles className="w-8 h-8 text-yellow-300" />
              </div>
              <div className={`p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 transform transition-all duration-500 delay-200 ${isHovered ? 'rotate-12 scale-110' : 'rotate-0 scale-100'}`}>
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight drop-shadow-lg">
              Curso Internacional
            </h1>
            <h2 className="text-xl md:text-2xl font-bold text-yellow-300 mb-4 drop-shadow-lg">
              Sistematización Teórico-Metodológica Asistida por IA
            </h2>
            <div className="flex items-center justify-center gap-2 text-white font-semibold bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
              <Users className="w-5 h-5 text-yellow-300" />
              <span className="text-base">En colaboración con RELATIC y el CESPE</span>
            </div>
          </div>

          {/* Información principal en cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Card de detalles básicos */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 border-2 border-yellow-400 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-blue-600" />
                Detalles del Curso
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-800">
                  <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="font-semibold text-base">22, 23 y 24 de julio</span>
                </div>
                <div className="flex items-center gap-3 text-gray-800">
                  <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="font-semibold text-base">6:00 p.m. (hora de Panamá)</span>
                </div>
                <div className="flex items-center gap-3 text-gray-800">
                  <Monitor className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="font-semibold text-base">Google Meet</span>
                </div>
                <div className="flex items-center gap-3 text-gray-800">
                  <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="font-semibold text-base">40 horas académicas</span>
                </div>
                <div className="flex items-center gap-3 text-gray-800">
                  <Award className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="font-semibold text-base">Diploma con 3 créditos</span>
                </div>
              </div>
            </div>

            {/* Card de costo y contacto */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 border-2 border-yellow-400 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-blue-600" />
                Inversión y Contacto
              </h3>
              <div className="space-y-4">
                <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl">
                  <div className="text-3xl font-black mb-1">B/.70.00</div>
                  <div className="text-blue-100 text-sm font-semibold">Inversión total</div>
                </div>
                <div className="flex items-center gap-3 text-gray-800">
                  <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="font-semibold text-base">(+507) 6645-7685</span>
                </div>
                <div className="pt-2">
                  <div className="flex items-center gap-2 text-gray-800 mb-2">
                    <User className="w-5 h-5 text-blue-600" />
                    <span className="font-bold text-base">Catedrático:</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <p className="text-gray-800 text-sm font-medium leading-relaxed">
                      <strong>Carlos Viltre Calderón</strong><br />
                      Dr. C Ciencias Pedagógicas<br />
                      Pos PhD en Investigación Emergente
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Objetivo */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 border-2 border-yellow-400 shadow-xl mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-blue-600" />
              Objetivo
            </h3>
            <p className="text-gray-800 text-base leading-relaxed font-medium">
              Explicar la nueva concepción de la sistematización teórico-metodológica y su implementación 
              mediante tecnologías e IA, optimizando el tiempo de investigación cualitativa.
            </p>
          </div>

          {/* Beneficios */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 border-2 border-yellow-400 shadow-xl mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Gift className="w-6 h-6 text-blue-600" />
              Beneficios Incluidos
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 text-gray-800 bg-gray-50 p-3 rounded-lg">
                <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0"></div>
                <span className="font-medium text-base">Material bibliográfico</span>
              </div>
              <div className="flex items-center gap-3 text-gray-800 bg-gray-50 p-3 rounded-lg">
                <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0"></div>
                <span className="font-medium text-base">Herramientas de investigación</span>
              </div>
              <div className="flex items-center gap-3 text-gray-800 bg-gray-50 p-3 rounded-lg">
                <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0"></div>
                <span className="font-medium text-base">Acceso a grupos de investigación</span>
              </div>
            </div>
          </div>

          {/* Botón de inscripción */}
          <div className="text-center">
            <a
              href="https://forms.gle/Hf4g6FnC1VjobzUU6"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                isHovered 
                  ? 'bg-white text-purple-600 hover:bg-yellow-300 hover:text-purple-700' 
                  : 'bg-yellow-300 text-blue-600 hover:bg-white hover:text-blue-700'
              }`}
            >
              <FileText className="w-6 h-6" />
              Inscribirse Ahora
              <ArrowRight className={`w-6 h-6 transition-transform duration-300 ${isHovered ? 'translate-x-1' : 'translate-x-0'}`} />
            </a>
            <p className="text-white/90 text-base mt-4 font-semibold bg-black/20 px-4 py-2 rounded-lg backdrop-blur-sm">
              ¡Cupos limitados! Asegura tu lugar hoy mismo
            </p>
          </div>
        </div>

        {/* Decoraciones adicionales */}
        <div className="absolute top-4 right-4">
          <div className={`w-3 h-3 bg-yellow-300 rounded-full animate-pulse ${isHovered ? 'animate-bounce' : ''}`}></div>
        </div>
        <div className="absolute bottom-4 left-4">
          <div className={`w-2 h-2 bg-white rounded-full animate-pulse delay-1000 ${isHovered ? 'animate-ping' : ''}`}></div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;