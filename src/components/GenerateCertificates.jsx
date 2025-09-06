import { useState, useRef, useCallback } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

const GenerateCertificates = () => {
  const [submitStatus, setSubmitStatus] = useState(null);
  const [excelFile, setExcelFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de archivo
      const validTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel'
      ];
      
      if (!validTypes.includes(file.type)) {
        setSubmitStatus({ 
          type: 'error', 
          message: 'Por favor, seleccione un archivo Excel válido (.xlsx o .xls).' 
        });
        return;
      }
      
      // Validar tamaño del archivo (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setSubmitStatus({ 
          type: 'error', 
          message: 'El archivo es demasiado grande. Máximo 5MB permitido.' 
        });
        return;
      }
      
      setExcelFile(file);
      setSubmitStatus(null);
    }
  }, []);

  const handleFileUpload = useCallback(async (e) => {
    e.preventDefault();
    
    if (!excelFile) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Por favor, seleccione un archivo de Excel.' 
      });
      return;
    }
    
    setIsLoading(true);
    setSubmitStatus(null);
    
    const formData = new FormData();
    formData.append('excel_file', excelFile);
    
    try {
      const response = await fetch('https://relaticpanama.org/api/process_excel.php', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const result = await response.json();
      
      setSubmitStatus({
        type: result.success ? 'success' : 'error',
        message: result.message || (result.success ? 'Certificados generados correctamente.' : 'Error al procesar el archivo.')
      });
      
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Error de conexión. Verifique su conexión a internet e intente nuevamente.' 
      });
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [excelFile]);

  const resetForm = useCallback(() => {
    setSubmitStatus(null);
    setExcelFile(null);
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
              Sistema de Generación de Certificados
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Genere múltiples certificados de manera eficiente cargando un archivo Excel con los datos de los participantes.
            </p>
          </div>
        </div>

        {/* Status Messages */}
        {submitStatus && (
          <div className={`mb-6 p-4 rounded-lg border flex items-start gap-3 ${
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

        {/* Main Form */}
        <div className="bg-white border border-slate-200 rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Cargar Archivo Excel
            </h2>
            <p className="text-slate-600 text-sm">
              Formatos soportados: .xlsx, .xls (máximo 5MB)
            </p>
          </div>

          <div className="space-y-6">
            {/* File Input */}
            <div className="space-y-2">
              <label htmlFor="excel-file" className="block text-sm font-medium text-slate-700">
                Archivo Excel
              </label>
              <div className="relative">
                <input
                  id="excel-file"
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".xlsx,.xls"
                  disabled={isLoading}
                  className="sr-only"
                />
                <label
                  htmlFor="excel-file"
                  className={`
                    relative block w-full rounded-lg border-2 border-dashed border-slate-300 p-8 text-center hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-colors duration-200
                    ${isLoading ? 'pointer-events-none opacity-50' : ''}
                  `}
                >
                  <Upload className="mx-auto h-10 w-10 text-slate-400 mb-3" />
                  <span className="block text-sm font-medium text-slate-700 mb-1">
                    {excelFile ? excelFile.name : 'Seleccionar archivo Excel'}
                  </span>
                  <span className="block text-xs text-slate-500">
                    Haga clic para seleccionar o arrastre el archivo aquí
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              onClick={handleFileUpload}
              disabled={!excelFile || isLoading}
              className={`
                w-full flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200
                ${!excelFile || isLoading
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
                  Generar Certificados
                </>
              )}
            </button>

            {/* Reset Button */}
            <button
              type="button"
              onClick={resetForm}
              disabled={isLoading}
              className="w-full px-6 py-3 border border-slate-300 text-sm font-medium text-slate-700 bg-white rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Limpiar Formulario
            </button>
          </div>

          {/* Instructions */}
          <div className="mt-8 pt-8 border-t border-slate-200">
            <h3 className="text-sm font-medium text-slate-900 mb-3">
              Instrucciones de uso:
            </h3>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• El archivo Excel debe contener las columnas necesarias para generar los certificados</li>
              <li>• Asegúrese de que los datos estén correctamente formateados</li>
              <li>• El tamaño máximo del archivo es de 5MB</li>
              <li>• Los formatos soportados son .xlsx y .xls</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateCertificates;