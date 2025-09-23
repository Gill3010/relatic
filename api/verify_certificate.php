<?php
// Incluye el archivo de configuración de la base de datos
require_once "api/config.php";

// Función para formatear fecha

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
        // Determinar el artículo correcto para el nombre del evento
        $articuloEvento = obtenerArticuloDefinido($certificate['event_name']);
        // Determinar el artículo correcto para el tipo de documento
       // $articuloTipoDocumento = obtenerArticuloDefinido($certificate['tipo_documento']);
        // Determinar el artículo correcto para el concepto
        $articuloConcepto = obtenerArticuloDefinido($certificate['concepto']);
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

        .event-logo-overlay {
            position: absolute;
            top: 10.5%;
            left: 17%;
            width: 12%;
            height: auto;
            max-width: 150px;
        }

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

        .texto-otorgado {
            top: 35%;
            font-size: 1.2vw;
            font-weight: 500;
            color: #4a5568;
        }
        
        .tipo-documento {
            top: 39%;
            font-size: 1.4vw;
            font-weight: bold;
            color: #00285a;
            text-transform: uppercase;
        }
        
        .nombre-estudiante {
            top: 44%;
            font-size: 2.2vw;
            font-weight: bold;
            color: #00285a;
            text-transform: uppercase;
        }

        .id-estudiante {
            top: 49%;
            font-size: 1.2vw;
            color: #4a5568;
        }

        .texto-culminado {
            top: 55%;
            font-size: 1.2vw;
            font-weight: 500;
            color: #4a5568;
        }

        .concepto-value {
            top: 61%;
            font-size: 1.4vw;
            font-weight: bold;
            color: #2d3748;
            text-transform: uppercase;
            /* CAMBIOS PARA AJUSTE MULTILÍNEA */
            white-space: normal;
            word-wrap: break-word;
            hyphens: auto;
            max-height: 4.5vw; /* Aproximadamente 3 líneas */
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            line-height: 1.3;
            padding: 0 2%;
            width: 76%; /* Ajustado para compensar el padding */
        }

        .detalles-curso {
            top: 67%;
            font-size: 1vw;
            color: #4a5568;
            line-height: 1.5;
        }

        .fechas-periodo {
            top: 72%;
            font-size: 1vw;
            color: #4a5568;
        }

        .fecha-emision {
            top: 75%;
            font-size: 0.9vw;
            color: #718096;
        }

        .event-signature-overlay {
            position: absolute;
            bottom: 8%;
            left: 50%;
            transform: translateX(-50%);
            width: 20%;
            max-width: 200px;
            height: auto;
        }

        .qr-code-overlay {
            position: absolute;
            bottom: 2%;
            right: 2%;
            width: 8%;
            max-width: 80px;
            height: auto;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
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
            
            <div class="text-overlay event-name-overlay">
                <?php echo htmlspecialchars($articuloEvento . ' ' . $certificate['event_name']); ?>
            </div>

            <div class="text-overlay texto-otorgado">Otorga el<?php //echo $articuloTipoDocumento; ?> presente</div>

            <div class="text-overlay tipo-documento">
                <?php echo htmlspecialchars($certificate['tipo_documento']) . ' A'; ?>
            </div>

            <div class="text-overlay nombre-estudiante">
                <?php echo htmlspecialchars($certificate['nombre_estudiante']); ?>
            </div>
            <div class="text-overlay id-estudiante">ID: <?php echo htmlspecialchars($certificate['id_estudiante']); ?></div>
            
            <div class="text-overlay texto-culminado">
                <?php 
                // Usar la variable motivo si existe, sino mantener el texto original
                if (!empty($certificate['motivo'])) {
                    echo htmlspecialchars($certificate['motivo']);
                } else {
                    echo "por haber culminado satisfactoriamente los requisitos de " . $articuloConcepto;
                }
                ?>
            </div>
            
            <div class="text-overlay concepto-value">
                <?php echo htmlspecialchars($certificate['concepto']); ?>
            </div>
            
           <?php if (!empty($certificate['horas_academicas']) && !empty($certificate['creditos'])): ?>
    <div class="text-overlay detalles-curso">
        Con una duración total de <?php echo htmlspecialchars($certificate['horas_academicas']); ?> horas académicas, 
        equivalente a <?php echo htmlspecialchars($certificate['creditos']); ?> créditos.
    </div>
<?php endif; ?>

            
            <div class="text-overlay fechas-periodo">Desarrollado del  <?php echo htmlspecialchars($certificate['fecha_inicio']); ?> al <?php echo htmlspecialchars($certificate['fecha_fin']); ?></div>
            <div class="text-overlay fecha-emision">
    <?php echo formatearFechaEmision($certificate['fecha_emision']); ?>
</div>

            
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