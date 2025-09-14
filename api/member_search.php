<?php
// member_search.php
session_start();
header('Content-Type: application/json');

// --- CÓDIGO CORS SEGURO ---
$allowed_origins = [
    'http://localhost:4173',
    'http://localhost:4174', // AÑADE ESTE PUERTO
    'http://localhost:3000',
    'https://relaticpanama.org',
];

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

// Permitir cualquier origen en desarrollo (opcional, solo para testing)
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    // Para desarrollo, puedes permitir cualquier origen (remover en producción)
    header("Access-Control-Allow-Origin: *");
}

header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS'); // AÑADE GET
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Manejo de preflight (CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Incluye tu archivo de configuración de la base de datos
require_once "config.php";

$response = ["success" => false, "message" => "", "carnets" => [], "certificates" => []];

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Obtener los datos del cuerpo de la solicitud JSON
    $input = file_get_contents("php://input");
    
    if (empty($input)) {
        $response["message"] = "Datos no proporcionados.";
        http_response_code(400);
        echo json_encode($response);
        exit;
    }
    
    $data = json_decode($input, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        $response["message"] = "JSON inválido.";
        http_response_code(400);
        echo json_encode($response);
        exit;
    }
    
    // Obtener el término de búsqueda
    $searchTerm = trim($data['cedula_dni'] ?? '');

    if (empty($searchTerm)) {
        $response["message"] = "Término de búsqueda no proporcionado.";
        http_response_code(400);
        echo json_encode($response);
        exit;
    }
    
    try {
        // Consultar la tabla `carnets` por `cedula_dni`
        $sqlCarnets = "SELECT * FROM carnets WHERE cedula_dni = ?";
        $stmtCarnets = $pdo->prepare($sqlCarnets);
        $stmtCarnets->execute([$searchTerm]);
        $carnets = $stmtCarnets->fetchAll(PDO::FETCH_ASSOC);

        // Consultar la tabla `certificates` por `id_estudiante`
        $sqlCertificates = "SELECT * FROM certificates WHERE id_estudiante = ?";
        $stmtCertificates = $pdo->prepare($sqlCertificates);
        $stmtCertificates->execute([$searchTerm]);
        $certificates = $stmtCertificates->fetchAll(PDO::FETCH_ASSOC);

        $response["success"] = true;
        $response["carnets"] = $carnets;
        $response["certificates"] = $certificates;
        $response["message"] = "Búsqueda completada exitosamente.";
        http_response_code(200);

    } catch (PDOException $e) {
        error_log("Error de base de datos: " . $e->getMessage());
        $response["message"] = "Error de base de datos. Inténtelo de nuevo más tarde.";
        http_response_code(500);
    }
} else {
    $response["message"] = "Método no permitido.";
    http_response_code(405);
}

echo json_encode($response);
?>