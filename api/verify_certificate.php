<?php
// Incluye el archivo de configuración de la base de datos
require_once "api/config.php";

// Define un mensaje de error por defecto
$message = "Certificado no encontrado.";
$certificate = null;

if (isset($_GET['id']) && is_numeric($_GET['id'])) {
    $id = $_GET['id'];
    
    // Nueva consulta: Busca el certificado y une la tabla 'events' para obtener los datos del evento
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

    if ($certificate) {
        $message = "Certificado verificado exitosamente.";
    } else {
        $message = "El certificado con ID " . htmlspecialchars($id) . " no existe.";
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verificación de Certificado</title>
    <style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        background-color: #f0f0f0;
    }
    .certificate-container {
        position: relative;
        width: 95%;
        max-width: 900px;
        margin: auto;
        background-image: url('assets/certificates/certificate.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        /* Proporción 11 x 8.5 pulgadas en landscape: 11/8.5 = 1.294 */
        aspect-ratio: 1.294 / 1;
        box-shadow: 0 0 20px rgba(0,0,0,0.2);
    }
    .text-overlay {
        position: absolute;
        color: #000;
        font-weight: normal;
        text-align: center;
        line-height: 1.2;
        left: 50%;
        transform: translateX(-50%);
        width: 80%; /* Ancho general para los textos centrados */
        color: #4a5568;
    }

    /* Posiciones ajustadas para no superponer */
    /* Posición del logo del evento (arriba a la izquierda) */
    .event-logo-overlay {
        position: absolute;
        top: 2%;
        left: 3%;
        width: 15%;
        max-width: 100px;
        height: auto;
    }
    
    /* Posición del nombre del evento (justo debajo del logo y centrado) */
    .event-name-overlay {
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translateX(-50%);
        width: 60%;
        font-size: 1.5vw;
        font-weight: bold;
        color: #1a365d;
        text-align: center;
    }

    /* Reposición del texto "Certificado" para evitar superposición */
    .tipo-documento { top: 23%; font-size: 1.2vw; font-weight: 500; color: #4a5568; }
    .texto-culminado { top: 27%; font-size: 1.2vw; font-weight: 500; color: #4a5568; }

    /* Posición de los datos del estudiante */
    .nombre-estudiante { top: 35.5%; font-size: 2.5vw; font-weight: bold; color: #1a365d; }
    .id-estudiante { top: 44%; font-size: 1.1vw; color: #4a5568; }
    
    /* Posición de los datos del curso */
    .concepto-label { top: 55%; font-size: 1.3vw; font-weight: 500; }
    .concepto-value { top: 60%; font-size: 1.6vw; font-weight: 600; color: #2d3748; }
    .horas-creditos { top: 69%; font-size: 1.1vw; color: #4a5568; }
    .fechas-periodo { top: 72%; font-size: 1vw; color: #4a5568; }
    .fecha-emision { top: 81%; font-size: 0.9vw; color: #718096; }

    /* Reposición de la firma del evento para no superponerse con el texto */
    .event-signature-overlay {
        position: absolute;
        bottom: 8%;
        right: 15%;
        width: 18%;
        max-width: 150px;
        height: auto;
    }

    /* Posición del QR Code */
    .qr-code-overlay {
        position: absolute;
        bottom: 2%;
        right: 2%;
        width: 10%;
        max-width: 90px;
        height: auto;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    
    /* Media Queries - Mantenemos la coherencia en la adaptación */
    @media (max-width: 1024px) and (min-width: 769px) {
        .event-logo-overlay { top: 3%; left: 3%; width: 18%; max-width: 80px; }
        .event-name-overlay { top: 12%; font-size: 2.5vw; width: 65%; }
        .tipo-documento { font-size: 2vw; }
        .texto-culminado { font-size: 2vw; }
        .nombre-estudiante { font-size: 4vw; }
        .id-estudiante { font-size: 1.8vw; }
        .concepto-label { font-size: 2.2vw; }
        .concepto-value { font-size: 2.8vw; }
        .horas-creditos { font-size: 1.8vw; }
        .fechas-periodo { font-size: 1.6vw; }
        .fecha-emision { font-size: 1.4vw; }
        .event-signature-overlay { bottom: 10%; right: 15%; width: 22%; max-width: 120px; }
        .qr-code-overlay { width: 11%; max-width: 70px; }
    }
    @media (max-width: 768px) {
        .certificate-container { width: 98%; margin: 10px auto; }
        .event-logo-overlay { top: 4%; left: 3%; width: 22%; max-width: 60px; }
        .event-name-overlay { top: 15%; font-size: 3.5vw; width: 70%; }
        .tipo-documento { font-size: 2.5vw; }
        .texto-culminado { font-size: 2.5vw; }
        .nombre-estudiante { font-size: 5.5vw; top: 34.5%; }
        .id-estudiante { font-size: 2.2vw; }
        .concepto-label { font-size: 2.8vw; }
        .concepto-value { font-size: 3.5vw; }
        .horas-creditos { font-size: 2.2vw; }
        .fechas-periodo { font-size: 2vw; }
        .fecha-emision { font-size: 1.8vw; }
        .event-signature-overlay { bottom: 12%; right: 10%; width: 28%; max-width: 100px; }
        .qr-code-overlay { width: 12%; max-width: 50px; bottom: 3%; right: 3%; }
    }
    @media (max-width: 480px) {
        .certificate-container { width: 100%; margin: 5px auto; }
        .event-logo-overlay { top: 5%; left: 2%; width: 28%; max-width: 45px; }
        .event-name-overlay { top: 17%; font-size: 4.5vw; width: 75%; }
        .tipo-documento { font-size: 3vw; }
        .texto-culminado { font-size: 3vw; }
        .nombre-estudiante { font-size: 6.5vw; top: 33.5%; }
        .id-estudiante { font-size: 2.5vw; }
        .concepto-label { font-size: 3.2vw; }
        .concepto-value { font-size: 4vw; }
        .horas-creditos { font-size: 2.5vw; }
        .fechas-periodo { font-size: 2.3vw; }
        .fecha-emision { font-size: 2vw; }
        .event-signature-overlay { bottom: 14%; right: 8%; width: 35%; max-width: 80px; }
        .qr-code-overlay { width: 14%; max-width: 45px; bottom: 2%; right: 2%; }
    }
    .message-box {
        background-color: #fff;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        max-width: 600px;
        margin: 20px auto;
        text-align: center;
    }
    .success-message { color: #28a745; }
    .error-message { color: #dc3545; }
    .download-button {
        display: inline-block;
        margin-top: 15px;
        padding: 10px 20px;
        font-size: 16px;
        font-weight: bold;
        color: #fff;
        background-color: #007bff;
        border: none;
        border-radius: 5px;
        text-decoration: none;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    .download-button:hover {
        background-color: #0056b3;
    }
</style>
</head>
<body>

    <?php if ($certificate): ?>
        <div class="message-box">
            <h2 class="success-message">Certificado Verificado</h2>
            <p>La siguiente información coincide con nuestros registros.</p>
            <a href="download_certificate.php?id=<?php echo htmlspecialchars($certificate['id']); ?>" class="download-button" target="_blank">
                Descargar Certificado
            </a>
        </div>
        <div class="certificate-container">
            <?php if (!empty($certificate['logo_url'])): ?>
                <img src="<?php echo htmlspecialchars($certificate['logo_url']); ?>" alt="Logo del Evento" class="event-logo-overlay">
            <?php endif; ?>
            
            <div class="event-name-overlay"><?php echo htmlspecialchars($certificate['event_name']); ?></div>
            
            <div class="text-overlay tipo-documento"><?php echo htmlspecialchars($certificate['tipo_documento']); ?></div>
            <div class="text-overlay texto-culminado">por haber culminado satisfactoriamente los requisitos a:</div>
            
            <div class="text-overlay nombre-estudiante"><?php echo htmlspecialchars($certificate['nombre_estudiante']); ?></div>
            <div class="text-overlay id-estudiante">ID: <?php echo htmlspecialchars($certificate['id_estudiante']); ?></div>
            
            <div class="text-overlay concepto-label">En concepto de</div>
            <div class="text-overlay concepto-value"><?php echo htmlspecialchars($certificate['concepto']); ?></div>
            
            <div class="text-overlay horas-creditos">Con una duración total de <?php echo htmlspecialchars($certificate['horas_academicas']); ?> horas académicas, equivalente a <?php echo htmlspecialchars($certificate['creditos']); ?> créditos.</div>
            
            <div class="text-overlay fechas-periodo">De <?php echo htmlspecialchars($certificate['fecha_inicio']); ?> hasta <?php echo htmlspecialchars($certificate['fecha_fin']); ?></div>
            <div class="text-overlay fecha-emision">Emitido el: <?php echo htmlspecialchars($certificate['fecha_emision']); ?></div>
            
            <?php if (!empty($certificate['signature_url'])): ?>
                <img src="<?php echo htmlspecialchars($certificate['signature_url']); ?>" alt="Firma del Evento" class="event-signature-overlay">
            <?php endif; ?>

            <img src="api/qrcodes/<?php echo htmlspecialchars($certificate['id']); ?>.png" alt="Código QR del certificado" class="qr-code-overlay">
        </div>
    <?php else: ?>
        <div class="message-box">
            <h2 class="error-message">Error en la Verificación</h2>
            <p><?php echo htmlspecialchars($message); ?></p>
        </div>
    <?php endif; ?>

</body>
</html>