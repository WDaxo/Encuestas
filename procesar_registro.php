<?php
require 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT); // Cifrado de la contraseña

    try {
        $sql = "INSERT INTO usuarios (username, password) VALUES (:username, :password)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':password', $password);
        $stmt->execute();
        echo "Usuario registrado exitosamente.";
    } catch (PDOException $e) {
        if ($e->getCode() == 23000) { // Código de error por duplicados
            echo "El nombre de usuario ya existe.";
        } else {
            echo "Error en el registro: " . $e->getMessage();
        }
    }
}
?>
