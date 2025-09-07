// En src/components/UserLogin.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";
  const inputStyle = "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors";
  const buttonStyle = "w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors";
  const linkStyle = "text-blue-600 hover:text-blue-500 text-sm font-medium";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: fieldValue }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'El email no tiene un formato válido';
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });
    
    try {
      const response = await fetch('https://relaticpanama.org/api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          rememberMe: formData.rememberMe,
          honeypot: ''
        }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setSubmitStatus({ type: 'success', message: data.message || '¡Inicio de sesión exitoso! Redirigiendo...' });
        
        const userRole = data.user?.role?.trim().toLowerCase(); // <-- CAMBIO CLAVE: todo a minúsculas
        
        // Asume un rol por defecto si no se recibe uno válido
        const roleToUse = (userRole === 'gestor' || userRole === 'admin') ? userRole : 'usuario';
        
        login(roleToUse); // <-- Se guarda el rol en minúsculas en el contexto
        
        setTimeout(() => {
          if (roleToUse === 'gestor' || roleToUse === 'admin') {
            navigate('/seleccionar-tarea');
          } else {
            navigate('/');
          }
        }, 1500);

      } else {
        setSubmitStatus({ type: 'error', message: data.message || 'Credenciales incorrectas. Inténtalo de nuevo.' });
        if (data.errors) {
          setErrors(data.errors);
        }
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      setSubmitStatus({ type: 'error', message: 'Error de conexión. Inténtalo de nuevo.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!resetEmail.trim()) {
      setErrors({ resetEmail: 'El email es obligatorio' });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(resetEmail)) {
      setErrors({ resetEmail: 'El email no tiene un formato válido' });
      return;
    }
    
    setIsResettingPassword(true);
    setErrors({});
    
    try {
      const response = await fetch('https://relaticpanama.org/api/reset-password.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail, honeypot: '' }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setSubmitStatus({ type: 'success', message: 'Se ha enviado un enlace de recuperación a tu correo electrónico.' });
        setShowPasswordReset(false);
        setResetEmail('');
      } else {
        setSubmitStatus({ type: 'error', message: data.message || 'Error al enviar el enlace de recuperación.' });
      }
    } catch (error) {
      console.error('Error en la recuperación de contraseña:', error);
      setSubmitStatus({ type: 'error', message: 'Error de conexión. Inténtalo de nuevo.' });
    } finally {
      setIsResettingPassword(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-6 bg-white p-8 rounded-xl shadow-lg"
      >
        {!showPasswordReset ? (
          <>
            <div>
              <h2 className="text-center text-3xl font-extrabold text-gray-900">
                Iniciar sesión
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Accede a tu cuenta para continuar
              </p>
            </div>

            <div className="space-y-6">
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
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Campo de Contraseña */}
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
                  placeholder="Tu contraseña"
                  autoComplete="current-password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Recordarme y Olvidé mi contraseña */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-900">
                    Recordarme
                  </label>
                </div>

                <button
                  type="button"
                  onClick={() => setShowPasswordReset(true)}
                  className={linkStyle}
                >
                  ¿Olvidaste tu contraseña?
                </button>
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

              {/* Botón de inicio de sesión */}
              <motion.button
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
                    Iniciando sesión...
                  </span>
                ) : 'Iniciar sesión'}
              </motion.button>
            </div>

            {/* Enlaces adicionales */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                ¿No tienes una cuenta?{' '}
                <a href="/registro-usuario" className={linkStyle}>
                  Regístrate aquí
                </a>
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Modal de recuperación de contraseña */}
            <div>
              <h2 className="text-center text-3xl font-extrabold text-gray-900">
                Recuperar contraseña
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Te enviaremos un enlace para restablecer tu contraseña
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="resetEmail" className={labelStyle}>
                  Email
                </label>
                <input
                  id="resetEmail"
                  name="resetEmail"
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className={inputStyle}
                  placeholder="correo@ejemplo.com"
                  autoComplete="email"
                />
                {errors.resetEmail && (
                  <p className="mt-1 text-sm text-red-600">{errors.resetEmail}</p>
                )}
              </div>

              {/* Honeypot para protección anti-bots */}
              <div className="hidden">
                <label htmlFor="honeypot2">Deja este campo en blanco</label>
                <input type="text" id="honeypot2" name="honeypot" />
              </div>

              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => {
                    setShowPasswordReset(false);
                    setResetEmail('');
                    setErrors({});
                    setSubmitStatus({ type: '', message: '' });
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                >
                  Cancelar
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handlePasswordReset}
                  disabled={isResettingPassword}
                  className={`flex-1 ${buttonStyle} ${isResettingPassword ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isResettingPassword ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </span>
                  ) : 'Enviar enlace'}
                </motion.button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default UserLogin;