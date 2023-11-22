<?php
require "servidor/bbdd/personasCRUD.php";



// Convertimos la respuesta a JSON
function jsonResponse($data, $statusCode = 200)
{
    http_response_code($statusCode);
    echo json_encode($data);
}

function logearCuenta($emailUsuario, $contraseñaUsuario, $dbh)
{

    $user = getPersonaByEmail($dbh, $emailUsuario);


    /*   echo "<script> alert($user) </script>"; */
    if ($user && password_verify($contraseñaUsuario, $user['passwd'])) {

        /* session_start();
        $_SESSION["user"] = $user; */
        // Las credenciales son correctas
        $response = ['success' => true, 'user' => $user];
        jsonResponse($response);
    } else {

        // Las credenciales son incorrectas
        $response = ['success' => false, 'message' => 'Credenciales incorrectas'];

        jsonResponse($response, 401);
    }
}





// Verifica si la petición es de tipo POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        if (isset($_POST['emailUsuario']) && isset($_POST['passwd'])) {
            $emailUsuario = $_POST['emailUsuario'];
            $contraseñaUsuario = $_POST['passwd'];
            logearCuenta($emailUsuario, $contraseñaUsuario, $dbh);
        } else {
            $response = ['status' => 'error', 'message' => 'Campos incompletos'];
            jsonResponse($response, 400);
        }
    } catch (Exception $e) {
        // Manejar la excepción, por ejemplo, imprimir el mensaje
        $response = ['status' => 'error', 'message' => $e->getMessage()];
        jsonResponse($response, 500);  // Código de estado 500 para errores internos del servidor
    }
} else {
    $response = ['status' => 'error', 'message' => 'Método no permitido'];
    jsonResponse($response, 405);
}
