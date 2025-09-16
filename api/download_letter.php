<?php
// Incluye las bibliotecas y el archivo de configuración necesarios
require_once "api/config.php";
require_once "vendor/autoload.php";

// Valida la entrada del usuario
if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    die("ID de carta no válido.");
}

$id = $_GET['id'];

try {
    // Obtiene los datos de la carta y del evento en una sola consulta
    // Usando LEFT JOIN para mantener compatibilidad con cartas que no tengan event_id
    $sql = "
    SELECT 
        l.*, 
        e.name AS event_name, 
        e.logo_url, 
        e.signature_url
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

    // Ruta de la imagen de fondo de la carta
    $backgroundPath = 'assets/cartas/carta.jpg';
    if (!file_exists($backgroundPath)) {
        die("Plantilla de carta no encontrada.");
    }

    // Crear una nueva instancia de TCPDF
    $pdf = new TCPDF('P', 'mm', 'A4', true, 'UTF-8', false);

    // Configuración del PDF
    $pdf->SetCreator(PDF_CREATOR);
    $pdf->SetAuthor('Relatic Panamá');
    $pdf->SetTitle('Carta ' . $letter['nombre_completo']);
    $pdf->SetSubject('Carta de Constancia o Aceptación');
    $pdf->SetKeywords('Carta, PHP, PDF, ' . $letter['nombre_completo']);

    // Eliminar cabecera y pie de página por defecto
    $pdf->setPrintHeader(false);
    $pdf->setPrintFooter(false);
    
    // Configurar márgenes a 0
    $pdf->SetMargins(0, 0, 0);
    $pdf->SetAutoPageBreak(false, 0);

    // Añadir página y fondo
    $pdf->AddPage();
    $pdf->Image($backgroundPath, 0, 0, 210, 297, '', '', '', false, 300, '', false, false, 0);

    // --- Añadir los datos de la carta sobre la imagen ---

    // Logo del evento (si existe)
    if (!empty($letter['logo_url']) && file_exists($letter['logo_url'])) {
        $pdf->Image($letter['logo_url'], 15, 15, 25, 0);
    }

    // Nombre del evento (si existe)
    if (!empty($letter['event_name'])) {
        $pdf->SetFont('times', 'B', 14);
        $pdf->SetTextColor(0, 40, 90);
        $pdf->SetXY(45, 20);
        $pdf->Cell(120, 8, htmlspecialchars($letter['event_name']), 0, 1, 'L');
    }

    // === CONTENIDO PRINCIPAL DE LA CARTA ===

    // Fecha de expedición (parte superior derecha)
    $pdf->SetFont('times', '', 12);
    $pdf->SetTextColor(0, 0, 0);
    $pdf->SetXY(130, 35);
    $pdf->Cell(60, 8, htmlspecialchars($letter['fecha_expedicion']), 0, 1, 'C');

    // Nombre completo (campo principal)
    $pdf->SetFont('times', 'B', 18);
    $pdf->SetTextColor(0, 40, 90);
    $pdf->SetXY(40, 115);
    $pdf->Cell(50, 10, htmlspecialchars($letter['nombre_completo']), 0, 1, 'C');

    // DNI/Cédula
    $pdf->SetFont('times', '', 14);
    $pdf->SetTextColor(0, 0, 0);
    $pdf->SetXY(130, 115);
    $pdf->Cell(30, 8, htmlspecialchars($letter['dni_cedula']), 0, 1, 'C');

    // Tipo de constancia
    $pdf->SetFont('times', '', 16);
    $pdf->SetTextColor(0, 40, 90);
    $pdf->SetXY(75, 125);
    $pdf->Cell(50, 8, htmlspecialchars($letter['tipo_constancia']), 0, 1, 'C');

    // Fecha de inicio
    $pdf->SetFont('times', '', 14);
    $pdf->SetTextColor(0, 0, 0);
    $pdf->SetXY(40, 135);
    $pdf->Cell(30, 8, htmlspecialchars($letter['fecha_inicio']), 0, 1, 'C');

    // Fecha final
    $pdf->SetXY(95, 135);
    $pdf->Cell(30, 8, htmlspecialchars($letter['fecha_final']), 0, 1, 'C');

    // Fecha de expedición (campo inferior)
    $pdf->SetFont('times', '', 12);
    $pdf->SetTextColor(113, 128, 150);
    $pdf->SetXY(115, 170);
    $pdf->Cell(60, 8, htmlspecialchars($letter['fecha_expedicion']), 0, 1, 'C');

    // === ÁREA DE FIRMAS ===

    // Firma del evento (si existe)
    if (!empty($letter['signature_url']) && file_exists($letter['signature_url'])) {
        $pdf->Image($letter['signature_url'], 85, 240, 40, 0);
        
        // Línea para la firma
        $pdf->Line(75, 260, 135, 260);
        
        // Texto bajo la firma
        $pdf->SetFont('times', '', 10);
        $pdf->SetTextColor(0, 0, 0);
        $pdf->SetXY(75, 262);
        $pdf->Cell(60, 5, 'Autoridad Competente', 0, 1, 'C');
    }

    // Forzar descarga del PDF
    $pdf->Output('Carta_' . $letter['id'] . '.pdf', 'D');

} catch (PDOException $e) {
    die("Error de base de datos: " . $e->getMessage());
} catch (Exception $e) {
    die("Error al generar el PDF: " . $e->getMessage());
}
?>