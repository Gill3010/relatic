// import { useState, useRef, useCallback } from 'react';
// import { Upload, CheckCircle, AlertCircle, RefreshCw, FileUp } from 'lucide-react';

// const UploadPhoto = () => {
//     const [submitStatus, setSubmitStatus] = useState(null);
//     const [photoFile, setPhotoFile] = useState(null);
//     const [isUploading, setIsUploading] = useState(false);
//     const [isDragOver, setIsDragOver] = useState(false);
//     const [cedulaDni, setCedulaDni] = useState(''); // Nuevo estado para la cédula
//     const fileInputRef = useRef(null);
//     const statusMessageRef = useRef(null);

//     const handleFileChange = useCallback((file) => {
//         if (!file) return;
//         const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        
//         if (!validTypes.includes(file.type) || file.size > 10 * 1024 * 1024) {
//             setSubmitStatus({ 
//                 type: 'error', 
//                 message: 'Por favor, seleccione un archivo de imagen válido (.png, .jpg, .gif) y menor a 10MB.' 
//             });
//             setPhotoFile(null);
//             return;
//         }
        
//         setPhotoFile(file);
//         setSubmitStatus(null);
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         // Validación de la cédula y la foto
//         if (!cedulaDni.trim()) {
//             setSubmitStatus({
//                 type: 'error',
//                 message: 'Por favor, ingrese una cédula o DNI.'
//             });
//             return;
//         }

//         if (!photoFile) {
//             setSubmitStatus({
//                 type: 'error',
//                 message: 'Por favor, seleccione una foto para subir.'
//             });
//             return;
//         }
        
//         setIsUploading(true);
//         setSubmitStatus(null);
        
//         const formData = new FormData();
//         formData.append('cedula_dni', cedulaDni); // Se agrega la cédula al FormData
//         formData.append('photo', photoFile);

//         try {
//             const response = await fetch('https://relaticpanama.org/api/upload_photo.php', {
//                 method: 'POST',
//                 body: formData,
//             });

//             const result = await response.json();
            
//             setSubmitStatus({
//                 type: result.success ? 'success' : 'error',
//                 message: result.message || (result.success ? 'Foto subida correctamente.' : 'Error al subir la foto.')
//             });
            
//         } catch (error) {
//             setSubmitStatus({
//                 type: 'error',
//                 message: 'Error de conexión. Verifique su conexión a internet e intente nuevamente.'
//             });
//             console.error('Error:', error);
//         } finally {
//             setIsUploading(false);
//             if (statusMessageRef.current) {
//                 statusMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
//             }
//         }
//     };

//     const resetForm = useCallback(() => {
//         setSubmitStatus(null);
//         setPhotoFile(null);
//         setIsUploading(false);
//         setCedulaDni(''); // Se limpia el estado de la cédula
//         if (fileInputRef.current) {
//             fileInputRef.current.value = '';
//         }
//     }, []);

//     const getStatusIcon = () => {
//         if (!submitStatus) return null;
//         return submitStatus.type === 'success' ? 
//           <CheckCircle className="w-5 h-5 flex-shrink-0" /> : 
//           <AlertCircle className="w-5 h-5 flex-shrink-0" />;
//     };

//     return (
//         <div className="bg-white border border-slate-200 rounded-lg p-8">
//             <div className="text-center mb-8">
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
//                     <FileUp className="w-8 h-8 text-blue-600" />
//                 </div>
//                 <h1 className="text-3xl font-semibold text-slate-900 mb-2">
//                     Subir Foto de Perfil
//                 </h1>
//                 <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
//                     Cargue una foto de perfil para un miembro.
//                 </p>
//             </div>

//             {submitStatus && (
//                 <div ref={statusMessageRef} className={`mb-6 p-4 rounded-lg border flex items-start gap-3 ${
//                     submitStatus.type === 'success' 
//                       ? 'bg-green-50 border-green-200 text-green-800' 
//                       : 'bg-red-50 border-red-200 text-red-800'
//                 }`}>
//                     {getStatusIcon()}
//                     <span className="text-sm font-medium leading-relaxed">
//                         {submitStatus.message}
//                     </span>
//                 </div>
//             )}
            
