<?php
header('Access-Control-Allow-Origin: *'); // Permite solicitudes desde cualquier dominio
header('Content-Type: application/json');
header('Content-Type: application/json');
require_once 'config.php';
mysqli_set_charset($conn, "utf8mb4");

// Parámetros
$q = isset($_GET['q']) ? trim($_GET['q']) : '';
$type = isset($_GET['type']) ? trim($_GET['type']) : '';
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = 10;
$offset = ($page - 1) * $limit;

// Escapar parámetros
$q_escaped = mysqli_real_escape_string($conn, $q);
$type_escaped = mysqli_real_escape_string($conn, $type);

// Armar WHERE dinámicamente
$where = "1=1";

if (!empty($q)) {
    $where .= " AND (
    LOWER(tema) LIKE LOWER('%$q_escaped%') OR
    LOWER(primerNombre) LIKE LOWER('%$q_escaped%') OR
    LOWER(segundoNombre) LIKE LOWER('%$q_escaped%') OR
    LOWER(primerApellido) LIKE LOWER('%$q_escaped%') OR
    LOWER(segundoApellido) LIKE LOWER('%$q_escaped%')
)";
}
if (!empty($type)) {
    $where .= " AND tipoParticipacion = '$type_escaped'";
}

// Consulta principal
$sql = "
    SELECT id, tipoParticipacion, tema,
           primerNombre, segundoNombre, primerApellido, segundoApellido
    FROM inscriptions
    WHERE $where
    LIMIT $limit OFFSET $offset
";

// Consulta de conteo total
$count_sql = "SELECT COUNT(*) as total FROM inscriptions WHERE $where";

// Ejecutar consultas
$count_result = mysqli_query($conn, $count_sql);
if (!$count_result) {
    echo json_encode(["error" => "Error en COUNT: " . mysqli_error($conn)]);
    exit;
}
$total_rows = mysqli_fetch_assoc($count_result)['total'];
$total_pages = ceil($total_rows / $limit);

$result = mysqli_query($conn, $sql);
if (!$result) {
    echo json_encode(["error" => "Error en SELECT: " . mysqli_error($conn)]);
    exit;
}

$results = [];
while ($row = mysqli_fetch_assoc($result)) {
    $results[] = [
        "id" => $row["id"],
        "tipoParticipacion" => $row["tipoParticipacion"],
        "tema" => $row["tema"],
        "nombreCompleto" => trim(
            $row["primerNombre"] . " " . 
            $row["segundoNombre"] . " " . 
            $row["primerApellido"] . " " . 
            $row["segundoApellido"]
        )
    ];
}

// Respuesta final
echo json_encode([
    "currentPage" => $page,
    "totalPages" => $total_pages,
    "results" => $results
]);