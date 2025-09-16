import { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes para la validación de props
import { Image, CheckCircle, AlertCircle, RefreshCw, FileUp } from 'lucide-react';

const EventUploadForm = ({ events, isLoading, onAssetsUploaded }) => {
    const [selectedEventId, setSelectedEventId] = useState('');
    const [logoFile, setLogoFile] = useState(null);
    const [signatureFile, setSignatureFile] = useState(null);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);

    const logoInputRef = useRef(null);
    const signatureInputRef = useRef(null);
    
    const handleFileChange = useCallback((file, type) => {
        if (!file) return;
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        
        if (!validTypes.includes(file.type) || file.size > 2 * 1024 * 1024) {
            setSubmitStatus({ 
                type: 'error', 
                message: 'Por favor, seleccione un archivo de imagen válido (.png, .jpg, .gif) y menor a 2MB.' 
            });
            if (type === 'logo') setLogoFile(null);
            if (type === 'signature') setSignatureFile(null);
            return;
        }

        if (type === 'logo') {
            setLogoFile(file);
        } else if (type === 'signature') {
            setSignatureFile(file);
        }
        setSubmitStatus(null);
    }, []);

    const resetForm = useCallback(() => {
        setSubmitStatus(null);
        setLogoFile(null);
        setSignatureFile(null);
        setSelectedEventId('');
        setIsUploading(false);
        if (logoInputRef.current) logoInputRef.current.value = '';
        if (signatureInputRef.current) signatureInputRef.current.value = '';
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!selectedEventId || !logoFile || !signatureFile) {
            setSubmitStatus({
                type: 'error',
                message: 'Por favor, seleccione un evento, un logo y una firma.'
            });
            return;
        }
        
        setIsUploading(true);
        setSubmitStatus(null);
        
        const formData = new FormData();
        formData.append('event_id', selectedEventId);
        formData.append('event_logo', logoFile);
        formData.append('event_signature', signatureFile);

        try {
            const response = await fetch('https://relaticpanama.org/api/process_excel_upload_event.php', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            
            setSubmitStatus({
                type: result.success ? 'success' : 'error',
                message: result.message || (result.success ? 'Archivos subidos correctamente.' : 'Error al subir los archivos.')
            });
            
            // **ÚNICA MODIFICACIÓN SOLICITADA:**
            // Retrasar la limpieza del formulario para que el mensaje de éxito sea visible.
            if (result.success) {
                setTimeout(() => {
                    resetForm();
                    if (onAssetsUploaded) {
                        onAssetsUploaded();
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
            setIsUploading(false);
        }
    };

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
                    <Image className="w-8 h-8 text-blue-600" />
                </div>
                <h1 className="text-3xl font-semibold text-slate-900 mb-2">
                    Subir Activos del Evento
                </h1>
                <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    Cargue el logo y la firma del evento para que estén disponibles en los certificados.
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
                    <label htmlFor="event-select" className="block text-sm font-medium text-slate-700">
                        Seleccionar Evento
                    </label>
                    <select 
                        id="event-select" 
                        value={selectedEventId} 
                        onChange={(e) => setSelectedEventId(e.target.value)} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        disabled={isUploading || isLoading}
                    >
                        <option value="">-- Seleccione un Evento --</option>
                        {events.map(event => (
                            <option key={event.id} value={event.id}>{event.name}</option>
                        ))}
                    </select>
                </div>
                
                <div className="space-y-2">
                    <label htmlFor="logo-file" className="block text-sm font-medium text-slate-700">
                        Logo del Evento
                    </label>
                    <div className="relative">
                        <input
                            id="logo-file"
                            type="file"
                            ref={logoInputRef}
                            onChange={(e) => handleFileChange(e.target.files[0], 'logo')}
                            accept="image/*"
                            disabled={isUploading || isLoading}
                            className="sr-only"
                        />
                        <label
                            htmlFor="logo-file"
                            className={`
                                relative block w-full rounded-lg border-2 border-dashed p-8 text-center transition-colors duration-200
                                ${isDragOver ? 'border-blue-500 bg-blue-50' : 'border-slate-300'}
                                ${isUploading || isLoading ? 'pointer-events-none opacity-50' : 'hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'}
                                cursor-pointer
                            `}
                            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                            onDragLeave={() => setIsDragOver(false)}
                            onDrop={(e) => {
                                e.preventDefault();
                                setIsDragOver(false);
                                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                                    handleFileChange(e.dataTransfer.files[0], 'logo');
                                }
                            }}
                        >
                            <FileUp className="mx-auto h-10 w-10 text-slate-400 mb-3" />
                            <span className="block text-sm font-medium text-slate-700 mb-1">
                                {logoFile ? logoFile.name : 'Seleccionar logo'}
                            </span>
                            <span className="block text-xs text-slate-500">
                                Haga clic para seleccionar o arrastre el archivo aquí
                            </span>
                        </label>
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="signature-file" className="block text-sm font-medium text-slate-700">
                        Firma del Evento
                    </label>
                    <div className="relative">
                        <input
                            id="signature-file"
                            type="file"
                            ref={signatureInputRef}
                            onChange={(e) => handleFileChange(e.target.files[0], 'signature')}
                            accept="image/*"
                            disabled={isUploading || isLoading}
                            className="sr-only"
                        />
                        <label
                            htmlFor="signature-file"
                            className={`
                                relative block w-full rounded-lg border-2 border-dashed p-8 text-center transition-colors duration-200
                                ${isDragOver ? 'border-blue-500 bg-blue-50' : 'border-slate-300'}
                                ${isUploading || isLoading ? 'pointer-events-none opacity-50' : 'hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'}
                                cursor-pointer
                            `}
                            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                            onDragLeave={() => setIsDragOver(false)}
                            onDrop={(e) => {
                                e.preventDefault();
                                setIsDragOver(false);
                                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                                    handleFileChange(e.dataTransfer.files[0], 'signature');
                                }
                            }}
                        >
                            <FileUp className="mx-auto h-10 w-10 text-slate-400 mb-3" />
                            <span className="block text-sm font-medium text-slate-700 mb-1">
                                {signatureFile ? signatureFile.name : 'Seleccionar firma'}
                            </span>
                            <span className="block text-xs text-slate-500">
                                Haga clic para seleccionar o arrastre el archivo aquí
                            </span>
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={!selectedEventId || !logoFile || !signatureFile || isUploading || isLoading}
                    className={`
                        w-full flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200
                        ${!selectedEventId || !logoFile || !signatureFile || isUploading || isLoading
                          ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
                        }
                    `}
                >
                    {isUploading ? (
                        <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Procesando...
                        </>
                    ) : (
                        <>
                            <FileUp className="w-4 h-4 mr-2" />
                            Subir Archivos
                        </>
                    )}
                </button>

                <button
                    type="button"
                    onClick={resetForm}
                    disabled={isUploading || isLoading}
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
                    <li>• Seleccione el evento al que desea asociar los archivos.</li>
                    <li>• Seleccione un archivo de imagen (.jpg, .png) para el logo del evento.</li>
                    <li>• Seleccione un archivo de imagen (.jpg, .png) para la firma del evento.</li>
                    <li>• El tamaño máximo permitido para cada archivo es de 2MB.</li>
                </ul>
            </div>
        </div>
    );
};

// Añade la validación de propTypes para evitar las advertencias de ESLint
EventUploadForm.propTypes = {
    events: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    isLoading: PropTypes.bool.isRequired,
    onAssetsUploaded: PropTypes.func.isRequired,
};

export default EventUploadForm;