<?php
// Incluye el archivo de configuración de la base de datos
require_once "api/config.php";

// Define un mensaje de error por defecto
$message = "Carnet no encontrado.";
$carnet = null;

if (isset($_GET['id']) && is_numeric($_GET['id'])) {
    $id = $_GET['id'];
    
    // Consulta para buscar el carnet por ID
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

    if ($carnet) {
        $message = "Carnet verificado exitosamente.";
    } else {
        $message = "El carnet con ID " . htmlspecialchars($id) . " no existe.";
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verificación de Carnet</title>
    <style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        background-color: #f0f0f0;
    }
    .carnet-container {
        position: relative;
        width: 600px;
        height: 450px;
        margin: auto;
        background-image: url('assets/carnets/carnet.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        box-shadow: 0 0 20px rgba(0,0,0,0.2);
    }
    .text-overlay {
        position: absolute;
        color: #000;
        font-weight: normal;
        text-align: center;
        line-height: 1.2;
        width: 100%;
        color: #4a5568;
    }
    .foto-carnet-overlay {
        position: absolute;
        top: 15%;
        left: 50%;
        transform: translateX(-50%);
        width: 150px;
        height: 150px;
        border-radius: 50%;
        object-fit: cover;
        border: 4px solid #fff;
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
    }
    .nombre-completo-overlay {
        top: 45%;
        font-size: 24px;
        font-weight: bold;
        color: #1a365d;
    }
    .cedula-dni-overlay {
        top: 55%;
        font-size: 18px;
        color: #4a5568;
    }
    .cargo-rol-overlay {
        top: 65%;
        font-size: 20px;
        font-weight: 600;
        color: #2d3748;
    }
    .id-carnet-overlay {
        bottom: 5%;
        right: 5%;
        font-size: 12px;
        color: #718096;
        position: absolute;
    }
    .qr-code-overlay {
        position: absolute;
        bottom: 5%;
        left: 5%;
        width: 80px;
        height: 80px;
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

    <?php if ($carnet): ?>
        <div class="message-box">
            <h2 class="success-message">Carnet Verificado</h2>
            <p>La siguiente información coincide con nuestros registros.</p>
            <a href="download_carnet.php?id=<?php echo htmlspecialchars($carnet['id']); ?>" class="download-button" target="_blank">
                Descargar Carnet
            </a>
        </div>
        <div class="carnet-container">
            <?php if (!empty($carnet['foto_ruta'])): ?>
                <img src="<?php echo htmlspecialchars($carnet['foto_ruta']); ?>" alt="Foto de Perfil" class="foto-carnet-overlay">
            <?php endif; ?>
            
            <div class="text-overlay nombre-completo-overlay"><?php echo htmlspecialchars($carnet['nombre_completo']); ?></div>
            <div class="text-overlay cedula-dni-overlay">Cédula: <?php echo htmlspecialchars($carnet['cedula_dni']); ?></div>
            <div class="text-overlay cargo-rol-overlay"><?php echo htmlspecialchars($carnet['cargo_rol']); ?></div>
            <div class="id-carnet-overlay">ID: <?php echo htmlspecialchars($carnet['id']); ?></div>
            
            </div>
    <?php else: ?>
        <div class="message-box">
            <h2 class="error-message">Error en la Verificación</h2>
            <p><?php echo htmlspecialchars($message); ?></p>
        </div>
    <?php endif; ?>

</body>
</html>