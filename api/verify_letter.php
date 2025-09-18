<?php
// Forzar UTF-8 - MEJORADO
ini_set('default_charset', 'UTF-8');
mb_internal_encoding('UTF-8');
header("Content-Type: text/html; charset=UTF-8");

// Asegurarse de que la conexión PDO use UTF-8
require_once "api/config.php";

// Verificar que la conexión PDO tenga UTF-8 configurado
$pdo->exec("SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci");

$id = $_GET['id'] ?? null;
$letter = null;
$message = "Carta no encontrada.";

// Ruta de la imagen de fondo de la carta
$imagePath = 'assets/cartas/carta.jpg';
$imageFullPath = __DIR__ . '/' . $imagePath;
$imageExists = file_exists($imageFullPath);
$imageMessage = $imageExists ? "" : "Imagen NO encontrada en {$imagePath}.";

if ($id && is_numeric($id)) {
    // Nueva consulta: traemos la carta y el nombre del evento
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

    if ($letter) {
        $message = "Carta verificada.";
        
        // Asegurar UTF-8 en todos los campos de texto
        foreach ($letter as $key => $value) {
            if (is_string($value)) {
                $letter[$key] = mb_convert_encoding($value, 'UTF-8', 'UTF-8');
            }
        }
    }
}

// Función helper para salida segura de texto UTF-8
function safeOutput($text, $fallback = '') {
    if (empty($text)) return htmlspecialchars($fallback, ENT_QUOTES, 'UTF-8');
    
    // Asegurar que el texto esté en UTF-8
    $cleanText = mb_convert_encoding($text, 'UTF-8', 'UTF-8');
    return htmlspecialchars($cleanText, ENT_QUOTES, 'UTF-8');
}

// Función para agregar "(días)" después del número del día
function agregarDias($fecha) {
    return preg_replace('/^(\d{1,2})/', '$1 (días)', $fecha);
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Verificación de Carta</title>
<style>
body { 
    font-family: 'Georgia', 'Times New Roman', serif; 
    background: #f5f5f5; 
    margin: 0; 
    padding: 0;
    line-height: 1.6;
    letter-spacing: 0.3px;
}

.carta-container {
    position: relative;
    width: 95%;
    max-width: 1000px;
    margin: 20px auto;
    background-image: url('<?php echo $imagePath; ?>');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    aspect-ratio: 0.773;
    min-height: 600px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.text-overlay {
    position: absolute;
    color: #000;
    font-weight: normal;
    line-height: 1.4;
    padding: 0;
    margin: 0;
    letter-spacing: 0.4px;
}

.tipo-principal {
    top: 19%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.95vw;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    word-spacing: 2px;
}

.nombre-principal {
    top: 42%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.15vw;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    word-spacing: 3px;
    line-height: 1.3;
}

.dni-principal {
    top: 45%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.85vw;
    text-align: center;
    font-weight: 500;
    letter-spacing: 0.5px;
    word-spacing: 1px;
}

.event-name-overlay {
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.85vw;
    text-align: center;
    font-weight: bold;
    text-transform: uppercase;
    width: 80%;
    line-height: 1.4;
    letter-spacing: 0.6px;
    word-spacing: 2px;
}

/* Logos e imágenes */
.event-logo-overlay {
    position: absolute;
    top: 5%;
    left: 5%;
    max-width: 120px;
    max-height: 80px;
    object-fit: contain;
}

.event-signature-overlay {
    position: absolute;
    bottom: 15%;
    left: 20%;
    max-width: 200px;
    max-height: 80px;
    object-fit: contain;
}

/* Estilo de mensaje consistente con certificados */
.message-box {
    background-color: #fff;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    max-width: 600px;
    margin: 20px auto;
    text-align: center;
    border: 1px solid #e0e0e0;
}

.success-message { 
    color: #28a745; 
    margin: 0 0 15px 0; 
    font-size: 1.3em;
    font-weight: 600;
}

.error-message { 
    color: #dc3545; 
    margin: 0 0 15px 0; 
    font-size: 1.3em;
    font-weight: 600;
}

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
.download-button:hover { background-color: #0056b3; }

/* Responsive adjustments */
@media (max-width: 768px) {
    .event-name-overlay { font-size: 1.2vw; }
    .nombre-principal { font-size: 1.8vw; }
    .dni-principal { font-size: 1.3vw; }
    .tipo-principal { font-size: 1.4vw; }
}

@media (max-width: 480px) {
    .carta-container { width: 98%; margin: 10px auto; }
    .event-name-overlay { font-size: 2.2vw; }
    .nombre-principal { font-size: 3.0vw; }
    .dni-principal { font-size: 2.2vw; }
    .tipo-principal { font-size: 2.5vw; }
    
    .event-logo-overlay {
        max-width: 80px;
        max-height: 60px;
    }
    
    .event-signature-overlay {
        max-width: 150px;
        max-height: 60px;
    }
}
</style>
</head>
<body>

<div class="message-box">
    <?php if ($letter): ?>
        <h2 class="success-message"><?php echo safeOutput($message); ?></h2>
        <p>La siguiente información coincide con nuestros registros.</p>
        <a href="download_letter.php?id=<?php echo safeOutput($letter['id']); ?>" class="download-button" target="_blank">
            Descargar Carta
        </a>
    <?php else: ?>
        <h2 class="error-message"><?php echo safeOutput($message); ?></h2>
        <?php if (!$imageExists): ?>
            <p><?php echo safeOutput($imageMessage); ?></p>
        <?php endif; ?>
    <?php endif; ?>
</div>

<?php if ($letter && $imageExists): ?>
<div class="carta-container">
    <?php if (!empty($letter['logo_url'])): ?>
        <img src="<?php echo safeOutput($letter['logo_url']); ?>" alt="Logo de la Carta" class="event-logo-overlay">
    <?php endif; ?>

    <!-- Encabezado con fecha en línea -->
    <div style="position: absolute; top: 8%; right: 8%; font-size: 0.78vw; color: #000; font-weight: 500; text-align: right; white-space: nowrap; letter-spacing: 0.3px;">
        <?php echo safeOutput($letter['lugar']); ?>, <?php echo safeOutput($letter['fecha_expedicion']); ?>
    </div>

    <!-- Línea del firmante centrada horizontalmente -->
    <div style="position: absolute; top: 30%; left: 50%; transform: translateX(-50%); font-size: 0.78vw; color: #000; font-weight: 600; text-align: center; white-space: nowrap; letter-spacing: 0.4px; word-spacing: 1px;">
        EL SUSCRITO, <?php echo safeOutput($letter['firmante']); ?>, <?php echo safeOutput($letter['cargo']); ?> de <?php echo safeOutput($letter['institucion']); ?>
    </div>
    
    <div style="position: absolute; top: 35%; left: 50%; transform: translateX(-50%); font-size: 0.95vw; color: #000; font-weight: bold; text-align: center; letter-spacing: 1px; word-spacing: 2px;">EMITE CONSTANCIA QUE:</div>
    
    <!-- Datos del participante -->
    <div style="position: absolute; top: 42%; left: 50%; transform: translateX(-50%); font-size: 1.15vw; color: #000; font-weight: bold; text-align: center; text-transform: uppercase; letter-spacing: 0.8px; word-spacing: 3px; line-height: 1.3;">
        <?php echo safeOutput($letter['participante']); ?>
    </div>
    
    <div style="position: absolute; top: 45%; left: 50%; transform: translateX(-50%); font-size: 0.85vw; color: #000; text-align: center; letter-spacing: 0.5px; word-spacing: 1px;">
        No. Cédula/DNI <?php echo safeOutput($letter['dni_cedula']); ?>
    </div>
    
    <div style="position: absolute; top: 47.5%; left: 50%; transform: translateX(-50%); font-size: 0.78vw; color: #000; text-align: center; letter-spacing: 0.3px;">
        se encuentra inscrito en el
    </div>
    
    <!-- Nombre del evento -->
    <?php if (!empty($letter['event_name'])): ?>
        <div style="position: absolute; top: 50%; left: 50%; transform: translateX(-50%); font-size: 0.85vw; color: #000; font-weight: bold; text-align: center; text-transform: uppercase; width: 80%; line-height: 1.4; letter-spacing: 0.6px; word-spacing: 2px;">
            <?php echo safeOutput($letter['event_name']); ?>
        </div>
    <?php endif; ?>
    
    <!-- Tipo de constancia -->
    <div style="position: absolute; top: 19%; left: 50%; transform: translateX(-50%); font-size: 0.95vw; color: #000; font-weight: bold; text-align: center; text-transform: uppercase; letter-spacing: 1.2px; word-spacing: 2px;">
        <?php echo safeOutput($letter['tipo_constancia']); ?>
    </div>
    
    <!-- Información de fechas en línea continua -->
    <div style="position: absolute; top: 55%; left: 8%; font-size: 0.78vw; color: #000; width: 84%; text-align: justify; line-height: 1.5; letter-spacing: 0.2px; word-spacing: 0.5px;">
        El cual se estará desarrollando a partir del <?php echo safeOutput($letter['fecha_inicio']); ?> y culminará el <?php echo safeOutput($letter['fecha_final']); ?>  <?php echo safeOutput($letter['ano']); ?>.
    </div>
    
    <!-- Información del correo -->
    <div style="position: absolute; top: 62%; left: 8%; font-size: 0.78vw; color: #000; width: 84%; text-align: justify; line-height: 1.5; letter-spacing: 0.2px; word-spacing: 0.5px;">
        Para acreditar la veracidad de este documento, realice su solicitud al correo: <span style="font-style: italic; color: #2c5aa0;"><?php echo safeOutput($letter['correo']); ?></span>
    </div>
    
    <!-- Texto de expedición completo con "(días)" -->
    <div style="position: absolute; top: 70%; left: 8%; font-size: 0.78vw; color: #000; width: 84%; text-align: justify; line-height: 1.5; letter-spacing: 0.2px; word-spacing: 0.5px;">
        Se expide el presente certificado a los <?php echo agregarDias($letter['fecha_expedicion']); ?>, para los fines que estime conveniente.
    </div>
    
    <div style="position: absolute; top: 76%; left: 8%; font-size: 0.78vw; color: #000; font-weight: 500; letter-spacing: 0.3px;">Atentamente,</div>

    <!-- Solo variables dinámicas esenciales -->
    <div class="text-overlay tipo-principal"><?php echo safeOutput($letter['tipo_constancia']); ?></div>
    <div class="text-overlay nombre-principal"><?php echo safeOutput($letter['participante']); ?></div>
    <div class="text-overlay dni-principal">No. Cédula/DNI <?php echo safeOutput($letter['dni_cedula']); ?></div>
    
    <?php if (!empty($letter['event_name'])): ?>
        <div class="text-overlay event-name-overlay">
            <?php echo safeOutput($letter['event_name']); ?>
        </div>
    <?php endif; ?>

    <?php if (!empty($letter['signature_url'])): ?>
        <img src="<?php echo safeOutput($letter['signature_url']); ?>" alt="Firma de la Carta" class="event-signature-overlay">
    <?php endif; ?>
</div>
<?php elseif ($letter && !$imageExists): ?>
<div class="message-box error-message">La carta existe en la base de datos, pero la imagen de fondo no se encuentra.</div>
<?php endif; ?>

</body>
</html>