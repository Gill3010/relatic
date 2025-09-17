<?php

// Incluye las bibliotecas y el archivo de configuración necesarios
require_once "api/config.php";
require_once "vendor/autoload.php";

// Función para determinar el artículo definido según el género del nombre del evento
function obtenerArticuloDefinido($nombreEvento) {
    $nombreEvento = strtolower(trim($nombreEvento));
    
    // Lista de palabras que típicamente son femeninas
    $terminacionesFemeninas = [
        'a', 'ión', 'ad', 'ud', 'ez', 'ie', 'umbre', 'sis'
    ];
    
    // Lista de palabras específicas femeninas (sustantivos que terminan diferente pero son femeninos)
    $palabrasFemeninas = [
        'capacitación', 'formación', 'certificación', 'especialización',
        'diplomatura', 'maestría', 'licenciatura', 'ingeniería',
        'conferencia', 'jornada', 'feria', 'exposición', 'muestra',
        'clase', 'sesión', 'charla', 'ponencia', 'presentación',
        'actividad', 'práctica', 'experiencia', 'oportunidad',
        'carrera', 'profesión', 'disciplina', 'materia', 'asignatura'
    ];
    
    // Lista de palabras específicas masculinas
    $palabrasMasculinas = [
        'curso', 'taller', 'seminario', 'diplomado', 'programa',
        'entrenamiento', 'adiestramiento', 'aprendizaje',
        'congreso', 'simposio', 'foro', 'encuentro', 'evento',
        'workshop', 'bootcamp', 'masterclass', 'webinar',
        'proyecto', 'trabajo', 'estudio', 'análisis',
        'bachillerato', 'doctorado', 'posgrado', 'postgrado'
    ];
    
    // Extraer las palabras del nombre del evento
    $palabras = explode(' ', $nombreEvento);
    
    // Buscar en palabras específicas primero
    foreach ($palabras as $palabra) {
        if (in_array($palabra, $palabrasFemeninas)) {
            return 'la';
        }
        if (in_array($palabra, $palabrasMasculinas)) {
            return 'el';
        }
    }
    
    // Verificar terminaciones en la primera palabra sustantiva (generalmente la más importante)
    $palabraPrincipal = $palabras[0];
    
    // Verificar terminaciones femeninas
    foreach ($terminacionesFemeninas as $terminacion) {
        if (substr($palabraPrincipal, -strlen($terminacion)) === $terminacion) {
            return 'la';
        }
    }
    
    // Si no se encuentra ninguna regla específica, usar "el" como predeterminado
    return 'el';
}

// Valida la entrada del usuario
if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    die("ID de certificado no válido.");
}

$id = $_GET['id'];

