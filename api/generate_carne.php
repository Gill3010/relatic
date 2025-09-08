<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Manejar preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Incluir el archivo de configuración
require_once 'config.php';

// Crear conexión
$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Conexión fallida: " . $conn->connect_error]));
}

// Verificar si es una solicitud POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validar campos obligatorios
    if (empty($_POST['nombre_completo']) || empty($_POST['cedula_dni']) || empty($_FILES['foto'])) {
        echo json_encode(["success" => false, "message" => "Todos los campos obligatorios deben ser completados"]);
        exit;
    }

    // Procesar la imagen
    $foto = $_FILES['foto'];
    $fotoNombre = uniqid() . '_' . basename($foto['name']);
    $fotoRuta = "uploads/" . $fotoNombre;
    
    // Crear directorio si no existe
    if (!file_exists('uploads')) {
        mkdir('uploads', 0777, true);
    }
    
    // Mover archivo subido
    if (!move_uploaded_file($foto['tmp_name'], $fotoRuta)) {
        echo json_encode(["success" => false, "message" => "Error al subir la imagen"]);
        exit;
    }

    // Preparar datos para la inserción
    $nombre_completo = $conn->real_escape_string($_POST['nombre_completo']);
    $cedula_dni = $conn->real_escape_string($_POST['cedula_dni']);
    $cargo_rol = !empty($_POST['cargo_rol']) ? $conn->real_escape_string($_POST['cargo_rol']) : '';
    $departamento = !empty($_POST['departamento']) ? $conn->real_escape_string($_POST['departamento']) : '';
    $fecha_ingreso = !empty($_POST['fecha_ingreso']) ? $conn->real_escape_string($_POST['fecha_ingreso']) : null;
    $fecha_vencimiento = !empty($_POST['fecha_vencimiento']) ? $conn->real_escape_string($_POST['fecha_vencimiento']) : null;

    // Insertar datos en la base de datos
    $sql = "INSERT INTO carnets (nombre_completo, cedula_dni, cargo_rol, departamento, fecha_ingreso, fecha_vencimiento, foto_ruta)
            VALUES ('$nombre_completo', '$cedula_dni', '$cargo_rol', '$departamento', " . 
            ($fecha_ingreso ? "'$fecha_ingreso'" : "NULL") . ", " . 
            ($fecha_vencimiento ? "'$fecha_vencimiento'" : "NULL") . ", 
            '$fotoRuta')";

    if ($conn->query($sql)) {
        echo json_encode(["success" => true, "message" => "Carnet guardado exitosamente"]);
    } else {
        // Eliminar la imagen si falla la inserción
        unlink($fotoRuta);
        echo json_encode(["success" => false, "message" => "Error al guardar: " . $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
}

$conn->close();
?>