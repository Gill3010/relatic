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
            <Globe className="w-6 h-6 text-yellow-400" />
            <MousePointerClick className="w-5 h-5 text-white/70" />
          </div>
        </div>
        Dirígete al sitio web oficial:{" "}
        <a
          href="https://orcid.org/register"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-cyan-200 hover:text-cyan-300 transition"
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
          <FileText className="w-6 h-6 text-yellow-400" />
          <Edit className="w-5 h-5 text-white/70" />
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
          <KeyRound className="w-6 h-6 text-yellow-400" />
          <ShieldCheck className="w-5 h-5 text-white/70" />
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
          <Briefcase className="w-6 h-6 text-yellow-400" />
          <Building2 className="w-5 h-5 text-white/70" />
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
          <Eye className="w-6 h-6 text-yellow-400" />
          <Settings className="w-5 h-5 text-white/70" />
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
          <CheckCircle2 className="w-6 h-6 text-yellow-400" />
          <FileCheck className="w-5 h-5 text-white/70" />
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
          <MailCheck className="w-8 h-8 text-yellow-400" />
          <Inbox className="w-6 h-6 text-white/70" />
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
          <UserCheck className="w-8 h-8 text-yellow-400" />
          <ArrowLeft className="w-6 h-6 text-white/70" />
        </div>
        Tu ORCID ha sido creado. Guarda tu identificador ORCID personal. <br />
        <a
          href="/suscription"
          rel="noopener noreferrer"
          className="underline text-cyan-200 hover:text-cyan-300 transition"
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
    AOS.init({ once: false });

    const onScroll = () => AOS.refreshHard();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      data-aos="fade-up"
      data-aos-once="false"
      className="w-full max-w-3xl mx-auto p-10 rounded-2xl shadow-2xl border border-white/10 bg-[#00bcd4] text-white"
    >
      <h1 className="text-4xl font-extrabold text-center text-white mb-4 drop-shadow">
        Guía para Crear un ORCID
      </h1>
      <h2 className="text-lg text-center text-white/80 mb-10 font-medium">
        Sigue estos pasos para obtener tu identificador ORCID
      </h2>

      {/* Indicadores de progreso */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`flex-1 h-2 mx-1 rounded-full transition-all duration-300 ${
                index <= currentStep
                  ? "bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700"
                  : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Contenido del paso */}
        <div className="p-6 bg-white/10 border border-white/20 rounded-xl shadow-inner">
          <h3 className="text-2xl font-bold mb-4">{steps[currentStep].title}</h3>
          <div className="text-white/80 text-base leading-relaxed">
            {steps[currentStep].content}
          </div>
        </div>
      </div>

      {/* Botones de navegación */}
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className="px-6 py-2 rounded-xl font-semibold shadow-md transition-all duration-300 bg-white/10 border border-white/30 text-white disabled:opacity-50 hover:bg-white/20"
        >
          Anterior
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
          className="px-6 py-2 rounded-xl font-bold shadow-md text-white transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 hover:from-purple-500 hover:via-blue-500 hover:to-indigo-600 disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </motion.div>
  );
}
