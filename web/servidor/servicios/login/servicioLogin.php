<?php
require "servidor/bbdd/login.php"; 


$accion = isset($_GET['accion']) ? $_GET['accion'] : '';

// Permitir el acceso desde cualquier origen (CORS)
header('Access-Control-Allow-Origin: *');

// Convertimos la respuesta a JSON
function jsonResponse($data)
{
    //header('Content-Type: application/json');
    echo json_encode($data);
}

echo "<script>alert('servicio login');</script>";

function logearCuenta($emailUsuario,$contraseñaUsuario, $dbh)
{

    echo "<script>alert('estoy en loguear cuenta');</script>";

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
if (isset($_POST['accion']) || isset($_GET['accion'])) {


    $accion = isset($_POST['accion']) ? $_POST['accion'] : $_GET['accion'];
    echo "<script>alert('$accion');</script>";

    if ($accion === 'login') {
        echo "<script>alert('estoy en login');</script>";
        
        if (isset($_POST['emailUsuario']) && isset($_POST['passwd'])) {
            echo "<script>alert('comprobando usuario y contraseña');</script>";
    
            $emailUsuario = $_POST['emailUsuario'];
            $contraseñaUsuario = $_POST['passwd'];
            logearCuenta($emailUsuario, $contraseñaUsuario, $dbh);
        } else {
            $response = ['status' => 'error', 'message' => 'Acción no válida'];
            jsonResponse($response, 400);
        }
    }
    


}


?>
