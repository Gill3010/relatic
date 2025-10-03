<?php

// Incluye las bibliotecas y el archivo de configuración necesarios
require_once "api/config.php";
require_once "vendor/autoload.php";

// Función para formatear fecha en estilo notarial
function formatearFechaEmision($fecha) {
    $timestamp = strtotime($fecha);
    if (!$timestamp) return htmlspecialchars($fecha);

    $dia = (int)date("j", $timestamp);
    $anio = date("Y", $timestamp);

    $meses = [
        1 => "enero", 2 => "febrero", 3 => "marzo",
        4 => "abril", 5 => "mayo", 6 => "junio",
        7 => "julio", 8 => "agosto", 9 => "septiembre",
        10 => "octubre", 11 => "noviembre", 12 => "diciembre"
    ];
    $mes = $meses[(int)date("n", $timestamp)];

    $diasEnPalabras = [
        1 => "un", 2 => "dos", 3 => "tres", 4 => "cuatro", 5 => "cinco",
        6 => "seis", 7 => "siete", 8 => "ocho", 9 => "nueve", 10 => "diez",
        11 => "once", 12 => "doce", 13 => "trece", 14 => "catorce", 15 => "quince",
        16 => "dieciséis", 17 => "diecisiete", 18 => "dieciocho", 19 => "diecinueve", 20 => "veinte",
        21 => "veintiún", 22 => "veintidós", 23 => "veintitrés", 24 => "veinticuatro", 25 => "veinticinco",
        26 => "veintiséis", 27 => "veintisiete", 28 => "veintiocho", 29 => "veintinueve", 30 => "treinta",
        31 => "treinta y un"
    ];
    $diaTexto = $diasEnPalabras[$dia] ?? $dia;

    return "Dado en Panamá a los {$diaTexto} días del mes de {$mes} del {$anio}";
}

// Función para determinar el artículo definido según el género del texto
function obtenerArticuloDefinido($texto) {
    $texto = strtolower(trim($texto));
    
    $terminacionesFemeninas = ['a', 'ión', 'ad', 'ud', 'ez', 'ie', 'umbre', 'sis'];
    $palabrasFemeninas = [
        'capacitación','formación','certificación','especialización',
        'diplomatura','maestría','licenciatura','ingeniería',
        'conferencia','jornada','feria','exposición','muestra',
        'clase','sesión','charla','ponencia','presentación',
        'actividad','práctica','experiencia','oportunidad',
        'carrera','profesión','disciplina','materia','asignatura'
    ];
    $palabrasMasculinas = [
        'curso','taller','seminario','diplomado','programa',
        'entrenamiento','adiestramiento','aprendizaje',
        'congreso','simposio','foro','encuentro','evento',
        'workshop','bootcamp','masterclass','webinar',
        'proyecto','trabajo','estudio','análisis',
        'bachillerato','doctorado','posgrado','postgrado'
    ];

    $palabras = explode(' ', $texto);

    foreach ($palabras as $palabra) {
        if (in_array($palabra, $palabrasFemeninas)) return 'la';
        if (in_array($palabra, $palabrasMasculinas)) return 'el';
    }

    $palabraPrincipal = $palabras[0];
    foreach ($terminacionesFemeninas as $terminacion) {
        if (substr($palabraPrincipal, -strlen($terminacion)) === $terminacion) {
            return 'la';
        }
    }

    return 'el';
}

// Validar entrada
if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    die("ID de certificado no válido.");
}

$id = $_GET['id'];

