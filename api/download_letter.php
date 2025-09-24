<?php
// Forzar UTF-8 - MEJORADO
ini_set('default_charset', 'UTF-8');
mb_internal_encoding('UTF-8');

require_once "api/config.php";
require_once "vendor/autoload.php";

// Verificar que la conexión PDO tenga UTF-8 configurado
$pdo->exec("SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci");

if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    die("ID de carta no válido.");
}

$id = $_GET['id'];

// Función helper para salida segura de texto UTF-8
function safeOutputPDF($text, $fallback = '') {
    if (empty($text)) return $fallback;
    return mb_convert_encoding($text, 'UTF-8', 'UTF-8');
}

// Función para agregar "(días)" después del día
function agregarDias($fecha) {
    $partes = explode(' ', $fecha);
    $dia = $partes[0];
    $resto = substr($fecha, strlen($dia));
    return $dia . ' (días)' . $resto;
}

try {
    $sql = "
    SELECT 
        l.*, 
        e.name AS event_name
    FROM 
        letters l
    LEFT JOIN 
        events e ON l.event_id = e.id
    WHERE 
        l.id = ?
    ";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$id]);
    $letter = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$letter) die("Carta no encontrada.");
    
    // Asegurar UTF-8 en todos los campos
    foreach ($letter as $key => $value) {
        if (is_string($value)) $letter[$key] = mb_convert_encoding($value, 'UTF-8', 'UTF-8');
    }

    $backgroundPath = 'assets/cartas/carta.jpg';
    if (!file_exists($backgroundPath)) die("Plantilla de carta no encontrada.");

    $pdf = new TCPDF('P', 'mm', 'A4', true, 'UTF-8', false);
    $pdf->SetCreator(PDF_CREATOR);
    $pdf->SetAuthor('Relatic Panamá');
    $pdf->SetTitle('Carta ' . safeOutputPDF($letter['participante']));
    $pdf->SetSubject('Carta de Constancia o Aceptación');

    $pdf->setPrintHeader(false);
    $pdf->setPrintFooter(false);
    $pdf->SetMargins(0, 0, 0);
    $pdf->SetAutoPageBreak(false, 0);
    $pdf->AddPage();

    // Imagen de fondo
    $pdf->Image($backgroundPath, 0, 0, 210, 297, '', '', '', false, 300, '', false, false, 0);

    // Logo (si existe)
    if (!empty($letter['logo_url']) && file_exists($letter['logo_url'])) {
        $pdf->Image($letter['logo_url'], 10.5, 14.85, 25.2, 16.8);
    }

    // Encabezado: lugar y fecha
    $pdf->SetFont('times', '', 9);
    $pdf->SetTextColor(0,0,0);
    $fechaTexto = safeOutputPDF($letter['lugar']) . ', ' . safeOutputPDF($letter['fecha_expedicion']);
   $pdf->SetXY(120, 45); // 🔹 Más a la izquierda (120 en vez de 110) y más abajo (35 en vez de 23.76)
