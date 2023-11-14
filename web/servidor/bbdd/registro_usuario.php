<?php
require "enumDatosConexion.php";
header('Content-Type: application/json');

// Recibe datos 
$nombreUsuario = $_POST['nombreUsuario'];
$dniUsuario = $_POST['dniUsuario'];
$emailUsuario = $_POST['emailUsuario'];
$contraseñaUsuario = $_POST['contraseñaUsuario'];
$tipoUsuario = $_POST['tipoUsuario']; 

//  valores de ID del rol según el tipo 
$idRol = ($tipoUsuario === 'cliente') ? 2 : (($tipoUsuario === 'comerciante') ? 3 : null);

//conexion
$pdo = connect(Datos::Host, Datos::Dbname, Datos::User, Datos::Pass);

//si conectamos
if ($pdo) {
    // Verificar si el correo electrónico del usuario ya está registrado
    $stmt = $pdo->prepare("SELECT COUNT(*) AS count FROM usuarios WHERE email = ?");
    $stmt->execute([$emailUsuario]);
    $result = $stmt->fetchAll(PDO::FETCH_OBJ);

    
    if ($result[0]->count > 0) {
        // El correo electrónico del usuario ya está en uso
        echo json_encode(['success' => false, 'error' => 'El correo electrónico ya está registrado']);
    } else {
    
        // Insertar nuevo usuario en la base de datos
        //codificamos la pass
        $hashedPassword = password_hash($contraseñaUsuario, PASSWORD_DEFAULT);

        $stmt = $pdo->prepare("INSERT INTO usuarios (nombre, dni, email, contraseña, id_rol) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$nombreUsuario, $dniUsuario, $emailUsuario, $hashedPassword, $idRol]);

        echo json_encode(['success' => true]);
    }
} else {
    // No se pudo conectar a la base de datos
    echo json_encode(['success' => false, 'error' => 'Error de conexión a la base de datos']);
}

function connect($host, $dbname, $user, $pass)
{
    try {
        $dbh = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        return $dbh;
    } catch (PDOException $e) {
        return null; 
    }
}
?>
