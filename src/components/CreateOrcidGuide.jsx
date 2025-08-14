import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { motion } from "framer-motion";
import {
  Globe,
  MousePointerClick,
  FileText,
  Edit,
  KeyRound,
  ShieldCheck,
  Briefcase,
  Building2,
  Eye,
  Settings,
  CheckCircle2,
  FileCheck,
  MailCheck,
  Inbox,
  UserCheck,
  ArrowLeft,
  BookOpen,
  
} from "lucide-react";

const steps = [
  {
    title: "Paso 1: Ir a orcid.org/register",
    content: (
      <>
        <div className="mb-4">
          <img
            src="/assets/Paso1.png"
            alt="Ir a orcid.org/register"
            className="w-full h-auto rounded-lg mb-2"
            loading="lazy"
          />
          <div className="flex items-center space-x-2">
            <Globe size={40} className="text-blue-600" />
            <MousePointerClick size={40} className="text-blue-600" />
          </div>
        </div>
        Dirígete al sitio web oficial:{" "}
        <a
          href="https://orcid.org/register"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-400 hover:text-blue-300 transition"
        >
          https://orcid.org/register
        </a>
      </>
    ),
  },
  {
    title: "Paso 2: Completa el formulario",
    content: (
      <>
        <img
          src="/assets/Paso2.jpeg"
          alt="Completar el formulario"
          className="w-full h-auto rounded-lg mb-2"
          loading="lazy"
        />
        <div className="flex items-center space-x-2 mb-2">
          <FileText size={40} className="text-blue-600" />
          <Edit size={40} className="text-blue-600" />
        </div>
        Ingresa tu nombre, correo electrónico y haz clic en &#39;Próximo paso&#39;.
      </>
    ),
  },
  {
    title: "Paso 3: Crea una contraseña",
    content: (
      <>
        <img
          src="/assets/Paso3.jpeg"
          alt="Crear una contraseña"
          className="w-full h-auto rounded-lg mb-2"
          loading="lazy"
        />
        <div className="flex items-center space-x-2 mb-2">
          <KeyRound size={40} className="text-blue-600" />
          <ShieldCheck size={40} className="text-blue-600" />
        </div>
        Crea una contraseña segura que cumpla con los requisitos, y haz clic en &#39;Próximo paso&#39;.
      </>
    ),
  },
  {
    title: "Paso 4: Agrega tu afiliación laboral actual",
    content: (
      <>
        <img
          src="/assets/Paso4.jpeg"
          alt="Afiliación laboral"
          className="w-full h-auto rounded-lg mb-2"
          loading="lazy"
        />
        <div className="flex items-center space-x-2 mb-2">
          <Briefcase size={40} className="text-blue-600" />
          <Building2 size={40} className="text-blue-600" />
        </div>
        Completa los campos de organización, departamento, cargo y fecha de inicio, y haz clic en &#39;Próximo paso&#39;.
      </>
    ),
  },
  {
    title: "Paso 5: Configura la visibilidad",
    content: (
      <>
        <img
          src="/assets/Paso5.jpeg"
          alt="Configurar visibilidad"
          className="w-full h-auto rounded-lg mb-2"
          loading="lazy"
        />
        <div className="flex items-center space-x-2 mb-2">
          <Eye size={40} className="text-blue-600" />
          <Settings size={40} className="text-blue-600" />
        </div>
        Selecciona si tu perfil será visible para todos, personas de confianza o solo tú, y haz clic en &#39;Próximo paso&#39;.
      </>
    ),
  },
  {
    title: "Paso 6: Acepta las condiciones de uso",
    content: (
      <>
        <img
          src="/assets/Paso6.jpeg"
          alt="Aceptar condiciones"
          className="w-full h-auto rounded-lg mb-2"
          loading="lazy"
        />
        <div className="flex items-center space-x-2 mb-2">
          <CheckCircle2 size={40} className="text-blue-600" />
          <FileCheck size={40} className="text-blue-600" />
        </div>
        Lee y acepta las condiciones de uso, luego haz clic en &#39;Completar registro&#39;.
      </>
    ),
  },
  {
    title: "Paso 7: Confirma tu correo",
    content: (
      <>
        <div className="flex items-center space-x-2 mb-4">
          <MailCheck size={40} className="text-blue-600" />
          <Inbox size={40} className="text-blue-600" />
        </div>
        Revisa tu correo electrónico y haz clic en el enlace de verificación.
      </>
    ),
  },
  {
    title: "Paso 8: ¡Listo!",
    content: (
      <>
        <div className="flex items-center space-x-2 mb-4">
          <UserCheck size={40} className="text-blue-600" />
          <ArrowLeft size={40} className="text-blue-600" />
        </div>
        Tu ORCID ha sido creado. Guarda tu identificador ORCID personal. <br />
        <a
          href="/suscription"
          rel="noopener noreferrer"
          className="underline text-blue-400 hover:text-blue-300 transition"
        >
          Regresar al formulario de suscripción
        </a>
      </>
    ),
  },
];

export default function CreateOrcidGuide() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="w-full px-6 py-16 md:py-24 bg-slate-800 text-white rounded-lg">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16" data-aos="zoom-in">
          <div className="flex justify-center mb-8">
            <div className="bg-blue-600 p-4 rounded-lg">
              <BookOpen size={56} className="text-white" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Guía para Crear un ORCID
          </h2>
          
          <p className="text-2xl md:text-3xl mb-6 font-light text-slate-300">
            Sigue estos pasos para obtener tu identificador ORCID
          </p>
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white p-8 md:p-10 rounded-lg border border-slate-200"
          data-aos="fade-up"
        >
          {/* Indicadores de progreso */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`flex-1 h-2 mx-1 rounded-full transition-all duration-300 ${
                    index <= currentStep
                      ? "bg-blue-600"
                      : "bg-slate-200 hover:bg-slate-300"
                  }`}
                />
              ))}
            </div>

            {/* Contenido del paso */}
            <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
              <h3 className="text-2xl font-semibold mb-4 text-slate-700">{steps[currentStep].title}</h3>
              <div className="text-slate-600 leading-relaxed">
                {steps[currentStep].content}
              </div>
            </div>
          </div>

          {/* Botones de navegación */}
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="group px-6 py-3 rounded-lg font-semibold text-white text-lg transform hover:scale-105 transition-all duration-300
               bg-slate-600 hover:bg-slate-700 border border-slate-200 disabled:opacity-50"
            >
              Anterior
            </button>
            <button
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
              className="group px-6 py-3 rounded-lg font-semibold text-white text-lg transform hover:scale-105 transition-all duration-300
               bg-blue-600 hover:bg-blue-700 border border-slate-200 disabled:opacity-50"
            >
              <span className="flex items-center space-x-2">
                <span>Siguiente</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </button>
          </div>
        </motion.div>

        {/* Call to Action */}
        <div className="mt-16 text-center" data-aos="fade-up" data-aos-delay="200">
          <a
            href="/suscription"
            rel="noopener noreferrer"
            className="group inline-block px-10 py-4 rounded-lg font-semibold text-white text-xl transform hover:scale-105 transition-all duration-300
             bg-blue-600 hover:bg-blue-700 border border-slate-200"
          >
            <span className="flex items-center space-x-3">
              <span className="text-2xl">🎓</span>
              <span>¡AFÍLIATE YA!</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}