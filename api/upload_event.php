<?php
// Permite solicitudes desde el origen que envió la petición para solucionar el error de CORS.
// Esto es necesario para que funcione tanto en tu entorno de desarrollo como en producción.
header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Includes the database configuration file
require_once "config.php";

// Handles the OPTIONS request
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

$response = ["success" => false, "message" => ""];

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Validar que se ha proporcionado el ID del evento y los archivos
    if (!isset($_POST['event_id']) || !isset($_FILES['event_logo']) || !isset($_FILES['event_signature'])) {
        $response["message"] = "Solicitud inválida. Por favor, proporciona el ID del evento, logo y firma.";
        http_response_code(400);
        echo json_encode($response);
        exit;
    }

    $eventId = $_POST['event_id'];
    $logoFile = $_FILES['event_logo'];
    $signatureFile = $_FILES['event_signature'];

    // --- SUBIDA DEL LOGO ---
    $logoTargetDir = "logos/";
    $logoFileName = uniqid('logo_', true) . '_' . basename($logoFile["name"]);
    $logoTargetPath = $logoTargetDir . $logoFileName;
    $logoPathForDB = 'api/' . $logoTargetPath;

    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!in_array($logoFile['type'], $allowedTypes) || $logoFile['size'] > 2 * 1024 * 1024) {
        $response["message"] = "Archivo de logo inválido. Debe ser una imagen (PNG, JPG, GIF) y pesar menos de 2MB.";
        http_response_code(400);
        echo json_encode($response);
        exit;
    }
    
    if (!move_uploaded_file($logoFile["tmp_name"], $logoTargetPath)) {
        $response["message"] = "Error al subir el archivo del logo.";
        http_response_code(500);
        echo json_encode($response);
        exit;
    }

    // --- SUBIDA DE LA FIRMA ---
    $signatureTargetDir = "signatures/";
    $signatureFileName = uniqid('sig_', true) . '_' . basename($signatureFile["name"]);
    $signatureTargetPath = $signatureTargetDir . $signatureFileName;
    $signaturePathForDB = 'api/' . $signatureTargetPath;

    if (!in_array($signatureFile['type'], $allowedTypes) || $signatureFile['size'] > 1 * 1024 * 1024) {
        $response["message"] = "Archivo de firma inválido. Debe ser una imagen y pesar menos de 1MB.";
        http_response_code(400);
        echo json_encode($response);
        exit;
    }

    if (!move_uploaded_file($signatureFile["tmp_name"], $signatureTargetPath)) {
        $response["message"] = "Error al subir el archivo de la firma.";
        http_response_code(500);
        echo json_encode($response);
        exit;
    }

    try {
        // Usa 'UPDATE' para actualizar un registro existente en la base de datos
        $sql = "UPDATE events SET logo_url = ?, signature_url = ? WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$logoPathForDB, $signaturePathForDB, $eventId]);

        $response["success"] = true;
        $response["message"] = "Activos del evento subidos y vinculados exitosamente.";
        http_response_code(200);
        
    } catch (PDOException $e) {
        error_log("Database error in upload_event_assets.php: " . $e->getMessage());
        $response["message"] = "Error de base de datos. Por favor, intenta de nuevo más tarde.";
        http_response_code(500);
    }
} else {
    $response["message"] = "Método no permitido.";
    http_response_code(405);
}

echo json_encode($response);
?>