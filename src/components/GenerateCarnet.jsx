import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const GenerateCarnet = () => {
  const [formData, setFormData] = useState({
    nombre_completo: '',
    cedula_dni: '',
    cargo_rol: '',
    departamento: '',
    fecha_ingreso: '',
    fecha_vencimiento: '',
    foto: null,
    fotoPreview: ''
  });
  
  const [preview, setPreview] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const carnetRef = useRef(null);

  // Coordenadas y estilos para cada campo en el carnet
  const textPositions = {
    nombre_completo: { 
      top: '55%', 
      left: '50%', 
      transform: 'translateX(-50%)', 
      fontSize: '20px', 
      fontWeight: 'bold', 
      color: '#1a365d',
      textAlign: 'center'
    },
    cedula_dni: { 
      top: '60%', 
      left: '50%', 
      transform: 'translateX(-50%)', 
      fontSize: '16px', 
      color: '#4a5568',
      textAlign: 'center'
    },
    cargo_rol: { 
      top: '65%', 
      left: '50%', 
      transform: 'translateX(-50%)', 
      fontSize: '16px', 
      color: '#4a5568',
      textAlign: 'center'
    },
    departamento: { 
      top: '70%', 
      left: '50%', 
      transform: 'translateX(-50%)', 
      fontSize: '16px', 
      color: '#4a5568',
      textAlign: 'center'
    },
    fecha_ingreso: { 
      top: '75%', 
      left: '30%', 
      fontSize: '12px', 
      color: '#718096'
    },
    fecha_vencimiento: { 
      top: '75%', 
      left: '70%', 
      fontSize: '12px', 
      color: '#718096'
    }
  };

  const fotoPosition = {
    top: '30%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid white',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          foto: file,
          fotoPreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitStatus(null);
  
  // Validación básica
  if (!formData.nombre_completo || !formData.cedula_dni || !formData.foto) {
    setSubmitStatus({ type: 'error', message: 'Por favor complete todos los campos obligatorios' });
    return;
  }
  
  try {
    const formDataToSend = new FormData();
    formDataToSend.append('nombre_completo', formData.nombre_completo);
    formDataToSend.append('cedula_dni', formData.cedula_dni);
    formDataToSend.append('cargo_rol', formData.cargo_rol);
    formDataToSend.append('departamento', formData.departamento);
    formDataToSend.append('fecha_ingreso', formData.fecha_ingreso);
    formDataToSend.append('fecha_vencimiento', formData.fecha_vencimiento);
    formDataToSend.append('foto', formData.foto); // Archivo directamente
    
    const response = await fetch('http://relaticpanama.org/api/generate_carne.php', {
      method: 'POST',
      body: formDataToSend,
      // No incluir Content-Type header cuando se usa FormData, 
      // el navegador lo establecerá automáticamente con el boundary
    });
    
    const result = await response.json();
    
    if (result.success) {
      setSubmitStatus({ type: 'success', message: result.message });
      setPreview(true);
    } else {
      setSubmitStatus({ type: 'error', message: result.message });
    }
  } catch (error) {
    console.error('Error:', error);
    setSubmitStatus({ type: 'error', message: 'Error de conexión: ' + error.message });
  }
};

  const resetForm = () => {
    setFormData({
      nombre_completo: '',
      cedula_dni: '',
      cargo_rol: '',
      departamento: '',
      fecha_ingreso: '',
      fecha_vencimiento: '',
      foto: null,
      fotoPreview: ''
    });
    setPreview(false);
    setSubmitStatus(null);
  };

  const downloadPDF = () => {
    const input = carnetRef.current;
    
    html2canvas(input, {
      scale: 3,
      useCORS: true,
      logging: false,
      backgroundColor: null
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [85, 54] // Tamaño estándar de carnet
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = (pdfHeight - imgHeight * ratio) / 2;
      
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`carnet-${formData.nombre_completo}.pdf`);
    });
  };

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6"
      >
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-8">
          Sistema de Generación de Carnets
        </h1>
        
        {submitStatus && (
          <div className={`mb-6 p-4 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-500 text-white'}`}>
            {submitStatus.message}
          </div>
        )}
        
        {!preview ? (
          <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  name="nombre_completo"
                  value={formData.nombre_completo}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Cédula o DNI *
                </label>
                <input
                  type="text"
                  name="cedula_dni"
                  value={formData.cedula_dni}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Cargo o Rol
                </label>
                <input
                  type="text"
                  name="cargo_rol"
                  value={formData.cargo_rol}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Departamento
                </label>
                <input
                  type="text"
                  name="departamento"
                  value={formData.departamento}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Fecha de Ingreso
                </label>
                <input
                  type="date"
                  name="fecha_ingreso"
                  value={formData.fecha_ingreso}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Fecha de Vencimiento
                </label>
                <input
                  type="date"
                  name="fecha_vencimiento"
                  value={formData.fecha_vencimiento}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Foto *
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <div className="flex text-sm text-slate-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <span>Subir archivo</span>
                        <input 
                          id="foto" 
                          name="foto" 
                          type="file" 
                          className="sr-only" 
                          onChange={handleFileChange}
                          accept="image/*"
                          required
                        />
                      </label>
                      <p className="pl-1">o arrastrar y soltar</p>
                    </div>
                    <p className="text-xs text-slate-500">
                      PNG, JPG, GIF hasta 10MB
                    </p>
                  </div>
                </div>
                {formData.fotoPreview && (
                  <div className="mt-4 flex justify-center">
                    <img 
                      src={formData.fotoPreview} 
                      alt="Vista previa" 
                      className="h-32 w-32 object-cover rounded-full border-2 border-slate-300"
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition-colors duration-300"
              >
                Limpiar
              </button>
              
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Generar Carnet
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div 
              ref={carnetRef} 
              className="relative mx-auto"
              style={{ width: '340px', height: '216px' }}
            >
              <img 
                src="/assets/carnets/carnet.png" 
                alt="Plantilla de Carnet" 
                className="absolute inset-0 w-full h-full object-contain"
              />
              
              {formData.fotoPreview && (
                <img 
                  src={formData.fotoPreview} 
                  alt="Foto" 
                  className="absolute"
                  style={fotoPosition}
                />
              )}
              
              <div className="absolute" style={textPositions.nombre_completo}>
                {formData.nombre_completo}
              </div>
              
              <div className="absolute" style={textPositions.cedula_dni}>
                ID: {formData.cedula_dni}
              </div>
              
              <div className="absolute" style={textPositions.cargo_rol}>
                {formData.cargo_rol}
              </div>
              
              <div className="absolute" style={textPositions.departamento}>
                {formData.departamento}
              </div>
              
              {formData.fecha_ingreso && (
                <div className="absolute" style={textPositions.fecha_ingreso}>
                  Ingreso: {new Date(formData.fecha_ingreso).toLocaleDateString()}
                </div>
              )}
              
              {formData.fecha_vencimiento && (
                <div className="absolute" style={textPositions.fecha_vencimiento}>
                  Vence: {new Date(formData.fecha_vencimiento).toLocaleDateString()}
                </div>
              )}
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={() => setPreview(false)}
                className="px-6 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition-colors duration-300"
              >
                Editar
              </button>
              
              <div className="space-x-4">
                <button
                  onClick={downloadPDF}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
                >
                  Descargar PDF
                </button>
                
                <button
                  onClick={resetForm}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  Crear Nuevo Carnet
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default GenerateCarnet;