try {
    // Obtiene los datos del certificado y del evento en una sola consulta
    $sql = "
    SELECT 
        c.*, 
        e.name AS event_name, 
        e.logo_url, 
        e.signature_url
    FROM 
        certificates c
    JOIN 
        events e ON c.event_id = e.id
    WHERE 
        c.id = ?
    ";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$id]);
    $certificate = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$certificate) {
        die("Certificado no encontrado.");
    }

    // Determinar los artículos correctos
    $articuloEvento = obtenerArticuloDefinido($certificate['event_name']);
    $articuloTipoDocumento = obtenerArticuloDefinido($certificate['tipo_documento']);

    // Crear una nueva instancia de TCPDF con dimensiones personalizadas (11 x 8.5 pulgadas)
    $pdf = new TCPDF('L', 'mm', array(279.4, 215.9), true, 'UTF-8', false);

    // Configurar el PDF (metadatos y estilos)
    $pdf->SetCreator(PDF_CREATOR);
    $pdf->SetAuthor('Tu Organización');
    $pdf->SetTitle('Certificado ' . $certificate['nombre_estudiante']);
    $pdf->SetSubject('Certificado de ' . $certificate['concepto']);
    $pdf->SetKeywords('Certificado, PHP, PDF, ' . $certificate['nombre_estudiante']);

    // Eliminar cabecera y pie de página por defecto
    $pdf->setPrintHeader(false);
    $pdf->setPrintFooter(false);
    
    // Configurar márgenes a 0
    $pdf->SetMargins(0, 0, 0);
    $pdf->SetAutoPageBreak(false, 0);

    // Añadir la imagen de fondo como plantilla
    $bg_image_path = 'assets/certificates/certificate.png';
    $pdf->AddPage();
    $pdf->Image($bg_image_path, 0, 0, 279.4, 215.9, '', '', '', false, 300, '', false, false, 0);

    // --- Añadir los datos del certificado sobre la imagen ---

    // Logo del evento (esquina superior izquierda)
    $logo_path = $certificate['logo_url'];
    if (file_exists($logo_path)) {
        $pdf->Image($logo_path, 20, 25, 35, 0);
    }
    
    // === ENCABEZADO SEGÚN PLANTILLA ===
    
    // Nombre del evento con artículo (parte superior central)
    $pdf->SetFont('helvetica', 'B', 16);
    $pdf->SetTextColor(26, 54, 93);
    $pdf->SetXY(20, 45);
    // CAMBIO CLAVE: strtoupper() -> mb_strtoupper()
    $pdf->Cell(239.4, 8, mb_strtoupper($articuloEvento . ' ' . $certificate['event_name'], 'UTF-8'), 0, 1, 'C');

    // Texto "Otorga el/la presente" con artículo dinámico
    $pdf->SetFont('helvetica', '', 12);
    $pdf->SetTextColor(0, 0, 0);
    $pdf->SetXY(20, 55);
    $pdf->Cell(239.4, 8, 'Otorga ' . $articuloTipoDocumento . ' presente', 0, 1, 'C');
    
    // El tipo de documento (después de "Otorga el presente", con mayor jerarquía)
    $pdf->SetFont('helvetica', 'B', 32);
    $pdf->SetTextColor(26, 54, 93);
    $pdf->SetXY(20, 68);
    // CAMBIO CLAVE: strtoupper() -> mb_strtoupper()
    $pdf->Cell(239.4, 12, mb_strtoupper($certificate['tipo_documento'] . ' A', 'UTF-8'), 0, 1, 'C');
    
    // === CUERPO DEL CERTIFICADO ===
    
    // Nombre del estudiante (centrado y resaltado)
    $pdf->SetFont('helvetica', 'B', 24);
    $pdf->SetTextColor(26, 54, 93);
    $pdf->SetXY(20, 85);
    // CAMBIO CLAVE: strtoupper() -> mb_strtoupper()
    $pdf->Cell(239.4, 10, mb_strtoupper($certificate['nombre_estudiante'], 'UTF-8'), 0, 1, 'C');
    
    // ID del estudiante (justo encima de la línea dorada)
    $pdf->SetFont('helvetica', '', 10);
    $pdf->SetTextColor(74, 85, 104);
    $pdf->SetXY(20, 95);
    $pdf->Cell(239.4, 8, 'ID: ' . $certificate['id_estudiante'], 0, 1, 'C');
    
    // Texto principal del certificado con artículo dinámico
    $pdf->SetFont('helvetica', '', 12);
    $pdf->SetTextColor(0, 0, 0);
    $pdf->SetXY(20, 115);
    $pdf->Cell(239.4, 8, "Por haber culminado satisfactoriamente los requisitos de " . $articuloEvento, 0, 1, 'C');
    
    // Concepto del curso
    $pdf->SetFont('helvetica', 'B', 12);
    $pdf->SetTextColor(26, 54, 93);
    $pdf->SetXY(20, 125);
    // CAMBIO CLAVE: strtoupper() -> mb_strtoupper()
    $pdf->Cell(239.4, 8, mb_strtoupper($certificate['concepto'], 'UTF-8'), 0, 1, 'C');
    
    // Horas y créditos
    $pdf->SetFont('helvetica', '', 11);
    $pdf->SetTextColor(74, 85, 104);
    $pdf->SetXY(20, 135);
    $pdf->Cell(239.4, 8, "con una duración equivalente a " . $certificate['horas_academicas'] . " horas académicas y " . $certificate['creditos'] . " créditos.", 0, 1, 'C');
    
    // Fechas del curso
    $pdf->SetFont('helvetica', '', 11);
    $pdf->SetTextColor(74, 85, 104);
    $pdf->SetXY(20, 145);
    $pdf->Cell(239.4, 8, 'Desarrollado del ' . $certificate['fecha_inicio'] . ' al ' . $certificate['fecha_fin'], 0, 1, 'C');

    // === SECCIÓN INFERIOR ===
    
    // Fecha de emisión (centrada en la parte inferior)
    $pdf->SetFont('helvetica', '', 9);
    $pdf->SetTextColor(113, 128, 150);
    $pdf->SetXY(20, 170);
    $pdf->Cell(239.4, 8, 'Emitido el: ' . $certificate['fecha_emision'], 0, 1, 'C');
    
    // === ÁREA DE FIRMAS (según plantilla) ===
    
    // Firma principal (centro) - Director o autoridad principal
    $signature_path = $certificate['signature_url'];
    if (file_exists($signature_path)) {
        $pdf->Image($signature_path, 125, 185, 40, 0);
        
        // Línea para la firma central
        $pdf->Line(110, 200, 160, 200);
        
        // Texto bajo la firma central
        $pdf->SetFont('helvetica', '', 8);
        $pdf->SetTextColor(0, 0, 0);
        $pdf->SetXY(110, 202);
        $pdf->Cell(50, 5, 'Director Académico', 0, 1, 'C');
    }
    
    // QR Code (esquina inferior derecha)
    $qr_code_path = 'api/qrcodes/' . $certificate['id'] . '.png';
    if (file_exists($qr_code_path)) {
        $x = 279.4 - 45; // Ajustado para mejor posicionamiento
        $y = 215.9 - 45; // Ajustado para mejor posicionamiento
        $pdf->Image($qr_code_path, $x, $y, 35, 35);
    }

    // Enviar el PDF al navegador con la cabecera 'D' para forzar la descarga
    $pdf->Output('Certificado_' . $certificate['id'] . '.pdf', 'D');

} catch (PDOException $e) {
    die("Error de base de datos: " . $e->getMessage());
} catch (Exception $e) {
    die("Error al generar el PDF: " . $e->getMessage());
}
?>