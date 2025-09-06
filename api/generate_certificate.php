<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Ruta al autoloader de Composer
require_once __DIR__ . '/../vendor/autoload.php';
require_once "config.php"; 

use PhpOffice\PhpSpreadsheet\IOFactory;

$response = ["success" => false, "message" => ""];

// Manejo de la solicitud OPTIONS
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    $response["message"] = "Método no permitido";
    http_response_code(405);
    echo json_encode($response);
    exit;
}

if (!isset($_FILES['excel_file']) || $_FILES['excel_file']['error'] !== UPLOAD_ERR_OK) {
    $response["message"] = "Error al subir el archivo.";
    http_response_code(400);
    echo json_encode($response);
    exit;
}

$uploadedFile = $_FILES['excel_file']['tmp_name'];

try {
    $spreadsheet = IOFactory::load($uploadedFile);
    $worksheet = $spreadsheet->getActiveSheet();
    $data = $worksheet->toArray(null, true, true, true);
    
    if (empty($data) || count($data) < 2) {
        $response["message"] = "El archivo de Excel está vacío o no tiene datos.";
        http_response_code(400);
        echo json_encode($response);
        exit;
    }

    $headers = array_map('strtolower', $data[1]);
    
    $columnMapping = [
        'nombre_estudiante' => array_search('nombre_estudiante', $headers),
        'id_estudiante' => array_search('id_estudiante', $headers),
        'concepto' => array_search('concepto', $headers),
        'tipo_documento' => array_search('tipo_documento', $headers),
        'horas_academicas' => array_search('horas_academicas', $headers),
        'creditos' => array_search('creditos', $headers),
        'fecha_inicio' => array_search('fecha_inicio', $headers),
        'fecha_fin' => array_search('fecha_fin', $headers),
        'fecha_emision' => array_search('fecha_emision', $headers),
    ];

    foreach ($columnMapping as $field => $index) {
        if ($index === false) {
            $response["message"] = "Columna requerida no encontrada: '$field'.";
            http_response_code(400);
            echo json_encode($response);
            exit;
        }
    }

    // ✅ La consulta SQL ahora ignora la columna user_id
    $sql = "INSERT INTO certificates (nombre_estudiante, id_estudiante, concepto, tipo_documento, horas_academicas, creditos, fecha_inicio, fecha_fin, fecha_emision, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";
    $stmt = $pdo->prepare($sql);
    
    $certificatesGenerated = 0;
    $failedRows = [];

    for ($i = 2; $i <= count($data); $i++) {
        $row = $data[$i];
        
        $rowData = [
            'nombre_estudiante' => $row[$columnMapping['nombre_estudiante']] ?? null,
            'id_estudiante' => $row[$columnMapping['id_estudiante']] ?? null,
            'concepto' => $row[$columnMapping['concepto']] ?? null,
            'tipo_documento' => $row[$columnMapping['tipo_documento']] ?? null,
            'horas_academicas' => (int)($row[$columnMapping['horas_academicas']] ?? 0),
            'creditos' => (float)($row[$columnMapping['creditos']] ?? 0),
            'fecha_inicio' => $row[$columnMapping['fecha_inicio']] ?? null,
            'fecha_fin' => $row[$columnMapping['fecha_fin']] ?? null,
            'fecha_emision' => $row[$columnMapping['fecha_emision']] ?? null,
        ];

        if (empty($rowData['nombre_estudiante']) || empty($rowData['id_estudiante'])) {
            $failedRows[] = $i;
            continue;
        }

        try {
            // ✅ El array para la ejecución ahora ignora el user_id
            $stmt->execute(array_values($rowData));
            $certificatesGenerated++;
        } catch (PDOException $e) {
            error_log("Error al procesar fila " . $i . ": " . $e->getMessage());
            $failedRows[] = $i;
        }
    }
    
    $response["success"] = true;
    if (count($failedRows) === 0) {
        $response["message"] = "Se generaron $certificatesGenerated certificados exitosamente.";
    } else {
        $response["message"] = "Se generaron $certificatesGenerated certificados. Hubo errores en las filas: " . implode(', ', $failedRows) . ".";
    }

    http_response_code(201);
    
} catch (Exception $e) {
    error_log("Error general al procesar el archivo Excel: " . $e->getMessage());
    $response["message"] = "Error interno al procesar el archivo.";
    http_response_code(500);
}

echo json_encode($response);
?>