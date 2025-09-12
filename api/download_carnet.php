<?php
// Incluye las bibliotecas y el archivo de configuración necesarios
require_once "api/config.php";
require_once "vendor/autoload.php";

// Valida la entrada del usuario
if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    die("ID de carnet no válido.");
}

$id = $_GET['id'];

try {
    // Obtiene los datos del carnet en una sola consulta
    $sql = "
    SELECT 
        c.*
    FROM 
        carnets c
    WHERE 
        c.id = ?
    ";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$id]);
    $carnet = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$carnet) {
        die("Carnet no encontrado.");
    }
    
    // --- Configuración de TCPDF para las dimensiones del carnet (600x450 px) ---
    // 600 px = 158.75 mm
    // 450 px = 119.06 mm
    $pdf = new TCPDF('P', 'mm', array(158.75, 119.06), true, 'UTF-8', false);

    // Configurar el PDF (metadatos y estilos)
    $pdf->SetCreator(PDF_CREATOR);
    $pdf->SetAuthor('RELATIC');
    $pdf->SetTitle('Carnet ' . $carnet['nombre_completo']);
    $pdf->SetSubject('Carnet de Identificación');
    $pdf->SetKeywords('Carnet, Identificación, PHP, PDF, RELATIC');

    // Eliminar cabecera y pie de página por defecto
    $pdf->setPrintHeader(false);
    $pdf->setPrintFooter(false);
    
    // Configurar márgenes a 0
    $pdf->SetMargins(0, 0, 0);
    $pdf->SetAutoPageBreak(false, 0);

    // Añadir la imagen de fondo como plantilla
    $bg_image_path = 'assets/carnets/carnet.png';
    $pdf->AddPage();
    $pdf->Image($bg_image_path, 0, 0, 158.75, 119.06, '', '', '', false, 300, '', false, false, 0);
    
    // --- Añadir los datos del carnet sobre la imagen ---
    
    // Foto del miembro
    $photo_path = $carnet['foto_ruta'];
    if (!empty($photo_path) && file_exists($photo_path)) {
        // La posición de la foto debe ser ajustada a la plantilla
        // Las coordenadas son en mm, relativas a la esquina superior izquierda
        $pdf->Image($photo_path, 60, 20, 40, 40);
    }
    
    // Nombre completo
    $pdf->SetFont('helvetica', 'B', 14);
    $pdf->SetTextColor(26, 54, 93);
    $pdf->SetXY(20, 70);
    $pdf->Cell(118.75, 10, htmlspecialchars($carnet['nombre_completo']), 0, 1, 'C');

    // Cédula o DNI
    $pdf->SetFont('helvetica', '', 10);
    $pdf->SetTextColor(74, 85, 104);
    $pdf->SetXY(20, 80);
    $pdf->Cell(118.75, 10, 'Cédula: ' . htmlspecialchars($carnet['cedula_dni']), 0, 1, 'C');
    
    // Cargo o rol
    $pdf->SetFont('helvetica', 'B', 12);
    $pdf->SetTextColor(45, 55, 72);
    $pdf->SetXY(20, 90);
    $pdf->Cell(118.75, 10, htmlspecialchars($carnet['cargo_rol']), 0, 1, 'C');
    
    // ID del carnet (esquina inferior derecha)
    $pdf->SetFont('helvetica', '', 8);
    $pdf->SetTextColor(113, 128, 150);
    // Coordenadas absolutas: X = ancho total - margen - ancho del texto
    $pdf->SetXY(130, 110);
    $pdf->Cell(20, 5, 'ID: ' . htmlspecialchars($carnet['id']), 0, 1, 'R');

    // QR Code (si lo tienes)
    $qr_code_path = 'api/qrcodes/carnets/' . $carnet['id'] . '.png';
    if (file_exists($qr_code_path)) {
        // La posición del QR se ajusta para la esquina inferior izquierda
        $pdf->Image($qr_code_path, 10, 100, 20, 20);
    }

    // Enviar el PDF al navegador con la cabecera 'D' para forzar la descarga
    $pdf->Output('Carnet_' . $carnet['id'] . '.pdf', 'D');

} catch (PDOException $e) {
    die("Error de base de datos: " . $e->getMessage());
} catch (Exception $e) {
    die("Error al generar el PDF: " . $e->getMessage());
}
?>