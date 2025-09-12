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
            font-family: 'Times New Roman', Times, serif;
            margin: 0;
            padding: 0;
            background-color: #f0f0f0;
        }
        .certificate-container {
            position: relative;
            width: 95%;
            max-width: 1000px;
            margin: 20px auto;
            background-image: url('assets/certificates/certificate.png');
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            aspect-ratio: 1.294 / 1;
            box-shadow: 0 0 20px rgba(0,0,0,0.2);
            overflow: hidden;
        }
        .text-overlay {
            position: absolute;
            color: #000;
            font-weight: normal;
            text-align: center;
            line-height: 1.2;
            left: 50%;
            transform: translateX(-50%);
            width: 80%;
            color: #4a5568;
            z-index: 10;
        }
        
        /* Posiciones y estilos específicos para cada elemento */

        /* Logo del evento (a la izquierda, alineado con los otros logos) */
        .event-logo-overlay {
            position: absolute;
            top: 10.5%; /* Ajuste final para bajar el logo un poco más */
            left: 17%;
            width: 12%;
            height: auto;
            max-width: 150px;
        }

        /* Título del evento */
        .event-name-overlay {
            position: absolute;
            top: 21%;
            left: 50%;
            transform: translateX(-50%);
            width: 50%;
            font-size: 1.6vw;
            font-weight: bold;
            color: #00285a;
            text-align: center;
            text-transform: uppercase;
        }

        /* Texto "Otorga el presente" */
        .texto-otorgado {
            top: 33%;
            font-size: 1.2vw;
            font-weight: 500;
            color: #4a5568;
        }
        
        /* Tipo de documento "Certificado" */
        .tipo-documento {
            top: 36%;
            font-size: 1.4vw;
            font-weight: bold;
            color: #00285a;
            text-transform: uppercase;
        }
        
        /* Nombre del estudiante (flotando encima de la línea dorada) */
        .nombre-estudiante {
            top: 40%;
            font-size: 2.2vw;
            font-weight: bold;
            color: #00285a;
            text-transform: uppercase;
        }

        /* ID del estudiante (flotando encima de la línea dorada) */
        .id-estudiante {
            top: 45%;
            font-size: 1.2vw;
            color: #4a5568;
        }

        /* Texto "por haber culminado..." */
        .texto-culminado {
            top: 55%;
            font-size: 1.2vw;
            font-weight: 500;
            color: #4a5568;
        }

        /* Concepto (nombre del curso/evento) */
        .concepto-value {
            top: 61%;
            font-size: 1.8vw;
            font-weight: bold;
            color: #2d3748;
            text-transform: uppercase;
        }

        /* Detalles (horas, créditos, fechas) */
        .detalles-curso {
            top: 67%;
            font-size: 1vw;
            color: #4a5568;
            line-height: 1.5;
        }

        /* Fechas de periodo */
        .fechas-periodo {
            top: 72%;
            font-size: 1vw;
            color: #4a5568;
        }

        /* Fecha de emisión */
        .fecha-emision {
            top: 81%;
            font-size: 0.9vw;
            color: #718096;
        }

        /* Firma del evento (en el centro, más abajo) */
        .event-signature-overlay {
            position: absolute;
            bottom: 8%;
            left: 50%;
            transform: translateX(-50%);
            width: 20%;
            max-width: 200px;
            height: auto;
        }

        /* QR Code (esquina inferior derecha) */
        .qr-code-overlay {
            position: absolute;
            bottom: 2%;
            right: 2%;
            width: 8%;
            max-width: 80px;
            height: auto;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }

        /* Mensajes de verificación */
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
            
            <div class="text-overlay event-name-overlay">Cuarto Congreso de Investigaciones Cualitativas</div>
            
            <div class="text-overlay texto-otorgado">Otorga el presente</div>

            <div class="text-overlay tipo-documento">
                <?php echo htmlspecialchars($certificate['tipo_documento']); ?>
            </div>

            <div class="text-overlay nombre-estudiante">
                <?php echo htmlspecialchars($certificate['nombre_estudiante']); ?>
            </div>
            <div class="text-overlay id-estudiante">ID: <?php echo htmlspecialchars($certificate['id_estudiante']); ?></div>
            
            <div class="text-overlay texto-culminado">por haber culminado satisfactoriamente los requisitos del</div>
            
            <div class="text-overlay concepto-value"><?php echo htmlspecialchars($certificate['concepto']); ?></div>
            
            <div class="text-overlay detalles-curso">
                Con una duración total de <?php echo htmlspecialchars($certificate['horas_academicas']); ?> horas académicas, equivalente a <?php echo htmlspecialchars($certificate['creditos']); ?> créditos.
            </div>
            
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