try {
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

    // Determinar artículos correctos
    $articuloEvento = obtenerArticuloDefinido($certificate['event_name']);
    $articuloConcepto = obtenerArticuloDefinido($certificate['concepto']);

    // Generar URL de verificación para el QR
    $protocol = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') ? "https" : "http";
    $host = $_SERVER['HTTP_HOST'];
    $path = dirname($_SERVER['PHP_SELF']);
    $verificationUrl = $protocol . "://" . $host . $path . "/verify_certificate.php?id=" . $certificate['id'];

    // Crear PDF (11 x 8.5 pulgadas)
    $pdf = new TCPDF('L', 'mm', [279.4, 215.9], true, 'UTF-8', false);
    $pdf->setPrintHeader(false);
    $pdf->setPrintFooter(false);
    $pdf->SetMargins(0, 0, 0);
    $pdf->SetAutoPageBreak(false, 0);

    $pdf->AddPage();
    $bg_image_path = 'assets/certificates/certificate.png';
    $pdf->Image($bg_image_path, 0, 0, 279.4, 215.9, '', '', '', false, 300, '', false, false, 0);

    // Logo - posición ajustada para coincidir con HTML (top: 10.5%, left: 17%)
    if (!empty($certificate['logo_url']) && file_exists($certificate['logo_url'])) {
        $logoX = 279.4 * 0.17; // 17% desde la izquierda
        $logoY = 215.9 * 0.105; // 10.5% desde arriba
        $logoWidth = 279.4 * 0.12; // 12% del ancho total
        $pdf->Image($certificate['logo_url'], $logoX, $logoY, $logoWidth, 0);
    }

    // Nombre del evento - posición ajustada (top: 21%, centrado)
    $pdf->SetFont('times', 'B', 22); // Times New Roman Bold, tamaño equivalente a 1.6vw
    $pdf->SetTextColor(0, 40, 90); // Color #00285a
    $eventoY = 215.9 * 0.21; // 21% desde arriba
    $pdf->SetXY(20, $eventoY);

    $textoEvento = mb_strtoupper($articuloEvento . ' ' . $certificate['event_name'], 'UTF-8');
    
    // Ajustar texto largo con salto de línea automático (50% del ancho)
    $anchoEvento = 279.4 * 0.5; // 50% del ancho total
    $pdf->MultiCell(
        $anchoEvento,
        8, // Altura de línea
        $textoEvento,
        0,
        'C', // Centrado
        false,
        1,
        (279.4 - $anchoEvento) / 2, // Centrar horizontalmente
        $eventoY,
        true,
        0,
        false,
        true,
        0,
        'M'
    );

    // Texto "Otorga el presente" - posición ajustada (top: 35%)
    $pdf->SetFont('times', '', 16); // Times Normal, tamaño equivalente a 1.2vw
    $pdf->SetTextColor(74, 85, 104); // Color #4a5568
    $otorgadoY = 215.9 * 0.35;
    $pdf->SetXY(20, $otorgadoY);
    $pdf->Cell(239.4, 8, 'Otorga el presente', 0, 1, 'C');

    // Tipo de documento - posición ajustada (top: 39%)
    $pdf->SetFont('times', 'B', 19); // Times Bold, tamaño equivalente a 1.4vw
    $pdf->SetTextColor(0, 40, 90); // Color #00285a
    $tipoY = 215.9 * 0.39;
    $pdf->SetXY(20, $tipoY);
    $pdf->Cell(239.4, 10, mb_strtoupper($certificate['tipo_documento'] . ' A', 'UTF-8'), 0, 1, 'C');

    // Nombre estudiante - posición ajustada (top: 44%)
    $pdf->SetFont('times', 'B', 30); // Times Bold, tamaño equivalente a 2.2vw
    $pdf->SetTextColor(0, 40, 90); // Color #00285a
    $nombreY = 215.9 * 0.44;
    $pdf->SetXY(20, $nombreY);
    $pdf->Cell(239.4, 12, mb_strtoupper($certificate['nombre_estudiante'], 'UTF-8'), 0, 1, 'C');

    // ID estudiante - posición ajustada (top: 49%)
    $pdf->SetFont('times', '', 16); // Times Normal, tamaño equivalente a 1.2vw
    $pdf->SetTextColor(74, 85, 104); // Color #4a5568
    $idY = 215.9 * 0.49;
    $pdf->SetXY(20, $idY);
    $pdf->Cell(239.4, 8, 'ID: ' . $certificate['id_estudiante'], 0, 1, 'C');

    // Texto "por haber culminado..." con motivo personalizado - posición ajustada (top: 55%)
    $pdf->SetFont('times', '', 16); // Times Normal, tamaño equivalente a 1.2vw
    $pdf->SetTextColor(74, 85, 104); // Color #4a5568
    $culminadoY = 215.9 * 0.55;
    $pdf->SetXY(20, $culminadoY);
    
    // Usar la variable motivo si existe, sino mantener el texto original
    if (!empty($certificate['motivo'])) {
        $textoculminado = $certificate['motivo'];
    } else {
        $textoculminado = "por haber culminado satisfactoriamente los requisitos de " . $articuloConcepto;
    }
    
    $pdf->Cell(239.4, 8, $textoculminado, 0, 1, 'C');

    // Concepto - posición ajustada (top: 61%) con manejo multilínea
    $pdf->SetFont('times', 'B', 19); // Times Bold, tamaño equivalente a 1.4vw
    $pdf->SetTextColor(45, 55, 72); // Color #2d3748
    $conceptoY = 215.9 * 0.61;
    
    $conceptoTexto = mb_strtoupper($certificate['concepto'], 'UTF-8');
    $anchoConcepto = 279.4 * 0.76; // 76% del ancho (equivale al width: 76% del HTML)
    $xConcepto = (279.4 - $anchoConcepto) / 2; // Centrar horizontalmente
    
    $pdf->SetXY($xConcepto, $conceptoY);
    $pdf->MultiCell(
        $anchoConcepto,
        9, // Altura de línea (line-height: 1.3)
        $conceptoTexto,
        0,
        'C', // Centrado
        false,
        1,
        $xConcepto,
        $conceptoY,
        true,
        0,
        false,
        true,
        0,
        'M'
    );

    // Obtener posición Y actual después del concepto
    $currentY = $pdf->GetY();

    // Horas y créditos - posición ajustada (top: 67%)
    if (!empty($certificate['horas_academicas']) && !empty($certificate['creditos'])) {
        $pdf->SetFont('times', '', 14); // Times Normal, tamaño equivalente a 1vw
        $pdf->SetTextColor(74, 85, 104); // Color #4a5568
        $detallesY = max($currentY + 5, 215.9 * 0.67); // Usar la mayor de las dos posiciones
        $pdf->SetXY(20, $detallesY);
        $pdf->Cell(239.4, 8, 
            "Con una duración total de {$certificate['horas_academicas']} horas académicas, equivalente a {$certificate['creditos']} créditos.", 
            0, 1, 'C'
        );
        $currentY = $pdf->GetY();
    }

    // Fechas del período - posición ajustada (top: 72%)
    $pdf->SetFont('times', '', 14); // Times Normal, tamaño equivalente a 1vw
    $pdf->SetTextColor(74, 85, 104); // Color #4a5568
    $fechasY = max($currentY + 5, 215.9 * 0.72);
    $pdf->SetXY(20, $fechasY);
    $pdf->Cell(239.4, 8, 'Desarrollado del ' . $certificate['fecha_inicio'] . ' al ' . $certificate['fecha_fin'], 0, 1, 'C');
    $currentY = $pdf->GetY();

    // Fecha de emisión - posición fija para evitar superposición con firmas
    $pdf->SetFont('times', '', 12);
    $pdf->SetTextColor(113, 128, 150);
    $emisionY = 160; // Posición fija ajustada
    $pdf->SetXY(20, $emisionY);
    $pdf->Cell(239.4, 8, formatearFechaEmision($certificate['fecha_emision']), 0, 1, 'C');

    // Firma - posición ajustada (bottom: 8%, centrada)
    if (!empty($certificate['signature_url']) && file_exists($certificate['signature_url'])) {
        $firmaY = 215.9 * 0.83; // Posicionar las firmas en 83% desde arriba
        $firmaWidth = 279.4 * 0.20; // 20% del ancho total
        $firmaX = (279.4 - $firmaWidth) / 2; // Centrar horizontalmente
        $pdf->Image($certificate['signature_url'], $firmaX, $firmaY, $firmaWidth, 0);
    }

    // ========== CÓDIGO QR DINÁMICO CON TCPDF ==========
    // Posición del QR: esquina inferior derecha (bottom: 2%, right: 2%)
    $qrSize = 279.4 * 0.08; // 8% del ancho total
    $qrX = 279.4 * 0.98 - $qrSize; // right: 2%
    $qrY = 215.9 * 0.98 - $qrSize - 8; // Ajustado para dejar espacio al texto
    
    // Dibujar rectángulo blanco de fondo con bordes redondeados
    $pdf->SetFillColor(255, 255, 255); // Blanco
    $pdf->SetLineStyle(array('width' => 0.3, 'color' => array(220, 220, 220))); // Borde gris claro
    $fondoX = $qrX - 2;
    $fondoY = $qrY - 2;
    $fondoWidth = $qrSize + 4;
    $fondoHeight = $qrSize + 8; // Incluye espacio para el texto
    $pdf->RoundedRect($fondoX, $fondoY, $fondoWidth, $fondoHeight, 2, '1111', 'DF');
    
    // Configuración del estilo del QR
    $qrStyle = array(
        'border' => 0,
        'vpadding' => 'auto',
        'hpadding' => 'auto',
        'fgcolor' => array(0, 0, 0),
        'bgcolor' => array(255, 255, 255),
        'module_width' => 1,
        'module_height' => 1
    );
    
    // Generar el código QR con la URL de verificación
    $pdf->write2DBarcode($verificationUrl, 'QRCODE,M', $qrX, $qrY, $qrSize, $qrSize, $qrStyle, 'N');
    
    // Agregar texto "Escanea para verificar" debajo del QR
    $pdf->SetFont('helvetica', '', 7);
    $pdf->SetTextColor(51, 51, 51); // Color #333
    $textoQrY = $qrY + $qrSize + 1; // Posición justo debajo del QR
    $pdf->SetXY($fondoX, $textoQrY);
    $pdf->Cell($fondoWidth, 4, 'Escanea para verificar', 0, 0, 'C');

    // Descargar PDF
    $pdf->Output('Certificado_' . $certificate['id'] . '.pdf', 'D');

} catch (PDOException $e) {
    die("Error de base de datos: " . $e->getMessage());
} catch (Exception $e) {
    die("Error al generar el PDF: " . $e->getMessage());
}

?>