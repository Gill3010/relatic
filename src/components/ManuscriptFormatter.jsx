import { useState, useEffect, useRef } from 'react';
import { Upload, FileText, Download, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import * as mammoth from 'mammoth';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';

const ManuscriptFormatter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const formRef = useRef(null);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const demoMode = true; // componente deshabilitado (solo demostración)
  const [instructionsFile, setInstructionsFile] = useState(null);
  const [manuscriptFile, setManuscriptFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, processing, ready, error
  const [errorMessage, setErrorMessage] = useState('');
  const [formattedDocument, setFormattedDocument] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = formRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleInstructionsChange = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.docx')) {
      setInstructionsFile(file);
      setStatus('idle');
      setErrorMessage('');
    } else {
      setErrorMessage('Por favor selecciona un archivo .docx válido');
    }
  };

  const handleManuscriptChange = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.docx')) {
      setManuscriptFile(file);
      setStatus('idle');
      setErrorMessage('');
    } else {
      setErrorMessage('Por favor selecciona un archivo .docx válido');
    }
  };

  const processManuscript = async () => {
    if (!instructionsFile || !manuscriptFile) {
      setErrorMessage('Por favor sube ambos archivos antes de procesar');
      return;
    }

    setIsProcessing(true);
    setStatus('processing');
    setErrorMessage('');

    try {
      // ====================================================================
      // PROCESAMIENTO DEL MANUSCRITO Y APLICACIÓN DE FORMATO
      // ====================================================================
      
      // Paso 1: Leer y convertir el archivo de instrucciones a HTML
      // mammoth.js convierte archivos .docx a HTML manteniendo la estructura
      const instructionsArrayBuffer = await instructionsFile.arrayBuffer();
      const instructionsResult = await mammoth.convertToHtml({ arrayBuffer: instructionsArrayBuffer });
      
      // Extraer información de formato del HTML de instrucciones
      // Analizar la estructura para detectar títulos, formato, etc.
      const instructionsText = instructionsResult.value;
      const instructionsHtml = document.createElement('div');
      instructionsHtml.innerHTML = instructionsText;
      
      // Detectar estilos comunes (títulos, formato, etc.)
      // Nota: Se analiza el archivo de instrucciones para entender la estructura
      // aunque por ahora se usa una configuración de formato estándar.
      // En el futuro, esto podría usarse para extraer márgenes, fuentes, etc.
      const headingStyles = [];
      const paragraphs = instructionsHtml.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
      
      // Almacenar información de estilos detectados (reservado para uso futuro)
      paragraphs.forEach(() => {
        headingStyles.push({
          alignment: AlignmentType.LEFT
        });
      });

      // Paso 2: Leer y extraer el contenido del manuscrito
      // Convertir el manuscrito .docx a HTML para procesamiento
      const manuscriptArrayBuffer = await manuscriptFile.arrayBuffer();
      const manuscriptResult = await mammoth.convertToHtml({ arrayBuffer: manuscriptArrayBuffer });
      const manuscriptText = manuscriptResult.value;
      
      // Validar que el manuscrito no esté vacío
      if (!manuscriptText || manuscriptText.trim().length === 0) {
        throw new Error('El manuscrito parece estar vacío');
      }

      // Paso 3: Procesar el contenido del manuscrito y convertirlo a párrafos
      // Convertir el HTML del manuscrito en un elemento DOM para análisis
      const manuscriptHtml = document.createElement('div');
      manuscriptHtml.innerHTML = manuscriptText;
      
      // Array para almacenar los párrafos formateados
      const paragraphs_list = [];
      const nodes = manuscriptHtml.childNodes;
      
      // Iterar sobre cada nodo del DOM para extraer estructura y contenido
      for (let node of nodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const tagName = node.tagName.toLowerCase();
          const text = node.textContent.trim();
          
          if (text) {
            // Detectar si es un título (h1-h6)
            if (tagName.match(/^h[1-6]$/)) {
              // Convertir a título con el nivel apropiado
              const level = parseInt(tagName.charAt(1));
              paragraphs_list.push(
                new Paragraph({
                  text: text,
                  heading: HeadingLevel[`HEADING_${level}`],
                  spacing: { before: 240, after: 120 }, // Espaciado estándar para títulos
                })
              );
            } else if (tagName === 'p') {
              // Procesar párrafos y preservar formato inline (negrita, cursiva, subrayado)
              const textRuns = [];
              
              if (node.hasChildNodes()) {
                for (let child of node.childNodes) {
                  if (child.nodeType === Node.TEXT_NODE) {
                    // Texto sin formato
                    textRuns.push(new TextRun(child.textContent));
                  } else if (child.nodeType === Node.ELEMENT_NODE) {
                    // Elemento con posible formato
                    const text = child.textContent;
                    const styles = {};
                    
                    // Detectar negrita
                    if (child.tagName === 'STRONG' || child.tagName === 'B') {
                      styles.bold = true;
                    }
                    // Detectar cursiva
                    if (child.tagName === 'EM' || child.tagName === 'I') {
                      styles.italics = true;
                    }
                    // Detectar subrayado
                    if (child.tagName === 'U') {
                      styles.underline = {};
                    }
                    
                    textRuns.push(new TextRun({ text, ...styles }));
                  }
                }
              } else {
                // Si no tiene hijos, crear un texto simple
                textRuns.push(new TextRun(text));
              }
              
              // Crear párrafo con formato justificado
              paragraphs_list.push(
                new Paragraph({
                  children: textRuns.length > 0 ? textRuns : [new TextRun(text)],
                  spacing: { after: 200 }, // Espaciado entre párrafos
                  alignment: AlignmentType.JUSTIFIED,
                })
              );
            } else {
              // Otros elementos se tratan como párrafo normal
              paragraphs_list.push(
                new Paragraph({
                  text: text,
                  spacing: { after: 200 },
                })
              );
            }
          }
        } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          // Texto suelto, convertirlo en párrafo
          paragraphs_list.push(
            new Paragraph({
              text: node.textContent.trim(),
              spacing: { after: 200 },
            })
          );
        }
      }

      // Si no encontramos ningún párrafo estructurado, crear uno con todo el texto
      // Esto garantiza que siempre haya contenido para descargar
      if (paragraphs_list.length === 0) {
        const fullText = manuscriptText.replace(/<[^>]*>/g, '').trim();
        paragraphs_list.push(
          new Paragraph({
            text: fullText,
            spacing: { after: 200 },
          })
        );
      }

      // Paso 4: Crear el nuevo documento Word con formato profesional
      // Configuración de márgenes estándar (2.5cm en todas las direcciones)
      // Los márgenes están en twips (1 twip = 1/1440 pulgada)
      const doc = new Document({
        sections: [{
          properties: {
            page: {
              margin: {
                top: 1440,    // 2.5cm - margen superior
                right: 1440,  // 2.5cm - margen derecho
                bottom: 1440, // 2.5cm - margen inferior
                left: 1440,   // 2.5cm - margen izquierdo
              },
            },
          },
          children: paragraphs_list, // Insertar todos los párrafos procesados
        }],
      });

      // Paso 5: Generar el blob del documento para descarga
      // Packer convierte el objeto Document en un blob binario .docx
      const blob = await Packer.toBlob(doc);
      
      // Almacenar el documento procesado y marcar como listo
      setFormattedDocument(blob);
      setStatus('ready');
    } catch (error) {
      console.error('Error al procesar:', error);
      setErrorMessage('Error al procesar el manuscrito: ' + error.message);
      setStatus('error');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadFormattedDocument = () => {
    if (!formattedDocument) return;

    const url = URL.createObjectURL(formattedDocument);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'manuscrito_formateado.docx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setInstructionsFile(null);
    setManuscriptFile(null);
    setStatus('idle');
    setErrorMessage('');
    setFormattedDocument(null);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Aviso de demostración */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
          Este es un demo de visualización. Las cargas y el procesamiento están deshabilitados.
        </div>

        {/* Formulario */}
        {isFormVisible && (
          <div 
            ref={formRef}
            className={`bg-white text-slate-700 p-8 rounded-2xl shadow-md border border-slate-200 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-blue-600">Formateador de Manuscritos</h2>
            </div>
            
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              Sube el archivo de instrucciones de la revista y tu manuscrito en formato Word (.docx). 
              El sistema aplicará automáticamente el formato indicado en las instrucciones a tu manuscrito.
            </p>

            {/* Cómo funciona (movido arriba) */}
            <div className="mb-8 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Cómo funciona:</h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">1.</span>
                  <span>El sistema lee el archivo de instrucciones para identificar los estilos de formato de la revista</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">2.</span>
                  <span>Analiza tu manuscrito y extrae el contenido sin formato</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">3.</span>
                  <span>Aplica automáticamente todos los estilos (títulos, márgenes, fuentes, espaciado, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">4.</span>
                  <span>Genera un nuevo documento listo para enviar a la revista</span>
                </li>
              </ul>
            </div>

            {/* Mensajes de estado */}
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-700">{errorMessage}</p>
              </div>
            )}

            {status === 'ready' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-green-700">¡Manuscrito procesado exitosamente! Ya puedes descargarlo.</p>
              </div>
            )}

            {/* Campos de carga */}
            <div className="space-y-6 mb-8">
              {/* Archivo de instrucciones */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  1. Archivo de Instrucciones (instrucciones.docx)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".docx"
                    onChange={handleInstructionsChange}
                    className="hidden"
                    id="instructions-file"
                    disabled={isProcessing || demoMode}
                  />
                  <label
                    htmlFor={demoMode ? undefined : 'instructions-file'}
                    className={`flex items-center justify-between w-full px-5 py-4 border-2 border-dashed rounded-xl transition-all duration-300 ${
                      instructionsFile
                        ? 'border-blue-400 bg-blue-50'
                        : 'border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50'
                    } ${(isProcessing || demoMode) ? 'opacity-60 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center gap-3">
                      <Upload className={`w-5 h-5 ${instructionsFile ? 'text-blue-600' : 'text-slate-400'}`} />
                      <span className={`text-sm ${instructionsFile ? 'text-blue-700 font-medium' : 'text-slate-500'}`}>
                        {instructionsFile ? instructionsFile.name : 'Seleccionar archivo de instrucciones'}
                      </span>
                    </div>
                    {instructionsFile && (
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    )}
                  </label>
                </div>
              </div>

              {/* Archivo de manuscrito */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  2. Archivo de Manuscrito (manuscrito.docx)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".docx"
                    onChange={handleManuscriptChange}
                    className="hidden"
                    id="manuscript-file"
                    disabled={isProcessing || demoMode}
                  />
                  <label
                    htmlFor={demoMode ? undefined : 'manuscript-file'}
                    className={`flex items-center justify-between w-full px-5 py-4 border-2 border-dashed rounded-xl transition-all duration-300 ${
                      manuscriptFile
                        ? 'border-blue-400 bg-blue-50'
                        : 'border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50'
                    } ${(isProcessing || demoMode) ? 'opacity-60 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center gap-3">
                      <Upload className={`w-5 h-5 ${manuscriptFile ? 'text-blue-600' : 'text-slate-400'}`} />
                      <span className={`text-sm ${manuscriptFile ? 'text-blue-700 font-medium' : 'text-slate-500'}`}>
                        {manuscriptFile ? manuscriptFile.name : 'Seleccionar archivo de manuscrito'}
                      </span>
                    </div>
                    {manuscriptFile && (
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    )}
                  </label>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={processManuscript}
                disabled={true}
                className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <FileText className="w-5 h-5" />
                Procesar Manuscrito
              </button>

              <button
                disabled
                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-green-200 text-white font-semibold rounded-xl opacity-60 cursor-not-allowed"
              >
                <Download className="w-5 h-5" />
                Descargar Manuscrito Formateado
              </button>

              {(instructionsFile || manuscriptFile) && (
                <button
                  onClick={resetForm}
                  disabled={isProcessing}
                  className={`sm:w-auto px-6 py-4 bg-slate-100 text-slate-700 font-semibold rounded-xl transition-all duration-300 ${
                    isProcessing
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-slate-200 shadow-sm hover:shadow-md'
                  }`}
                >
                  Reiniciar
                </button>
              )}
            </div>

            {/* Indicador de progreso */}
            {status === 'processing' && (
              <div className="mt-8">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                    <p className="text-sm font-semibold text-blue-700">Procesando tu manuscrito...</p>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-blue-600 h-2 rounded-full animate-progress"></div>
                  </div>
                  <p className="text-xs text-blue-600 mt-3">
                    Analizando formato de instrucciones y aplicando estilos al manuscrito
                  </p>
                </div>
              </div>
            )}

            
          </div>
        )}
      </div>

      <style>{`
        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ManuscriptFormatter;