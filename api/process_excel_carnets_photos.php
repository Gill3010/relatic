<?php
// Nuevo endpoint
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once "config.php";
require_once __DIR__ . '/../vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\IOFactory;

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

$response = ["success" => false, "message" => "", "carnets" => []];

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // 1. Validar que ambos archivos fueron enviados
    if (!isset($_FILES['excel_file']) || !isset($_FILES['photos_zip'])) {
        $response["message"] = "Por favor, suba el archivo Excel y el archivo ZIP.";
        http_response_code(400);
        echo json_encode($response);
        exit;
    }

    $excelFile = $_FILES['excel_file'];
    $photosZipFile = $_FILES['photos_zip'];

    // 2. Descomprimir el archivo ZIP
    $zip = new ZipArchive;
    $zipTempDir = __DIR__ . '/temp_photos/' . uniqid();
    
    if ($zip->open($photosZipFile['tmp_name']) === TRUE) {
        // Crear el directorio temporal
        if (!is_dir($zipTempDir)) {
            mkdir($zipTempDir, 0777, true);
        }
        $zip->extractTo($zipTempDir);
        $zip->close();
    } else {
        $response["message"] = "Error al descomprimir el archivo ZIP.";
        http_response_code(500);
        echo json_encode($response);
        exit;
    }

    try {
        // 3. Procesar el archivo Excel
        $spreadsheet = IOFactory::load($excelFile['tmp_name']);
        $worksheet = $spreadsheet->getActiveSheet();
        $data = $worksheet->toArray();
        array_shift($data); // Quitar encabezados

        // Preparar la consulta SQL
        $pdo->beginTransaction();
        // A帽ado todas las columnas de tu tabla, asumiendo el mismo orden que en el Excel
        $sql = "INSERT INTO carnets (nombre_completo, cedula_dni, cargo_rol, departamentofea_ingreso, fecha_vencimiento, fecha_generacion, titulo_academico, afiliacion, numero_expediente, fecha_admision, orcid, tipo_membresia, foto_ruta) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        
        $processedCount = 0;
        $failedCount = 0;
        $carnetLinks = [];

        foreach ($data as $row) {
            // Asumiendo el orden de las columnas del Excel
            $cedulaDni = isset($row[0]) ? $row[0] : null;
            $nombreCompleto = isset($row[1]) ? $row[1] : null;
            $cargoRol = isset($row[2]) ? $row[2] : null;
            $departamento = isset($row[3]) ? $row[3] : null;
            $fechaIngreso = isset($row[4]) ? $row[4] : null;
            $fechaVencimiento = isset($row[5]) ? $row[5] : null;
            $fechaGeneracion = date('Y-m-d H:i:s'); // Fecha y hora actual
            $tituloAcademico = isset($row[6]) ? $row[6] : null;
            $afiliacion = isset($row[7]) ? $row[7] : null;
            $numeroExpediente = isset($row[8]) ? $row[8] : null;
            $fechaAdmision = isset($row[9]) ? $row[9] : null;
            $orcid = isset($row[10]) ? $row[10] : null;
            $tipoMembresia = isset($row[11]) ? $row[11] : null;
            
            // 4. Buscar la foto correspondiente en la carpeta temporal
            $fotoRuta = null;
            // Busca la foto usando el DNI y cualquier extensi贸n de imagen
            $fotoPath = glob($zipTempDir . '/' . $cedulaDni . '.*');

            if (!empty($fotoPath)) {
                // Mover la foto a su destino final
                $finalPhotoDir = __DIR__ . '/fotos_carnets/';
                if (!is_dir($finalPhotoDir)) {
                    mkdir($finalPhotoDir, 0777, true);
                }
                $finalPhotoPath = $finalPhotoDir . basename($fotoPath[0]);
                rename($fotoPath[0], $finalPhotoPath);
                $fotoRuta = 'api/fotos_carnets/' . basename($fotoPath[0]);
            }
            
            // 5. Insertar los datos, incluyendo la ruta de la foto
            try {
                $stmt->execute([
                    $nombreCompleto,
                    $cedulaDni,
                    $cargoRol,
                    $departamento,
                    $fechaIngreso,
                    $fechaVencimiento,
                    $fechaGeneracion,
                    $tituloAcademico,
                    $afiliacion,
                    $numeroExpediente,
                    $fechaAdmision,
                    $orcid,
                    $tipoMembresia,
                    $fotoRuta
                ]);
                $lastId = $pdo->lastInsertId();
                $carnetLinks[] = [
                    'id' => $lastId,
                    'nombre' => $nombreCompleto,
                    'url' => 'https://relaticpanama.org/verify_carnet.php?id=' . $lastId
                ];
                $processedCount++;
            } catch (PDOException $e) {
                error_log("Error de inserci贸n para " . $cedulaDni . ": " . $e->getMessage());
                $failedCount++;
            }
        }

        $pdo->commit();
        $response["success"] = true;
        $response["message"] = "Proceso completado. Se procesaron {$processedCount} registros. Fallaron {$failedCount} registros.";
        $response["carnets"] = $carnetLinks;
        http_response_code(200);

    } catch (Exception $e) {
        $pdo->rollBack();
        $response["message"] = "Error inesperado: " . $e->getMessage();
        http_response_code(500);
    } finally {
        // 6. Limpiar el directorio temporal
        array_map('unlink', glob("$zipTempDir/*.*"));
        rmdir($zipTempDir);
    }

} else {
    $response["message"] = "M茅todo no permitido.";
    http_response_code(405);
}

echo json_encode($response);
?>