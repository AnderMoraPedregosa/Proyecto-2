<?php
require "servidor/bbdd/login.php"; 
function jsonResponse($data, $statusCode = 200)
{
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode($data);
}


// Aquí maneja la acción específica 'login'
if (isset($_POST['accion']) || isset($_GET['accion'])) {
    $accion = isset($_POST['accion']) ? $_POST['accion'] : $_GET['accion'];
    
    if ($accion === 'login') {
        if (isset($_POST['emailUsuario'], $_POST['contraseñaUsuario'])) {
            $emailUsuario = $_POST['emailUsuario'];
            $contraseñaUsuario = $_POST['contraseñaUsuario'];
        logearCuenta( $emailUsuario,$contraseñaUsuario);
    } else {
        $response = ['status' => 'error', 'message' => 'Acción no válida'];
        jsonResponse($response, 400);
    }
}

function logearCuenta($emailUsuario,$contraseñaUsuario)
{


        try {
            $user = getPersonaByEmailAndPassword($dbh, $emailUsuario, $contraseñaUsuario);

            if ($user) {
                // Las credenciales son correctas
                $response = ['success' => true];
                jsonResponse($response);
            } else {
                // Las credenciales son incorrectas
                $response = ['success' => false];
                jsonResponse($response);
            }
        } catch (PDOException $e) {
            // Error al procesar la solicitud
            $response = ['success' => false, 'error' => 'Error al procesar la solicitud'];
            jsonResponse($response);
        }
    }
}


?>
