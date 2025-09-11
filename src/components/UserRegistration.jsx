import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion'; 

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'member',
    firstName: '',
    lastName: '',
    acceptTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [emailSuggestion, setEmailSuggestion] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [showCaptcha] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    noPersonalData: false,
    notBreached: true
  });

  // Simulación de useNavigate - en tu app real usa: import { useNavigate } from 'react-router-dom';
  // Modificado para usar useNavigate de react-router-dom si se descomenta
  // import { useNavigate } from 'react-router-dom';
  // const navigate = useNavigate();
  const navigate = (path) => {
    console.log('Navegando a:', path);
    // En tu app real: navigate(path);
    window.location.href = path;
  };

  // Lista de dominios de correo temporales/bloqueados (mantenemos esta lista para seguridad)
  const blockedDomains = ['tempmail.com', 'mailinator.com', 'guerrillamail.com', '10minutemail.com', 'throwaway.email'];

  // Diccionario de errores tipográficos comunes y sus correcciones
  const commonTypos = {
    // Gmail errores
    'gnail.com': 'gmail.com',
    'gmai.com': 'gmail.com',
    'gmial.com': 'gmail.com',
    'gmail.con': 'gmail.com',
    'gmail.co': 'gmail.com',
    'gmaill.com': 'gmail.com',
    'gamil.com': 'gmail.com',
    'gmeil.com': 'gmail.com',
    
    // Hotmail errores
    'hotmial.com': 'hotmail.com',
    'hotmai.com': 'hotmail.com',
    'hotmail.con': 'hotmail.com',
    'hotmail.co': 'hotmail.com',
    'hotmil.com': 'hotmail.com',
    'hotmeil.com': 'hotmail.com',
    'htomail.com': 'hotmail.com',
    
    // Yahoo errores
    'yaho.com': 'yahoo.com',
    'yahoo.con': 'yahoo.com',
    'yahoo.co': 'yahoo.com',
    'yahooo.com': 'yahoo.com',
    'yhoo.com': 'yahoo.com',
    
    // Outlook errores
    'outlook.con': 'outlook.com',
    'outlook.co': 'outlook.com',
    'outlok.com': 'outlook.com',
    'outloook.com': 'outlook.com',
    
    // Errores genéricos de extensiones
    '.con': '.com',
    '.co': '.com',
    '.comm': '.com',
    '.om': '.com',
    '.ogr': '.org',
    '.or': '.org',
    '.orgg': '.org'
  };

  // Estilos reutilizables
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";
  const inputStyle = "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors";
  const buttonStyle = "w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors";

  // Función para capitalizar nombres
  const capitalizeName = (name) => {
    return name.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
  };

  // Función para verificar si una contraseña ha sido comprometida (usando Have I Been Pwned API)
  const checkPasswordBreach = async (password) => {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-1', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
      
      const prefix = hashHex.slice(0, 5);
      const suffix = hashHex.slice(5);
      
      const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
      const text = await response.text();
      
      return text.includes(suffix);
    } catch (error) {
      console.error('Error checking password breach:', error);
      return false;
    }
  };

  // Función para detectar y sugerir correcciones de errores tipográficos
  const detectTyposAndSuggest = (email) => {
    const domain = email.split('@')[1]?.toLowerCase();
    if (!domain) return null;

    // Verificar errores tipográficos exactos
    if (commonTypos[domain]) {
      return {
        hasTypo: true,
        suggestion: email.replace(domain, commonTypos[domain]),
        originalDomain: domain,
        correctedDomain: commonTypos[domain]
      };
    }

    // Verificar errores en la extensión solamente
    for (const typo in commonTypos) {
      if (typo.startsWith('.') && domain.endsWith(typo.substring(1))) {
        const correctedExtension = commonTypos[typo];
        const correctedDomain = domain.replace(new RegExp(typo.substring(1) + '$'), correctedExtension.substring(1));
        return {
          hasTypo: true,
          suggestion: email.replace(domain, correctedDomain),
          originalDomain: domain,
          correctedDomain: correctedDomain
        };
      }
    }

    return { hasTypo: false };
  };

  // Función para validar formato de email más robusta
  const isValidEmailFormat = (email) => {
    // Regex más completa para validar emails
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
  };

  // Función para verificar que el dominio no esté en la lista de bloqueados
  const isNotBlockedDomain = (email) => {
    const domain = email.split('@')[1]?.toLowerCase();
    return domain && !blockedDomains.includes(domain);
  };

  // Función para validar que el dominio tenga una estructura válida
  const hasValidDomainStructure = (email) => {
    const domain = email.split('@')[1];
    if (!domain) return false;
    
    // Verificar que el dominio tenga al menos un punto y una extensión válida
    const parts = domain.split('.');
    if (parts.length < 2) return false;
    
    // La extensión debe tener al menos 2 caracteres
    const extension = parts[parts.length - 1];
    return extension.length >= 2 && /^[a-zA-Z]+$/.test(extension);
  };

  // Función para verificar disponibilidad del email
  const checkEmailAvailability = async (email) => {
    try {
      const response = await fetch(`https://relaticpanama.org/api/check-email.php?email=${encodeURIComponent(email)}`);
      
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
      
      const data = await response.json();
      return data.available;
    } catch (error) {
      console.error('Error checking email availability:', error);
      return true;
    }
  };

  // Función para aceptar la sugerencia de corrección
  const acceptEmailSuggestion = () => {
    if (emailSuggestion?.suggestion) {
      setFormData(prev => ({
        ...prev,
        email: emailSuggestion.suggestion
      }));
      setEmailSuggestion(null);
      // Limpiar cualquier error de email
      if (errors.email) {
        setErrors(prev => ({
          ...prev,
          email: ''
        }));
      }
    }
  };

  // Función para validar contraseña en tiempo real
  const validatePasswordRequirements = useCallback(async (password) => {
    const validations = {
      length: password.length >= 8 && password.length <= 12,
      uppercase: /(?=.*[A-Z])/.test(password),
      lowercase: /(?=.*[a-z])/.test(password),
      number: /(?=.*\d)/.test(password),
      special: /(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/.test(password),
      noPersonalData: true,
      notBreached: true
    };

    // Verificar datos personales
    if (password.length > 0) {
      const lowerPassword = password.toLowerCase();
      if (formData.firstName && lowerPassword.includes(formData.firstName.toLowerCase())) {
        validations.noPersonalData = false;
      } else if (formData.lastName && lowerPassword.includes(formData.lastName.toLowerCase())) {
        validations.noPersonalData = false;
      } else if (formData.email && lowerPassword.includes(formData.email.split('@')[0].toLowerCase())) {
        validations.noPersonalData = false;
      }
    }

    // Verificar si la contraseña ha sido comprometida (solo si cumple otros requisitos)
    if (password.length >= 8 && validations.uppercase && validations.lowercase && validations.number && validations.special) {
      const isBreached = await checkPasswordBreach(password);
      validations.notBreached = !isBreached;
    }

    setPasswordValidations(validations);
  }, [formData.firstName, formData.lastName, formData.email]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));
    
    // Detectar errores tipográficos en el email en tiempo real
    if (name === 'email' && value.includes('@')) {
      const typoCheck = detectTyposAndSuggest(value);
      setEmailSuggestion(typoCheck?.hasTypo ? typoCheck : null);
    } else if (name === 'email') {
      setEmailSuggestion(null);
    }
    
    // Validar contraseña en tiempo real
    if (name === 'password') {
      validatePasswordRequirements(value);
    }
    
    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validación en tiempo real para nombres (capitalización automática)
  useEffect(() => {
    if (formData.firstName && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.firstName)) {
      setFormData(prev => ({
        ...prev,
        firstName: capitalizeName(formData.firstName)
      }));
    }
  }, [formData.firstName]);

  useEffect(() => {
    if (formData.lastName && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.lastName)) {
      setFormData(prev => ({
        ...prev,
        lastName: capitalizeName(formData.lastName)
      }));
    }
  }, [formData.lastName]);

  // Actualizar validaciones cuando cambien los datos personales
  useEffect(() => {
    if (formData.password) {
      validatePasswordRequirements(formData.password);
    }
  }, [formData.password, validatePasswordRequirements]);

  const validateForm = async () => {
    const newErrors = {};
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    
    // Validación de email mejorada y más flexible
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!isValidEmailFormat(formData.email)) {
      newErrors.email = 'El formato del email no es válido (ej. correo@ejemplo.com)';
    } else if (!hasValidDomainStructure(formData.email)) {
      newErrors.email = 'El dominio del email no tiene una estructura válida';
    } else if (!isNotBlockedDomain(formData.email)) {
      newErrors.email = 'No se permiten direcciones de correo temporal';
    } else {
      // Verificar errores tipográficos antes de continuar
      const typoCheck = detectTyposAndSuggest(formData.email);
      if (typoCheck?.hasTypo) {
        newErrors.email = `¿Quisiste decir ${typoCheck.suggestion}? Usa la sugerencia o corrige manualmente.`;
      } else {
        // Verificar disponibilidad del email solo si no hay errores tipográficos
        const isAvailable = await checkEmailAvailability(formData.email);
        if (!isAvailable) {
          newErrors.email = 'Este correo electrónico ya está registrado';
        }
      }
    }

    // Validación de contraseña usando las validaciones en tiempo real
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (!passwordValidations.length) {
      newErrors.password = 'La contraseña debe tener entre 8 y 12 caracteres';
    } else if (!passwordValidations.uppercase || !passwordValidations.lowercase) {
      newErrors.password = 'La contraseña debe contener mayúsculas y minúsculas';
    } else if (!passwordValidations.number) {
      newErrors.password = 'La contraseña debe contener al menos un número';
    } else if (!passwordValidations.special) {
      newErrors.password = 'La contraseña debe contener al menos un carácter especial';
    } else if (!passwordValidations.noPersonalData) {
      newErrors.password = 'La contraseña no debe contener datos personales';
    } else if (!passwordValidations.notBreached) {
      newErrors.password = 'Esta contraseña ha sido comprometida en brechas de seguridad. Elige una diferente.';
    }

    // Validación de confirmación de contraseña
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Debes confirmar tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    // Validación de nombre
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es obligatorio';
    } else if (formData.firstName.length > 50) {
      newErrors.firstName = 'El nombre no puede exceder los 50 caracteres';
    } else if (!nameRegex.test(formData.firstName)) {
      newErrors.firstName = 'El nombre no puede contener números ni caracteres especiales';
    }

    // Validación de apellido
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es obligatorio';
    } else if (formData.lastName.length > 50) {
      newErrors.lastName = 'El apellido no puede exceder los 50 caracteres';
    } else if (!nameRegex.test(formData.lastName)) {
      newErrors.lastName = 'El apellido no puede contener números ni caracteres especiales';
    }

    // Validación de términos y condiciones
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Debes aceptar los términos y condiciones';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Función handleSubmit con redirección
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!await validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });
    
    try {
      const response = await fetch('https://relaticpanama.org/api/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          role: formData.role,
          firstName: formData.firstName,
          lastName: formData.lastName,
          acceptTerms: formData.acceptTerms,
          honeypot: '' // Campo honeypot vacío
        }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setSubmitStatus({ 
          type: 'success', 
          message: data.message || '¡Registro exitoso! Redirigiendo a la página de inicio de sesión...' 
        });
        
        // Redirigir al usuario a la página de login
        setTimeout(() => {
          navigate('/login-usuario');
        }, 2000);

      } else {
        setSubmitStatus({ 
          type: 'error', 
          message: data.message || 'Error en el registro. Inténtalo de nuevo.' 
        });
        
        // Mostrar errores específicos si existen
        if (data.errors) {
          setErrors(data.errors);
        }
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: 'Error de conexión. Inténtalo de nuevo.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Función para manejar la redirección al login
  const handleLoginRedirect = () => {
    navigate('/login-usuario');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div // Aplicación de animaciones de entrada al contenedor principal
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-6 bg-white p-8 rounded-xl shadow-lg"
      >
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Crear una cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Regístrate según tu rol en el sistema
          </p>
        </div>

        {/* Campos de Nombre y Apellido */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className={labelStyle}>
              Nombre
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              className={inputStyle}
              placeholder="Tu nombre"
              maxLength={50}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className={labelStyle}>
              Apellido
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              className={inputStyle}
              placeholder="Tu apellido"
              maxLength={50}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Campo de Email */}
        <div>
          <label htmlFor="email" className={labelStyle}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={inputStyle}
            placeholder="correo@ejemplo.com"
          />
          
          {/* Sugerencia de corrección de errores tipográficos */}
          {emailSuggestion?.hasTypo && (
            <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm text-yellow-800">
                    ¿Quisiste decir <strong>{emailSuggestion.suggestion}</strong>?
                  </p>
                  <motion.button // Animación para el botón de sugerencia
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={acceptEmailSuggestion}
                    className="mt-1 text-sm text-yellow-800 underline hover:text-yellow-900 focus:outline-none"
                  >
                    Usar sugerencia
                  </motion.button>
                </div>
              </div>
            </div>
          )}
          
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Acepta cualquier dominio válido (académico, institucional, personal)
          </p>
        </div>

        {/* Campos de Contraseña */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="password" className={labelStyle}>
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setPasswordFocused(true)}
              className={inputStyle}
              placeholder="Tu contraseña"
              minLength={8}
              maxLength={12}
            />
            
            {/* Indicador sutil inicial */}
            {!passwordFocused && !formData.password && (
              <p className="mt-1 text-xs text-gray-400">
                La contraseña debe cumplir ciertos requisitos de seguridad
              </p>
            )}
            
            {/* Lista de validaciones */}
            {(passwordFocused || formData.password) && (
              <div className="mt-2">
                <ul className="text-xs space-y-1">
                  <li className={`flex items-center ${passwordValidations.length ? 'text-green-600' : 'text-gray-500'}`}>
                    <span className="mr-2">{passwordValidations.length ? '✓' : '•'}</span>
                    Entre 8 y 12 caracteres
                  </li>
                  <li className={`flex items-center ${passwordValidations.uppercase ? 'text-green-600' : 'text-gray-500'}`}>
                    <span className="mr-2">{passwordValidations.uppercase ? '✓' : '•'}</span>
                    Al menos una mayúscula
                  </li>
                  <li className={`flex items-center ${passwordValidations.lowercase ? 'text-green-600' : 'text-gray-500'}`}>
                    <span className="mr-2">{passwordValidations.lowercase ? '✓' : '•'}</span>
                    Al menos una minúscula
                  </li>
                  <li className={`flex items-center ${passwordValidations.number ? 'text-green-600' : 'text-gray-500'}`}>
                    <span className="mr-2">{passwordValidations.number ? '✓' : '•'}</span>
                    Al menos un número
                  </li>
                  <li className={`flex items-center ${passwordValidations.special ? 'text-green-600' : 'text-gray-500'}`}>
                    <span className="mr-2">{passwordValidations.special ? '✓' : '•'}</span>
                    Al menos un carácter especial
                  </li>
                  <li className={`flex items-center ${passwordValidations.noPersonalData ? 'text-green-600' : 'text-red-500'}`}>
                    <span className="mr-2">{passwordValidations.noPersonalData ? '✓' : '✗'}</span>
                    Sin datos personales
                  </li>
                  {formData.password.length >= 8 && passwordValidations.uppercase && passwordValidations.lowercase && passwordValidations.number && passwordValidations.special && (
                    <li className={`flex items-center ${passwordValidations.notBreached ? 'text-green-600' : 'text-red-500'}`}>
                      <span className="mr-2">{passwordValidations.notBreached ? '✓' : '✗'}</span>
                      {passwordValidations.notBreached ? 'Contraseña segura' : 'Contraseña comprometida'}
                    </li>
                  )}
                </ul>
              </div>
            )}
            
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className={labelStyle}>
              Confirmar contraseña
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={inputStyle}
              placeholder="Repite tu contraseña"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        {/* Selección de Rol */}
        <div>
          <label className={labelStyle}>
            Tipo de usuario
          </label>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}> {/* Animación para la opción "Miembro" */}
              <input
                id="role-member"
                name="role"
                type="radio"
                value="member"
                checked={formData.role === 'member'}
                onChange={handleChange}
                className="hidden peer"
              />
              <label 
                htmlFor="role-member" 
                className="flex flex-col p-4 border border-gray-300 rounded-md cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-colors"
              >
                <span className="font-medium">Miembro</span>
              </label>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}> {/* Animación para la opción "Gestor" */}
              <input
                id="role-gestor"
                name="role"
                type="radio"
                value="gestor"
                checked={formData.role === 'gestor'}
                onChange={handleChange}
                className="hidden peer"
              />
              <label 
                htmlFor="role-gestor" 
                className="flex flex-col p-4 border border-gray-300 rounded-md cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-colors"
              >
                <span className="font-medium">Gestor</span>
              </label>
            </motion.div>
          </div>
        </div>

        {/* Términos y condiciones */}
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="acceptTerms"
              name="acceptTerms"
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={handleChange}
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="acceptTerms" className="font-medium text-gray-700">
              Acepto los <a href="/terminos-condiciones" className="text-blue-600 hover:text-blue-500">términos y condiciones</a> y la <a href="/terminos-condiciones" className="text-blue-600 hover:text-blue-500">política de privacidad</a> de Relatic Panamá
            </label>
            {errors.acceptTerms && (
              <p className="mt-1 text-sm text-red-600">{errors.acceptTerms}</p>
            )}
          </div>
        </div>

        {/* Honeypot para protección anti-bots */}
        <div className="hidden">
          <label htmlFor="honeypot">Deja este campo en blanco</label>
          <input type="text" id="honeypot" name="honeypot" />
        </div>

        {/* Mensajes de estado */}
        {submitStatus.message && (
          <div className={`rounded-md p-4 ${
            submitStatus.type === 'success' 
              ? 'bg-green-50 text-green-800' 
              : 'bg-red-50 text-red-800'
          }`}>
            <p className="text-sm text-center">{submitStatus.message}</p>
          </div>
        )}

        {/* Botón de envío */}
        <motion.button // Animación para el botón de envío
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`${buttonStyle} ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Procesando...
            </span>
          ) : 'Registrarse'}
        </motion.button>

        {/* En una implementación real, aquí iría el componente de CAPTCHA */}
        {showCaptcha && (
          <div className="text-center text-sm text-gray-500">
            <p>Verificación de seguridad requerida</p>
          </div>
        )}
        
        {/* Nueva sección para el enlace de inicio de sesión */}
        <div className="mt-4 text-center text-sm">
          ¿Ya tienes una cuenta?{' '}
          <a
            href="/login-usuario"
            onClick={(e) => {
              e.preventDefault();
              handleLoginRedirect();
            }}
            className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
          >
            Inicia sesión aquí
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default UserRegistration;