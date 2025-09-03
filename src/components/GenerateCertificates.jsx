import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const GenerateCertificates = () => {
  const [formData, setFormData] = useState({
    nombre_estudiante: '',
    id_estudiante: '',
    nombre_curso: '',
    horas_academicas: '',
    creditos: '',
    fecha_inicio: '',
    fecha_fin: '',
    fecha_emision: ''
  });
  
  const [preview, setPreview] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const certificateRef = useRef(null);

  // ✅ Posiciones con fuentes responsivas
  const textPositions = {
    nombre_estudiante: { 
      top: '42%', 
      left: '50%', 
      transform: 'translateX(-50%)', 
      fontSize: 'clamp(1rem, 2.5vw, 2rem)', 
      fontWeight: 'bold', 
      color: '#1a365d' 
    },
    id_estudiante: { 
      top: '50%', 
      left: '50%', 
      transform: 'translateX(-50%)', 
      fontSize: 'clamp(0.8rem, 1.5vw, 1.1rem)', 
      color: '#4a5568' 
    },
    nombre_curso: { 
      top: '58%', 
      left: '50%', 
      transform: 'translateX(-50%)', 
      fontSize: 'clamp(1rem, 2vw, 1.4rem)', 
      fontWeight: '600', 
      color: '#2d3748' 
    },
    horas_creditos: { 
      top: '63%', 
      left: '50%', 
      transform: 'translateX(-50%)', 
      fontSize: 'clamp(0.8rem, 1.5vw, 1.1rem)', 
      color: '#4a5568' 
    },
    fecha_inicio_fin: { 
      top: '68%', 
      left: '50%', 
      transform: 'translateX(-50%)', 
      fontSize: 'clamp(0.7rem, 1.2vw, 1rem)', 
      color: '#4a5568' 
    },
    fecha_emision: { 
      top: '78%', 
      left: '50%', 
      transform: 'translateX(-50%)', 
      fontSize: 'clamp(0.6rem, 1vw, 0.9rem)', 
      color: '#718096' 
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    
    try {
      const response = await fetch('http://relaticpanama.org/api/generate_certificate.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus({ type: 'success', message: result.message });
        setPreview(true);
      } else {
        setSubmitStatus({ type: 'error', message: result.message });
      }
    } catch {
      setSubmitStatus({ type: 'error', message: 'Error de conexión' });
    }
  };

  const resetForm = () => {
    setFormData({
      nombre_estudiante: '',
      id_estudiante: '',
      nombre_curso: '',
      horas_academicas: '',
      creditos: '',
      fecha_inicio: '',
      fecha_fin: '',
      fecha_emision: ''
    });
    setPreview(false);
    setSubmitStatus(null);
  };

  const downloadPDF = () => {
  if (certificateRef.current) {
    html2canvas(certificateRef.current, {
      scale: 3, // mayor calidad
      useCORS: true
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      // PDF del mismo tamaño que el certificado
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`certificado_${formData.nombre_estudiante}.pdf`);
    });
  }
};


  return (
    <div className="min-h-screen bg-blue-50 py-6 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-slate-800 mb-8">
          Sistema de Generación de Certificados
        </h1>
        
        {submitStatus && (
          <div className={`mb-6 p-4 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-500 text-white'}`}>
            {submitStatus.message}
          </div>
        )}
        
        {!preview ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Inputs iguales que antes */}
              {[
                { label: 'Nombre completo', name: 'nombre_estudiante', type: 'text' },
                { label: 'Número de ID', name: 'id_estudiante', type: 'text' },
                { label: 'Nombre del Curso', name: 'nombre_curso', type: 'text' },
                { label: 'Horas Académicas', name: 'horas_academicas', type: 'number' },
                { label: 'Créditos', name: 'creditos', type: 'number' },
                { label: 'Fecha de Inicio', name: 'fecha_inicio', type: 'date' },
                { label: 'Fecha de Fin', name: 'fecha_fin', type: 'date' },
                { label: 'Fecha de Emisión', name: 'fecha_emision', type: 'date' }
              ].map((field, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
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
                Generar Certificado
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            {/* ✅ Contenedor flexible del certificado */}
            <div 
              ref={certificateRef} 
              className="relative mx-auto w-full max-w-4xl aspect-[4/3]"
            >
              <img 
                src="/assets/certificates/certificate.png" 
                alt="Plantilla de Certificado" 
                className="absolute inset-0 w-full h-full object-contain"
              />
              
              <div className="absolute w-full text-center" style={textPositions.nombre_estudiante}>
                {formData.nombre_estudiante}
              </div>

              <div className="absolute w-full text-center" style={textPositions.id_estudiante}>
                ID# {formData.id_estudiante}
              </div>

              <div className="absolute w-full px-[5%] text-center" style={textPositions.nombre_curso}>
                {formData.nombre_curso}
              </div>

              <div className="absolute w-full px-[8%] text-center" style={textPositions.horas_creditos}>
                con una duración total de {formData.horas_academicas} horas académicas, equivalente a {formData.creditos} créditos.
              </div>

              <div className="absolute w-full text-center" style={textPositions.fecha_inicio_fin}>
                {new Date(formData.fecha_inicio).toLocaleDateString()} - {new Date(formData.fecha_fin).toLocaleDateString()}
              </div>

              <div className="absolute w-full text-center" style={textPositions.fecha_emision}>
                Emitido el: {new Date(formData.fecha_emision).toLocaleDateString()}
              </div>
            </div>
            
            {/* ✅ Botones responsivos */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <button
                onClick={() => setPreview(false)}
                className="px-6 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition-colors duration-300"
              >
                Editar
              </button>
              
              <div className="flex flex-col sm:flex-row gap-4">
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
                  Crear Nuevo Certificado
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default GenerateCertificates;
