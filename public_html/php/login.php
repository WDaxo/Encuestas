<?php
header('Content-Type: application/json');
//comentado x victor 17:37
// Conectar a la base de datos
include 'db_connection.php';

// Obtener datos enviados desde el frontend
$data = json_decode(file_get_contents('php://input'), true);
if (!$data) {
    echo json_encode(['success' => false, 'message' => 'No se recibieron datos.']);
    exit;
}

$username = $data['username'] ?? '';
$password = $data['password'] ?? '';

// Validar que los datos no estén vacíos
if (empty($username) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Por favor, complete todos los campos.']);
    exit;
}

// Preparar consulta segura
$query = "SELECT * FROM administrador WHERE Correo_Electronico = ?";
$stmt = $conn->prepare($query);

if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Error en la preparación de la consulta.']);
    exit;
}

$stmt->bind_param('s', $username);
$stmt->execute();
$result = $stmt->get_result();

// Verificar si existe el usuario
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    
    // Verificar contraseña cifrada
    if (password_verify($password, $row['Contraseña'])) {
        echo json_encode(['success' => true, 'message' => 'Inicio de sesión exitoso.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Contraseña incorrecta.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Usuario no encontrado.']);
}

$stmt->close();
$conn->close();
?>
