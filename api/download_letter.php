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
    
    // Asegurar que el texto esté en UTF-8
    $cleanText = mb_convert_encoding($text, 'UTF-8', 'UTF-8');
    return $cleanText;
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
    
    if (!$letter) {
        die("Carta no encontrada.");
    }
    
    // Asegurar UTF-8 en todos los campos de texto
    foreach ($letter as $key => $value) {
        if (is_string($value)) {
            $letter[$key] = mb_convert_encoding($value, 'UTF-8', 'UTF-8');
        }
    }
    
    $backgroundPath = 'assets/cartas/carta.jpg';
    if (!file_exists($backgroundPath)) {
        die("Plantilla de carta no encontrada.");
    }
    
    // Crear PDF con configuración UTF-8
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
    
    // Logo de la carta (si existe) - Posición ajustada según el HTML
    if (!empty($letter['logo_url']) && file_exists($letter['logo_url'])) {
        $pdf->Image($letter['logo_url'], 10.5, 14.85, 25.2, 16.8); // 5% left, 5% top, max-width: 120px, max-height: 80px
    }
    
    // Encabezado con fecha en línea - Posición: top: 8%; right: 8%
    $pdf->SetFont('times', '', 9); // 0.75vw equivalente
    $pdf->SetTextColor(0, 0, 0);
    $fechaTexto = safeOutputPDF($letter['lugar']) . ', ' . safeOutputPDF($letter['fecha_expedicion']);
    $pdf->SetXY(110, 23.76); // Ajustado para alineación derecha
    $pdf->Cell(84, 6, $fechaTexto, 0, 1, 'R');
    
    // Línea del firmante - Posición: top: 30%; centrado
    $pdf->SetFont('times', 'B', 9); // 0.75vw equivalente, font-weight: 600
    $pdf->SetTextColor(0, 0, 0);
    $firmanteTexto = 'EL SUSCRITO, ' . safeOutputPDF($letter['firmante']) . ', ' . safeOutputPDF($letter['cargo']) . ' de ' . safeOutputPDF($letter['institucion']);
    $pdf->SetXY(21, 89.1); // top: 30%
    $pdf->Cell(168, 6, $firmanteTexto, 0, 1, 'C');
    
    // EMITE CONSTANCIA QUE - Posición: top: 35%; centrado
    $pdf->SetFont('times', 'B', 10.8); // 0.9vw equivalente
    $pdf->SetTextColor(0, 0, 0);
    $pdf->SetXY(21, 103.95); // top: 35%
    $pdf->Cell(168, 6, 'EMITE CONSTANCIA QUE:', 0, 1, 'C');
    
    // Tipo de constancia - Posición: top: 19%; centrado
    $pdf->SetFont('times', 'B', 10.8); // 0.9vw equivalente
    $pdf->SetTextColor(0, 0, 0);
    $tipoConstancia = mb_strtoupper(safeOutputPDF($letter['tipo_constancia']), 'UTF-8');
    $pdf->SetXY(21, 56.43); // top: 19%
    $pdf->Cell(168, 6, $tipoConstancia, 0, 1, 'C');
    
    // Nombre del participante - Posición: top: 42%; centrado
    $pdf->SetFont('times', 'B', 13.2); // 1.1vw equivalente
    $pdf->SetTextColor(0, 0, 0);
    $nombreParticipante = mb_strtoupper(safeOutputPDF($letter['participante']), 'UTF-8');
    $pdf->SetXY(21, 124.74); // top: 42%
    $pdf->Cell(168, 6, $nombreParticipante, 0, 1, 'C');
    
    // DNI/Cédula - Posición: top: 45%; centrado
    $pdf->SetFont('times', '', 9.6); // 0.8vw equivalente
    $pdf->SetTextColor(0, 0, 0);
    $pdf->SetXY(21, 133.65); // top: 45%
    $pdf->Cell(168, 6, 'No. Cédula/DNI ' . safeOutputPDF($letter['dni_cedula']), 0, 1, 'C');
    
    // "se encuentra inscrito en el" - Posición: top: 47.5%; centrado
    $pdf->SetFont('times', '', 9); // 0.75vw equivalente
    $pdf->SetTextColor(0, 0, 0);
    $pdf->SetXY(21, 141.075); // top: 47.5%
    $pdf->Cell(168, 6, 'se encuentra inscrito en el', 0, 1, 'C');
    
    // Nombre del evento - Posición: top: 50%; centrado
    if (!empty($letter['event_name'])) {
        $pdf->SetFont('times', 'B', 9.6); // 0.8vw equivalente
        $pdf->SetTextColor(0, 0, 0);
        $eventName = mb_strtoupper(safeOutputPDF($letter['event_name']), 'UTF-8');
        $pdf->SetXY(21, 148.5); // top: 50%
        $pdf->Cell(168, 12, $eventName, 0, 1, 'C'); // Altura aumentada para line-height: 1.2
    }
    
    // Párrafo completo justificado - Posición: top: 55%; justificado
    $pdf->SetFont('times', '', 9); // 0.75vw equivalente
    $pdf->SetTextColor(0, 0, 0);
    
    // Construir el párrafo completo - CAMBIO AQUÍ: extraer solo el día de la fecha para poner (días) después
    $fechaExpedicion = safeOutputPDF($letter['fecha_expedicion']);
    
    // Extraer el día (asumiendo formato "17 de septiembre de 2025")
    $partesfecha = explode(' ', $fechaExpedicion);
    $dia = $partesfecha[0]; // Primer elemento es el día
    $restoFecha = substr($fechaExpedicion, strlen($dia)); // El resto de la fecha
    
    $parrafoCompleto = 'El cual se estará desarrollando a partir del ' . safeOutputPDF($letter['fecha_inicio']) . 
                      ' y culminará en el ' . safeOutputPDF($letter['fecha_final']) . safeOutputPDF($letter['ano']) . 
                      '. Para acreditar la veracidad de este documento, realice su solicitud al correo: ' . safeOutputPDF($letter['correo']) . 
                      '. Se expide el presente certificado a los ' . $dia . ' (días)' . $restoFecha . 
                      ', para los fines que estime conveniente.';
    
    // Usar MultiCell para texto justificado
    $pdf->SetXY(16.8, 163.35); // left: 8%, top: 55%
    $pdf->MultiCell(176.4, 5, $parrafoCompleto, 0, 'J', false, 1, '', '', true, 0, false, true, 25, 'T'); // width: 84%, justified
    
    // "Atentamente," - Posición: top: 76%
    $pdf->SetFont('times', '', 9); // 0.75vw equivalente, font-weight: 500
    $pdf->SetTextColor(0, 0, 0);
    $pdf->SetXY(16.8, 225.72); // top: 76%, left: 8%
    $pdf->Cell(50, 6, 'Atentamente,', 0, 1, 'L');
    
    // Firma de la carta (si existe) - Posición: bottom: 15%; left: 20%
    if (!empty($letter['signature_url']) && file_exists($letter['signature_url'])) {
        $pdf->Image($letter['signature_url'], 42, 252.45, 42, 16.8); // left: 20%, bottom: 15%, max-width: 200px, max-height: 80px
    }
    
    // Generar y descargar el PDF
    $filename = 'Carta_' . safeOutputPDF($letter['participante']) . '_' . $letter['id'] . '.pdf';
    $pdf->Output($filename, 'D');
    
} catch (PDOException $e) {
    die("Error de base de datos: " . $e->getMessage());
} catch (Exception $e) {
    die("Error al generar el PDF: " . $e->getMessage());
}
?>