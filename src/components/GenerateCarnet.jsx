import { useState, useRef, useCallback } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

const GenerateCarnet = () => {
  const [submitStatus, setSubmitStatus] = useState(null);
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
    titulo_academico: '',
    afiliacion: '',
    foto: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const statusMessageRef = useRef(null);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de archivo
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        setSubmitStatus({
          type: 'error',
          message: 'Por favor, seleccione un archivo de imagen válido (.jpg, .png, .gif).'
        });
        return;
      }

      // Validar tamaño del archivo (máximo 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setSubmitStatus({
          type: 'error',
          message: 'El archivo es demasiado grande. Máximo 10MB permitido.'
        });
        return;
      }

      setFormData(prev => ({ ...prev, foto: file }));
      setSubmitStatus(null);
    }
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleFileUpload = useCallback(async (e) => {
    e.preventDefault();

    if (!formData.nombre_completo || !formData.cedula_dni || !formData.foto) {
      setSubmitStatus({
        type: 'error',
        message: 'Por favor, complete los campos obligatorios y suba una foto.'
      });
      return;
    }

    setIsLoading(true);
    setSubmitStatus(null);
    
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch('https://relaticpanama.org/api/generate_carne.php', {
        method: 'POST',
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const result = await response.json();

      setSubmitStatus({
        type: result.success ? 'success' : 'error',
        message: result.message || (result.success ? 'Carnet generado correctamente.' : 'Error al procesar los datos.')
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Error de conexión. Verifique su conexión a internet e intente nuevamente.'
      });
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
      // Desplazar la vista al mensaje de estado
      if (statusMessageRef.current) {
        statusMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [formData]);

  const resetForm = useCallback(() => {
    setSubmitStatus(null);
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
      titulo_academico: '',
      afiliacion: '',
      foto: null
    });
    setIsLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const getStatusIcon = () => {
    if (!submitStatus) return null;
    return submitStatus.type === 'success' ?
      <CheckCircle className="w-5 h-5 flex-shrink-0" /> :
      <AlertCircle className="w-5 h-5 flex-shrink-0" />;
  };

  const fotoPreviewURL = formData.foto ? URL.createObjectURL(formData.foto) : '';

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white border border-slate-200 rounded-lg p-8 mb-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-semibold text-slate-900 mb-2">
              Sistema de Generación de Carnets
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Genere carnets de manera individual ingresando los datos del miembro y subiendo una foto.
            </p>
          </div>
        </div>
        
        {/* Main Form Container */}
        <div className="bg-white border border-slate-200 rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Ingresar Datos y Subir Foto
            </h2>
            <p className="text-slate-600 text-sm">
              Complete los campos para generar el carnet digital. Los campos con (*) son obligatorios.
            </p>
          </div>
          
          <form onSubmit={handleFileUpload} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Form Fields */}
              <div>
                <label htmlFor="nombre_completo" className="block text-sm font-medium text-slate-700">Nombre completo *</label>
                <input type="text" id="nombre_completo" name="nombre_completo" value={formData.nombre_completo} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" required />
              </div>
              <div>
                <label htmlFor="cedula_dni" className="block text-sm font-medium text-slate-700">Cédula o DNI *</label>
                <input type="text" id="cedula_dni" name="cedula_dni" value={formData.cedula_dni} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" required />
              </div>
              <div>
                <label htmlFor="tipo_membresia" className="block text-sm font-medium text-slate-700">Tipo de Membresía</label>
                <select id="tipo_membresia" name="tipo_membresia" value={formData.tipo_membresia} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                  <option value="MIEMBRO INVESTIGADOR">Miembro Investigador</option>
                  <option value="MIEMBRO ASOCIADO">Miembro Asociado</option>
                  <option value="MIEMBRO HONORARIO">Miembro Honorario</option>
                  <option value="MIEMBRO ESTUDIANTIL">Miembro Estudiantil</option>
                </select>
              </div>
              <div>
                <label htmlFor="titulo_academico" className="block text-sm font-medium text-slate-700">Título académico</label>
                <input type="text" id="titulo_academico" name="titulo_academico" value={formData.titulo_academico} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="afiliacion" className="block text-sm font-medium text-slate-700">Afiliación</label>
                <input type="text" id="afiliacion" name="afiliacion" value={formData.afiliacion} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="orcid" className="block text-sm font-medium text-slate-700">ORCID</label>
                <input type="text" id="orcid" name="orcid" value={formData.orcid} onChange={handleChange} placeholder="0000-0000-0000-0000" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="cargo_rol" className="block text-sm font-medium text-slate-700">Cargo o Rol</label>
                <input type="text" id="cargo_rol" name="cargo_rol" value={formData.cargo_rol} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="departamento" className="block text-sm font-medium text-slate-700">Departamento</label>
                <input type="text" id="departamento" name="departamento" value={formData.departamento} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="numero_expediente" className="block text-sm font-medium text-slate-700">Número de Expediente</label>
                <input type="text" id="numero_expediente" name="numero_expediente" value={formData.numero_expediente} onChange={handleChange} placeholder="Ej: 2025-ABC-1" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="fecha_admision" className="block text-sm font-medium text-slate-700">Fecha de Admisión</label>
                <input type="date" id="fecha_admision" name="fecha_admision" value={formData.fecha_admision} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="fecha_ingreso" className="block text-sm font-medium text-slate-700">Fecha de Ingreso</label>
                <input type="date" id="fecha_ingreso" name="fecha_ingreso" value={formData.fecha_ingreso} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="fecha_vencimiento" className="block text-sm font-medium text-slate-700">Fecha de Vencimiento</label>
                <input type="date" id="fecha_vencimiento" name="fecha_vencimiento" value={formData.fecha_vencimiento} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
              </div>

              {/* File Input for Photo */}
              <div className="md:col-span-2 space-y-2">
                <label htmlFor="photo-file" className="block text-sm font-medium text-slate-700">
                  Foto de perfil *
                </label>
                <div className="relative">
                  <input
                    id="photo-file"
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg, image/gif"
                    disabled={isLoading}
                    className="sr-only"
                  />
                  <label
                    htmlFor="photo-file"
                    className={`
                      relative block w-full rounded-lg border-2 border-dashed border-slate-300 p-8 text-center hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-colors duration-200
                      ${isLoading ? 'pointer-events-none opacity-50' : ''}
                    `}
                  >
                    <Upload className="mx-auto h-10 w-10 text-slate-400 mb-3" />
                    <span className="block text-sm font-medium text-slate-700 mb-1">
                      {formData.foto ? formData.foto.name : 'Seleccionar foto'}
                    </span>
                    <span className="block text-xs text-slate-500">
                      Haga clic para seleccionar o arrastre el archivo aquí (máx. 10MB)
                    </span>
                  </label>
                </div>
              </div>
              {/* Photo Preview */}
              {fotoPreviewURL && (
                <div className="md:col-span-2 flex justify-center">
                  <img src={fotoPreviewURL} alt="Vista previa de la foto" className="h-32 w-32 object-cover rounded-full border-2 border-slate-300" />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!formData.nombre_completo || !formData.cedula_dni || !formData.foto || isLoading}
              className={`
                w-full flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200
                ${!formData.nombre_completo || !formData.cedula_dni || !formData.foto || isLoading
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
                }
              `}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 mr-2" />
                  Generar Carnet
                </>
              )}
            </button>
            
            {/* Status Messages - REPOSICIONADO */}
            {submitStatus && (
              <div ref={statusMessageRef} className={`p-4 rounded-lg border flex items-start gap-3 ${
                submitStatus.type === 'success'
                  ? 'bg-green-50 border-green-200 text-green-800'
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}>
                {getStatusIcon()}
                <span className="text-sm font-medium leading-relaxed">
                  {submitStatus.message}
                </span>
              </div>
            )}
            
            {/* Reset Button */}
            <button
              type="button"
              onClick={resetForm}
              disabled={isLoading}
              className="w-full px-6 py-3 border border-slate-300 text-sm font-medium text-slate-700 bg-white rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Limpiar Formulario
            </button>
          </form>

          {/* Instructions */}
          <div className="mt-8 pt-8 border-t border-slate-200">
            <h3 className="text-sm font-medium text-slate-900 mb-3">
              Instrucciones de uso:
            </h3>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Complete los campos obligatorios marcados con un asterisco (*).</li>
              <li>• La foto debe ser un archivo de imagen válido (.jpg, .png, .gif).</li>
              <li>• El tamaño máximo del archivo de la foto es de 10MB.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateCarnet;