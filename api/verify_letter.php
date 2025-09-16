<?php
// Forzar UTF-8
header("Content-Type: text/html; charset=UTF-8");

// Asegurarse de que la conexión PDO use UTF-8
require_once "api/config.php";

$id = $_GET['id'] ?? null;
$letter = null;
$message = "Carta no encontrada.";

// Ruta de la imagen de la carta
$imagePath = 'assets/cartas/carta.jpg';
$imageFullPath = __DIR__ . '/' . $imagePath;
$imageExists = file_exists($imageFullPath);
$imageMessage = $imageExists ? "" : "Imagen NO encontrada en {$imagePath}.";

if ($id && is_numeric($id)) {
    // Nueva consulta: Busca la carta y une la tabla 'events' para obtener los datos del evento
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
    
    if ($letter) {
        $message = "Carta verificada exitosamente.";
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Verificación de Carta</title>
<style>
body { 
    font-family: 'Times New Roman', serif; 
    background: #f0f0f0; 
    margin: 0; 
    padding: 0;
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
}

.text-overlay {
    position: absolute;
    color: #000;
    font-weight: normal;
    line-height: 1.2;
}

/* Logo del evento (similar posición que en certificados) */
.event-logo-overlay {
    position: absolute;
    top: 5%;
    left: 5%;
    width: 8%;
    height: auto;
    max-width: 100px;
}

/* Nombre del evento (parte superior) */
.event-name-overlay {
    position: absolute;
    top: 6%;
    left: 15%;
    font-size: 1.2vw;
    font-weight: bold;
    color: #00285a;
    width: 40%;
}

/* Ajustes de posicionamiento precisos */
.fecha-top {
    top: 12.5%;
    left: 63%;
    font-size: 1.8vw;
    width: 25%;
}

.nombre-principal {
    top: 38.2%;
    left: 18.5%;
    font-size: 1.8vw;
    width: 25%;
}

.dni-principal {
    top: 38.2%;
    left: 62.5%;
    font-size: 1.8vw;
    width: 15%;
}

.tipo-principal {
    top: 41.2%;
    left: 37%;
    font-size: 1.8vw;
    width: 25%;
}

.fecha-inicio-principal {
    top: 44.5%;
    left: 19%;
    font-size: 1.8vw;
    width: 15%;
}

.fecha-final-principal {
    top: 44.5%;
    left: 47%;
    font-size: 1.8vw;
    width: 15%;
}

.fecha-expedicion-bottom {
    top: 56.5%;
    left: 56%;
    font-size: 1.8vw;
    width: 30%;
}

/* Firma del evento (parte inferior) */
.event-signature-overlay {
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    width: 15%;
    max-width: 150px;
    height: auto;
}

/* Estilo de mensaje consistente con certificados */
.message-box {
    background-color: #fff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    max-width: 600px;
    margin: 20px auto;
    text-align: center;
}

.success-message { 
    color: #28a745; 
    margin: 0 0 10px 0;
}

.error-message { 
    color: #dc3545; 
    margin: 0 0 10px 0;
}

/* Botón de descarga */
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

/* Responsive adjustments */
@media (max-width: 768px) {
    .event-name-overlay { font-size: 1.8vw; }
    .fecha-top { font-size: 2.8vw; }
    .nombre-principal { font-size: 4vw; }
    .dni-principal { font-size: 3.5vw; }
    .tipo-principal { font-size: 4vw; }
    .fecha-inicio-principal, .fecha-final-principal { font-size: 3.5vw; }
    .fecha-expedicion-bottom { font-size: 2.8vw; }
}

@media (max-width: 480px) {
    .carta-container {
        width: 98%;
        margin: 10px auto;
    }
    .event-name-overlay { font-size: 2.5vw; }
    .fecha-top { font-size: 3.5vw; }
    .nombre-principal { font-size: 5vw; }
    .dni-principal { font-size: 4.5vw; }
    .tipo-principal { font-size: 5vw; }
    .fecha-inicio-principal, .fecha-final-principal { font-size: 4vw; }
    .fecha-expedicion-bottom { font-size: 3.5vw; }
}
</style>
</head>
<body>

<div class="message-box">
    <?php if ($letter): ?>
        <h2 class="success-message"><?php echo htmlspecialchars($message, ENT_QUOTES, 'UTF-8'); ?></h2>
        <p>La siguiente información coincide con nuestros registros.</p>
        <a href="download_letter.php?id=<?php echo htmlspecialchars($letter['id'], ENT_QUOTES, 'UTF-8'); ?>" class="download-button" target="_blank">
            Descargar Carta
        </a>
    <?php else: ?>
        <h2 class="error-message"><?php echo htmlspecialchars($message, ENT_QUOTES, 'UTF-8'); ?></h2>
        <?php if (!$imageExists): ?>
            <p><?php echo htmlspecialchars($imageMessage, ENT_QUOTES, 'UTF-8'); ?></p>
        <?php endif; ?>
    <?php endif; ?>
</div>

<?php if ($letter && $imageExists): ?>
<div class="carta-container">
    <!-- Logo del evento si existe -->
    <?php if (!empty($letter['logo_url'])): ?>
        <img src="<?php echo htmlspecialchars($letter['logo_url']); ?>" alt="Logo del Evento" class="event-logo-overlay">
    <?php endif; ?>
    
    <!-- Nombre del evento si existe -->
    <?php if (!empty($letter['event_name'])): ?>
        <div class="text-overlay event-name-overlay">
            <?php echo htmlspecialchars($letter['event_name'], ENT_QUOTES, 'UTF-8'); ?>
        </div>
    <?php endif; ?>

    <div class="text-overlay fecha-top">
        <?php echo htmlspecialchars($letter['fecha_expedicion'], ENT_QUOTES, 'UTF-8'); ?>
    </div>
    <div class="text-overlay nombre-principal">
        <?php echo htmlspecialchars($letter['nombre_completo'], ENT_QUOTES, 'UTF-8'); ?>
    </div>
    <div class="text-overlay dni-principal">
        <?php echo htmlspecialchars($letter['dni_cedula'], ENT_QUOTES, 'UTF-8'); ?>
    </div>
    <div class="text-overlay tipo-principal">
        <?php echo htmlspecialchars($letter['tipo_constancia'], ENT_QUOTES, 'UTF-8'); ?>
    </div>
    <div class="text-overlay fecha-inicio-principal">
        <?php echo htmlspecialchars($letter['fecha_inicio'], ENT_QUOTES, 'UTF-8'); ?>
    </div>
    <div class="text-overlay fecha-final-principal">
        <?php echo htmlspecialchars($letter['fecha_final'], ENT_QUOTES, 'UTF-8'); ?>
    </div>
    <div class="text-overlay fecha-expedicion-bottom">
        <?php echo htmlspecialchars($letter['fecha_expedicion'], ENT_QUOTES, 'UTF-8'); ?>
    </div>
    
    <!-- Firma del evento si existe -->
    <?php if (!empty($letter['signature_url'])): ?>
        <img src="<?php echo htmlspecialchars($letter['signature_url']); ?>" alt="Firma del Evento" class="event-signature-overlay">
    <?php endif; ?>
</div>
<?php elseif ($letter && !$imageExists): ?>
<div class="message-box error-message">La carta existe en la base de datos, pero la imagen de fondo no se encuentra.</div>
<?php endif; ?>

</body>
</html>