//             <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Nuevo campo de texto para la cédula */}
//                 <div className="space-y-2">
//                     <label htmlFor="cedula-dni" className="block text-sm font-medium text-slate-700">
//                         Cédula o DNI del Miembro
//                     </label>
//                     <input
//                         id="cedula-dni"
//                         type="text"
//                         value={cedulaDni}
//                         onChange={(e) => setCedulaDni(e.target.value)}
//                         disabled={isUploading}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="Ej: 8-123-456"
//                     />
//                 </div>

//                 <div className="space-y-2">
//                     <label htmlFor="photo-file" className="block text-sm font-medium text-slate-700">
//                         Archivo de Foto
//                     </label>
//                     <div className="relative">
//                         <input
//                             id="photo-file"
//                             type="file"
//                             ref={fileInputRef}
//                             onChange={(e) => handleFileChange(e.target.files[0])}
//                             accept="image/png, image/jpeg, image/gif"
//                             disabled={isUploading}
//                             className="sr-only"
//                         />
//                         <label
//                             htmlFor="photo-file"
//                             className={`
//                                 relative block w-full rounded-lg border-2 border-dashed p-8 text-center transition-colors duration-200
//                                 ${isDragOver ? 'border-blue-500 bg-blue-50' : 'border-slate-300'}
//                                 ${isUploading ? 'pointer-events-none opacity-50' : 'hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer'}
//                             `}
//                             onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
//                             onDragLeave={() => setIsDragOver(false)}
//                             onDrop={(e) => {
//                                 e.preventDefault();
//                                 setIsDragOver(false);
//                                 if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
//                                     handleFileChange(e.dataTransfer.files[0]);
//                                 }
//                             }}
//                         >
//                             <Upload className="mx-auto h-10 w-10 text-slate-400 mb-3" />
//                             <span className="block text-sm font-medium text-slate-700 mb-1">
//                                 {photoFile ? photoFile.name : 'Seleccionar foto'}
//                             </span>
//                             <span className="block text-xs text-slate-500">
//                                 Haga clic para seleccionar o arrastre el archivo aquí (máx. 10MB)
//                             </span>
//                         </label>
//                     </div>
//                 </div>

//                 <button
//                     type="submit"
//                     disabled={!photoFile || isUploading || !cedulaDni.trim()}
//                     className={`
//                         w-full flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200
//                         ${!photoFile || isUploading || !cedulaDni.trim()
//                             ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
//                             : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
//                         }
//                     `}
//                 >
//                     {isUploading ? (
//                         <>
//                             <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
//                             Procesando...
//                         </>
//                     ) : (
//                         <>
//                             <FileUp className="w-4 h-4 mr-2" />
//                             Subir Foto
//                         </>
//                     )}
//                 </button>

//                 <button
//                     type="button"
//                     onClick={resetForm}
//                     disabled={isUploading}
//                     className="w-full px-6 py-3 border border-slate-300 text-sm font-medium text-slate-700 bg-white rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
//                 >
//                     Limpiar Formulario
//                 </button>
//             </form>

//             <div className="mt-8 pt-8 border-t border-slate-200">
//                 <h3 className="text-sm font-medium text-slate-900 mb-3">
//                     Instrucciones de uso:
//                 </h3>
//                 <ul className="text-sm text-slate-600 space-y-1">
//                         <li>• Ingrese la cédula o DNI del miembro.</li>
//                         <li>• Seleccione una foto para subir o arrástrela al área designada.</li>
//                         <li>• La foto debe ser un archivo de imagen válido (.jpg, .png, .gif).</li>
//                         <li>• El tamaño máximo del archivo de la foto es de 10MB.</li>
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default UploadPhoto;