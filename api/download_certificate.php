<?php

// Incluye las bibliotecas y el archivo de configuración necesarios
require_once "api/config.php";
require_once "vendor/autoload.php";

// Valida la entrada del usuario
if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    die("ID de certificado no válido.");
}

$id = $_GET['id'];

try {
    // Obtiene los datos del certificado desde la base de datos
    $sql = "SELECT * FROM certificates WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$id]);
    $certificate = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$certificate) {
        die("Certificado no encontrado.");
    }

    // Crear una nueva instancia de TCPDF con dimensiones personalizadas (11 x 8.5 pulgadas)
    // 11 pulgadas = 279.4 mm, 8.5 pulgadas = 215.9 mm
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

    // Texto "Certificado" - SUBIDO de Y=75 a Y=65
    $pdf->SetFont('helvetica', '', 12);
    $pdf->SetTextColor(0, 0, 0);
    $pdf->SetXY(20, 65);
    $pdf->Cell(239.4, 10, 'Certificado', 0, 1, 'C');
    
    // Texto de culminación - SUBIDO de Y=83 a Y=73
    $pdf->SetFont('helvetica', '', 12);
    $pdf->SetXY(20, 73);
    $pdf->Cell(239.4, 10, 'por haber culminado satisfactoriamente los requisitos a:', 0, 1, 'C');

    // Nombre del estudiante (ajustado para flotar sobre la línea dorada)
    $pdf->SetFont('helvetica', 'B', 25);
    $pdf->SetTextColor(26, 54, 93);
    $pdf->SetXY(20, 87);
    $pdf->Cell(239.4, 10, htmlspecialchars($certificate['nombre_estudiante']), 0, 1, 'C');

    // ID del estudiante (ajustado para flotar sobre la línea dorada)
    $pdf->SetFont('helvetica', '', 11);
    $pdf->SetTextColor(74, 85, 104);
    $pdf->SetXY(20, 95);
    $pdf->Cell(239.4, 10, 'ID: ' . htmlspecialchars($certificate['id_estudiante']), 0, 1, 'C');
    
    // En concepto de
    $pdf->SetFont('helvetica', '', 13);
    $pdf->SetTextColor(0, 0, 0);
    $pdf->SetXY(20, 120);
    $pdf->Cell(239.4, 10, 'En concepto de', 0, 1, 'C');

    // Concepto del curso
    $pdf->SetFont('helvetica', 'B', 16);
    $pdf->SetTextColor(45, 55, 72);
    $pdf->SetXY(20, 130);
    $pdf->Cell(239.4, 10, htmlspecialchars($certificate['concepto']), 0, 1, 'C');

    // Horas y créditos
    $pdf->SetFont('helvetica', '', 11);
    $pdf->SetTextColor(74, 85, 104);
    $pdf->SetXY(20, 148);
    $pdf->Cell(239.4, 10, 'Con una duración total de ' . htmlspecialchars($certificate['horas_academicas']) . ' horas académicas, equivalente a ' . htmlspecialchars($certificate['creditos']) . ' créditos.', 0, 1, 'C');

    // Fechas
    $pdf->SetFont('helvetica', '', 10);
    $pdf->SetTextColor(74, 85, 104);
    $pdf->SetXY(20, 156);
    $pdf->Cell(239.4, 10, 'De ' . htmlspecialchars($certificate['fecha_inicio']) . ' hasta ' . htmlspecialchars($certificate['fecha_fin']), 0, 1, 'C');

    // Fecha de emisión
    $pdf->SetFont('helvetica', '', 9);
    $pdf->SetTextColor(113, 128, 150);
    $pdf->SetXY(20, 175);
    $pdf->Cell(239.4, 10, 'Emitido el: ' . htmlspecialchars($certificate['fecha_emision']), 0, 1, 'C');
    
    // QR Code (posición sin cambios)
    $qr_code_path = 'api/qrcodes/' . $certificate['id'] . '.png';
    if (file_exists($qr_code_path)) {
        // La posición del QR se ajusta para la esquina inferior derecha
        $x = 279.4 - 40;
        $y = 215.9 - 40;
        $pdf->Image($qr_code_path, $x, $y, 30, 30);
    }

    // Enviar el PDF al navegador con la cabecera 'D' para forzar la descarga
    $pdf->Output('Certificado_' . $certificate['id'] . '.pdf', 'D');

} catch (PDOException $e) {
    die("Error de base de datos: " . $e->getMessage());
} catch (Exception $e) {
    die("Error al generar el PDF: " . $e->getMessage());
}
?>