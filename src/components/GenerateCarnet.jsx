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
    tipo_membresia: 'MIEMBRO INVESTIGADOR',
    numero_expediente: '',
    fecha_admision: '',
    orcid: '',
    foto: null,
    fotoPreview: ''
  });
  const [preview, setPreview] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const carnetRef = useRef(null);

  // ─────────────────────────────────────────────────────────
  // POSICIONES AJUSTADAS AL DISEÑO DE REFERENCIA (MUESTRA.JPEG)
  // SIN ELIMINAR CAMPOS DEL CÓDIGO FUENTE
  // ─────────────────────────────────────────────────────────
  const textShadow = '0 1px 2px rgba(0,0,0,.45)';

  const textPositions = {
    tipo_membresia: {
      top: '40%',
      left: '50%',
      transform: 'translateX(-50%)',
      fontSize: 'clamp(12px, 2.5vw, 20px)',
      fontWeight: '700',
      color: '#ffffff',
      textAlign: 'center',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '90%',
      textShadow,
      letterSpacing: '0.5px'
    },
    nombre_completo: {
      top: '64%',
      left: '20%',
      fontSize: 'clamp(14px, 3.5vw, 24px)',
      fontWeight: '700',
      color: '#ffffff',
      textAlign: 'left',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '60%',
      textShadow
    },
    numero_expediente: {
      top: '78%',
      left: '20%',
      fontSize: 'clamp(9px, 1.5vw, 13px)',
      color: '#e2e8f0',
      textAlign: 'left',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '80%',
      textShadow
    },
    fecha_admision: {
      top: '84%',
      left: '20%',
      fontSize: 'clamp(9px, 1.5vw, 13px)',
      color: '#e2e8f0',
      textAlign: 'left',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '80%',
      textShadow
    },
    orcid: {
      top: '90%',
      left: '20%',
      fontSize: 'clamp(7px, 1.1vw, 10px)',
      color: '#cbd5e0',
      textAlign: 'left',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '80%',
      textShadow
    },
    // Campos que no se muestran, se mueven fuera del carnet
    cedula_dni: { top: '-100px', left: '-100px', fontSize: '0px' },
    cargo_rol: { top: '-100px', left: '-100px', fontSize: '0px' },
    departamento: { top: '-100px', left: '-100px', fontSize: '0px' },
    fecha_ingreso: { top: '-100px', left: '-100px', fontSize: '0px' },
    fecha_vencimiento: { top: '-100px', left: '-100px', fontSize: '0px' }
  };

  const fechaGeneracion = {
    top: '90%',
    right: '5%',
    left: 'auto',
    transform: 'none',
    fontSize: 'clamp(5px, 0.8vw, 8px)',
    color: '#a0aec0',
    textAlign: 'right',
    whiteSpace: 'normal',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '30%',
    textShadow: '0 1px 1px rgba(0,0,0,.3)'
  };


  const fotoPosition = {
    top: '18%',
    left: '79%',
    transform: 'translateX(-50%)',
    width: 'clamp(60px, 20%, 90px)',
    height: 'clamp(60px, 20%, 90px)',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #ffffff',
    boxShadow: '0 3px 6px rgba(0,0,0,.3)'
  };

  // ─────────────────────────────────────────────────────────
  // Handlers (con el fix de ESLint en formatDate)
  // ─────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, foto: file, fotoPreview: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
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
      formDataToSend.append('tipo_membresia', formData.tipo_membresia);
      formDataToSend.append('numero_expediente', formData.numero_expediente);
      formDataToSend.append('fecha_admision', formData.fecha_admision);
      formDataToSend.append('orcid', formData.orcid);
      formDataToSend.append('foto', formData.foto);

      const response = await fetch('http://relaticpanama.org/api/generate_carne.php', {
        method: 'POST',
        body: formDataToSend
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
      tipo_membresia: 'MIEMBRO INVESTIGADOR',
      numero_expediente: '',
      fecha_admision: '',
      orcid: '',
      foto: null,
      fotoPreview: ''
    });
    setPreview(false);
    setSubmitStatus(null);
  };

  const downloadPDF = () => {
    const input = carnetRef.current;
    html2canvas(input, { scale: 3, useCORS: true, logging: false, backgroundColor: null }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [85, 54]
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

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    // Solución al error de ESLint: se remueve la variable options
    return `${date.toLocaleDateString('es-ES', { month: 'long' })}/${date.getFullYear()}`;
  };

  // ─────────────────────────────────────────────────────────
  // UI (estructura del formulario y renderizado)
  // ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6" >
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-8"> Sistema de Generación de Carnets </h1>
        {submitStatus && (
          <div className={`mb-6 p-4 rounded-lg ${submitStatus.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-500 text-white'}`}>
            {submitStatus.message}
          </div>
        )}
        {!preview ? (
          <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1"> Nombre completo * </label>
                <input type="text" name="nombre_completo" value={formData.nombre_completo} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1"> Cédula o DNI * </label>
                <input type="text" name="cedula_dni" value={formData.cedula_dni} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1"> Cargo o Rol </label>
                <input type="text" name="cargo_rol" value={formData.cargo_rol} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1"> Departamento </label>
                <input type="text" name="departamento" value={formData.departamento} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1"> Tipo de Membresía </label>
                <select name="tipo_membresia" value={formData.tipo_membresia} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors" >
                  <option value="MIEMBRO INVESTIGADOR">Miembro Investigador</option>
                  <option value="MIEMBRO ASOCIADO">Miembro Asociado</option>
                  <option value="MIEMBRO HONORARIO">Miembro Honorario</option>
                  <option value="MIEMBRO ESTUDIANTIL">Miembro Estudiantil</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1"> Número de Expediente </label>
                <input type="text" name="numero_expediente" value={formData.numero_expediente} onChange={handleChange} placeholder="Ej: 2025-ABC-1" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1"> Fecha de Admisión </label>
                <input type="date" name="fecha_admision" value={formData.fecha_admision} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1"> ORCID </label>
                <input type="text" name="orcid" value={formData.orcid} onChange={handleChange} placeholder="0000-0000-0000-0000" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1"> Fecha de Ingreso </label>
                <input type="date" name="fecha_ingreso" value={formData.fecha_ingreso} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1"> Fecha de Vencimiento </label>
                <input type="date" name="fecha_vencimiento" value={formData.fecha_vencimiento} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1"> Foto * </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <div className="flex text-sm text-slate-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <span>Subir archivo</span>
                        <input id="foto" name="foto" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" required />
                      </label>
                      <p className="pl-1">o arrastrar y soltar</p>
                    </div>
                    <p className="text-xs text-slate-500"> PNG, JPG, GIF hasta 10MB </p>
                  </div>
                </div>
                {formData.fotoPreview && (
                  <div className="mt-4 flex justify-center">
                    <img src={formData.fotoPreview} alt="Vista previa" className="h-32 w-32 object-cover rounded-full border-2 border-slate-300" />
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between pt-4">
              <button type="button" onClick={resetForm} className="px-6 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition-colors duration-300" >
                Limpiar
              </button>
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300" >
                Generar Carnet
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div ref={carnetRef} className="relative mx-auto overflow-hidden" style={{ width: '100%', maxWidth: '340px', aspectRatio: '85 / 54' }} >
              <img src="/assets/carnets/carnet.png" alt="Plantilla de Carnet" className="absolute inset-0 w-full h-full object-cover" />
              {formData.fotoPreview && (
                <img src={formData.fotoPreview} alt="Foto" className="absolute" style={fotoPosition} />
              )}
              <div className="absolute" style={textPositions.tipo_membresia}>
                {formData.tipo_membresia}
              </div>
              <div className="absolute" style={textPositions.nombre_completo}>
                {formData.nombre_completo}
              </div>

              {/* Todos los campos se renderizan, pero algunos se mueven fuera de la vista */}
              <div className="absolute" style={textPositions.cedula_dni}>
                ID: {formData.cedula_dni}
              </div>
              <div className="absolute" style={textPositions.cargo_rol}>
                {formData.cargo_rol}
              </div>
              <div className="absolute" style={textPositions.departamento}>
                {formData.departamento}
              </div>
              {formData.numero_expediente && (
                <div className="absolute" style={textPositions.numero_expediente}>
                  No. expediente: {formData.numero_expediente}
                </div>
              )}
              {formData.fecha_admision && (
                <div className="absolute" style={textPositions.fecha_admision}>
                  Admitido desde {formatDate(formData.fecha_admision)}
                </div>
              )}
              {formData.orcid && (
                <div className="absolute" style={textPositions.orcid}>
                  https://orcid.org/{formData.orcid}
                </div>
              )}
              <div className="absolute" style={textPositions.fecha_ingreso}>
                Ingreso: {new Date(formData.fecha_ingreso).toLocaleDateString()}
              </div>
              <div className="absolute" style={textPositions.fecha_vencimiento}>
                Vence: {new Date(formData.fecha_vencimiento).toLocaleDateString()}
              </div>

              <div className="absolute" style={fechaGeneracion}>
                Expedido en Los Algarrobos, Chiriquí Province, Panamá <br/>
                {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
              <button onClick={() => setPreview(false)} className="px-6 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition-colors duration-300 w-full sm:w-auto" >
                Editar
              </button>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button onClick={downloadPDF} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 w-full sm:w-auto" >
                  Descargar PDF
                </button>
                <button onClick={resetForm} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 w-full sm:w-auto" >
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