import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // 1. Importa useNavigate

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [showCaptcha] = useState(false);

  const navigate = useNavigate(); // 2. Inicializa useNavigate

  // Lista de dominios de correo temporales/bloqueados
  const blockedDomains = ['tempmail.com', 'mailinator.com', 'guerrillamail.com', '10minutemail.com'];
  
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

  // Función para validar el dominio del email
  const isValidDomain = (email) => {
    const domain = email.split('@')[1];
    return !blockedDomains.includes(domain);
  };

  // Función para verificar disponibilidad del email (ACTUALIZADA)
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));
    
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

  const validateForm = async () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    
    // Validación de email
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'El email no tiene un formato válido';
    } else if (!isValidDomain(formData.email)) {
      newErrors.email = 'El dominio de correo no está permitido';
    } else {
      // Verificar disponibilidad del email
      const isAvailable = await checkEmailAvailability(formData.email);
      if (!isAvailable) {
        newErrors.email = 'Este correo electrónico ya está registrado';
      }
    }

    // Validación de contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    } else if (formData.password.length > 12) {
      newErrors.password = 'La contraseña no puede exceder los 12 caracteres';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = 'La contraseña debe contener mayúsculas y minúsculas';
    } else if (!/(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'La contraseña debe contener al menos un número';
    } else if (!/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/.test(formData.password)) {
      newErrors.password = 'La contraseña debe contener al menos un carácter especial';
    } else {
      // Verificar si la contraseña contiene datos personales
      const lowerPassword = formData.password.toLowerCase();
      if (formData.firstName && lowerPassword.includes(formData.firstName.toLowerCase())) {
        newErrors.password = 'La contraseña no debe contener tu nombre';
      } else if (formData.lastName && lowerPassword.includes(formData.lastName.toLowerCase())) {
        newErrors.password = 'La contraseña no debe contener tu apellido';
      } else if (formData.email && lowerPassword.includes(formData.email.split('@')[0].toLowerCase())) {
        newErrors.password = 'La contraseña no debe contener tu email';
      } else {
        // Verificar si la contraseña ha sido comprometida
        const isBreached = await checkPasswordBreach(formData.password);
        if (isBreached) {
          newErrors.password = 'Esta contraseña ha sido comprometida en brechas de seguridad. Elige una diferente.';
        }
      }
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

  // Función handleSubmit ACTUALIZADA con redirección
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
        
        // 3. Redirigir al usuario a la página de login
        setTimeout(() => {
          navigate('/login-usuario');
        }, 2000); // Se espera 2 segundos para que el usuario pueda ver el mensaje de éxito

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
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
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
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
              className={inputStyle}
              placeholder="Mín. 8 caracteres, may, min, núm y especial"
              minLength={8}
              maxLength={12}
            />
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
            <div>
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
            </div>
            
            <div>
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
            </div>
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
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
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
      </motion.form>
    </div>
  );
};

export default UserRegistration;