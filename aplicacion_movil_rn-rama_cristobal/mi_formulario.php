//Este archivo va en la carpeta htdocs de xampp

<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents('php://input'), true);

// Datos de conexión a la base de datos
$servername = "localhost";
$username = "admin";
$password = "";
$dbname = "formulario_db";

// Conexión
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $numero_medidor = $data['numero_medidor'] ?? '';
    $comentarios = $data['comentarios'] ?? '';
    $imagenes = $data['imagenes'] ?? '[]'; 

    // Validación de datos
    if ($numero_medidor && $comentarios && $imagenes) {
        // SQL INSERT
        $stmt = $conn->prepare("INSERT INTO registros_medidor (numero_medidor, comentarios, imagenes) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $numero_medidor, $comentarios, $imagenes);

        // Ejecutar la consulta
        if ($stmt->execute()) {
            echo json_encode(["message" => "Nuevo registro creado exitosamente."]);
        } else {
            echo json_encode(["error" => "Error: " . $stmt->error]);
        }

        $stmt->close();
    } else {
        echo json_encode(["error" => "Datos no válidos."]);
    }
}

$conn->close();
?>