$pdf->Cell(70, 6, $fechaTexto, 0, 1, 'R'); // 🔹 Ajustamos ancho a 70 para evitar que choque


    // Línea de firmantes
    $lista_firmantes = array_map('trim', explode(",", $letter['firmante']));
    $cantidad = count($lista_firmantes);
    if ($cantidad === 1) {
        $articulo = "El suscrito";
        $texto_firmantes = $lista_firmantes[0];
    } else {
        $articulo = "Los suscritos";
        $ultimo = array_pop($lista_firmantes);
        $texto_firmantes = implode(", ", $lista_firmantes) . " y " . $ultimo;
    }
    $firmanteTexto = $articulo . ', ' . safeOutputPDF($texto_firmantes) . ', ' . safeOutputPDF($letter['cargo']) . ' de ' . safeOutputPDF($letter['institucion']);
    $pdf->SetFont('times', 'B', 9);
    $pdf->SetXY(21, 89.1);
    $pdf->Cell(168, 6, $firmanteTexto, 0, 1, 'C');

    // Tipo de constancia
    $tipoConstancia = mb_strtoupper(safeOutputPDF($letter['tipo_constancia']), 'UTF-8');
    $pdf->SetFont('times', 'B', 10.8);
    $pdf->SetXY(21, 56.43);
    $pdf->Cell(168, 6, $tipoConstancia, 0, 1, 'C');

    // EMITE/EMITEN [tipo_constancia] QUE:
    $pdf->SetFont('times', 'B', 10.8);
    $pdf->SetXY(21, 103.95);
    $verbo_emite = ($cantidad === 1) ? "EMITE" : "EMITEN";
    $pdf->Cell(168, 6, $verbo_emite . ' ' . $tipoConstancia . ' QUE:', 0, 1, 'C');

    // Nombre del participante
    $nombreParticipante = mb_strtoupper(safeOutputPDF($letter['participante']), 'UTF-8');
    $pdf->SetFont('times', 'B', 13.2);
    $pdf->SetXY(21, 124.74);
    $pdf->Cell(168, 6, $nombreParticipante, 0, 1, 'C');

    // DNI/Cédula
    $pdf->SetFont('times', '', 9.6);
    $pdf->SetXY(21, 133.65);
    $pdf->Cell(168, 6, 'No. Cédula/DNI ' . safeOutputPDF($letter['dni_cedula']), 0, 1, 'C');

    // inscripcion_texto
    if (!empty($letter['inscripcion_texto'])) {
        $pdf->SetFont('times', '', 9);
        $pdf->SetXY(21, 141); // Posición aproximada
        $pdf->MultiCell(168, 5, safeOutputPDF($letter['inscripcion_texto']), 0, 'C', false, 1);
    }

    // Nombre del evento
    if (!empty($letter['event_name'])) {
        $pdf->SetFont('times', 'B', 9.6);
        $eventName = mb_strtoupper(safeOutputPDF($letter['event_name']), 'UTF-8');
        $pdf->SetXY(21, 148.5);
        $pdf->Cell(168, 12, $eventName, 0, 1, 'C');
    }

    // Fechas dinámicas
    $hoy = date('Y-m-d');
    $fechaInicio = $letter['fecha_inicio'];
    $fechaFinal = $letter['fecha_final'];
    if ($fechaInicio > $hoy) {
        $texto_inicio_evento = "El evento comenzará el";
        $texto_fin_evento = "y finalizará el";
    } elseif ($fechaFinal < $hoy) {
        $texto_inicio_evento = "El evento se desarrolló desde el";
        $texto_fin_evento = "hasta el";
    } else {
        $texto_inicio_evento = "El evento se está desarrollando desde el";
        $texto_fin_evento = "y culminará el";
    }

    $pdf->SetFont('times', '', 9);
    $pdf->SetXY(16.8, 163.35);
    $parrafo = $texto_inicio_evento . ' ' . safeOutputPDF($letter['fecha_inicio']) . ' ' . $texto_fin_evento . ' ' . safeOutputPDF($letter['fecha_final']) . ' ' . safeOutputPDF($letter['ano']) . '. Para acreditar la veracidad de este documento, realice su solicitud al correo: ' . safeOutputPDF($letter['correo']) . '. Se expide el presente documento a los ' . agregarDias($letter['fecha_expedicion']) . ', para los fines que estime conveniente.';
    $pdf->MultiCell(176.4, 5, $parrafo, 0, 'J', false, 1, '', '', true, 0, false, true, 25, 'T');

    // "Atentamente,"
    $pdf->SetFont('times', '', 9);
    $pdf->SetXY(16.8, 225.72);
    $pdf->Cell(50, 6, 'Atentamente,', 0, 1, 'L');

    // Firma
    if (!empty($letter['signature_url']) && file_exists($letter['signature_url'])) {
        $pdf->Image($letter['signature_url'], 42, 252.45, 42, 16.8);
    }

    // Descargar PDF
    $filename = 'Carta_' . safeOutputPDF($letter['participante']) . '_' . $letter['id'] . '.pdf';
    $pdf->Output($filename, 'D');

} catch (PDOException $e) {
    die("Error de base de datos: " . $e->getMessage());
} catch (Exception $e) {
    die("Error al generar el PDF: " . $e->getMessage());
}
?>
