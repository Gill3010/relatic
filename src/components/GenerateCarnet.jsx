import { useState, useRef, useCallback } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, RefreshCw, Award } from 'lucide-react';

const GenerateCarnet = () => {
    const [submitStatus, setSubmitStatus] = useState(null);
    const [excelFile, setExcelFile] = useState(null);
    const [photosZipFile, setPhotosZipFile] = useState(null); // Nuevo estado para el archivo ZIP
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);
    const photosInputRef = useRef(null); // Nueva referencia para el input del ZIP
    const [isExcelDragOver, setIsExcelDragOver] = useState(false);
    const [isPhotosDragOver, setIsPhotosDragOver] = useState(false);

    const handleFileChange = useCallback((file, type) => {
        if (!file) return;

        const validExcelTypes = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel'
        ];
        const validZipType = 'application/zip';

        if (type === 'excel') {
            if (!validExcelTypes.includes(file.type)) {
                setSubmitStatus({
                    type: 'error',
                    message: 'Por favor, seleccione un archivo Excel válido (.xlsx o .xls).'
                });
                setExcelFile(null);
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setSubmitStatus({
                    type: 'error',
                    message: 'El archivo Excel es demasiado grande. Máximo 5MB permitido.'
                });
                setExcelFile(null);
                return;
            }
            setExcelFile(file);
        } else if (type === 'zip') {
            if (file.type !== validZipType) {
                setSubmitStatus({
                    type: 'error',
                    message: 'Por favor, seleccione un archivo ZIP válido (.zip).'
                });
                setPhotosZipFile(null);
                return;
            }
            if (file.size > 20 * 1024 * 1024) { // Límite más grande para fotos
                setSubmitStatus({
                    type: 'error',
                    message: 'El archivo ZIP es demasiado grande. Máximo 20MB permitido.'
                });
                setPhotosZipFile(null);
                return;
            }
            setPhotosZipFile(file);
        }
        setSubmitStatus(null);
    }, []);

    const handleFileUpload = useCallback(async (e) => {
        e.preventDefault();
        if (!excelFile || !photosZipFile) {
            setSubmitStatus({
                type: 'error',
                message: 'Por favor, seleccione un archivo de Excel y un archivo ZIP de fotos.'
            });
            return;
        }

        setIsUploading(true);
        setSubmitStatus(null);

        const formData = new FormData();
        formData.append('excel_file', excelFile);
        formData.append('photos_zip', photosZipFile); // Se agrega el archivo ZIP

        try {
            const response = await fetch('https://relaticpanama.org/api/process_excel_carnets_photos.php', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const result = await response.json();
            setSubmitStatus({
                type: result.success ? 'success' : 'error',
                message: result.message || (result.success ? 'Carnets generados correctamente.' : 'Error al procesar los archivos.')
            });
        } catch (error) {
            setSubmitStatus({
                type: 'error',
                message: 'Error de conexión. Verifique su conexión a internet e intente nuevamente.'
            });
            console.error('Error:', error);
        } finally {
            setIsUploading(false);
        }
    }, [excelFile, photosZipFile]);

    const resetForm = useCallback(() => {
        setSubmitStatus(null);
        setExcelFile(null);
        setPhotosZipFile(null);
        setIsUploading(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        if (photosInputRef.current) {
            photosInputRef.current.value = '';
        }
    }, []);

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
                    <Award className="w-8 h-8 text-blue-600" />
                </div>
                <h1 className="text-3xl font-semibold text-slate-900 mb-2">
                    Sistema de Generación de Carnets
                </h1>
                <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    Genere múltiples carnets de manera eficiente cargando un archivo Excel con los datos y un archivo ZIP con las fotos de los miembros.
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
                {/* Campo para el archivo de Excel */}
                <div className="space-y-2">
                    <label htmlFor="excel-file-carnets" className="block text-sm font-medium text-slate-700">
                        Archivo de Excel
                    </label>
                    <div className="relative">
                        <input
                            id="excel-file-carnets"
                            type="file"
                            ref={fileInputRef}
                            onChange={(e) => handleFileChange(e.target.files[0], 'excel')}
                            accept=".xlsx,.xls"
                            disabled={isUploading}
                            className="sr-only"
                        />
                        <label
                            htmlFor="excel-file-carnets"
                            className={`
                                relative block w-full rounded-lg border-2 border-dashed p-8 text-center transition-colors duration-200
                                ${isExcelDragOver ? 'border-blue-500 bg-blue-50' : 'border-slate-300'}
                                ${isUploading ? 'pointer-events-none opacity-50' : 'hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer'}
                            `}
                            onDragOver={(e) => { e.preventDefault(); setIsExcelDragOver(true); }}
                            onDragLeave={() => setIsExcelDragOver(false)}
                            onDrop={(e) => {
                                e.preventDefault();
                                setIsExcelDragOver(false);
                                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                                    handleFileChange(e.dataTransfer.files[0], 'excel');
                                }
                            }}
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

                {/* Nuevo campo para el archivo ZIP de fotos */}
                <div className="space-y-2">
                    <label htmlFor="photos-zip-file" className="block text-sm font-medium text-slate-700">
                        Archivo ZIP de Fotos
                    </label>
                    <div className="relative">
                        <input
                            id="photos-zip-file"
                            type="file"
                            ref={photosInputRef}
                            onChange={(e) => handleFileChange(e.target.files[0], 'zip')}
                            accept=".zip"
                            disabled={isUploading}
                            className="sr-only"
                        />
                        <label
                            htmlFor="photos-zip-file"
                            className={`
                                relative block w-full rounded-lg border-2 border-dashed p-8 text-center transition-colors duration-200
                                ${isPhotosDragOver ? 'border-blue-500 bg-blue-50' : 'border-slate-300'}
                                ${isUploading ? 'pointer-events-none opacity-50' : 'hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer'}
                            `}
                            onDragOver={(e) => { e.preventDefault(); setIsPhotosDragOver(true); }}
                            onDragLeave={() => setIsPhotosDragOver(false)}
                            onDrop={(e) => {
                                e.preventDefault();
                                setIsPhotosDragOver(false);
                                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                                    handleFileChange(e.dataTransfer.files[0], 'zip');
                                }
                            }}
                        >
                            <Upload className="mx-auto h-10 w-10 text-slate-400 mb-3" />
                            <span className="block text-sm font-medium text-slate-700 mb-1">
                                {photosZipFile ? photosZipFile.name : 'Seleccionar archivo ZIP'}
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
                    disabled={!excelFile || !photosZipFile || isUploading}
                    className={`
                        w-full flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200
                        ${!excelFile || !photosZipFile || isUploading
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
                            <FileText className="w-4 h-4 mr-2" />
                            Generar Carnets
                        </>
                    )}
                </button>

                <button
                    type="button"
                    onClick={resetForm}
                    disabled={isUploading}
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
                    <li>• El archivo Excel debe contener las columnas necesarias para generar los carnets, incluida la cédula o DNI de cada persona.</li>
                    <li>• El archivo ZIP debe contener **todas las fotos** de los miembros.</li>
                    <li>• **Cada foto en el ZIP debe tener como nombre la cédula o DNI de la persona** (Ej: `8-888-8888.jpg`).</li>
                    <li>• El tamaño máximo del archivo Excel es de 5MB y del archivo ZIP de fotos es de 20MB.</li>
                    <li>• Los formatos soportados son `.xlsx`, `.xls` y `.zip`.</li>
                </ul>
            </div>
        </div>
    );
};

export default GenerateCarnet;