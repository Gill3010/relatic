<?php
// Headers para manejar JSON y CORS
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Configuraci車n de la base de datos
$servername = "localhost";
$username = "Forms25";
$password = "Forms.2025";
$dbname = "Forms";

// Crear conexi車n
$conn = new mysqli($servername, $username, $password, $dbname);

// Configurar charset UTF-8 para tildes y caracteres especiales
$conn->set_charset("utf8mb4");

// Verificar conexi車n
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Conexi車n fallida: " . $conn->connect_error]));
}

// Recibir y validar datos del frontend
$data = json_decode(file_get_contents("php://input"), true);

if (
    empty($data['nombre_estudiante']) || 
    empty($data['id_estudiante']) || 
    empty($data['nombre_curso']) || 
    empty($data['horas_academicas']) || 
    empty($data['creditos']) || 
    empty($data['fecha_inicio']) || 
    empty($data['fecha_fin']) || 
    empty($data['fecha_emision'])
) {
    echo json_encode(["success" => false, "message" => "Todos los campos son obligatorios"]);
    exit;
}

// Insertar datos en la base de datos
$sql = "INSERT INTO certificates (
    nombre_estudiante, 
    id_estudiante, 
    nombre_curso, 
    horas_academicas, 
    creditos, 
    fecha_inicio, 
    fecha_fin, 
    fecha_emision
) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param(
    "sssiisss", 
    $data['nombre_estudiante'],
    $data['id_estudiante'],
    $data['nombre_curso'],
    $data['horas_academicas'],
    $data['creditos'],
    $data['fecha_inicio'],
    $data['fecha_fin'],
    $data['fecha_emision']
);

// Ejecutar y devolver respuesta
if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Certificado guardado exitosamente"]);
} else {
    echo json_encode(["success" => false, "message" => "Error al guardar: " . $stmt->error]);
}

// Cerrar conexiones
$stmt->close();
$conn->close();
?>