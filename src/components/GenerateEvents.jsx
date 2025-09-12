import { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Upload, FileText, CheckCircle, AlertCircle, RefreshCw, List } from 'lucide-react';

const ManageEvents = ({ onEventsCreated }) => {
  const [submitStatus, setSubmitStatus] = useState(null);
  const [excelFile, setExcelFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const dropAreaRef = useRef(null);

  const validateFile = (file) => {
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel'
    ];
    
    if (!validTypes.includes(file.type)) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Por favor, seleccione un archivo Excel válido (.xlsx o .xls).' 
      });
      setExcelFile(null);
      return false;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'El archivo es demasiado grande. Máximo 5MB permitido.' 
      });
      setExcelFile(null);
      return false;
    }

    return true;
  };

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file && validateFile(file)) {
      setExcelFile(file);
      setSubmitStatus(null);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setExcelFile(file);
        setSubmitStatus(null);
      }
      e.dataTransfer.clearData();
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const resetForm = useCallback(() => {
    setSubmitStatus(null);
    setExcelFile(null);
    setIsLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
      const response = await fetch('https://relaticpanama.org/api/generate_events.php', {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      
      setSubmitStatus({
        type: result.success ? 'success' : 'error',
        message: result.message || (result.success ? 'Eventos cargados correctamente.' : 'Error al procesar el archivo.')
      });
      
      if (result.success) {
        // **ÚNICA MODIFICACIÓN SOLICITADA:**
        // Retrasar la limpieza del formulario para que el mensaje de éxito sea visible.
        setTimeout(() => {
          resetForm();
          if (onEventsCreated) {
            onEventsCreated();
          }
        }, 3000); // Espera 3 segundos antes de limpiar y ejecutar el callback
      }
      
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Error de conexión. Verifique su conexión a internet e intente nuevamente.' 
      });
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [excelFile, onEventsCreated, resetForm]);

  const getStatusIcon = () => {
    if (!submitStatus) return null;
    return submitStatus.type === 'success' ? 
      <CheckCircle className="w-5 h-5 flex-shrink-0" /> : 
      <AlertCircle className="w-5 h-5 flex-shrink-0" />;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <List className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-semibold text-slate-900 mb-2">
          Sistema de Gestión de Eventos
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Cargue un archivo Excel para registrar nuevos eventos de forma masiva en la base de datos.
        </p>
      </div>

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

      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="excel-file-events" className="block text-sm font-medium text-slate-700">
            Archivo de Excel
          </label>
          <div className="relative">
            <input
              id="excel-file-events"
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".xlsx,.xls"
              disabled={isLoading}
              className="sr-only"
            />
            <label
              htmlFor="excel-file-events"
              ref={dropAreaRef}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`
                relative block w-full rounded-lg border-2 border-dashed p-8 text-center transition-colors duration-200
                ${isDragOver ? 'border-blue-500 bg-blue-50' : 'border-slate-300'}
                ${isLoading ? 'pointer-events-none opacity-50' : 'hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'}
                cursor-pointer
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
              Cargar Eventos
            </>
          )}
        </button>

        <button
          type="button"
          onClick={resetForm}
          disabled={isLoading}
          className="w-full px-6 py-3 border border-slate-300 text-sm font-medium text-slate-700 bg-white rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Limpiar Formulario
        </button>
      </div>

      <div className="mt-8 pt-8 border-t border-slate-200">
        <h3 className="text-sm font-medium text-slate-900 mb-3">
          Instrucciones de uso:
        </h3>
        <ul className="text-sm text-slate-600 space-y-1">
          <li>• El archivo Excel debe contener la columna con los nombres de los eventos.</li>
          <li>• Asegúrese de que los datos estén correctamente formateados.</li>
          <li>• El tamaño máximo del archivo es de 5MB.</li>
          <li>• Los formatos soportados son .xlsx y .xls.</li>
        </ul>
      </div>
    </div>
  );
};

ManageEvents.propTypes = {
  onEventsCreated: PropTypes.func.isRequired,
};

export default ManageEvents;