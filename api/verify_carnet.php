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
        id,
        nombre_completo,
        cedula_dni,
        cargo_rol,
        departamento,
        fecha_ingreso,
        fecha_vencimiento,
        titulo_academico,
        afiliacion,
        numero_expediente,
        fecha_admision,
        orcid,
        tipo_membresia,
        foto_ruta
    FROM 
        carnets
    WHERE 
        id = ?
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
        width: 700px;
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
        text-align: left;
        line-height: 1.2;
        font-family: Arial, sans-serif;
    }
    
    /* Foto de perfil - círculo en la parte superior derecha */
    .foto-carnet-overlay {
        position: absolute;
        top: 15px;
        right: 75px;
        width: 240px;
        height: 240px;
        border-radius: 50%;
        object-fit: cover;
        border: 5px solid #fff;
        box-shadow: 0 0 20px rgba(0,0,0,0.3);
    }
    
    /* Nombre completo - parte inferior derecha, grande */
    .nombre-completo-overlay {
        bottom: 150px;
        right: 125px;
        font-size: 28px;
        font-weight: bold;
        color: #1a365d;
        text-align: right;
        max-width: 300px;
        line-height: 1.1;
    }
    
    /* Título académico - debajo del nombre */
    .titulo-academico-overlay {
        bottom: 115px;
        right: 105px;
        font-size: 18px;
        font-weight: 600;
        color: #1a365d;
        text-align: right;
        max-width: 300px;
    }
    
    /* Cargo/Rol - parte superior izquierda, debajo del título del carnet */
    .cargo-rol-overlay {
        top: 200px;
        left: 135px;
        font-size: 22px;
        font-weight: bold;
        color: #1a365d;
        text-align: left;
        max-width: 300px;
    }
    
    /* Fecha de vencimiento - debajo del cargo */
    .fecha-vencimiento-overlay {
        top: 225px;
        left: 145px;
        font-size: 16px;
        color: #1a365d;
        text-align: left;
    }
    
    /* Afiliación - lado izquierdo, posición media */
    .afiliacion-overlay {
        top: 250px;
        left: 50px;
        font-size: 14px;
        color: #1a365d;
        text-align: left;
        max-width: 200px;
    }
    
    /* ORCID - debajo de afiliación */
    .orcid-overlay {
        top: 280px;
        left: 50px;
        font-size: 14px;
        color: #1a365d;
        text-align: left;
        max-width: 200px;
    }
    
    /* Variables que no están visibles en la captura pero se mantienen para funcionalidad */
    .cedula-dni-overlay {
        display: none;
    }
    .departamento-overlay {
        display: none;
    }
    .fecha-ingreso-overlay {
        display: none;
    }
    .numero-expediente-overlay {
        display: none;
    }
    .fecha-admision-overlay {
        display: none;
    }
    .tipo-membresia-overlay {
        display: none;
    }
    
    /* ID del carnet - esquina inferior derecha, pequeño */
    .id-carnet-overlay {
        bottom: 20px;
        right: 20px;
        font-size: 10px;
        color: #666;
        position: absolute;
    }
    
    /* QR Code - esquina inferior izquierda */
    .qr-code-overlay {
        position: absolute;
        bottom: 20px;
        left: 20px;
        width: 60px;
        height: 60px;
    }
    
    .message-box {
        background-color: #fff;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        max-width: 700px;
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
    
    /* MEDIA QUERIES PARA RESPONSIVIDAD MÓVIL */
    @media screen and (max-width: 768px) {
        body {
            padding: 10px;
        }
        
        .carnet-container {
            width: 100%;
            max-width: 100vw;
            height: auto;
            aspect-ratio: 700/450;
        }
        
        .message-box {
            margin: 10px auto;
            max-width: 100%;
        }
        
        /* Ajustar posiciones usando porcentajes para tablets */
        .foto-carnet-overlay {
            top: 3.33%; /* 15/450 */
            right: 10.71%; /* 75/700 */
            width: 34.29%; /* 240/700 */
            height: 53.33%; /* 240/450 */
        }
        
        .nombre-completo-overlay {
            bottom: 33.33%; /* 150/450 */
            right: 17.86%; /* 125/700 */
            font-size: 4vw;
            max-width: 42.86%; /* 300/700 */
        }
        
        .titulo-academico-overlay {
            bottom: 25.56%; /* 115/450 */
            right: 15%; /* 105/700 */
            font-size: 2.5vw;
            max-width: 42.86%;
        }
        
        .cargo-rol-overlay {
            top: 44.44%; /* 200/450 */
            left: 19.29%; /* 135/700 */
            font-size: 3vw;
            max-width: 42.86%;
        }
        
        .fecha-vencimiento-overlay {
            top: 50%; /* 225/450 */
            left: 20.71%; /* 145/700 */
            font-size: 2.2vw;
        }
        
        .afiliacion-overlay {
            top: 55.56%; /* 250/450 */
            left: 7.14%; /* 50/700 */
            font-size: 1.8vw;
            max-width: 28.57%; /* 200/700 */
        }
        
        .orcid-overlay {
            top: 62.22%; /* 280/450 */
            left: 7.14%; /* 50/700 */
            font-size: 1.8vw;
            max-width: 28.57%;
        }
        
        .id-carnet-overlay {
            bottom: 4.44%; /* 20/450 */
            right: 2.86%; /* 20/700 */
            font-size: 1.4vw;
        }
        
        .qr-code-overlay {
            bottom: 4.44%; /* 20/450 */
            left: 2.86%; /* 20/700 */
            width: 8.57%; /* 60/700 */
            height: 13.33%; /* 60/450 */
        }
    }
    
    @media screen and (max-width: 480px) {
        body {
            padding: 5px;
        }
        
        .message-box {
            padding: 10px;
            margin: 5px auto;
        }
        
        .download-button {
            padding: 8px 16px;
            font-size: 14px;
        }
        
        /* Aumentar fuentes para mejor legibilidad en móviles */
        .nombre-completo-overlay {
            font-size: 5.5vw;
            line-height: 1.0;
        }
        
        .titulo-academico-overlay {
            font-size: 3.2vw;
        }
        
        .cargo-rol-overlay {
            font-size: 3.8vw;
        }
        
        .fecha-vencimiento-overlay {
            font-size: 2.8vw;
        }
        
        .afiliacion-overlay,
        .orcid-overlay {
            font-size: 2.4vw;
        }
        
        .id-carnet-overlay {
            font-size: 1.8vw;
        }
        
        .foto-carnet-overlay {
            border: 2px solid #fff;
        }
    }
    
    @media screen and (max-width: 320px) {
        /* Ajustes para pantallas muy pequeñas */
        .nombre-completo-overlay {
            font-size: 6.5vw;
        }
        
        .titulo-academico-overlay {
            font-size: 3.8vw;
        }
        
        .cargo-rol-overlay {
            font-size: 4.5vw;
        }
        
        .fecha-vencimiento-overlay {
            font-size: 3.2vw;
        }
        
        .afiliacion-overlay,
        .orcid-overlay {
            font-size: 2.8vw;
        }
        
        .id-carnet-overlay {
            font-size: 2.2vw;
        }
    }
    
    @media print {
        body {
            background-color: white;
            padding: 0;
        }
        .message-box {
            display: none;
        }
        .carnet-container {
            box-shadow: none;
            margin: 0;
            page-break-inside: avoid;
        }
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
            <div class="text-overlay titulo-academico-overlay"><?php echo htmlspecialchars($carnet['titulo_academico']); ?></div>
            <div class="text-overlay cargo-rol-overlay"><?php echo htmlspecialchars($carnet['cargo_rol']); ?></div>
            <div class="text-overlay fecha-vencimiento-overlay"><?php echo htmlspecialchars($carnet['fecha_vencimiento']); ?></div>
            <div class="text-overlay afiliacion-overlay"><?php echo htmlspecialchars($carnet['afiliacion']); ?></div>
            <div class="text-overlay orcid-overlay"><?php echo htmlspecialchars($carnet['orcid']); ?></div>
            
            <!-- Variables ocultas pero mantenidas para funcionalidad -->
            <div class="text-overlay cedula-dni-overlay">Cédula: <?php echo htmlspecialchars($carnet['cedula_dni']); ?></div>
            <div class="text-overlay departamento-overlay">Departamento: <?php echo htmlspecialchars($carnet['departamento']); ?></div>
            <div class="text-overlay fecha-ingreso-overlay">Fecha de Ingreso: <?php echo htmlspecialchars($carnet['fecha_ingreso']); ?></div>
            <div class="text-overlay numero-expediente-overlay">Expediente: <?php echo htmlspecialchars($carnet['numero_expediente']); ?></div>
            <div class="text-overlay fecha-admision-overlay">Fecha de Admisión: <?php echo htmlspecialchars($carnet['fecha_admision']); ?></div>
            <div class="text-overlay tipo-membresia-overlay">Membresía: <?php echo htmlspecialchars($carnet['tipo_membresia']); ?></div>
            
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