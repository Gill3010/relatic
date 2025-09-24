import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  UserPlus,
  LogIn,
  Search,
  User,
  CheckCircle,
  Play,
  Pause
} from 'lucide-react';

const StepByStepGuide = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Variantes de animación
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.4 } }
  };

  const buttonVariants = {
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  };

  const steps = [
    {
      id: 1,
      title: "Paso 1: Ir a Registrarse",
      description: "Desde la página de inicio, haga clic en el botón rojo en la parte superior derecha que dice 'Registrarse'. Esto desplegará el formulario de registro.",
      image: "step1.png",
      icon: UserPlus,
      color: "red"
    },
    {
      id: 2,
      title: "Paso 2: Completar formulario de registro",
      description: "Ingrese nombre, apellido, correo electrónico y contraseña. Seleccione el tipo de usuario 'Miembro', acepte los términos y condiciones y haga clic en 'Registrarse'.",
      image: "step2.png",
      icon: UserPlus,
      color: "blue"
    },
    {
      id: 3,
      title: "Paso 3: Iniciar sesión",
      description: "El sistema redirige automáticamente al componente de inicio de sesión. Ingrese correo y contraseña y haga clic en 'Iniciar sesión'.",
      image: "step3.png",
      icon: LogIn,
      color: "green"
    },
    {
      id: 4,
      title: "Paso 4: Acceder a perfil",
      description: "Después de iniciar sesión, será redirigido a su perfil. Aparecerá una caja de texto para ingresar su número de cédula.",
      image: "step4.png",
      icon: User,
      color: "purple"
    },
    {
      id: 5,
      title: "Paso 5: Buscar documentos",
      description: "Si el número de cédula es incorrecto, haga clic en el icono de lápiz para editarlo. Luego haga clic en 'Buscar' y se mostrarán todos sus documentos (cartas, certificados o carnets).",
      image: "step4.png",
      icon: Search,
      color: "orange"
    }
  ];

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const goToStep = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Auto-play funcionalidad
  React.useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev === steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 4000);
      
      return () => clearInterval(interval);
    }
  }, [isPlaying, steps.length]);

  const getColorClasses = (color) => {
    const colorMap = {
      red: {
        bg: 'bg-red-600',
        bgLight: 'bg-red-100',
        text: 'text-red-600',
        hover: 'hover:bg-red-700'
      },
      blue: {
        bg: 'bg-blue-600',
        bgLight: 'bg-blue-100',
        text: 'text-blue-600',
        hover: 'hover:bg-blue-700'
      },
      green: {
        bg: 'bg-green-600',
        bgLight: 'bg-green-100',
        text: 'text-green-600',
        hover: 'hover:bg-green-700'
      },
      purple: {
        bg: 'bg-purple-600',
        bgLight: 'bg-purple-100',
        text: 'text-purple-600',
        hover: 'hover:bg-purple-700'
      },
      orange: {
        bg: 'bg-orange-600',
        bgLight: 'bg-orange-100',
        text: 'text-orange-600',
        hover: 'hover:bg-orange-700'
      }
    };
    
    return colorMap[color] || colorMap.blue;
  };

  const currentStepData = steps[currentStep];
  const colors = getColorClasses(currentStepData.color);

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="text-center mb-6 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4 px-2">
            Guía Paso a Paso
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Aprende cómo acceder a tus documentos siguiendo estos sencillos pasos
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8 shadow-sm mx-2 sm:mx-0"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-3 sm:space-y-0">
            <h2 className="text-lg font-semibold text-gray-900">Progreso</h2>
            <div className="flex items-center justify-between sm:justify-end space-x-2">
              <button
                onClick={toggleAutoPlay}
                className={`flex items-center px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                  isPlaying 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span className="hidden xs:inline">Pausar</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span className="hidden xs:inline">Auto</span>
                  </>
                )}
              </button>
              <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                {currentStep + 1} de {steps.length}
              </span>
            </div>
          </div>
          
          <div className="relative">
            <div className="flex items-center justify-between mb-2 px-2 sm:px-0">
              {steps.map((step, index) => {
                const stepColors = getColorClasses(step.color);
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                
                return (
                  <button
                    key={step.id}
                    onClick={() => goToStep(index)}
                    className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full text-xs sm:text-sm font-medium transition-all ${
                      isActive
                        ? `${stepColors.bg} text-white shadow-lg scale-110`
                        : isCompleted
                        ? 'bg-gray-400 text-white'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <step.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                );
              })}
            </div>
            
            {/* Progress Line */}
            <div className="absolute top-4 sm:top-5 left-6 sm:left-5 right-6 sm:right-5 h-0.5 bg-gray-200 -z-10">
              <motion.div
                className="h-full bg-gradient-to-r from-red-500 via-blue-500 via-green-500 via-purple-500 to-orange-500"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mx-2 sm:mx-0">
          {/* Header del paso */}
          <div className={`${colors.bg} px-4 sm:px-6 py-4`}>
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
                <currentStepData.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-xl font-bold text-white leading-tight">
                  {currentStepData.title}
                </h2>
              </div>
            </div>
          </div>

          {/* Contenido del paso */}
          <div className="p-4 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={cardVariants}
                className="text-center"
              >
                {/* Imagen del paso */}
                <div className="mb-6 sm:mb-8">
                  <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                    <img
                      src={`/assets/steps/${currentStepData.image}`}
                      alt={currentStepData.title}
                      className="w-full h-auto object-contain"
                      style={{ maxHeight: '250px' }}
                    />
                  </div>
                </div>

                {/* Descripción del paso */}
                <div className="max-w-3xl mx-auto px-2 sm:px-0">
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    {currentStepData.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="border-t border-gray-200 px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`flex items-center px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                  currentStep === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                <span className="hidden xs:inline">Anterior</span>
              </motion.button>

              <div className="flex items-center space-x-1 sm:space-x-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors ${
                      index === currentStep
                        ? colors.bg.replace('bg-', 'bg-')
                        : index < currentStep
                        ? 'bg-gray-400'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>

              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={nextStep}
                disabled={currentStep === steps.length - 1}
                className={`flex items-center px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                  currentStep === steps.length - 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : `${colors.bg} ${colors.hover} text-white`
                }`}
              >
                {currentStep === steps.length - 1 ? (
                  <>
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span className="hidden xs:inline">Completado</span>
                  </>
                ) : (
                  <>
                    <span className="hidden xs:inline">Siguiente</span>
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepByStepGuide;