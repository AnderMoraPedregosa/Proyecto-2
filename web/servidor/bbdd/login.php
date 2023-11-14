<?php
require "enumDatosConexion.php"; 
header('Content-Type: application/json');

// Recibe datos del formulario
$data = $_POST['emailUsuario'];
echo $data;

$emailUsuario = $data->emailUsuario;
$passwordProvided = $data->hashedPassword;


$pdo = connect(Datos::Host, Datos::Dbname, Datos::User, Datos::Pass);

if ($pdo) {
    // La conexión fue exitosa,
    // Consulta la base de datos para obtener el hash almacenado
    $stmt = $pdo->prepare("SELECT id, email, password FROM usuarios WHERE email = ?");
    $stmt->execute([$emailUsuario]);
    $user = $stmt->fetchAll(PDO::FETCH_OBJ);

    // Verifica la contraseña
    if ($user && password_verify($passwordProvided, $user['password'])) {
        // Las credenciales son correctas, 
        echo json_encode(['success' => true]);
    } else {
        // Las credenciales son incorrectas
        echo json_encode(['success' => false]);
    }
} else {
    // No se pudo conectar a la base de datos
    echo json_encode(['success' => false, 'error' => 'Error de conexión a la base de datos']);
}

// Función para conectar a la base de datos
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
