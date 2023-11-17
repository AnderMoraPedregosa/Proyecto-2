<?php
require "servidor/bbdd/registrar.php";

function jsonResponse($data, $statusCode = 200)
{
    http_response_code($statusCode);
    //header('Content-Type: application/json');
    echo json_encode($data);
}

function registrarNuevoUsuario($nombreUsuario, $dniUsuario, $emailUsuario, $contraseñaUsuario, $tipoUsuario, $dbh) {
   
    try {
        echo "<script>alert('estoy en registrar usuario');</script>";

        $result = checkIfEmailExists($dbh, $emailUsuario);

        if ($result['count'] > 0) {
            echo json_encode(['success' => false, 'error' => 'El correo electrónico ya está registrado']);
            return;
        }

       $hashedPassword = password_hash($contraseñaUsuario, PASSWORD_DEFAULT);
        $rol = ($tipoUsuario === 'cliente') ? 2 : (($tipoUsuario === 'comerciante') ? 3 : null);

        $data = [
            'nombre' => $nombreUsuario,
            'dni' => $dniUsuario,
            'email' => $emailUsuario,
            'pass' => $hashedPassword,
            'rol' => $rol
        ];

        insertarPersona($dbh, $data);

        echo json_encode(['success' => true, 'message' => 'Usuario registrado correctamente']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => 'Error al procesar la solicitud ' . $e]);
    }
}

// Aquí maneja la acción específica 'regiatro'
if (isset($_POST['accion']) || isset($_GET['accion'])) {


    $accion = isset($_POST['accion']) ? $_POST['accion'] : $_GET['accion'];
    echo "<script>alert('$accion');</script>";

    if ($accion === 'registrar') {
        echo "<script>alert('estoy en registro');</script>";
        
        if (isset($_POST['nombreUsuario'], $_POST['dniUsuario'], $_POST['emailUsuario'], $_POST['passwd'], $_POST['tipoUsuario'])) {
            echo "<script>alert('comprobando usuario y contraseña registro');</script>";
            registrarNuevoUsuario($_POST['nombreUsuario'], $_POST['dniUsuario'], $_POST['emailUsuario'], $_POST['passwd'], $_POST['tipoUsuario'], $dbh);

        } else {
            $response = ['status' => 'error', 'message' => 'Acción no válida'];
            jsonResponse($response, 400);
        }
    }
    


}






?>
