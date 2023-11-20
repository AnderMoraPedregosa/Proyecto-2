<?php
require "servidor/bbdd/login.php";



// Permitir el acceso desde cualquier origen (CORS)
header('Access-Control-Allow-Origin: *');

// Convertimos la respuesta a JSON
function jsonResponse($data)
{
    //header('Content-Type: application/json');
    echo json_encode($data);
}


function logearCuenta($emailUsuario, $contraseñaUsuario, $dbh)
{


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
}

// Aquí maneja la acción específica 'login'


if (isset($_POST['emailUsuario']) && isset($_POST['passwd'])) {
  

    $emailUsuario = $_POST['emailUsuario'];
    $contraseñaUsuario = $_POST['passwd'];
    logearCuenta($emailUsuario, $contraseñaUsuario, $dbh);
} else {
    $response = ['status' => 'error', 'message' => 'Acción no válida'];
    jsonResponse($response, 400);
}
